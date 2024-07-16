import { useState } from "react"
import logo from "../public/logo.svg"

export default function Navbar({handleButtonUpdate, handleUpdate}: {handleButtonUpdate:() => void, handleUpdate:() => void}){


    return(
        <nav className="flex w-full drop-shadow-2xl">
            <article onClick={handleUpdate} className="flex w-1/4 justify-start items-center">
                <img className="w-10" src={logo} alt="logo" />
                <h1 className="font-bold text-xl text-white">NestChat</h1>
            </article>
            <article className="flex w-7/8 justify-center items-center">
                <span onClick={handleButtonUpdate} className="font-semibold text-white sh">How it works</span>
            </article>
        </nav>
    )
}