import { FrappeConfig, FrappeContext } from "frappe-react-sdk";
import { useContext, useRef, useState } from "react";
import { ISupports } from "../../interfaces";
import { Button, Card, CardBody, Image, Input, Select, SelectItem, Skeleton, Textarea } from "@nextui-org/react";
import { BiSolidCloudUpload } from "react-icons/bi";


interface FormProps {
    createForm: ISupports;
    loading: boolean;
    updateForm: (key: string, value: string) => void;
}

const DisabledPersonSupporFrom: React.FC<FormProps> = ({
    createForm,
    loading,
    updateForm,
}) => {

    const { file } = useContext(FrappeContext) as FrappeConfig

    const inputFile = useRef<HTMLInputElement>(null)

    const openInputFile = () => {
        inputFile?.current?.click();
    }

    const [isUploading, setIsUploading] = useState(false)
    const clearImage = async (e: any) => {
        setIsUploading(true)
        let inputName = e
        console.log("Name " + inputName)
        updateForm(inputName, null)
        setIsUploading(false)
    }

    const uploadFile = async (e: any) => {
        let myFile = e.target.files[0]
        let inputName = e.target.name
        const fileArgs = {
            /** If the file access is private then set to TRUE (optional) */
            "isPrivate": false,
            /** Folder the file exists in (optional) */
            // "folder": "home/RequestLicenseAttachment",
            // /** File URL (optional) */
            // /** Doctype associated with the file (optional) */
            // "doctype": "Attachment",
            // /** Docname associated with the file (mandatory if doctype is present) */
            // "docname": attachment.name,
            // /** Field to be linked in the Document **/
            // "fieldname" : "value"
        }

        file.uploadFile(
            myFile,
            fileArgs,
            /** Progress Indicator callback function **/
            (completedBytes, totalBytes) => console.log(Math.round((completedBytes / (totalBytes ?? completedBytes + 1)) * 100), " completed")
        )
            .then((response) => {
                let fileResponse = response.data.message.file_url
                console.log('response', response)
                updateForm(inputName, fileResponse)
                setIsUploading(false)

            })
            .catch(e => console.error(e))
    }


    return (
        <div>
            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p>ข้อมูลความช่วยเหลือ</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                        <p>ประเภทความช่วยเหลือ</p>
                        {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                        <Select placeholder="กรอกชื่อหน่วยงานที่ดูแล" isRequired name="support_type_name" variant="bordered"
                            selectedKeys={[createForm.support_type_name]} onChange={(e) => { updateForm('support_type_name', e.target.value) }}
                        >
                            <SelectItem key={"มอบบ้าน"}>
                                มอบบ้าน
                            </SelectItem>
                            <SelectItem key={"ปรับสภาพแวดล้อมที่อยู่อาศัย"}>
                                ปรับสภาพแวดล้อมที่อยู่อาศัย
                            </SelectItem>
                        </Select>
                        {/* </Skeleton> */}
                    </div>
                    <div>
                        <p>ความเร่งด่วน</p>
                        {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                        <Select placeholder="กรอกความเร่งด่วน" isRequired name="" variant="bordered" >
                            <SelectItem key={"เร่งด่วน"}>
                                เร่งด่วน
                            </SelectItem>
                            <SelectItem key={"ไม่เร่งด่วน"}>
                                ไม่เร่งด่วน
                            </SelectItem>
                        </Select>
                        {/* </Skeleton> */}
                    </div>
                    <div className="sm:col-span-2">
                        <p>รายละเอียดเรื่องที่ต้องการความช่วยเหลือ</p>
                        {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                        <Textarea variant="bordered" radius="sm" type="textarea" placeholder="กรอกรายละเอียดความช่วยเหลือ" name="support_detail"
                            value={createForm.support_detail} onChange={(e) => { updateForm('support_detail', e.target.value) }} />
                        {/* </Skeleton> */}
                    </div>
                    <div className="sm:col-span-2">
                        <p>ชื่อสถานที่ หรือ เลขพิกัด</p>
                        {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                        <Input variant="bordered" radius="sm" type="textarea" placeholder="กรอกชื่อสถานที่ หรือ เลขพิกัด" name="" />
                        {/* </Skeleton> */}
                    </div>
                    <div>
                        <p className="pb-1">สำเนาบัตรประจำตัวประชาชน</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกสำเนาบัตรประจำตัวประชาชน" />
                    </div>
                    <div>
                        <p className="pb-1">สำเนาทะเบียนบ้านผู้ดูแล</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกสำเนาทะเบียนบ้านผู้ดูแล" />
                    </div>
                    <div>
                        <p className="pb-1">สมุดบัญชีเงินฝากพร้อมสำเนา</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกสมุดบัญชีเงินฝากพร้อมสำเนา" />
                    </div>
                    <div>
                        <p className="pb-1">สำเนาบัตรประจำตัวประชาชนผู้ดูแล</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกสำเนาบัตรประจำตัวประชาชนผู้ดูแล" />
                    </div>
                    <div>
                        <p className="pb-1">สมุดบัญชีเงินฝากพร้อมสำเนาของผู้ดูแลโดยชอบธรรม</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกสมุดบัญชีเงินฝากพร้อมสำเนาของผู้ดูแลโดยชอบธรรม" />
                    </div>
                </div>
            </section>
            <section className="-mt-3">
                <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                    <p className="pb-1">หลักฐานความช่วยเหลือ</p>
                    {/* <div className="flex justify-center"></div> */}
                    <div className="relative z-0 mt-0.5 w-full -space-x-px flex justify-center">
                        {/* {createForm.support_image ? <Image width={300} src={createForm.support_image} />
                            : <CiImageOn className="bg-gray-200 rounded-l-md px-5 " fontSize='5rem' />}
                        <div className="w-full inline-flex items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 ">
                            {createForm.support_image ? createForm.support_image : "แทรกหลักฐาน"}
                        </div> */}



                        {createForm.support_image ? (
                            <Card className="col-span-12 sm:col-span-4 h-[300px] w-[300px] md:h-[500px] md:w-[500px]">
                                <CardBody className="overflow-visible p-5 flex items-center">
                                    <Image
                                        className="z-0 w-full h-full object-cover"
                                        src={createForm.support_image}
                                    />
                                    <Button onClick={openInputFile} size="sm" className="w-full mt-5"><BiSolidCloudUpload fontSize="1.3rem" />แทรกหลักฐานใหม่</Button>
                                </CardBody>
                            </Card>
                        ) : (
                            <Card className="col-span-12 sm:col-span-4 h-[300px] w-[300px] md:h-[450px] md:w-[500px]">
                                <CardBody className="overflow-visible p-0">
                                    <Button onClick={openInputFile} size="lg" className="h-full w-full"><BiSolidCloudUpload fontSize="1.3rem" />แทรกหลักฐาน</Button>
                                </CardBody>
                            </Card>
                        )}
                        < input
                            type="file"
                            id="support_image"
                            onChange={uploadFile}
                            name="support_image"
                            ref={inputFile}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DisabledPersonSupporFrom;
