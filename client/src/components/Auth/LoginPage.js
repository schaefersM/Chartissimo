import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthDispatch } from "../../stores/authStore";

const LoginPage = () => {
	const authDispatch = useAuthDispatch();

	const history = useHistory();

	const nameRef = useRef();

	const [errorText, setErrorText] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		nameRef.current.focus();
	}, []);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			postData(name, password);
		}
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const postData = async (name, password) => {
		try {
			const response = await fetch(
				`http://${process.env.REACT_APP_BACKEND_IP}:4000/auth/login`,
				{
					credentials: "include",
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						password,
					}),
				}
			);

			if (!response.ok) {
				const { errorMessage } = await response.json();
				setErrorText(errorMessage);
				setName("");
				setPassword("");
				return null;
			} else {
				authDispatch({ type: "login", payload: await response.json() });
				history.replace("/");
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<div className="text-center px-5">
				{errorText ? <p className="text-danger">{errorText}</p> : null}
				<form
					className="login-page-form ml-auto mr-auto"
					onKeyDown={(e) => handleKeyDown(e)}
				>
					<div className="form-group">
						<label htmlFor="login-page-name-input">Username</label>
						<input
							id="login-page-name-input"
							className="mr-2 form-control"
							type="text"
							value={name}
							onChange={handleNameChange}
							ref={nameRef}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="login-page-password-input">
							Password
						</label>
						<input
							id="login-page-password-input"
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
					Login
				</button>
			</div>
		</>
	);
};

export default LoginPage;
