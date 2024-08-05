import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Skeleton, Button } from "@nextui-org/react";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk"
import { useContext, useEffect, useState } from "react"
import { useAlertContext } from "../../providers/AlertProvider"
import { useNavigate } from "react-router-dom"
import { ISupports } from "../../interfaces";
import { FaRegSquarePlus } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"


function SupportIndex() {

    const { call } = useContext(FrappeContext) as FrappeConfig
    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const { data, error, isLoading } = useSWR(
        "pyoldc.pyoldc.doctype.supports.supports.get_supports",
        fetcher
    );

    const [supports, setSupports] = useState([])
    const alert = useAlertContext()

    console.log(supports)

    useEffect(() => {
        setSupports(data)
    }, [data])

    const navigate = useNavigate()


    return (
        <div>
            <div className="flex justify-between py-5">
                <div>
                    <p className="mb-4">ความช่วยเหลือผู้พิการ</p>
                </div>
                <div>
                    <Button className="mx-1 bg-pink-500 text-white" onClick={() => { navigate('/disabledperson/support/create') }} >
                        <FaRegSquarePlus />เพิ่มความช่วยเหลือผู้พิการ
                    </Button>
                </div>
            </div>
            <Skeleton isLoaded={!isLoading} className="w-full rounded-lg">
                <Table aria-label="รายการผู้พิการ">
                    <TableHeader>
                        <TableColumn>เลขความช่วยเหลือ</TableColumn>
                        <TableColumn>เลขประจำตัวผู้พิการ</TableColumn>
                        <TableColumn>ชื่อ-สกุล</TableColumn>
                        <TableColumn>วันที่ได้รับการช่วยเหลือ</TableColumn>
                        <TableColumn>เอกสาร</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"ไม่มีรายการที่จะแสดง."}>
                        {
                            supports?.map((s: ISupports & { support_receiver: string }) => (
                                <TableRow key={s.name}>
                                    <TableCell>{s.name}</TableCell>
                                    <TableCell>{s.support_receiver}</TableCell>
                                    <TableCell>{s.support_receiver_name} {s.support_receiver_surname}</TableCell>
                                    <TableCell>{s.support_date}</TableCell>

                                    <TableCell>
                                        <div className="flex flex-row w-fit gap-2">
                                            <Tooltip placement="top" content="แก้ไข" >
                                                <span
                                                    onClick={() => { navigate(`/disabledperson/support/edit/${s.name}`) }}
                                                    className="text-lg cursor-pointer active:opacity-50">
                                                    <FaEdit />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Skeleton>
        </div>
    )
}

export default SupportIndex;
