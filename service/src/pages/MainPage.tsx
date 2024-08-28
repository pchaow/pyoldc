import { Skeleton, Avatar, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useFrappeAuth } from "frappe-react-sdk";
import SidebarMenu from "../components/Menu";
import background from '../assets/background.png';
import logo from '../assets/logo.png';
import { FaBell, FaMessage } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";


function AppNavbarBrand() {


    return (
        <NavbarBrand>
            <img src={logo} alt="Logo" className="h-12" />
        </NavbarBrand>
    );
}


function AppNavbar() {

    const auth = useFrappeAuth()

    console.log(auth)

    const navigate = useNavigate()

    const doLogout = async () => {
        try {
            await auth.logout()
        } catch (error) {
            console.log("doLogout error", error)
        }
        navigate("/login")
    }


    return (
        <Navbar isBordered maxWidth="full" classNames={{ wrapper: "px- md:p-6" }} style={{ backgroundImage: `url(${background})` }}>
            <AppNavbarBrand />

            <NavbarContent justify="end">
                <NavbarItem>
                    {auth.currentUser}
                </NavbarItem>
                <Skeleton isLoaded={!auth.isLoading} className="rounded-full">
                    <NavbarItem>
                        {auth.currentUser ? (
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        size="sm"
                                        name={auth.currentUser}
                                        classNames={{
                                            name: 'font-bold select-none',
                                            base: 'bg-success/30 text-green-800 cursor-default',
                                        }}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem onClick={doLogout} key="logout" color="danger">
                                        ออกจากระบบ
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            null
                        )}
                    </NavbarItem>
                </Skeleton>
            </NavbarContent>
        </Navbar>
    );
}


function MainPage() {


    return (
        <div className="font-customFont">
            <AppNavbar />
            <div className="flex px-1 lg:px-0 lg:justify-center w-full">
                <div className="lg:pl-3 lg:ml-3 p-5 lg:w-full  lg:min-h-[600px] md:w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainPage
