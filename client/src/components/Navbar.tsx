import logo from "../public/logo.svg"

export default function Navbar(){
    return(
        <nav className="flex w-full backdrop-filter drop-shadow-2xl">
            <article className="flex w-1/4 justify-start items-center">
                <img className="w-10" src={logo} alt="logo" />
                <h1 className="font-bold text-xl text-white">NestChat</h1>
            </article>
            <article className="flex w-7/8 justify-center items-center">
                <span className="font-semibold text-white sh">How it works</span>
            </article>
        </nav>
    )
}