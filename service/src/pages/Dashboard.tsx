import { Button, Card, CardHeader, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { BsFillPersonXFill } from "react-icons/bs";
import { Link } from "react-router-dom";


function Dashboard() {

    
    return (
        <div className="grid grid-flow-col justify-stretch">
            <div>
                <div className="flex justify-between py-5">
                    <div>
                        <p className="font-semibold text-xl">ข้อมูลโดยรวม</p>
                        <p className="text-gray-400">ข้อมูลโดยรวมฐานข้อมูลผู้พิการจังหวัดพะเยา</p>
                    </div>
                </div>
                <div className="flex py-5">
                    <Card className="mx-1">
                        <CardHeader className="font-medium">บัตรหมดอายุ</CardHeader>
                        <CardBody className="text-gray-400">
                            บัตรของคุณ XXX XXX กำลังจะหมดอายุในอีก 5 วัน คลิก
                        </CardBody>
                    </Card>
                    <Card className="mx-1">
                        <CardHeader >อัพเดตข้อมูล</CardHeader>
                        <CardBody className="text-gray-400">
                            คุณXX XXX พึ่งได้ทำการย้ายทะเบียนบ้านวันนี้! คลิก
                        </CardBody>
                    </Card>
                    <Card className="mx-1">
                        <CardHeader >คำร้อง</CardHeader>
                        <CardBody className="text-gray-400">
                            คุณ XXX XXX ได้ทำการยื่นคำร้องขอสวัสดิการ! คลิก
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Dashboard
