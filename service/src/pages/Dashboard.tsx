import React, { useContext, useEffect, useState } from "react";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { Button, Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";
import { Link } from "react-router-dom";
import LineChart from "../components/chart/Line";
import PieChart from "../components/chart/Pie";
import { useAlertContext } from "../providers/AlertProvider";


function Dashboard() {

    const { call } = useContext(FrappeContext) as FrappeConfig

    const [countRegistertaion, setCountRegistertaion] = useState([]);
    const [countNotRegistertaion, setCountNotRegistertaion] = useState([]);
    const [countSupportsData, setCountSupportsData] = useState([]);

    const loadingDataCount = async () => {
        let NotRegistertaionData = call.get("pyoldc.pyoldc.doctype.disabled_person.disabled_person.count_not_registertaion_disabled_persons",).then((r: { message: any; }) => {
            let NotRegistertaionData = r.message
            console.log("Data count not Registertaion: ", NotRegistertaionData);
            if (NotRegistertaionData) {
                setCountNotRegistertaion(NotRegistertaionData)
            }
        })

        let RegistertaionData = call.get("pyoldc.pyoldc.doctype.disabled_person.disabled_person.count_registertaion_disabled_persons",).then((r: { message: any; }) => {
            let RegistertaionData = r.message
            console.log("Data count Registertaion: ", RegistertaionData);
            if (RegistertaionData) {
                setCountRegistertaion(RegistertaionData)
            }
        })
        let SupportsData = call.get("pyoldc.pyoldc.doctype.supports.supports.count_supports",).then((r: { message: any; }) => {
            let SupportsData = r.message
            console.log("Data count Supports: ", SupportsData);
            if (SupportsData) {
                setCountSupportsData(SupportsData)
            }
        })
    }

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        loadingDataCount()
    }, []
    )


    return (
        <div className="px-5 mt-5">
            <section className="mb-10">
                <div className="mb-1">
                    <p className="mb-2 text-2xl font-medium">ข้อมูลโดยรวม</p>
                    <p className="text-gray-400">ข้อมูลโดยรวมฐานข้อมูลผู้พิการจังหวัดพะเยา</p>
                </div>
                <div>
                    <div className="mb-3 flex justify-end">
                        <p className="text-pink-500">ดูข้อมูลทั้งหมด</p>
                    </div>
                    <div className="columns-3 w-full">
                        <Skeleton isLoaded={loading} className="rounded-lg w-full">
                            <Link to={'/disabledperson'}>
                                <Card className="" radius="sm">
                                    <CardHeader className="flex gap-3">
                                        ผู้พิการที่ลงทะเบียนแล้ว
                                    </CardHeader>
                                    <CardBody>
                                        <p className="text-pink-500 text-2xl font-medium">{countRegistertaion}</p>
                                        <p className="text-gray-400">+20% from last month</p>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Skeleton>

                        <Skeleton isLoaded={loading} className="rounded-lg w-full">
                            <Card className="" radius="sm">
                                <CardHeader className="flex gap-3">
                                    ผู้พิการที่ยังไม่ได้รับการลงทะเบียน
                                </CardHeader>
                                <CardBody>
                                    <p className="text-pink-500 text-2xl font-medium">{countNotRegistertaion}</p>
                                    <p className="text-gray-400">-33% from last month</p>
                                </CardBody>
                            </Card>
                        </Skeleton>

                        <Skeleton isLoaded={loading} className="rounded-lg w-full">
                            <Link to={'/disabledperson/support'}>
                                <Card className="" radius="sm">
                                    <CardHeader className="flex gap-3">
                                        คำร้องขอความช่วยเหลือ
                                    </CardHeader>
                                    <CardBody>
                                        <p className="text-pink-500 text-2xl font-medium">{countSupportsData}</p>
                                        <p className="text-gray-400">+8% from last month</p>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Skeleton>

                    </div>
                </div>
            </section >
            <section className="mb-10">
                <div className="mb-3 flex justify-end">
                    <p className="text-pink-500">ดูข้อมูลทั้งหมด</p>
                </div>
                <div className="columns-2 w-full">
                    <Skeleton isLoaded={loading} className="rounded-lg w-full">
                        <Card className="" radius="sm">
                            <CardBody>
                                <LineChart />
                            </CardBody>
                        </Card>
                    </Skeleton>

                    <Skeleton isLoaded={loading} className="rounded-lg w-full">
                        <Card className="" radius="sm">
                            <CardBody>
                                <PieChart />
                            </CardBody>
                        </Card>
                    </Skeleton>

                </div>
            </section >
            <section className="mb-10">
                <div className="mb-2">
                    <p className="mb-2 text-2xl font-medium">ที่ต้องทำในวันนี้</p>
                    <p className="text-gray-400">สวัสดีคุณ x วันนี้คุณมีงานที่ต้องจัดการทั้งหมด x งาน</p>
                </div>
                <div>
                    <div className="mb-1 flex justify-end">
                        <p className="text-pink-500">ดูข้อมูลทั้งหมด</p>
                    </div>
                    <div className="w-full flex">
                        <Card className="w-full max-w-[300px] mr-3" radius="sm">
                            <CardHeader className="flex gap-3">
                                <p>ด่วน</p> บัตรหมดอายุ
                            </CardHeader>
                            <CardBody>
                                <p>xxxx</p>
                                <Button className="bg-pink-500 text-white my-5">ดำเนินการ</Button>
                            </CardBody>
                        </Card>
                        <Card className="w-full max-w-[300px] mr-3" radius="sm">
                            <CardHeader className="flex gap-3">
                                <p>ด่วน</p> บัตรหมดอายุ
                            </CardHeader>
                            <CardBody>
                                <p>xxxx</p>
                                <Button className="bg-pink-500 text-white my-5">ดำเนินการ</Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </section >
        </div>
    )
}

export default Dashboard
