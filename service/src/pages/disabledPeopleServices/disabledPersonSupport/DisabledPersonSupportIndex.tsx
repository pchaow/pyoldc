import { BreadcrumbItem, Breadcrumbs, Skeleton } from "@nextui-org/react";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk"
import React, { useContext, useEffect, useState } from "react"
import { useAlertContext } from "../../../providers/AlertProvider"
import { useNavigate } from "react-router-dom"
import TableData from "../../../components/tableData/TableData";


const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "support_receiver",
    "support_receiver_name",
    "support_receiver_surname",
    "actions",
];

const columns = [
    { name: "เลขความช่วยเหลือ", uid: "name", sortable: true },
    { name: "เลขประจำตัวผู้พิการ", uid: "support_receiver", sortable: true },
    { name: "ชื่อ", uid: "support_receiver_name", sortable: true },
    { name: "นามสกุล", uid: "support_receiver_surname" },
    { name: "วันที่ได้รับการช่วยเหลือ", uid: "support_date" },
    { name: "Actions", uid: "actions" },
];

const statusOptions = [ ];

function SupportIndex() {

    const { call } = useContext(FrappeContext) as FrappeConfig

    // const [supports, setSupports] = useState([])

    // let supportsData = call.get("pyoldc.pyoldc.doctype.disabled_person.disabled_person.count_not_registertaion_disabled_persons",).then((r: { message: any; }) => {
    //     let supports = r.message
    //     console.log("Data count not Registertaion: ", supports);
    //     if (supports) {
    //         setSupports(supports)
    //     }
    // })

    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const { data } = useSWR(
        "pyoldc.pyoldc.doctype.supports.supports.get_supports",
        fetcher
    );

    const [supports, setSupports] = useState([])
    const alert = useAlertContext()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
        if (data) {
            console.log("Data received: ", data);
            setSupports(data);
        }
    }, [data]);

    const navigate = useNavigate()


    return (
        <div className="m-5">
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem onClick={() => { navigate(`/`) }}>หน้าหลัก</BreadcrumbItem>
                <BreadcrumbItem>ข้อมูลการยื่นคำร้องขอความช่วยเหลือ</BreadcrumbItem>
            </Breadcrumbs>
            <section className="mb-10">
                <div className="mb-10">
                    <p className="mb-2 text-2xl font-medium">ข้อมูลการยื่นคำร้องขอความช่วยเหลือ</p>
                    <p className="text-gray-400">ข้อมูลการยื่นคำร้องขอความช่วยเหลือทั้งหมด</p>
                </div>
                <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                    <TableData columns={columns} users={supports} statusOptions={statusOptions} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} />
                </Skeleton>

            </section>
        </div>
    )
}

export default SupportIndex;
