import { Button, DatePicker, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { ICenter, IPeople } from "../../../interfaces"
import { useContext, useEffect, useRef, useState } from "react";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { RiDeleteBin2Fill, RiEyeFill } from "react-icons/ri";
import { BiSolidCloudUpload } from "react-icons/bi";

interface FormProps {

}

const ProblemStatusFrom: React.FC<FormProps> = ({ }) => {

    return (
        <div>
            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">ข้อมูลสภาพปัญหา</p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div className=" col-span-2">
                        <p className="pb-2">ความต้องการความช่วยเหลือ</p>
                        <Textarea isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกปัญหาที่ต้องการความช่วยเหลือ" name="" />
                    </div>
                    <div className="grid grid-cols-2 gap-8 col-span-2">
                        <div>
                            <p className="pb-2">รายได้</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกรายได้ต่อเดือน" name="" />
                        </div>
                    </div>
                    <div>
                        <p className="pb-2">อาชีพ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกอาชีพ" name="" />
                    </div>
                    <div>
                        <p className="pb-2">หนี้สินในครัวเรือน</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกหนี้สินในครัวเรือน(ถ้ามี)" name="" />
                    </div>
                </div>
            </section>
            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">หลักฐานปัญหา</p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูล" name="" />
                    </div>
                </div>
            </section>
        </div>
    )

}

export default ProblemStatusFrom
