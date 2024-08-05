import { Input, Select, SelectItem, Button, Tabs, Tab, Skeleton } from "@nextui-org/react"
import { ICenter, IPeople } from "../../interfaces";
import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { useAlertContext } from "../../providers/AlertProvider";
import Map from "../../components/disabledPersonMap/DisabledPersonmap";
import { BiSolidCloudUpload } from "react-icons/bi";
import { RiDeleteBin2Fill, RiEyeFill } from "react-icons/ri";


function DisabledPersonEdit() {

    const { call } = useContext(FrappeContext) as FrappeConfig
    const navigate = useNavigate()
    const params = useParams()
    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const loadDisabledPeople = async () => {
        let response = await call.get("pyoldc.pyoldc.doctype.disabled_person.disabled_person.get_disabled_person_by_personal_number", {
            personal_number: params.id
        })
        let disabledPeople: IPeople = response.message

        setCreateForm(disabledPeople)
        console.log(disabledPeople)
        return disabledPeople
    }

    const [createForm, setCreateForm] = useState({
        disabled_card: "",
        disabled_house_register: "",
        disabled_book_account: "",
        guardian_card: "",
        guardian_book_account: "",
    } as IPeople)

    const { data } = useSWR(
        "pyoldc.pyoldc.doctype.disabled_center.disabled_center.get_disabled_center_lsit",
        fetcher
    );
    const [disabledCenter, setDisabledCenter] = useState([])

    useEffect(() => {
        setIsLoading(true)
        setDisabledCenter(data)
        loadDisabledPeople().then(() => {
            setIsLoading(false)

        })

    }, [data])

    const updateForm = (key: string, value: string) => {
        setCreateForm({
            ...createForm,
            [key]: value
        })

    }

    const handlePositionChange = (newPosition) => {
        updateForm('geojson_position', JSON.stringify(newPosition));
    }

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

    const [isUploading, setIsUploading] = useState(false)
    const clearImage = async (e: any) => {
        setIsUploading(true)
        let inputName = e
        console.log("inputName " + inputName)
        call.post("pyoldc.pyoldc.doctype.disabled_person.disabled_person.clear_image", {
            'disabled_person': createForm,
            'inputName': inputName
        }).then(() => {
            loadDisabledPeople().then(() => setIsLoading(false))
            setIsUploading(false)
        })
    }

    const uploadFile = async (e: any) => {
        setIsUploading(true)
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
                let fileResponse = response.data.message
                console.log(response)
                call.post("pyoldc.pyoldc.doctype.disabled_person.disabled_person.upload_image", {
                    'fileresponse': fileResponse,
                    'disabled_person': createForm,
                    'inputName': inputName
                }).then(() => {
                    loadDisabledPeople().then(() => setIsLoading(false))
                    setIsUploading(false)
                }).catch(e => alert.showError(JSON.stringify(e)))
            })
            .catch(e => console.error(e))
    }
    const siteName = import.meta.env.VITE_FRAPPE_URL ?? window.origin

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

    const alert = useAlertContext()
    const [loading, setIsLoading] = useState(true)
    const submit = async () => {
        console.log(createForm)
        // let isValid = true
        setIsLoading(true)
        if (validate()) {
            try {
                console.log(createForm)
                let result = await call.put("pyoldc.pyoldc.doctype.disabled_person.disabled_person.update_disabled_person", {
                    'disabled_person': createForm
                })
                console.log('submit result', result)
                setCreateForm(result.message)

            } catch (error) {
                console.log(error)
                alert.showError(JSON.stringify(error))
            }

        }
        setIsLoading(false)
    }


    return (
        <div>
            <div className="flex justify-between py-2">
                <div>
                    <p>หน่วยงาน</p>
                </div>
            </div>
            <Tabs aria-label="Options">
                <Tab key="ข้อมูลทั่วไป" title="ข้อมูลทั่วไป">
                    <div className="w-full -mt-3">
                        <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                            <p>หน่วยงาน</p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div>
                                    <p>หน่วยงานที่ดูแล</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Select isRequired size="sm" placeholder="หน่วยงานที่ดูแล" name="disabled_center"
                                            isInvalid={!!(error?.disabled_center)} errorMessage={error?.disabled_center}
                                            selectedKeys={[createForm.disabled_center]} onChange={(e) => { updateForm('disabled_center', e.target.value) }} >
                                            {disabledCenter?.map((c: ICenter & { title: string }) => (
                                                <SelectItem key={c.title}>
                                                    {c.title}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>สถานะ</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Select placeholder="สถานะ" size="sm" variant="bordered" name="person_status"
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
                                    </Skeleton>
                                </div>
                            </div>
                        </div>

                        <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                            <p>ข้อมูลพื้นฐาน</p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div >
                                    <p>เลขบัตรประจำตัวประชาชน</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัตรประจำตัวประชาชน" name="personal_number"
                                            isInvalid={!!(error?.personal_number)} errorMessage={error?.personal_number}
                                            value={createForm.personal_number} onChange={(e) => { updateForm('personal_number', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>วัน/เดือน/ปีเกิด</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="date" placeholder="วัน/เดือน/ปีเกิด" name="birthdate"
                                            isInvalid={!!(error?.birthdate)} errorMessage={error?.birthdate}
                                            value={createForm.birthdate} onChange={(e) => { updateForm('birthdate', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>ชื่อ</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อ" name="firstname"
                                            isInvalid={!!(error?.firstname)} errorMessage={error?.firstname}
                                            value={createForm.firstname} onChange={(e) => { updateForm('firstname', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>นามสกุล</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุล" name="lastname"
                                            isInvalid={!!(error?.lastname)} errorMessage={error?.lastname}
                                            value={createForm.lastname} onChange={(e) => { updateForm('lastname', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div className="grid gap-4 grid-cols-3 col-span-2">
                                    <div>
                                        <p>วันออกบัตร</p>
                                        <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                            <Input variant="bordered" radius="sm" type="date" placeholder="วัน/เดือน/ปีเกิด" name="card_issue_date"
                                                value={createForm.card_issue_date} onChange={(e) => { updateForm('card_issue_date', e.target.value) }} />
                                        </Skeleton>
                                    </div>
                                    <div>
                                        <p>วันบัตรหมดอายุ</p>
                                        <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                            <Input variant="bordered" radius="sm" type="date" name="card_expired_date"
                                                value={createForm.card_expired_date} onChange={(e) => { updateForm('card_expired_date', e.target.value) }} />
                                        </Skeleton>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <p>ที่อยู่</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกที่อยู่" name="address"
                                            isInvalid={!!(error?.address)} errorMessage={error?.address}
                                            value={createForm.address} onChange={(e) => { updateForm('address', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>ประเภทความพิการ</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Select placeholder="ประเภทความพิการ" size="sm" variant="bordered" name="disabled_type"
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
                                    </Skeleton>
                                </div>
                            </div>
                        </div>

                        <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                            <p>เลขบัญชี</p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div>
                                    <p>เลขบัญชี</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัญชี"
                                            name="book_account_number" value={createForm.book_account_number} onChange={(e) => { updateForm('book_account_number', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>ธนาคาร</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อธนาคาร"
                                            name="book_account_bank" value={createForm.book_account_bank} onChange={(e) => { updateForm('book_account_bank', e.target.value) }} />
                                    </Skeleton>
                                </div>
                            </div>
                        </div>

                        <div className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                            <p>ผู้ดูแล</p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div>
                                    <p>ชื่อผู้ดูแล</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อผู้ดูแล"
                                            name="guardian_firstname" value={createForm.guardian_firstname} onChange={(e) => { updateForm('guardian_firstname', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>นามสกุลผู้ดูแล</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุลผู้ดูแล"
                                            name="guardian_lastname" value={createForm.guardian_lastname} onChange={(e) => { updateForm('guardian_lastname', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div className="col-span-2">
                                    <p>ที่อยู่ผู้ดูแล</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกที่อยู่"
                                            name="guardian_address" value={createForm.guardian_address} onChange={(e) => { updateForm('guardian_address', e.target.value) }}
                                        />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>เลขบัญชีผู้ดูแล</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัญชีผู้ดูแล"
                                            name="guardian_account_number" value={createForm.guardian_account_number} onChange={(e) => { updateForm('guardian_account_number', e.target.value) }} />
                                    </Skeleton>
                                </div>
                                <div>
                                    <p>ธนาคารของผู้ดูแล</p>
                                    <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                                        <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อธนาคารผู้ดูแล"
                                            name="guardian_account_bank" value={createForm.guardian_account_bank} onChange={(e) => { updateForm('guardian_account_bank', e.target.value) }} />
                                    </Skeleton>
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
                                            {createForm.disabled_card ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                            {createForm.disabled_card ? <Button isLoading={isUploading} onClick={() => clearImage('disabled_card')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                                : <Button isLoading={isUploading} onClick={() => openInputFile('disabledCard')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}

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
                                            {createForm.disabled_house_register ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                            {createForm.disabled_house_register ? <Button isLoading={isUploading} onClick={() => clearImage('disabled_house_register')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                                : <Button isLoading={isUploading} onClick={() => openInputFile('disabledHouseRegister')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
                                            {createForm.disabled_book_account ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                            {createForm.disabled_book_account ? <Button isLoading={isUploading} onClick={() => clearImage('disabled_book_account')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                                : <Button isLoading={isUploading} onClick={() => openInputFile('disabledBookAccount')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
                                            {createForm.guardian_card ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                            {createForm.guardian_card ? <Button isLoading={isUploading} onClick={() => clearImage('guardian_card')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                                : <Button isLoading={isUploading} onClick={() => openInputFile('guardianCard')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
                                            {createForm.guardian_book_account ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                            {createForm.guardian_book_account ? <Button isLoading={isUploading} onClick={() => clearImage('guardian_book_account')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                                : <Button isLoading={isUploading} onClick={() => openInputFile('guardianBookAccount')} className="inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
                    </div>
                </Tab>
                <Tab key="แผนที่" title="แผนที่">
                    <Map data={createForm} onPositionChange={handlePositionChange} />
                </Tab>
            </Tabs>
            <div className="flex justify-end">
                <div className="mx-1">
                    <Button isLoading={loading} onClick={() => navigate('/disabledperson')}>
                        ยกเลิก
                    </Button>
                </div>
                <div className="mx-1">
                    <Button className="bg-pink-500 text-white" isLoading={loading} onClick={submit}>
                        บันทึก
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default DisabledPersonEdit;
