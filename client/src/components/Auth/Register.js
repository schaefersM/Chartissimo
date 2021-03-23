import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom"


const Register = () => {

    const history = useHistory();

    const nameRef = useRef();

    const [email, setEmail] = useState("");
    const [errorText, setErrorText] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        nameRef.current.focus();
    }, []); 
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setErrorText("");
    }
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            postData(name, email, password);
        }
    };
    
    const handleNameChange = (e) => {
        setName(e.target.value)
        setErrorText("")
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setErrorText("");
    };


    const postData = async (name, email, password) => {
        try {
            const response = await fetch(
                `http://${process.env.REACT_APP_BACKEND_IP}:4000/auth/register`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            )

            if (!response.ok) {
                const {errorMessage} = await response.json();
                setErrorText(errorMessage);
                setName("");
                setPassword("");
                setEmail("");
            } else {
                history.replace("/login");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="text-center px-5">
                {errorText ? <p className="text-danger">{errorText}</p> : null}
                <form
                    className="register-page-form ml-auto mr-auto"
                    onKeyDown={(e) => handleKeyDown(e)}
                >
                    <div className="form-group">
                        <label htmlFor="register-page-name-input">Name</label>
                        <input
                            id="register-page-name-input"
                            className="mr-2 form-control"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            ref={nameRef}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-page-email-input">
                            Email
                        </label>
                        <input
                            id="register-page-password-input"
                            className="mr-2 form-control"
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-page-password-input">
                            Password
                        </label>
                        <input
                            id="register-page-password-input"
                            className="mr-2 form-control"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                </form>
                <button
                    className="btn btn-success"
                    onClick={() => postData(name, password)}
                >
                    Register
                </button>
            </div>
        </>
    );

}

export default Register;
