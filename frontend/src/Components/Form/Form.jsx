import { useState } from "react"
import "./Form.css"

const Form = ({type})=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const name = type === "login" ? "Login" : "Register";

    const handleSubmit= (e)=>{
        e.preventDefault();

        console.log({username, password})
    }


    return (
        <form className={"login-form"}>
            <h2>{name}</h2>
            <div className={"login-form-group"} >
                <label className={"login-label"} htmlFor="email">Email:</label>
                <input className={"login-input"} type="text" id="email" required default="Email" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            </div>
            <div className={"login-form-group"} >
            <label className={"login-label"} htmlFor="password">Password:</label>
            <input className={"login-input"} type="text" id="password" required default="Password" value={password} onChange={(()=>{setPassword(e.target.value)})}/>
            </div>
            <button className={"login-button"} type="submit" onClick={handleSubmit}>{name}</button>
        </form>
    )
}

export default Form;