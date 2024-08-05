import { Tabs, Tab, Input, DatePicker, Textarea, Image, Button, Select, SelectItem } from "@nextui-org/react";
import { IPeople, ISupports } from "../../interfaces";
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { Key } from "@react-types/shared";
import { BiSolidCloudUpload } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";


function SupportCreate() {

    const { call } = useContext(FrappeContext) as FrappeConfig
    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const [createForm, setCreateForm] = useState({
        support_receiver: "",
        support_receiver_name: "",
        support_receiver_surname: ""
    } as ISupports)

    const updateForm = (key: string, value: Key) => {
        console.log('updateform', key, value)
        // setCreateForm({
        //     ...createForm,
        //     [key]: value
        // })
        setCreateForm(prevForm => ({
            ...prevForm,
            [key]: value
        }));
    }

    const handleSupportDateChange = (date) => {
        updateForm('support_date', `${date.year}-${date.month}-${date.day}`);
    };

    const { data } = useSWR(
        "pyoldc.pyoldc.doctype.disabled_person.disabled_person.get_disabled_persons",
        fetcher
    );
    const [disabledPersons, setDisabledPersons] = useState([])

    useEffect(() => {
        setDisabledPersons(data)
    }, [data])

    const navigate = useNavigate()

    const { file } = useContext(FrappeContext) as FrappeConfig

    const inputFile = useRef<HTMLInputElement>(null)

    const openInputFile = () => {
        inputFile?.current?.click();
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
                console.log("File Upload complete")
                let fileResponse = response.data.message.file_url
                console.log(response)
                updateForm(inputName, fileResponse)
            })
            .catch(e => console.error(e))
    }

    const [error, setError] = useState({} as ISupports);

    const validate = () => {
        let err = {} as ISupports;
        let hasError = false;
        if (!createForm.support_date) {
            err.support_date = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.support_budget_year) {
            err.support_budget_year = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.support_type_name) {
            err.support_type_name = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.support_giver) {
            err.support_giver = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.support_receiver) {
            err.support_receiver;
        }
        if (!createForm.support_detail) {
            err.support_detail = "กรุณากรอกข้อมูล";
            hasError = true;
        }

        setError(err);
        return !hasError;
    }

    const submit = async () => {
        console.log(createForm)
        let isValid = true//validate()

        // console.log(isValid)
        if (validate()) {
            try {
                let result = await call.post("pyoldc.pyoldc.doctype.supports.supports.create_support", createForm)
                console.log('submit result', result)


                navigate("/disabledperson/support")
            } catch (error) {
                console.log(error)

            }

        }
    }


    return (
        <div>
            <Tabs >
                <Tab key="ข้อมูลทั่วไป" title="ข้อมูลทั่วไป">
                    <div className="-mt-3">
                        <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                            <p>ข้อมูลความช่วยเหลือ</p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div>
                                    <p>วันที่ได้รับความช่วยเหลือ</p>
                                    <DatePicker variant="bordered" size="sm" showMonthAndYearPickers name="support_date"
                                        isInvalid={!!(error?.support_date)} errorMessage={error?.support_date}
                                        onChange={handleSupportDateChange} />

                                </div>
                                <div>
                                    <p>ปีงบประมาณ (พ.ศ.)</p>
                                    <Input variant="bordered" radius="sm" type="text" placeholder="กรอกปีงบประมาณ" isRequired name="support_budget_year"
                                        isInvalid={!!(error?.support_budget_year)} errorMessage={error?.support_budget_year}
                                        value={createForm.support_budget_year} onChange={(e) => { updateForm('support_budget_year', e.target.value) }} />
                                </div>
                                <div>
                                    <p>ประเภทความช่วยเหลือ</p>
                                    <Select placeholder="กรอกชื่อหน่วยงานที่ดูแล" isRequired name="support_type_name"
                                        isInvalid={!!(error?.support_type_name)} errorMessage={error?.support_type_name}
                                        selectedKeys={[createForm.support_type_name]} onChange={(e) => { updateForm('support_type_name', e.target.value) }}
                                    >
                                        <SelectItem key={"มอบบ้าน"}>
                                            มอบบ้าน
                                        </SelectItem>
                                        <SelectItem key={"ปรับสภาพแวดล้อมที่อยู่อาศัย"}>
                                            ปรับสภาพแวดล้อมที่อยู่อาศัย
                                        </SelectItem>
                                    </Select>
                                </div>
                                <div>
                                    <p>หน่วยงานที่ให้ความช่วยเหลือ</p>
                                    <Input variant="bordered" radius="sm" type="text" placeholder="กรอกหน่วยงานที่ให้ความช่วยเหลือ" isRequired
                                        name="support_giver" isInvalid={!!(error?.support_giver)} errorMessage={error?.support_giver}
                                        value={createForm.support_giver} onChange={(e) => { updateForm('support_giver', e.target.value) }} />
                                </div>
                                <div className="col-span-2">
                                    <p>เลขบัตรประจำตัวผู้พิการ</p>
                                    <Select label="เลขบัตรประจำตัวผู้พิการ" size="sm" isRequired name="support_receiver"
                                        isInvalid={!!(error?.support_receiver)} errorMessage={error?.support_receiver}
                                        selectedKeys={[createForm.support_receiver]}
                                        onChange={(e) => {
                                            const selectedPersonalNumber = e.target.value;
                                            const selectedPerson = disabledPersons.find(d => d.personal_number === selectedPersonalNumber);
                                            if (selectedPerson) {
                                                updateForm('support_receiver', selectedPersonalNumber);
                                                updateForm('support_receiver_name', selectedPerson.firstname);
                                                updateForm('support_receiver_surname', selectedPerson.lastname);
                                            }
                                        }}
                                    >
                                        {disabledPersons?.map((d: IPeople & { personal_number: string }) => (
                                            <SelectItem key={d.personal_number} value={d.personal_number}>
                                                {`${d.personal_number}: ${d.firstname} ${d.lastname}`}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <p>ชื่อผู้พิการ</p>
                                    <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อผู้พิการ" readOnly
                                        name="support_receiver_name" isInvalid={!!(error?.support_receiver_name)} errorMessage={error?.support_receiver_name}
                                        value={createForm.support_receiver_name} />
                                </div>
                                <div>
                                    <p>นามสกุลผู้พิการ</p>
                                    <Input variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุลผู้พิการ" readOnly
                                        name="support_receiver_surname" isInvalid={!!(error?.support_receiver_surname)} errorMessage={error?.support_receiver_surname}
                                        value={createForm.support_receiver_surname} />
                                </div>
                                <div className="col-span-2">
                                    <p>รายละเอียดความช่วยเหลือ</p>
                                    <Textarea variant="bordered" radius="sm" type="textarea" placeholder="กรอกรายละเอียดความช่วยเหลือ"
                                        name="support_detail" isInvalid={!!(error?.support_detail)} errorMessage={error?.support_detail}
                                        value={createForm.support_detail} onChange={(e) => { updateForm('support_detail', e.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab key="หลักฐาน" title="หลักฐาน">
                    <div className="-mt-3">
                        <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                            <p>หลักฐานความช่วยเหลือ</p>
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                {createForm.support_image ? <Image width={300} src={createForm.support_image} />
                                    : <CiImageOn className="bg-gray-200 rounded-l-md px-5 " fontSize='5rem' />}
                                <div className="inline-flex w-full items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 ">
                                    {createForm.support_image ? createForm.support_image : "แทรกหลักฐาน"}
                                </div>
                                <Button onClick={openInputFile} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>
                                <input
                                    type="file"
                                    id="support_image"
                                    onChange={uploadFile}
                                    name="support_image"
                                    ref={inputFile}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
            <div className="flex justify-end">
                <div className="mx-1">
                    <Button onClick={() => navigate('/disabledperson/support')}>
                        ยกเลิก
                    </Button>
                </div>
                <div className="mx-1">
                    <Button className="bg-pink-500 text-white" onClick={submit} >
                        บันทึก
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SupportCreate;
