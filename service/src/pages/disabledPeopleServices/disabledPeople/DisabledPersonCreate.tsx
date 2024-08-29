import { Button, Breadcrumbs, BreadcrumbItem, Skeleton, } from "@nextui-org/react"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import { useContext, useEffect, useState } from "react"
import { IPeople } from "../../../interfaces"
import { useNavigate } from "react-router-dom"
import { Key } from "@react-types/shared";
import DisabledPersonFrom from "../../../components/from/DisabledPersonFrom"


function DisabledPersonCreate() {

    const { call } = useContext(FrappeContext) as FrappeConfig

    const [createForm, setCreateForm] = useState({
        disabled_center: "",
        card_expired_date: "",
        card_issue_date: "",
        book_account_bank: "",
        book_account_number: "",
        guardian_firstname: "",
        guardian_lastname: "",
        guardian_account_bank: "",
        guardian_account_number: "",
        guardian_address: "",
        disabled_card: "",
        disabled_house_register: "",
        disabled_book_account: "",
        guardian_card: "",
        guardian_book_account: "",
    } as IPeople)

    const updateForm = (key: string, value: Key) => {
        console.log('updateform', key, value)
        setCreateForm({
            ...createForm,
            [key]: value
        })
    }

    const [loading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(false)
    }, []
    )

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


    const navigate = useNavigate()
    const submit = async () => {
        console.log(createForm)
        let isValid = true

        //validate()
        if (isValid) {
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
        <div className="px-5 mt-5">
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem onClick={() => { navigate(`/`) }}>หน้าหลัก</BreadcrumbItem>
                <BreadcrumbItem onClick={() => { navigate(`/disabledPerson`) }}>ข้อมูลผู้พิการ</BreadcrumbItem>
                <BreadcrumbItem>ลงทะเบียนผู้พิการ</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mb-1">
                <p className="mb-2 text-2xl font-medium">ลงทะเบียนผู้พิการ</p>
                <p className="text-gray-500">ลงทะเบียนผู้พิการ</p>
            </div>

            <DisabledPersonFrom
                createForm={createForm}
                loading={loading}
                updateForm={updateForm}
            />

            <div className="flex justify-center">
                <div className="max-w-[62.5%] w-full">
                    <div className="flex justify-end mr-3">
                        <div className="mx-1">
                            <Button onClick={() => navigate('/disabledperson')}>
                                ยกเลิก
                            </Button>
                        </div>
                        <div className="mx-1">
                            <Button className="bg-pink-500 text-white" onClick={submit}>
                                ถัดไป
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisabledPersonCreate;
