import { useNavigate, useParams } from "react-router-dom";
import { IPeople } from "../../../../interfaces";
import { useContext, useEffect, useState } from "react";
import { FrappeConfig, FrappeContext } from "frappe-react-sdk";
import { useAlertContext } from "../../../../providers/AlertProvider";
import { BreadcrumbItem, Breadcrumbs, Button, Tab, Tabs } from "@nextui-org/react";
import HealthFrom from "../../../../components/from/disabledPersonFrom/HealthFrom";

function DisabledPersomDataHealthFrom() {
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
                <BreadcrumbItem onClick={() => { navigate(`/disabledPerson`) }}>ข้อมูลผู้พิการทั้งหมด</BreadcrumbItem>
                <BreadcrumbItem onClick={() => { navigate(`/disabledPerson/data/${createForm.personal_number}`) }}>ข้อมูลผู้พิการ</BreadcrumbItem>
                <BreadcrumbItem>สุภาพ / สวัสดิการ</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mb-1">
                <p className="mb-2 text-2xl font-medium">ข้อมูลสุภาพและสวัสดิการ</p>
                <p className="text-gray-500">ข้อมูลสุภาพและสวัสดิการทั้งหมดของคุณ {createForm.firstname} {createForm.lastname} </p>
            </div>
            <div className="flex justify-center">
                <div className="md:max-w-[80.5%] lg:max-w-[62.5%] w-full">
                    <HealthFrom />
                </div>
            </div>
        </div >

    )
}

export default DisabledPersomDataHealthFrom;
