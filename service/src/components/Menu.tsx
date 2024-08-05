import { useLocation, useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "@nextui-org/react";
import { PropsWithChildren } from "react"
import { FaRegImage } from "react-icons/fa6";
import { AiFillAppstore } from "react-icons/ai";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";


function AppSidebarButton(props: PropsWithChildren<ButtonProps & { exact?: boolean }>) {

    const { size, className, children } = props
    const location = useLocation()
    const navigate = useNavigate()

    let _className = "flex justify-start w-full leading-3 rounded-l-none " + className
    let _size = size ?? 'md'
    let _radius = "full"
    let _startContent = props.startContent ?? null
    let _href = props.href ?? null
    let _exact = props.exact ?? true
    let isActive = _exact ? _href == location.pathname : _href ? location.pathname.startsWith(_href) : false

    // console.log('isactive',isActive)
    let _variant = isActive ? "solid" : props.variant ?? 'light'
    let _color: "primary" | "default" = isActive ? "primary" : "default"

    let customStyles = {
        backgroundColor: _color === "primary" ? "#EC1B89" : "transparent",
        color: _color === "primary" ? "white" : "#EC1B89",
    };

    let _onClick = props.onClick ?? (() => {
        if (_href) {
            navigate(_href)
        }
    })


    return (
        <Button
            color={_color}
            variant={_variant}
            size={_size}
            radius={_radius}
            className={_className}
            onClick={_onClick}
            startContent={_startContent}
            style={customStyles} >
            {children}
        </Button>
    )
}


function SidebarMenu() {


    return (
        <ul className="w-full h-full bg-white flex flex-col pt-12 text-pink-500">
            <li className="flex gap-2 items-center hover:bg-gray-200 rounded-full rounded-l-none">
                <AppSidebarButton href="/" startContent={<AiFillAppstore />}>Dashboard</AppSidebarButton>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-200 rounded-full rounded-l-none">
                <AppSidebarButton href="/disabledperson" startContent={<PiBagSimpleFill />}>ฐานข้อมูลคนพิการ</AppSidebarButton>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-200 rounded-full rounded-l-none">
                <AppSidebarButton href="" startContent={<IoDocumentText />}>ข่าวสาร / ประกาศ</AppSidebarButton>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-200 rounded-full rounded-l-none">
                <AppSidebarButton href="" startContent={<FaRegImage />}>รูปกิจกรรม</AppSidebarButton>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-200 rounded-full rounded-l-none">
                <AppSidebarButton href="" startContent={<TiContacts />}>ติดต่อเรา</AppSidebarButton>
            </li>
        </ul >
    )
}

export default SidebarMenu
