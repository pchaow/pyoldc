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
        <section className="flex flex-col md:flex-row min-h-screen">
            {/* Right column container */}
            <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
                <div className="flex items-center justify-center w-full h-full">
                    <Image src={logo} alt="Logo" className="w-3/4 lg:w-1/2 mx-auto" />
                </div>
            </div>

            {/* <!-- Left column container--> */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-12">
                <div className="w-full max-w-md">
                    <form>
                        <div className="mb-6">
                                    <p className="text-2xl font-semibold mb-2 text-left">สมัครสมาชิก</p>
                                    <p className="text-left">สวัสดี, สร้างบัญชีของคุณ.</p>
                                </div>

                        <div className="columns-2 mb-2 ">
                            <div className="text-left">
                                <p className="mb-1">ชื่อ</p>
                                <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรุณาใส่ชื่อ" name="first_name"
                                    onSubmit={doRegister} isInvalid={!!(error?.first_name)} errorMessage={error?.first_name}
                                    defaultValue={credential.password} onValueChange={(value) => handleCredential('first_name', value)} />
                            </div>

                            <div className="text-left">
                                <p className="mb-1">นามสกุล</p>
                                <Input isRequired variant="bordered" radius="sm" type="text" placeholder="กรุณาใส่นามสกุล" name="last_name"
                                    onSubmit={doRegister} isInvalid={!!(error?.last_name)} errorMessage={error?.last_name}
                                    defaultValue={credential.password} onValueChange={(value) => handleCredential('last_name', value)} />
                            </div>
                        </div>
                        <div className="mb-2 text-left">
                            <p className="mb-1">เลขประจำตัวประชาชน</p>
                            <Input isRequired variant="bordered" radius="sm" type="email" placeholder="กรุณาเลขประจำตัวประชาชน" name="email" />
                        </div>

                        <div className="mb-2 text-left">
                            <p className="mb-1">อีเมล์</p>
                            <Input isRequired variant="bordered" radius="sm" type="email" placeholder="กรุณาใส่อีเมล์" name="email"
                                isInvalid={!!(error?.email)} errorMessage={error?.email}
                                value={credential.email} onValueChange={(value) => handleCredential('email', value)} />
                        </div>

                        <div className="mb-2 text-left">
                            <p className="mb-1">รหัสผ่าน</p>
                            <Input isRequired variant="bordered" radius="sm" type="password" placeholder="กรุณาใส่รหัสผ่าน" name="password"
                                onSubmit={doRegister} isInvalid={!!(error?.password)} errorMessage={error?.password}
                                defaultValue={credential.password} onValueChange={(value) => handleCredential('password', value)} />
                        </div>

                        <div className="mb-2 text-left">
                            <p className="mb-1">ยืนยันรหัสผ่าน</p>
                            <Input isRequired variant="bordered" radius="sm" type="password" placeholder="กรุณายืนยันรหัสผ่าน" name="verify_password"
                                onSubmit={doRegister} isInvalid={!!(error?.verify_password)} errorMessage={error?.verify_password}
                                defaultValue={credential.password} onValueChange={(value) => handleCredential('verify_password', value)} />
                        </div>

                        <Button type="submit" isLoading={isLoading} onClick={doRegister} radius="sm" className="w-full my-2 bg-pink-500 text-white text-sm font-semibold">
                            ลงทะเบียน
                        </Button>
                    </form>
                </div>
            </div>
        </section >
    )
}

export default register
