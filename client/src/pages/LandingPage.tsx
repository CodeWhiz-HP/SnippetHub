import snippetlogo from "../assets/snippetlogo.svg";
import heart from "../assets/heart.svg";
import Login from "../components/Login";
import Register from "../components/Register";


export default function LandingPage() {



    return (
        <div className="landing overflow-hidden">
            <header className="flex gap-4 w-full justify-center mt-12 mb-8 ml-1">
                <img className="w-24" src={snippetlogo} alt="" />
                <h1 className="text-6xl font-montserrat text-indigo500 w-fit mt-2">SnippetHub </ h1>
            </header>
            <div className="content flex gap-10 w-full justify-center mb-20 mt-20">
                <Register />
                <Login />
            </div>
            <p className="flex gap-3 w-full justify-center text-2xl font-mono">Made with <img className="w-6" src={heart} alt="" /></p>
        </div>
    );
};