import React from 'react';
import Axios from 'axios';
import "./Exam2.css"


export default function Exam2() {
    const [users, setUsers] = React.useState([])
    React.useEffect(()=> {
        Axios.get("https://api.github.com/users?since=1000")
        .then(response=>{
            const {data} = response
            setUsers(data)
            console.log(response);
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    return (
        <>
            {
                users.map((v) => {
                    return <>
                    <div id={v.id}><img src={v.avatar_url} />{v.login}</div>
                    </>
                })
            }
        </>
    )
}