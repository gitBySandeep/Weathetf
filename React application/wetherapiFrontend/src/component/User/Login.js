import { useState } from "react"
import './signup.css'
import axios from 'axios';

import { useNavigate } from "react-router-dom"
// import {ToastContainer, toast} from "react-toastify"
// import backgroundImage from './dark-stormy-clouds_181624-61.avif'

import Swal from 'sweetalert2';

export default function Login() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let [inputError, setinputError] = useState(" ");
    let [emailError, setemailError] = useState(" ");
    let [passError, setpassError] = useState("");

    let [emailError1, setemailError1] = useState(" ");
    let [passError1, setpassError1] = useState("");

    const [isSignUp, setIsSignUp] = useState(true);

    const navigate = useNavigate();
    const changeLogin = () => {
        setIsSignUp(!isSignUp);
    }

    const clearSignUpFields = () => {
        setName("");
        setEmail("");
        setPassword("");
        setinputError("");
        setemailError("");
        setpassError("");
    };
    const signUp = () => {
        axios.post("http://localhost:3005/user/signUp", { name, email, password })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        title: "Sign Up Success..",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                clearSignUpFields();
                setIsSignUp(false);
                // navigate("/wheather");
            }).catch(err => {
                // toast.error("User is Already Exist....")
                Swal.fire({
                    icon: "error",
                    position: "center",
                    title: "User is Already Exist..",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    const signIn = () => {
        axios.post("http://localhost:3005/user/signIn", { email, password })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("userId", response.data.user.id);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "SignIn Success..",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/wheather");
                }
            }).catch(err => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "SignIn Fail",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return <>
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("/Img/dark-stormy-clouds_181624-61.avif")`, height: "100vh", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div style={{ display: isSignUp ? 'block' : 'none' }}>
                    <div className=" body d-md-flex align-items-center justify-content-between">
                        <div className="box-1 mt-md-0 mt-5">
                            <img src="weatherimage1.avif"
                                style={{ height: "510px" }} alt="" />
                        </div>
                        <div className=" box-2 d-flex flex-column h-100">
                            <div className="mt-3">
                                <p className="mb-1 h-1 fs-2 -white" style={{ marginLeft: "90px" }}>Welcome</p>
                                <div className="d-flex flex-column ">
                                    <p className="h-1 mb-2 fs-4" style={{ marginLeft: "70px" }}>Create Account...</p>
                                    <div className="input-group mt-2 d-flex flex-column" >
                                        <label >Name</label>
                                        <input value={name} type="text" onChange={(event) => { (event.target.value === "") ? setinputError("name is required") : (!event.target.value.match("^[a-z A-Z]+$")) ? setinputError("name contains only charecter") : (!event.target.value.match("^[a-z A-Z]{2,20}$")) ? setinputError("name must be at least 2 charecter long.") : setinputError(""); setName(event.target.value) }} className="form-control-lg bg-transparent rounded fs-6 " placeholder="Username" />
                                        <small style={{ width: "90%", color: "red" }} className="fs-6">{inputError}</small>
                                    </div>
                                    <div className="input-group mt-3 d-flex flex-column rounded">
                                        <label>Email</label>
                                        <input value={email} type="text" onChange={(event) => { (event.target.value === "") ? setemailError("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setemailError("email must start with valid charecters.") : (!event.target.value.match(/@gmail\.com$/)) ? setemailError("email must be end with '@gmail.com'.") : setemailError(""); setEmail(event.target.value) }} className="form-control-lg bg-transparent rounded fs-6 " placeholder="email" />
                                        <small style={{ width: "90%", color: " red" }} className="fs-6 mt-0">{emailError}</small>
                                    </div>
                                    <div className="input-group mt-2 d-flex flex-column">
                                        <label>password</label>
                                        <input value={password} type="text" onChange={(event) => { (event.target.value === "") ? setpassError("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpassError("password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpassError("password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpassError("password must contain at least 5 charecter long") : setpassError(""); setPassword(event.target.value) }} className="form-control-lg bg-transparent rounded fs-6 " placeholder="password" />
                                        <small style={{ width: "90%", color: "red" }} className="fs-6">{passError}</small>
                                    </div>
                                    <div className="mt-3 ">
                                        {(inputError === passError && passError === emailError) ? <button className="btn btn-dark" onClick={signUp}>SIGN UP</button> : <button onClick={() => { (name === "") ? setinputError("name is required") : (email === "") ? setemailError("email is required") : (password === "") ? setpassError("password is required") : setpassError(" ") }} type="button" className=" submitbutton btn btn-light rounded mt-2 border">SIGN UP</button>}
                                        <span className="mb-0 ms-4 " onClick={changeLogin} style={{ cursor: "pointer" }}>Already have an account ?</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: isSignUp ? 'none' : 'block' }}>
                    <div className=" body d-md-flex align-items-center justify-content-between">
                        <div className=" box-2 d-flex flex-column h-100">
                            <div className="mt-3">
                                <p className="mb-1 h-1 mt-5 fs-2 -white" style={{ marginLeft: "90px" }}>Welcome</p>
                                <div className="d-flex flex-column ">
                                    <p className="h-1 mb-2 fs-4" style={{ marginLeft: "40px" }}>Continue With SignIn...</p>
                                    <div className="input-group mt-2 d-flex flex-column rounded">
                                        <label>Email</label>
                                        <input type="text" onChange={(event) => { (event.target.value === "") ? setemailError1("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setemailError1("email must start with valid charecters.") : (!event.target.value.match(/@gmail\.com$/)) ? setemailError1("email must be end with '@gmail.com'.") : setemailError1(""); setEmail(event.target.value) }} className="form-control-lg bg-transparent rounded fs-6 " placeholder="Email" />
                                        <small style={{ width: "90%", color: "red" }} className="fs-6">{emailError1}</small>
                                    </div>
                                    <div className="input-group mt-2 d-flex flex-column">
                                        <label>password</label>
                                        <input type="text" onChange={(event) => { (event.target.value === "") ? setpassError1("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpassError1("password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpassError1("password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpassError1("password must contain at least 5 charecter long") : setpassError1(""); setPassword(event.target.value) }} className="form-control-lg bg-transparent rounded fs-6 " placeholder="Password" />
                                        <small style={{ width: "90%", color: "red" }} className="fs-6">{passError1}</small>
                                    </div>
                                    <div className="mt-3 ">
                                        {(emailError1 === passError1) ? <button className="btn btn-dark" onClick={signIn}>SIGN IN</button> : <button onClick={() => { (email === "") ? setemailError1("email is required") : (password === "") ? setpassError1("password is required") : setpassError1(" ") }} type="button" className=" submitbutton btn btn-light rounded mt-2 border">SIGN IN</button>}
                                        <span className="mb-0 ms-4" style={{ cursor: "pointer" }} onClick={changeLogin}>New User ?</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-1 mt-md-0 mt-5">
                            <img src="weatherimage1.avif"
                                style={{ height: "510px" }} alt="" />
                        </div>
                    </div>
                </div>
        </div>
    </>
}