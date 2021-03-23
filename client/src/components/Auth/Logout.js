import React, { useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useAuthDispatch } from "../../stores/authStore"


const Logout = () => {

    const authDispatch = useAuthDispatch();

    const history = useHistory();
    
    useEffect(() => {
        const logout = async () => {
            const options = {
                credentials: "include",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(
                `http://${process.env.REACT_APP_BACKEND_IP}:4000/auth/logout`,
                options
            );
            if (!response.ok) {
                console.log("not okay");
            } else {
                authDispatch({
                    type: "logout",
                });
              history.replace("/");
            }
        };
        try {
            logout()
        } catch (e) {
            console.log(e)
        }
    },[authDispatch, history]) 

    return (
        <>  
        </>
    );
};

export default Logout;
