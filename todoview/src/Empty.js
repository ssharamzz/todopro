import React from 'react';
import jwt from 'jwt-decode';
import LoginContext from 'account/Util';

export default function Empty({location}) {
    const login = React.useContext(LoginContext)

    React.useEffect(()=>{
        const token = window.localStorage.getItem("token");
        if(token != null){
            const decode_token = jwt(token);
            const now = new Date();

            if(decode_token.exp * 1000 < now.getTime()) {        
                console.log("기간이 지난토큰");
                window.localStorage.removeItem("token");
                login.setIsLogin(false)
            }
            login.setIsLogin(true)
        }else {
            login.setIsLogin(false)
        }
    },[location])
    return (
        <>
        </>
    )
}