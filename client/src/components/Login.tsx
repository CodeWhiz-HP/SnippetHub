import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";




export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code , setCode] =useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/home")
        } catch (error) {
            alert("Login Failed !");
        };

    };


    return(
        <form onSubmit={handleLogin} className="flex flex-col gap-4 login-form w-[30%] h-[48%] p-4 m-2 mb-6 bg-white rounded-md">
            <h2 className="w-fit text-2xl rounded-md font-montserrat mb-3 text-white bg-indigo500 p-2">Login</h2>
            <input className="text-lg p-3 rounded-md h-10 bg-gray200" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className="text-lg p-3 rounded-md h-10 bg-gray200" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <button className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 hover:cursor-pointer w-fit mt-8">Login</button>
        </form>
    );
};