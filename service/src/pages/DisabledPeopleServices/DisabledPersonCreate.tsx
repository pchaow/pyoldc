import { Input, Select, SelectItem, DatePicker, Button, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, } from "@nextui-org/react"
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk"
import { useContext, useEffect, useRef, useState } from "react"
import { ICenter, IPeople } from "../../interfaces"
import { useNavigate } from "react-router-dom"
import { Key } from "@react-types/shared";
import { BiSolidCloudUpload } from "react-icons/bi"


function DisabledPersonCreate() {

    const { call } = useContext(FrappeContext) as FrappeConfig
    const navigate = useNavigate()
    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const [createForm, setCreateForm] = useState({
        book_account_bank: "",
        book_account_number: "",
        guardian_firstname: "",
        guardian_lastname: "",
        guardian_account_bank: "",
        guardian_account_number: "",
        guardian_address: "",
        expired_in_days: 0,
        disabled_book_account: "",
        disabled_card: "",
        disabled_house_register: "",
        guardian_book_account: "",
        guardian_card: "",
    } as IPeople)

    const updateForm = (key: string, value: Key) => {
        console.log('updateform', key, value)
        setCreateForm({
            ...createForm,
            [key]: value
        })
    }

    const { data } = useSWR(
        "pyoldc.pyoldc.doctype.disabled_center.disabled_center.get_disabled_center_lsit",
        fetcher
    );
    const [disabledCenter, setDisabledCenter] = useState([])

    useEffect(() => {
        setDisabledCenter(data)
    }, [data])

    const handleBirthdateChange = (date) => {
        updateForm('birthdate', `${date.year}-${date.month}-${date.day}`);
    };

    const handleCardIssueDateChange = (date) => {
        updateForm('card_issue_date', `${date.year}-${date.month}-${date.day}`);
    };

    const handleCardExpiredDateChange = (date) => {
        updateForm('card_expired_date', `${date.year}-${date.month}-${date.day}`);
    };

    const { file } = useContext(FrappeContext) as FrappeConfig

    const inputRefs = {
        disabledCard: useRef<HTMLInputElement>(null),
        disabledHouseRegister: useRef<HTMLInputElement>(null),
        disabledBookAccount: useRef<HTMLInputElement>(null),
        guardianCard: useRef<HTMLInputElement>(null),
        guardianBookAccount: useRef<HTMLInputElement>(null)
    };

    const openInputFile = (inputName: keyof typeof inputRefs) => {
        inputRefs[inputName]?.current?.click();
    };

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

    const [error, setError] = useState({} as IPeople);

    const validate = () => {
        let err = {} as IPeople;
        let hasError = false;
        if (!createForm.disabled_center) {
            err.disabled_center = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.person_status) {
            err.person_status = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.personal_number) {
            err.personal_number = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.birthdate) {
            err.birthdate = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.firstname) {
            err.firstname = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.lastname) {
            err.lastname = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.address) {
            err.address = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        if (!createForm.disabled_type) {
            err.disabled_type = "กรุณากรอกข้อมูล";
            hasError = true;
        }
        setError(err);
        return !hasError;
    }

    const submit = async () => {
        console.log(createForm)
        let isValid = true//validate()

        console.log(isValid)
        if (validate()) {
            try {
                let result = await call.post("pyoldc.pyoldc.doctype.disabled_person.disabled_person.create_disabled_person", createForm)
                console.log('submit result', result)

                navigate("/disabledperson")
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div>
            <p>ลงทะเบียนผู้พิการ</p>
            <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p>หน่วยงาน</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                        <p>หน่วยงานที่ดูแล</p>
                        <Select isRequired size="sm" placeholder="หน่วยงานที่ดูแล" name="disabled_center"
                            isInvalid={!!(error?.disabled_center)} errorMessage={error?.disabled_center}
                            onChange={(e) => { updateForm('disabled_center', e.target.value) }} >
                            {disabledCenter?.map((c: ICenter & { title: string }) => (
                                <SelectItem key={c.title}>
                                    {c.title}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <p>สถานะ</p>
                        <Select isRequired placeholder="สถานะ" size="sm" name="person_status"
                            isInvalid={!!(error?.person_status)} errorMessage={error?.person_status}
                            selectedKeys={[createForm.person_status]} onChange={(e) => { updateForm('person_status', e.target.value) }} >
                            <SelectItem key={"ปกติ"}>
                                ปกติ
                            </SelectItem>
                            <SelectItem key={"ไม่มีบัตรคนพิการ"}>
                                ไม่มีบัตรคนพิการ
                            </SelectItem>
                            <SelectItem key={"ตาย"}>
                                ตาย
                            </SelectItem>
                            <SelectItem key={"หายสาบสูญ"}>
                                หายสาบสูญ
                            </SelectItem>
                            <SelectItem key={"ย้ายออก"}>
                                ย้ายออก
                            </SelectItem>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                <p>ข้อมูลพื้นฐาน</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div >
                        <p>เลขบัตรประจำตัวประชาชน</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัตรประจำตัวประชาชน" name="personal_number"
                            isInvalid={!!(error?.personal_number)} errorMessage={error?.personal_number}
                            value={createForm.personal_number} onChange={(e) => { updateForm('personal_number', e.target.value) }}
                        />

                    </div>
                    <div>
                        <p>วัน/เดือน/ปีเกิด</p>
                        <DatePicker isRequired variant="bordered" size="sm" showMonthAndYearPickers name="birthdate"
                            isInvalid={!!(error?.birthdate)} errorMessage={error?.birthdate}
                            onChange={handleBirthdateChange} />
                    </div>
                    <div>
                        <p>ชื่อ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อ" name="firstname"
                            isInvalid={!!(error?.firstname)} errorMessage={error?.firstname}
                            value={createForm.firstname} onChange={(e) => { updateForm('firstname', e.target.value) }} />
                    </div>
                    <div>
                        <p>นามสกุล</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุล" name="lastname"
                            isInvalid={!!(error?.lastname)} errorMessage={error?.lastname}
                            value={createForm.lastname} onChange={(e) => { updateForm('lastname', e.target.value) }} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 col-span-2">
                        <div>
                            <p>วันออกบัตร</p>
                            <DatePicker isRequired variant="bordered" size="sm" showMonthAndYearPickers name="card_issue_date"
                                onChange={handleCardIssueDateChange} />
                        </div>
                        <div>
                            <p>วันบัตรหมดอายุ</p>
                            <DatePicker isRequired variant="bordered" size="sm" showMonthAndYearPickers name="card_expired_date"
                                onChange={handleCardExpiredDateChange} />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <p>ที่อยู่</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกที่อยู่" name="address"
                            isInvalid={!!(error?.address)} errorMessage={error?.address}
                            value={createForm.address} onChange={(e) => { updateForm('address', e.target.value) }} />
                    </div>
                    <div>
                        <p>ประเภทความพิการ</p>
                        <Select isRequired placeholder="ประเภทความพิการ" size="sm" name="disabled_type"
                            isInvalid={!!(error?.disabled_type)} errorMessage={error?.disabled_type}
                            selectedKeys={[createForm.disabled_type]} onChange={(e) => { updateForm('disabled_type', e.target.value) }} >
                            <SelectItem key={"1. พิการทางการเห็น"}>
                                1. พิการทางการเห็น
                            </SelectItem>
                            <SelectItem key={"2. พิการทางการได้ยินหรือสื่อความหมาย"}>
                                2. พิการทางการได้ยินหรือสื่อความหมาย
                            </SelectItem>
                            <SelectItem key={"3. พิการทางการเคลื่อนไหวหรือทางร่างกาย"}>
                                3. พิการทางการเคลื่อนไหวหรือทางร่างกาย
                            </SelectItem>
                            <SelectItem key={"4. พิการจิตใจหรือพฤติกรรม"}>
                                4. พิการจิตใจหรือพฤติกรรม
                            </SelectItem>
                            <SelectItem key={"5. พิการทางสติปัญญา"}>
                                5. พิการทางสติปัญญา
                            </SelectItem>
                            <SelectItem key={"6. พิการทางการเรียนรู้"}>
                                6. พิการทางการเรียนรู้
                            </SelectItem>
                            <SelectItem key={"7. พิการทางการออทิสติก"}>
                                7. พิการทางการออทิสติก
                            </SelectItem>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                <p>เลขบัญชี</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                        <p>เลขบัญชี</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัญชี"
                            name="book_account_number" value={createForm.book_account_number} onChange={(e) => { updateForm('book_account_number', e.target.value) }} />
                    </div>
                    <div>
                        <p>ธนาคาร</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อธนาคาร"
                            name="book_account_bank" value={createForm.book_account_bank} onChange={(e) => { updateForm('book_account_bank', e.target.value) }} />
                    </div>
                </div>
            </div>

            <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                <p>ผู้ดูแล</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                        <p>ชื่อผู้ดูแล</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อผู้ดูแล"
                            name="guardian_firstname" value={createForm.guardian_firstname} onChange={(e) => { updateForm('guardian_firstname', e.target.value) }} />
                    </div>
                    <div>
                        <p>นามสกุลผู้ดูแล</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุลผู้ดูแล"
                            name="guardian_lastname" value={createForm.guardian_lastname} onChange={(e) => { updateForm('guardian_lastname', e.target.value) }} />
                    </div>
                    <div className="col-span-2">
                        <p>ที่อยู่ผู้ดูแล</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกที่อยู่"
                            name="guardian_address" value={createForm.guardian_address} onChange={(e) => { updateForm('guardian_address', e.target.value) }}
                        />
                    </div>
                    <div>
                        <p>เลขบัญชีผู้ดูแล</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัญชีผู้ดูแล"
                            name="guardian_account_number" value={createForm.guardian_account_number} onChange={(e) => { updateForm('guardian_account_number', e.target.value) }} />
                    </div>
                    <div>
                        <p>ธนาคารของผู้ดูแล</p>
                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อธนาคารผู้ดูแล"
                            name="guardian_account_bank" value={createForm.guardian_account_bank} onChange={(e) => { updateForm('guardian_account_bank', e.target.value) }} />
                    </div>
                </div>
            </div>

            <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                <p>หลักฐาน</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                        <p>สำเนาบัตรคนพิการ</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.disabled_card ? createForm.disabled_card : "แทรกหลักฐาน"}
                                </div>
                                <Button onClick={() => openInputFile('disabledCard')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>
                                <input
                                    type="file"
                                    id="disabled_card"
                                    onChange={uploadFile}
                                    name="disabled_card"
                                    ref={inputRefs.disabledCard}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>สำเนาทะเบียนบ้าน</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.disabled_house_register ? createForm.disabled_house_register : "แทรกหลักฐาน"}
                                </div>
                                <Button onClick={() => openInputFile('disabledHouseRegister')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>
                                <input
                                    type="file"
                                    id="disabled_house_register"
                                    onChange={uploadFile}
                                    name="disabled_house_register"
                                    ref={inputRefs.disabledHouseRegister}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>สมุดบัญชีเงินฝากพร้อมสำเนา</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.disabled_book_account ? createForm.disabled_book_account : "แทรกหลักฐาน"}
                                </div>
                                <Button onClick={() => openInputFile('disabledBookAccount')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>
                                <input
                                    type="file"
                                    id="disabled_book_account"
                                    onChange={uploadFile}
                                    name="disabled_book_account"
                                    ref={inputRefs.disabledBookAccount}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>บัตรประจำตัวประชาชนผู้ดูแล</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.guardian_card ? createForm.guardian_card : "แทรกหลักฐาน"}
                                </div>
                                <Button onClick={() => openInputFile('guardianCard')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>
                                <input
                                    type="file"
                                    id="guardian_card"
                                    onChange={uploadFile}
                                    name="guardian_card"
                                    ref={inputRefs.guardianCard}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>สมุดบัญชีเงินฝากธนาคารพร้อมสำเนาของผู้ดูแลคนพิการ ผู้แทนโดยชอบธรรม</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.guardian_book_account ? createForm.guardian_book_account : "แทรกหลักฐาน"}
                                </div>
                                <Button onClick={() => openInputFile('guardianBookAccount')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>
                                <input
                                    type="file"
                                    id="guardian_book_account"
                                    onChange={uploadFile}
                                    name="guardian_book_account"
                                    ref={inputRefs.guardianBookAccount}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <div className="mx-1">
                    <Button onClick={() => navigate('/disabledperson')}>
                        ยกเลิก
                    </Button>
                </div>
                <div className="mx-1">
                    <Button className="bg-pink-500 text-white" onClick={submit}>
                        บันทึก
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default DisabledPersonCreate;
