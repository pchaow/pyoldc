import { Input, Textarea } from "@nextui-org/react"

interface FormProps {

}

const HealthFrom: React.FC<FormProps> = ({ }) => {


    return (
        <div>
            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">สุขภาพ</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="sm:col-span-2">
                        <p className="pb-1">โรคประจำตัว</p>
                        <Textarea isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูลโรคประจำตัว" name="" />
                    </div>
                    <div className="sm:grid sm:grid-cols-2 sm:gap-8 sm:col-span-2">
                        <div>
                            <p className="pb-1">สิทธิการรักษาพยาบาล n.74</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสิทธิการรักษาพยาบาล" name="" />
                        </div>
                    </div>
                    <div>
                        <p className="pb-1">ผลประเมินICF(ถ้ามี)</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="อัพโหลดหลักฐาน" name="" />
                    </div>
                    <div>
                        <p className="pb-1">ผลประเมินการดูแลสุขภาพ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="อัพโหลดหลักฐาน" name="" />
                    </div>
                    <div>
                        <p className="pb-1">ผลประเมินภาวะซึมเศร้า (2Q, 9Q)</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="อัพโหลดหลักฐาน" name="" />
                    </div>
                    <div>
                        <p className="pb-1">ประวัติการฉีดวัคซีน</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="อัพโหลดหลักฐาน" name="" />
                    </div>
                </div>
            </section>
            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">สวัสดิการที่ได้รับ</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                        <p className="pb-1">สิทธิ์ที่ได้รับ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูล" name="" />
                    </div>
                    <div>
                        <p className="pb-1">เบี้ยคนพิการ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูล" name="" />
                    </div>
                </div>
            </section>
        </div>
    )

}

export default HealthFrom
