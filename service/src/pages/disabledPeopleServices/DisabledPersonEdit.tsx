import { Button, Breadcrumbs, BreadcrumbItem, } from "@nextui-org/react"
import { IPeople } from "../../interfaces";
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FrappeConfig, FrappeContext } from "frappe-react-sdk";
import { useAlertContext } from "../../providers/AlertProvider";
import DisabledPersonFrom from "../../components/from/DisabledPersonFrom";


function DisabledPersonEdit() {

    const { call } = useContext(FrappeContext) as FrappeConfig

    const params = useParams()

    const loadDisabledPeople = async () => {
        let response = await call.get("pyoldc.pyoldc.doctype.disabled_person.disabled_person.get_disabled_person_by_personal_number", {
            personal_number: params.id
        })
        let disabledPeople: IPeople = response.message

        setCreateForm(disabledPeople)
        console.log(disabledPeople)
        return disabledPeople
    }

    const [createForm, setCreateForm] = useState({} as IPeople)


    useEffect(() => {
        setIsLoading(true)
        loadDisabledPeople().then(() => {
            setIsLoading(false)

        })

    }, [])

    const updateForm = (key: string, value: string) => {
        setCreateForm({
            ...createForm,
            [key]: value
        })

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

    const navigate = useNavigate()
    const alert = useAlertContext()
    const [loading, setIsLoading] = useState(true)
    const submit = async () => {
        console.log(createForm)
        let isValid = true
        //validate()
        setIsLoading(true)

        if (isValid) {
            try {
                console.log(createForm)
                let result = await call.put("pyoldc.pyoldc.doctype.disabled_person.disabled_person.update_disabled_person", {
                    'disabled_person': createForm
                })
                console.log('submit result', result)
                setCreateForm(result.message)

                loadDisabledPeople().then(() => setIsLoading(false))
                window.scrollTo({ top: 0, behavior: 'smooth' });

            } catch (error) {
                console.log("error", error)
                alert.showError(JSON.stringify(error))
            }

        }
        setIsLoading(false)
    }


    return (
        <div className="px-5 mt-5">
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem onClick={() => { navigate(`/`) }}>หน้าหลัก</BreadcrumbItem>
                <BreadcrumbItem onClick={() => { navigate(`/disabledPerson`) }}>ข้อมูลผู้พิการ</BreadcrumbItem>
                <BreadcrumbItem>แก้ไขข้อมูลผู้พิการ</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mb-1">
                <p className="mb-2 text-2xl font-medium">ข้อมูลทั่วไป</p>
                <p className="text-gray-500">ข้อมูลทั้งหมดของคุณ {createForm.firstname} {createForm.lastname} </p>
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
                </div>
            </div>
        </div >
    )
}

export default DisabledPersonEdit;
