import {React,  useState , useEffect } from "react";
import { useNavigate , useParams , Link } from "react-router-dom";
import { Button, Card , Row , Col} from "react-bootstrap";
import "./ViewPlan.css";

import axios from "axios";

const ViewPlan = () =>{

    const navigate = useNavigate();
    const {_id} = useParams();
    
    const [data , setData] = useState([]);
    const [days,setDays] = useState([]);

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/signUp")
        }
            getPlan();
    },[])


    const getPlan = async () => {
        const response = await axios.post( `/admin/plans/viewDays/${_id}` , {} ,{ 
            headers:{
            "x-auth-token" : localStorage.getItem("token")
        }})
        setData(response.data)
        console.log(response.data)
        setDays(response.data)
    }

    const handleRemove = (_id) => {
        console.log(_id);
        // axios.delete("admin/plans/removeDay/"+_id, {headers:{
        //     "x-auth-token":localStorage.getItem("token")
        // }}).then((res)=>{
        //     console.log(res);
        //     getPlan();
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    return(
        <div>
        <div className="days-page">
        <img className="photo-navbar-da" src="http://res.cloudinary.com/dqhzikck7/image/upload/v1680686384/tozscxjhs5ayxcrsv5eq.jpg"></img>
        <p className="titles" >Believer </p>
        <div className="day">{days.map((day,index)=>(
            <h3 className="h33" key={day._id}><span className="name-day">{day.title}</span>
            <Row xs={1} md={3} className="g-4 da">
            {day.exercises.map((exer, index) => (
            <Col className="columns-da" key={index}>
            <Card className="card-day">
            <Card.Img className="imagee" variant="top" src={exer.exerciseId.gifPath} />
                <Card.Body className="body-card-days">
                <Card.Title>exercise {index + 1} : {exer.exerciseId.name}</Card.Title>
                <Card.Text className="text-day">Rest: {exer.rest}<span className="sec">s</span> / Duration: {exer.duration}<span className="sec">s</span></Card.Text>
                </Card.Body>
            </Card>
        </Col>
        ))}
    </Row>
        <Button className="button-delete-day" variant="danger" onClick={() => { handleRemove(day._id) } } >Delete</Button>
            </h3>
            
        ))}
        </div>
        
    </div>

    </div>
    )

}

export default ViewPlan;