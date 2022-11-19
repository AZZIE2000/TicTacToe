import React from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import { useGoogleLogin } from '@react-oauth/google';
export default function Login() {
    // initiate cookies
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);




    const responseGoogle = (response) => {
        console.log(response);
        const userObject = jwt_decode(response.credential);
        //console.log(userObject);
        // localStorage.setItem("user", JSON.stringify(userObject));
        const { name, sub, picture, email } = userObject;
        console.log(userObject);

        const data = {
            name: name,
            email: email,
            google_id: sub,
        };
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("/api/googleLogin", data).then((res) => {
                if (res.data.status === "Request was successful.") {
                    console.log(res.data);
                    const name = res.data.data.user.name;
                    const email = res.data.data.user.email;
                    const token = res.data.data.token;
                    setCookie("Token", token, { path: "/" });
                    console.log(token);
                    // setUser({ ...user, name, email });
                    // navigate("/", { replace: true });
                } else {
                    console.log(res);
                    // setRegister({ ...register, errors: res.data.errors });
                }
            });
        });
    };


    return (
        <>
            <div className='flex justify-center items-center  '>

                <GoogleLogin
                    useOneTap

                    onSuccess={responseGoogle}
                    onError={() => {
                        console.log("Login Failed");
                    }}

                />

            </div>
        </>
    )
}
