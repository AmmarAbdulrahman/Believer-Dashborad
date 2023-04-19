import axios from "axios";
import {React, useState , useEffect} from "react"
import { Button, ListGroup, ListGroupItem ,Card , Row , Col} from "react-bootstrap";
import { useNavigate , Link } from "react-router-dom";
import Header from "../User/Header";
import "./ShowDays.css"


const ShowDays = () => {

    const navigate = useNavigate()
    const [days,setDays] = useState([])
    //const [error,setError] = useState([])

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/signUp")
        }
        else{
            fetchAllDays();
        }
    },[])

    const fetchAllDays = async() =>{
        await axios.get("admin/plans/days", {headers :{
            "x-auth-token": localStorage.getItem("token")
        }}).then((res)=>{
            console.log(res)
            setDays(res.data)
        }).catch((err)=>{
            console.log(err)
            //setError(err)
        })
    }

    const handleDelete = (_id) => {
        const response = axios.delete(`admin/plans/day/${_id}`,{ headers:{
            "x-auth-token" : localStorage.getItem("token")
        }}).then((res)=>{
            console.log(res);
            fetchAllDays();
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleRemove = (_id) => {
        console.log(_id)
    }

    return (
    <div className="days-page">
        <Header />
        <img className="photo-navbar-da" src="http://res.cloudinary.com/dqhzikck7/image/upload/v1681947726/k5id8r6cyhuwssjd8jbf.jpg"></img>
        <p className="titles" >Believer </p>
        <Button className="button-added" variant="success"> <Link className="link" to="/addDay">Add Day</Link> </Button>
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
        <Button className="button-delete-day" variant="danger" onClick={() => { handleDelete(day._id) } } >Delete</Button>
            </h3>
            
        ))}
        </div>
        
    </div>
    )
}

export default ShowDays;