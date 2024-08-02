import { useParams } from "react-router-dom"
import { Login } from "../components/Login"
import Navbar from "../components/Navbar"
import { Register } from "../components/Register"


export function Auth(){

    const { method } = useParams()

    return(
        <section className="h-screen">
            <Navbar />
            {method === "login"
                ?(
                    <Login />
                ):(
                    <Register />
                )
            }
        </section>
    )
}