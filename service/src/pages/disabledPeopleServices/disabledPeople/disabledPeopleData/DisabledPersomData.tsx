import { Breadcrumbs, BreadcrumbItem, Skeleton, Card, CardHeader, CardBody, } from "@nextui-org/react"
import { IPeople } from "../../../../interfaces";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { useAlertContext } from "../../../../providers/AlertProvider";
import { FaRegFolder } from "react-icons/fa";
import TableData from "../../../../components/table/Table";


const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "support_giver",
    "disabled_center",
    "support_type_name",
    "actions",
];

const columns = [
    { name: "หน่วยงานที่ดูแล", uid: "support_giver", sortable: true },
    { name: "เลขความช่วยเหลือ", uid: "name", sortable: true },
    { name: "เรื่องที่ขอความช่วยเหลือ", uid: "support_type_name" },
    { name: "เลขประจำตัวผู้พิการ", uid: "support_receiver", sortable: true },
    { name: "ชื่อ", uid: "support_receiver_name", sortable: true },
    { name: "นามสกุล", uid: "support_receiver_surname" },
    { name: "วันที่ได้รับการช่วยเหลือ", uid: "support_date" },
    { name: "Actions", uid: "actions" },
];

const statusOptions = [];

function DisabledPersonData() {

    const { call } = useContext(FrappeContext) as FrappeConfig

    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const params = useParams()

    const loadPersonal = async () => {
        let response = await call.post("pyoldc.pyoldc.doctype.disabled_person.disabled_person.get_disabled_person_by_personal_number", {
            personal_number: params.id
        })
        let personal: IPeople = response.message

        setCreateForm(personal)
        return personal
    }

    const loadSupports = async () => {
        let response = await call.post("pyoldc.pyoldc.doctype.supports.supports.get_supports_lsit_by_support_receiver", {
            personal_number: params.id
        });
        let supports = response.message;
        console.log("supports", supports)
        setSupports(supports);
        return supports;
    }

    const [createForm, setCreateForm] = useState({} as IPeople)
    const [supports, setSupports] = useState([])

    const alert = useAlertContext()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadSupports().then(() => {
            loadPersonal()
            setLoading(true)
        })

    }, [])

    const navigate = useNavigate()


    return (
        <div className="px-5 mt-5 max-w-[400px] sm:max-w-none">
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem onClick={() => { navigate(`/`) }}>หน้าหลัก</BreadcrumbItem>
                <BreadcrumbItem onClick={() => { navigate(`/disabledPerson`) }}>ข้อมูลผู้พิการทั้งหมด</BreadcrumbItem>
                <BreadcrumbItem>ข้อมูลผู้พิการ</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mb-1">
                <p className="mb-2 text-2xl font-medium">ข้อมูลทั่วไป</p>
                <p className="text-gray-500">ข้อมูลทั้งหมดของคุณ {createForm.firstname} {createForm.lastname} </p>
            </div>
            {/* <div className="md:columns-4 w-full my-10"> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10 w-full">
                <Skeleton isLoaded={loading} className="rounded-lg w-full">
                    <Link to={`/disabledperson/data/:id/generalInformation/${createForm.personal_number}`}>
                        <Card onClick={() => { navigate(`/`) }} className="" radius="sm" >
                            <CardBody className="items-center p-5" >
                                <FaRegFolder className=" md:text-8xl" />
                                ข้อมูลทั่วไป
                            </CardBody >
                        </Card>
                    </Link>
                </Skeleton>
                <Skeleton isLoaded={loading} className="rounded-lg w-full">
                    <Link to={`/disabledperson/data/:id/health/${createForm.personal_number}`}>
                        <Card className="" radius="sm">
                            <CardBody className="items-center p-5" >
                                <FaRegFolder className=" md:text-8xl" />
                                สุขภาพ / สวัสดิการ
                            </CardBody >
                        </Card>
                    </Link>
                </Skeleton>
                <Skeleton isLoaded={loading} className="rounded-lg w-full">
                    <Link to={`/disabledperson/data/:id/problemStatus/${createForm.personal_number}`}>
                        <Card className="" radius="sm">
                            <CardBody className="items-center p-5" >
                                <FaRegFolder className=" md:text-8xl" />
                                สภาพปํญหา
                            </CardBody >
                        </Card>
                    </Link>
                </Skeleton>
                <Skeleton isLoaded={loading} className="rounded-lg w-full">
                    <Link to={`/`}>
                        <Card radius="sm">
                            <CardBody className="items-center p-5" >
                                <FaRegFolder className=" md:text-8xl" />
                                หลักฐานความช่วยเหลือ
                            </CardBody >
                        </Card>
                    </Link>
                </Skeleton>
            </div>
            <div>
                <div className="my-10">
                    <p className="mb-2 text-2xl font-medium">ข้อมูลการยืนคำร้องขอความช่วยเหลือ</p>
                    <p className="text-gray-500">ข้อมูลการยืนคำร้องขอความช่วยเหลือทั้งหมดของคุณ {createForm.firstname} {createForm.lastname} </p>
                </div>
                <Skeleton isLoaded={loading} className="rounded-lg w-full ">
                    <TableData columns={columns} users={supports} statusOptions={statusOptions} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} />
                </Skeleton>
            </div>

        </div >
    )
}

export default DisabledPersonData;
