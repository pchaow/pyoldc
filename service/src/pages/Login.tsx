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
                <section className="flex flex-col md:flex-row min-h-screen">
                    {/* Right column container */}
                    <div className="flex-1 bg-cover bg-center sm:h-10" style={{ backgroundImage: `url(${background})` }}>
                        <div className="flex items-center justify-center w-full h-full">
                            <Image src={logo} alt="Logo" className="w-3/4 lg:w-1/2 mx-auto" />
                        </div>
                    </div>

                    {/* Left column container */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-12">
                        <div className="w-full max-w-md">
                            <Card>
                                <CardBody>
                                    <p className="flex items-center mb-4">สวัสดี {currentUser}.</p>
                                    <Spinner size="lg"><span>กำลังเข้าสู่ระบบ...</span></Spinner>
                                </CardBody>
                            </Card>

                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <section className="flex flex-col md:flex-row min-h-screen">
                    {/* Right column container */}
                    <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
                        <div className="flex items-center justify-center w-full h-full">
                            <Image src={logo} alt="Logo" className="w-3/4 lg:w-1/2 mx-auto" />
                        </div>
                    </div>

                    {/* Left column container */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-12">
                        <div className="w-full max-w-md">
                            <form onSubmit={doLogin}>
                                <div className="mb-6">
                                    <p className="text-2xl font-semibold mb-2 text-left">เข้าสู่ระบบ</p>
                                    <p className="text-left">สวัสดี, เข้าสู่ระบบด้วยบัญชีของคุณ.</p>
                                </div>
                                <div className="py-3 text-left">
                                    <label className="block mb-1 text-sm font-medium">อีเมล์</label>
                                    <Input
                                        isInvalid={loginError?.message !== ''}
                                        color={loginError?.message !== '' ? "danger" : "default"}
                                        errorMessage={loginError?.message}
                                        variant="bordered"
                                        radius="sm"
                                        placeholder="กรุณาใส่อีเมล์"
                                        value={credential.username}
                                        name="username"
                                        onValueChange={(value) => handleCredential('username', value)}
                                    />
                                </div>

                                <div className="py-3 text-left">
                                    <label className="block mb-1 text-sm font-medium">รหัสผ่าน</label>
                                    <Input
                                        isInvalid={loginError?.message !== ''}
                                        color={loginError?.message !== '' ? "danger" : "default"}
                                        errorMessage={loginError?.message}
                                        variant="bordered"
                                        radius="sm"
                                        type="password"
                                        placeholder="กรุณาใส่รหัสผ่าน"
                                        value={credential.password}
                                        name="password"
                                        onValueChange={(value) => handleCredential('password', value)}
                                    />
                                </div>
                            </form>
                            <div className="">
                                <div className="flex justify-end mb-4">
                                    <a href="#" className="text-pink-500 text-sm">ลืมรหัสผ่าน</a>
                                </div>
                                <Button
                                    type="submit"
                                    radius="sm"
                                    className="w-full bg-pink-500 text-white"
                                    isLoading={isLogin}
                                    onClick={doLogin}
                                >
                                    เข้าสู่ระบบ
                                </Button>
                                <div className="text-center my-2">หรือ</div>
                                <Button
                                    type="button"
                                    radius="sm"
                                    className="w-full bg-gray-300"
                                    onClick={() => { navigate("/register") }}
                                >
                                    ยังไม่มีบัญชี? สมัครสมาชิก
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
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
