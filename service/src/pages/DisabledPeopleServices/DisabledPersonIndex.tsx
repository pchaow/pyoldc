import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Skeleton, Button } from "@nextui-org/react";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk"
import { useContext, useEffect, useState } from "react"
import { useAlertContext } from "../../providers/AlertProvider"
import { useNavigate } from "react-router-dom"
import { IPeople } from "../../interfaces";
import { FaRegSquarePlus } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"


function DisabledPersonIndex() {

    const { call } = useContext(FrappeContext) as FrappeConfig
    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const { data, error, isLoading } = useSWR(
        "pyoldc.pyoldc.doctype.disabled_person.disabled_person.get_disabled_persons",
        fetcher
    );

    const [disabledPeople, setDisabledPeople] = useState([])
    const alert = useAlertContext()

    useEffect(() => {
        setDisabledPeople(data)
    }, [data])

    const navigate = useNavigate()


    return (
        <div>
            <div className="flex justify-between py-5">
                <div>
                    <p className="mb-4">คำร้องทั้งหมด</p>
                </div>
                <div>
                    <Button className="mx-1 bg-pink-500 text-white" onClick={() => { navigate('/disabledperson/create') }} >
                        <FaRegSquarePlus />ลงทะเบียนผู้พิการ
                    </Button>
                    <Button className="mx-1 text-black" onClick={() => { navigate("/disabledperson/support") }} >
                        <FaRegSquarePlus />ช่วยเหลือผู้พิการ
                    </Button>
                </div>

            </div>
            <Skeleton isLoaded={!isLoading} className="w-full rounded-lg">
                <Table aria-label="รายการผู้พิการ">
                    <TableHeader>
                        <TableColumn>ชื่อ-สกุล</TableColumn>
                        <TableColumn>ประเภท</TableColumn>
                        <TableColumn>สถานะ</TableColumn>
                        <TableColumn>เอกสาร</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"ไม่มีรายการที่จะแสดง."}>
                        {disabledPeople?.map((d: IPeople & { personal_number: string }) => (
                            <TableRow key={d.personal_number}>
                                <TableCell>{d.firstname} {d.lastname}</TableCell>
                                <TableCell>{d.disabled_type}</TableCell>
                                <TableCell>{d.person_status}</TableCell>

                                <TableCell>
                                    <div className="flex flex-row w-fit gap-2">
                                        <Tooltip placement="top" content="แก้ไข" >
                                            <span
                                                onClick={() => { navigate(`/disabledperson/edit/${d.personal_number}`) }}
                                                className="text-lg cursor-pointer active:opacity-50">
                                                <FaEdit />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Skeleton>
        </div>
    )
}

export default DisabledPersonIndex;
