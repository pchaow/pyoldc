import { Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { ISupports } from "../../interfaces";
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FrappeConfig, FrappeContext } from "frappe-react-sdk";
import { useAlertContext } from "../../providers/AlertProvider";
import DisabledPersonSupporFrom from "../../components/from/DisabledPersonSupporFrom";


function SupportEdit() {

    const { call } = useContext(FrappeContext) as FrappeConfig

    const params = useParams()

    const [createForm, setCreateForm] = useState({} as ISupports)

    const loadSupports = async () => {
        let response = await call.post("pyoldc.pyoldc.doctype.supports.supports.get_supports_by_name", {
            name: params.id
        })
        let supports: ISupports = response.message

        setCreateForm(supports)
        console.log(supports)
        return supports
    }

    useEffect(() => {
        loadSupports().then(() => {
            setIsLoading(false)

        })

    }, [])

    const updateForm = (key: string, value: string) => {
        setCreateForm({
            ...createForm,
            [key]: value
        })
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

    const navigate = useNavigate()
    const alert = useAlertContext()
    const [loading, setIsLoading] = useState(true)
    const submit = async () => {
        let isValid = true
        //validate()
        setIsLoading(true)

        if (isValid) {
            try {
                console.log(createForm)
                let result = await call.post("pyoldc.pyoldc.doctype.supports.supports.update_support", {
                    'name': createForm
                })
                console.log('submit result', result)
                setCreateForm(result.message)

                loadSupports().then(() => setIsLoading(false))
                window.scrollTo({ top: 0, behavior: 'smooth' });

            } catch (error) {
                console.log(error)
                alert.showError(JSON.stringify(error))
            }
        }
        setIsLoading(false)
    }


    return (
        <div className="px-5 mt-5">
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem onClick={() => { navigate(`/`) }}>หน้าหลัก</BreadcrumbItem>
                <BreadcrumbItem onClick={() => { navigate(`/disabledPerson/support`) }}>ข้อมูลคำร้องความช่วยเหลือ</BreadcrumbItem>
                <BreadcrumbItem>ข้อมูลคำร้องขอความช่วยเหลือ</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mb-1">
                <p className="mb-2 text-2xl font-medium">คำร้องขอความช่วยเหลือ</p>
                <p className="text-gray-500">ข้อมูลคำร้องขอความช่วยเหลือ</p>
            </div>

            <DisabledPersonSupporFrom
                createForm={createForm}
                loading={loading}
                updateForm={updateForm} />

            <div className="flex justify-center">
                <div className="max-w-[62.5%] w-full">
                    <div className="flex justify-end">
                        <div className="mx-1">
                            <Button isLoading={loading} onClick={() => navigate('/disabledperson/support')}>
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
        </div>
    )
}

export default SupportEdit;
