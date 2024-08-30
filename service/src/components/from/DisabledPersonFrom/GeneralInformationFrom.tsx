import { Button, DatePicker, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { ICenter, IPeople } from "../../../interfaces"
import { useContext, useEffect, useRef, useState } from "react";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { RiDeleteBin2Fill, RiEyeFill } from "react-icons/ri";
import { BiSolidCloudUpload } from "react-icons/bi";

interface FormProps {
    createForm: IPeople;
    updateForm: (key: string, value: string) => void;
}

const GeneralInformationFrom: React.FC<FormProps> = ({ createForm, updateForm }) => {

    const { call } = useContext(FrappeContext) as FrappeConfig
    const fetcher = (url: any) => call.post(url).then((res) => res.message);

    const { data } = useSWR(
        "pyoldc.pyoldc.doctype.disabled_center.disabled_center.get_disabled_center_lsit",
        fetcher
    );
    const [disabledCenter, setDisabledCenter] = useState([])

    useEffect(() => {
        setDisabledCenter(data)
    }, [data])

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
      console.log("Name " + inputName)
      updateForm(inputName, null)
      setIsUploading(false)
  
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
          let fileResponse = response.data.message.file_url
          console.log('response', response)
          updateForm(inputName, fileResponse)
          setIsUploading(false)
  
        })
        .catch(e => console.error(e))
    }

    const siteName = import.meta.env.VITE_FRAPPE_URL ?? window.origin

    return (
        <div>
            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">หน่วยงาน</p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                        <p className="pb-2">หน่วยงานที่ดูแล</p>
                        {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                        <Select isRequired size="sm" placeholder="หน่วยงานที่ดูแล" name="disabled_center"
                            selectedKeys={[createForm.disabled_center]} onChange={(e) => { updateForm('disabled_center', e.target.value) }} >
                            {disabledCenter?.map((c: ICenter & { title: string }) => (
                                <SelectItem key={c.title}>
                                    {c.title}
                                </SelectItem>
                            ))}
                        </Select>
                        {/* </Skeleton> */}
                    </div>
                    <div>
                        <p className="pb-2">สถานะ</p>
                        {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                        <Select placeholder="สถานะ" size="sm" variant="bordered" name="person_status"
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
                        {/* </Skeleton> */}
                    </div>
                </div>
            </section>

            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                <div className="mb-7">
                    <p className="text-xl font-medium">ข้อมูลพื้นฐาน</p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div >
                            <p className="pb-2">เลขบัตรประจำตัวประชาชน</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัตรประจำตัวประชาชน" name="personal_number"
                                value={createForm.personal_number} onChange={(e) => { updateForm('personal_number', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">วัน/เดือน/ปีเกิด</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="date" placeholder="วัน/เดือน/ปีเกิด" name="birthdate"
                                value={createForm.birthdate} onChange={(e) => { updateForm('birthdate', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">ชื่อ</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อ" name="firstname"
                                value={createForm.firstname} onChange={(e) => { updateForm('firstname', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">นามสกุล</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุล" name="lastname"
                                value={createForm.lastname} onChange={(e) => { updateForm('lastname', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">สัญชาติ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสัญชาติ" name="" />
                        </div>
                        <div>
                            <p className="pb-2">ศาสนา</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกศาสนา" name="" />
                        </div>
                        <div>
                            <p className="pb-2">สถานภาพ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสถานภาพ" name="" />
                        </div>
                        <div className="grid gap-4 grid-cols-3 col-span-2">
                            <div>
                                <p className="pb-2">วันออกบัตร</p>
                                {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                                <Input variant="bordered" radius="sm" type="date" placeholder="วัน/เดือน/ปีเกิด" name="card_issue_date"
                                    value={createForm.card_issue_date} onChange={(e) => { updateForm('card_issue_date', e.target.value) }} />
                                {/* </Skeleton> */}
                            </div>
                            <div>
                                <p className="pb-2">วันบัตรหมดอายุ</p>
                                {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                                <Input variant="bordered" radius="sm" type="date" name="card_expired_date"
                                    value={createForm.card_expired_date} onChange={(e) => { updateForm('card_expired_date', e.target.value) }} />
                                {/* </Skeleton> */}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <p className="pb-2">ที่อยู่</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Textarea isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกที่อยู่ตามทะเบียนบ้าน" name="address"
                                value={createForm.address} onChange={(e) => { updateForm('address', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">ประเภทความพิการ</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Select placeholder="ประเภทความพิการ" size="sm" variant="bordered" name="disabled_type"
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
                            {/* </Skeleton> */}
                        </div>
                        <div className="col-span-2">
                            <p className="pb-2">สาเหตุ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสาเหตุ" name="" />
                        </div>
                    </div>
                </div>

                <div className="mb-7">
                    <p className="text-xl font-medium">บัญชีธนาคาร</p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div>
                            <p className="pb-2">เลขบัญชี</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัญชีธนาคาร"
                                name="book_account_number" value={createForm.book_account_number} onChange={(e) => { updateForm('book_account_number', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">ธนาคาร</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อธนาคาร"
                                name="book_account_bank" value={createForm.book_account_bank} onChange={(e) => { updateForm('book_account_bank', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                    </div>
                </div>

                <div className="mb-7">
                    <p className="text-xl font-medium">ข้อมูลผู้ดูแล</p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div>
                            <p className="pb-2">ชื่อผู้ดูแล</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อผู้ดูแล"
                                name="guardian_firstname" value={createForm.guardian_firstname} onChange={(e) => { updateForm('guardian_firstname', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">นามสกุลผู้ดูแล</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุลผู้ดูแล"
                                name="guardian_lastname" value={createForm.guardian_lastname} onChange={(e) => { updateForm('guardian_lastname', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div className="col-span-2">
                            <p className="pb-2">ที่อยู่ผู้ดูแล</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Textarea variant="bordered" radius="sm" type="text" placeholder="กรอกที่อยู่ผู้ดูแล" name="guardian_address"
                                value={createForm.guardian_address} onChange={(e) => { updateForm('guardian_address', e.target.value) }}
                            />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">เลขบัญชีผู้ดูแล</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกเลขบัญชีผู้ดูแล"
                                name="guardian_account_number" value={createForm.guardian_account_number} onChange={(e) => { updateForm('guardian_account_number', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                        <div>
                            <p className="pb-2">ธนาคารของผู้ดูแล</p>
                            {/* <Skeleton isLoaded={!loading} className="rounded-lg w-full"> */}
                            <Input variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อธนาคารผู้ดูแล"
                                name="guardian_account_bank" value={createForm.guardian_account_bank} onChange={(e) => { updateForm('guardian_account_bank', e.target.value) }} />
                            {/* </Skeleton> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt 9 bg-white">
                <p className="text-xl font-medium">สำเนาเอกสาร</p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                        <p className="pb-2">สำเนาบัตรประจำตัวประชาชนผู้พิการ</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.disabled_card ? createForm.disabled_card : "สำเนาบัตรประจำตัวประชาชนผู้พิการ"}
                                </div>
                                {createForm.disabled_card ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                {createForm.disabled_card ? <Button isLoading={isUploading} onClick={() => clearImage('disabled_card')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                    : <Button isLoading={isUploading} onClick={() => openInputFile('disabledCard')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}

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
                        <p className="pb-2">สำเนาทะเบียนบ้านผู้พิการ</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.disabled_house_register ? createForm.disabled_house_register : "สำเนาทะเบียนบ้านผู้พิการ"}
                                </div>
                                {createForm.disabled_house_register ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                {createForm.disabled_house_register ? <Button isLoading={isUploading} onClick={() => clearImage('disabled_house_register')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                    : <Button isLoading={isUploading} onClick={() => openInputFile('disabledHouseRegister')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
                        <p className="pb-2">สำเนาสมุดบัญชีเงินฝากผู้พิการ</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.disabled_book_account ? createForm.disabled_book_account : "สำเนาสมุดบัญชีเงินฝากผู้พิการ"}
                                </div>
                                {createForm.disabled_book_account ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                {createForm.disabled_book_account ? <Button isLoading={isUploading} onClick={() => clearImage('disabled_book_account')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                    : <Button isLoading={isUploading} onClick={() => openInputFile('disabledBookAccount')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
                        <p className="pb-2">สำเนาบัตรประจำตัวประชาชนผู้ดูแล</p>
                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.guardian_card ? createForm.guardian_card : "สำเนาบัตรประจำตัวประชาชนผู้ดูแล"}
                                </div>
                                {createForm.guardian_card ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                {createForm.guardian_card ? <Button isLoading={isUploading} onClick={() => clearImage('guardian_card')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                    : <Button isLoading={isUploading} onClick={() => openInputFile('guardianCard')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
                        <p className="pb-2">สำเนาสมุดบัญชีเงินฝากพร้อมสำเนาของผู้ดูแลโดยชอบธรรม</p>                                        <div >
                            <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                <div className="block w-full  appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                                    {createForm.guardian_book_account ? createForm.guardian_book_account : "สำเนาสมุดบัญชีเงินฝากผู้ดูแล"}
                                </div>
                                {createForm.guardian_book_account ? <Button isLoading={isUploading} onClick={() => { window.open(`${siteName}/${createForm.disabled_card}`) }} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 " ><RiEyeFill /> </Button> : ''}
                                {createForm.guardian_book_account ? <Button isLoading={isUploading} onClick={() => clearImage('guardian_book_account')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><RiDeleteBin2Fill className="text-red-500" fontSize="1.3rem" /></Button>
                                    : <Button isLoading={isUploading} onClick={() => openInputFile('guardianBookAccount')} className="h- inline-flex w-auto items-center justify-center rounded-r rounded-l border border-gray-200 bg-white px-3 py-2  text-gray-800 hover:border-gray-300 hover:bg-gray-100 "><BiSolidCloudUpload fontSize="1.3rem" /></Button>}
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
            </section>

            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">รายได้/อาชีพ</p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div >
                        <p className="pb-2">รายได้</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกรายได้ต่อเดือน" name="" />

                    </div>
                    <div>
                        <p className="pb-2">อาชีพ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกอาชีพ" name="" />

                    </div>
                    <div>
                        <p className="pb-2">ข้อมูลการกู้ยืมเงินเพื่อประกอบอาชีพ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูลการกู้(ยืมถ้ามี)" name="" />
                    </div>
                    <div>
                        <p className="pb-2">หนี้สินในครัวเรือน</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูลหนี้สินในครัวเรือน(ถ้ามี)" name="" />
                    </div>
                    <div className="col-span-2">
                        <p>ความต้องการในการพัฒนาศักยภาพ</p>
                        <Textarea isRequired variant="bordered" radius="sm" type="text" placeholder="ความต้องการในการพัฒนาศักยภาพ" name="" />
                    </div>
                </div>
            </section>

            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">การศึกษา</p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div >
                        <p className="pb-2">การศึกษา</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูล" name="" />

                    </div>
                    <div>
                        <p className="pb-2">สถานศึกษา</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อสถานศึกษา" name="" />
                    </div>
                </div>
            </section>

            <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                <p className="text-xl font-medium">ข้อมูลครอบครัว</p>
                <div>
                    <p className="mt-2">บิดา</p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div >
                            <p className="pb-2">ชื่อ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">นามสกุล</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุล" name="" />
                        </div>
                        <div >
                            <p className="pb-2">สัญชาติ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสัญชาติ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">ศาสนา</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกศาสนา" name="" />
                        </div>
                        <div >
                            <p className="pb-2">สถานภาพ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสถานภาพ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">วันเดือนปีเกิด</p>
                            <DatePicker isRequired variant="bordered" size="sm" showMonthAndYearPickers name="" />
                        </div>
                        <div >
                            <p className="pb-2">อาชีพ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกอาชีพ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">หนี้ครัวเรือน</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกหนี้สินในครัวเรือน" name="" />
                        </div>
                        <div >
                            <p className="pb-2">กรรมสิทธิ์ในที่ดิน</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูลกรรมสิทธิ์ที่ดิน(ถ้ามี)" name="" />

                        </div>
                        <div>
                            <p className="pb-2">สวัสดิการที่ได้รับ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูลสวัสดิการที่ได้รับ" name="" />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mt-2">มารดา</p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div >
                            <p className="pb-2">ชื่อ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกชื่อ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">นามสกุล</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกนามสกุล" name="" />
                        </div>
                        <div >
                            <p className="pb-2">สัญชาติ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสัญชาติ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">ศาสนา</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกศาสนา" name="" />
                        </div>
                        <div >
                            <p className="pb-2">สถานภาพ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกสถานภาพ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">วันเดือนปีเกิด</p>
                            <DatePicker isRequired variant="bordered" size="sm" showMonthAndYearPickers name="" />
                        </div>
                        <div >
                            <p className="pb-2">อาชีพ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกอาชีพ" name="" />

                        </div>
                        <div>
                            <p className="pb-2">หนี้ครัวเรือน</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกหนี้สินในครัวเรือน" name="" />
                        </div>
                        <div >
                            <p className="pb-2">กรรมสิทธิ์ในที่ดิน</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูลกรรมสิทธิ์ที่ดิน(ถ้ามี)" name="" />

                        </div>
                        <div>
                            <p className="pb-2">สวัสดิการที่ได้รับ</p>
                            <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรอกข้อมูลสวัสดิการที่ได้รับ" name="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}

export default GeneralInformationFrom
