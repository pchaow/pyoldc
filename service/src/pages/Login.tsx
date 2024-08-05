import { Input, Button, Image, Card, CardBody, Spinner } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FrappeError, UserPassCredentials, useFrappeAuth } from "frappe-react-sdk"
import background from '../assets/background.png'
import logo from '../assets/logo.png'


const LoginForm = (): JSX.Element => {

    const {
        currentUser,
        isValidating,
        isLoading,
        login,
        logout,
        error,
        updateCurrentUser,
        getUserCookie,

    } = useFrappeAuth()

    const [isLogin, setIsLogin] = useState(false)

    const [credential, setCredential] = useState({
        username: "",
        password: "",
    } as UserPassCredentials);

    const [loginError, setLoginError] = useState({
        message: ''
    } as FrappeError)

    const doLogin = async () => {

        await isLoginWrapper(async () => {
            try {
                setLoginError({ message: '' } as FrappeError)
                let result = await login(credential)
                console.log('doLogin result', result)
            } catch (error) {
                console.log('doLogin error', error)
                setLoginError(error as FrappeError)
            }
        })
    }

    const isLoginWrapper = async (callback: { (): Promise<void>; (): any }) => {
        setIsLogin(true)
        await callback()
        setIsLogin(false)
    }

    const doLogout = async () => {
        await isLoginWrapper(async () => {
            let result = await logout()
            console.log(result)
        })
    }
    const handleCredential = (key: string, value: string) => {
        setCredential({
            ...credential,
            [key]: value
        })
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            updateCurrentUser().then(r => {
                console.log("useeffect updatecurrentuser", r)
                setTimeout(() => {
                    navigate("/")
                }, 3000)
            })
        }
    },
        [currentUser])

    if (isLoading) {
        return (
            <Card className="min-w-[300px] max-w-[350px]">
                <CardBody className="flex flex-col gap-3 justify-center items-center">
                    <Spinner size="lg" />
                </CardBody>
            </Card>
        )
    } else {
        if (currentUser) {
            return (
                <div className="flex flex-col min-h-screen md:flex-row">
                    <div className="w-1/2" style={{ backgroundImage: `url(${background})` }}>
                        <Image className="mt-16 ml-14" src={logo} />
                    </div>
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <div className="w-full p-20 flex flex-col gap-3 justify-center items-center">
                            <div className="text-left">
                                <p className="mb-1 font-bold text-xl">สวัสดี {currentUser}</p>
                            </div>
                            <Spinner size="lg"><span className="font-medium text-base">กำลังเข้าสู่ระบบ.</span></Spinner>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col min-h-screen md:flex-row">
                    <div className="w-1/2 place-content-center" style={{ backgroundImage: `url(${background})` }}>
                        <Image className="mt-16 ml-14" src={logo} />
                    </div>
                    <div className="w-full md:w-1/2 place-content-center p-20">
                        <div className="w-full">
                            <div className="text-left">
                                <p className="mb-1 font-bold text-4xl">เข้าสู่ระบบ</p>
                                <span className="text-gray-400 font-medium text-base">สวัสดี, เข้าสู่ระบด้วยบัญชีของคุณ.</span>
                                <p>{currentUser}</p>
                            </div>
                            <form onSubmit={doLogin}>
                                <div className="py-3 text-left">
                                    <p className="mb-1 font-medium text-sm">อีเมล์</p>
                                    <Input isInvalid={loginError?.message != ''}
                                        color={loginError?.message != '' ? "danger" : "default"}
                                        errorMessage={loginError?.message}

                                        variant="bordered"
                                        radius="sm"
                                        placeholder="กรุณาใส่อีเมล์" value={credential.username} name="username" onValueChange={(value) => handleCredential('username', value)} />
                                </div>
                                <div className="mb-2 text-left">
                                    <p className="mb-1 font-medium text-sm">รหัสผ่าน</p>
                                    <Input
                                        onSubmit={doLogin}
                                        isInvalid={loginError?.message != ''}
                                        color={loginError?.message != '' ? "danger" : "default"}
                                        errorMessage={loginError?.message}

                                        variant="bordered"
                                        radius="sm"
                                        type="password"
                                        placeholder="กรุณาใส่รหัสผ่าน" defaultValue={credential.password} name="password" onValueChange={(value) => handleCredential('password', value)} />
                                </div>
                                <div className="flex justify-end text-pink-500">ลืมรหัสผ่าน</div>
                                <Button type="submit" radius="sm" className="w-full bg-pink-500 text-white text-sm font-semibold" isLoading={isLogin} onClick={doLogin} >
                                    เข้าสู่ระบบ
                                </Button>
                                <div className="flex justify-center">or</div>
                                <Button type="submit" radius="sm" className="w-full bg-gray-300 text-sm font-semibold" onClick={() => { navigate("/register") }} >
                                    ยังไม่มีบัญชีใช่ไหม สมัครสมาชิก
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


function Login() {


    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Login
