import React from 'react'
import './Headre.css'
import { GoBell } from "react-icons/go";
import { BsBrightnessHigh } from 'react-icons/bs'
import user1 from './../../assets/Images/user1.jpg'
export default function Header() {
    return (
        <>
            <div className="header">
                <div className="profile-admin">
                    <img src={user1} alt="" />
                    <div className="">
                        <h1>علی اسدی پور</h1>
                        <h3>
                             برنامه نویس فرانت اند</h3>
                    </div>
                </div>
                <div className="header-left">
                    <div className="search-box">
                        <input type="text" placeholder='جست و جو کنید..' />
                        <button>جست و جو</button>
                    </div>
                    <button className='header-left-icon'>
                        <GoBell />
                    </button>
                    <button className='header-left-icon'>
                        <BsBrightnessHigh />
                    </button>
                </div>
            </div>
        </>
    )
}
