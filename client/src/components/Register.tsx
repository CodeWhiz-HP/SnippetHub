import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";



export default function Register() {
    
    const [email , setEmail] = useState("");
    const [ password ,setPassword ] = useState("");
    const [ name , setName ] = useState("");

    const navigate = useNavigate();

    const handleReg = async (e: any) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/register", { name , email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.user.name);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("User Registered Successfully ! Please Login.")
            navigate("/")
        } catch (error) {
            alert("Register Failed !");
        };

    };


    return(
        <form onSubmit={handleReg} className="flex flex-col gap-2 reg-form w-[30%] h-[40%] p-4 m-2 mb-6 bg-white rounded-md">
            <h2 className="w-fit text-2xl rounded-md font-montserrat mb-3 text-white bg-indigo500 p-2">Register</h2>
            <input className="text-lg p-3 rounded-md h-10 bg-gray200" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}  />
            <input className="text-lg p-3 rounded-md h-10 bg-gray200" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="text-lg p-3 rounded-md h-10 bg-gray200" type="password" placeholder="Set a Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 hover:cursor-pointer w-fit mt-2">Register</button>
        </form>
    );

};    