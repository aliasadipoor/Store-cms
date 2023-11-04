import React from 'react'
import './Sidebar.css'
import { GoHome, GoComment } from 'react-icons/go'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { BsBagCheck, BsCurrencyDollar } from 'react-icons/bs'
import { PiUsersLight } from 'react-icons/pi'
import { Link, NavLink } from 'react-router-dom'



export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <h1 className='sidebar-title'>به داشبورد خود خوش آمدید</h1>
                <ul className="sidebar-link">
                    <NavLink to={"/"}>
                        <GoHome className='icon' />
                        صفحه اصلی
                    </NavLink>
                    <NavLink to={"/products"}>
                        <MdProductionQuantityLimits className='icon' />
                        محصولات

                    </NavLink>
                    <NavLink to={"/comments"}>
                        <GoComment className='icon' />
                        کامنت ها

                    </NavLink>
                    <NavLink to={"/users"}>
                        <PiUsersLight className='icon' />
                        کابران

                    </NavLink>
                    <NavLink to={"/orders"}>
                        <BsBagCheck className='icon' />
                        سفارشات

                    </NavLink>
                    <NavLink to={"/offs"} >
                        <BsCurrencyDollar className='icon' />
                        تخفیف ها

                    </NavLink>

                </ul>
            </div >
        </>
    )
}
