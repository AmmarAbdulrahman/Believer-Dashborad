import {React, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../User/Header"

const Home = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/signUp")
        }
    },[])

    return(
        <div>
            <Header />
            home page
        </div>
    )

}

export default Home;