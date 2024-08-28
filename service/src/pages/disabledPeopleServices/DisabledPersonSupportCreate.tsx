import { Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { ISupports } from "../../interfaces";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { FrappeConfig, FrappeContext } from "frappe-react-sdk";
import { Key } from "@react-types/shared";
import DisabledPersonSupporFrom from "../../components/from/DisabledPersonSupporFrom";


function SupportCreate() {

    const { call } = useContext(FrappeContext) as FrappeConfig

    const [createForm, setCreateForm] = useState({
        support_receiver: "555555555555",
        support_receiver_name: "ไทย",
        support_receiver_surname: "รักชาติ",

        support_date: "",
        support_budget_year: "",
        // support_type_name:"",
        support_giver: "",
        // support_detail:"",
        support_image: "",
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


    const [loading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(false)
    }, [])

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
    const submit = async () => {
        console.log(createForm)
        let isValid = true
        //validate()

        if (isValid) {
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
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem onClick={() => { navigate(`/`) }}>หน้าหลัก</BreadcrumbItem>
                <BreadcrumbItem onClick={() => { navigate(`/disabledperson/support`) }}>ข้อมูลการยื่นคำร้องขอความช่วยเหลือ</BreadcrumbItem>
                <BreadcrumbItem>สร้างคำร้องขอความช่วยเหลือ</BreadcrumbItem>
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
            </div>
        </div>
    )
}

export default SupportCreate;
