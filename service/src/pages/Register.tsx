import { Input, Button, Image } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import React, { useContext, useState } from "react"
import background from '../assets/background.png'
import logo from '../assets/logo.png'


export interface RegisterFormData {
    email: string;
    password: string;
    verify_password: string;
    // mobile_no: string;
    first_name: string
    last_name: string
}

export interface RegisterFormError extends RegisterFormData { }


function register() {

    const [isLoading, setIsLoading] = useState(false)

    const [credential, setCredential] = useState({

    } as RegisterFormData);

    const [error, setError] = useState({
    } as RegisterFormError)

    const navigate = useNavigate()
    const { call } = useContext(FrappeContext) as FrappeConfig

    const validate = () => {
        let err = {} as RegisterFormError
        let hasError = false
        if (!credential.email) {
            err.email = "กรุณากรอกข้อมูล"
            hasError = true
        }
        if (!credential.first_name) {
            err.first_name = "กรุณากรอกข้อมูล"
            hasError = true
        }
        if (!credential.last_name) {
            err.last_name = "กรุณากรอกข้อมูล"
            hasError = true
        }
        if (!credential.password) {
            err.password = "กรุณากรอกข้อมูล"
            hasError = true
        }
        if (!credential.verify_password) {
            err.verify_password = "กรุณากรอกข้อมูล"
            hasError = true
        } else {
            if (credential.verify_password != credential.password) {
                err.verify_password = "รหัสผ่านไม่ตรงกัน"
                hasError = true
            }
        }
        setError(err)
        return !hasError;
    }

    const doRegister = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (validate()) {
            let result = await call.post("pyoldc.api.app_register", {
                'register': credential
            })
            navigate("/login")
        }
    }

    const handleCredential = (key: string, value: string) => {
        setCredential({
            ...credential,
            [key]: value
        })
    }


    return (
        <div className="flex flex-col min-h-screen md:flex-row">
            <div className="w-1/2" style={{ backgroundImage: `url(${background})` }}>
                <Image className="mt-16 ml-14" src={logo} />
            </div>
            <div className="w-1/2 flex items-center justify-center p-20">
                <div className="w-full">
                    <div className="text-left">
                        <p className="mb-1 font-bold text-4xl">สมัครสมาชิก</p>
                        <span className="text-gray-400 font-medium text-base">สวัสดี, มาสร้างบัญชีของคุณ.</span>
                    </div>
                    <div className="mt-7 mb-5 text-left">
                        <p className="mb-2 font-medium text-sm">อีเมล์</p>
                        <Input isRequired variant="bordered" radius="sm" type="email" placeholder="กรุณาใส่อีเมล์" name="email"
                            isInvalid={!!(error?.email)} errorMessage={error?.email}
                            value={credential.email} onValueChange={(value) => handleCredential('email', value)} />
                    </div>
                    <div className="mb-5 text-left">
                        <p className="mb-2 font-medium text-sm">รหัสผ่าน</p>
                        <Input isRequired variant="bordered" radius="sm" type="password" placeholder="กรุณาใส่รหัสผ่าน" name="password"
                            onSubmit={doRegister} isInvalid={!!(error?.password)} errorMessage={error?.password}
                            defaultValue={credential.password} onValueChange={(value) => handleCredential('password', value)} />
                    </div>
                    <div className="mb-5 text-left">
                        <p className="mb-2 font-medium text-sm">ยืนยันรหัสผ่าน</p>
                        <Input isRequired variant="bordered" radius="sm" type="password" placeholder="กรุณายืนยันรหัสผ่าน" name="verify_password"
                            onSubmit={doRegister} isInvalid={!!(error?.verify_password)} errorMessage={error?.verify_password}
                            defaultValue={credential.password} onValueChange={(value) => handleCredential('verify_password', value)} />
                    </div>
                    <div className="mb-5 text-left">
                        <p className="mb-2 font-medium text-sm">ชื่อ</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรุณาใส่ชื่อ" name="first_name"
                            onSubmit={doRegister} isInvalid={!!(error?.first_name)} errorMessage={error?.first_name}
                            defaultValue={credential.password} onValueChange={(value) => handleCredential('first_name', value)} />
                    </div>
                    <div className="mb-5 text-left">
                        <p className="mb-2 font-medium text-sm">นามสกุล</p>
                        <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรุณาใส่นามสกุล" name="last_name"
                            onSubmit={doRegister} isInvalid={!!(error?.last_name)} errorMessage={error?.last_name}
                            defaultValue={credential.password} onValueChange={(value) => handleCredential('last_name', value)} />
                    </div>
                    {/* <div className="mb-10 text-left">
                        <p className="mb-2 font-medium text-sm">Citizens id</p>
                        <Input
                            isRequired
                            variant="bordered"
                            radius="sm"
                            type="password"
                            placeholder="Enter youe Citizens id" />
                    </div> */}
                    <Button type="submit" isLoading={isLoading} onClick={doRegister} radius="sm" className="w-full my-2 bg-pink-500 text-white text-sm font-semibold">
                        ลงทะเบียน
                    </Button>
                    <Button type="submit" isLoading={isLoading} onClick={() => { navigate("/login") }} radius="sm" className="w-full my-2 text-white text-sm font-semibold">
                        ย้อนกลับ
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default register
