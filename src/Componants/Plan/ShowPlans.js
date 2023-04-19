import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row , Button, ListGroup} from "react-bootstrap";
//import Headers from "../User/Headers.css"
import "./ShowPlans.css"
import Header from "../User/Header";
import { ListItem } from "@mui/material";


const ShowPlans = () => {

    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/signUp")
    }else{
    fetchAllPlans();}
  }, []);

  const fetchAllPlans = () => {
    axios.get("admin/plans" , {
        headers: {
            "x-auth-token" : localStorage.getItem("token")
        }
    }).then((res) => {
      setPlans(res.data);
      console.log(res.data);
    });
  };

  const handleDelete = (_id) => {
    axios.delete("admin/plans/"+_id , {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    }).then ((response) => {
      fetchAllPlans();
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })

    }

    
  return (
    <div className="home-hon">
      <div className="hed"><Header /></div>
      <img className="photo-navbar-pl" src="http://res.cloudinary.com/dqhzikck7/image/upload/v1681947726/k5id8r6cyhuwssjd8jbf.jpg"></img>
      <p className="titles" >Believer </p>
      <Button className="button-added" variant="success"> <Link className="link" to="/addPlan">Add Plan</Link> </Button>
      
      <Row xs={1} md={3} className="g-4 pl">
        {plans.map((plan, index) => (
          <Col className="columns" key={plan._id}>
            <Card className="card-plan" key={plan.id}>
                <Card.Body className="body-card">
                <Card.Title>
                  {index + 1} : {plan.title}
                </Card.Title>
                <Card.Text> Calories : {plan.calories}</Card.Text>
                <Card.Text> BMI : {plan.BMI}</Card.Text>
                <Card.Text> Gender : {plan.gender}</Card.Text>
                {/* <ListGroup key={index} >{plan.days.map((sub,index)=>
                <ListItem key={index}> {index+1} Day : {sub.title}
                          <ListGroup > {sub.exercises.map((subsub,index)=> 
                          <ListItem > rest : {subsub.rest}  , duration {subsub.duration} 
                          </ListItem>
                          )}  </ListGroup>
                </ListItem>
                )}
                </ListGroup> */}
                <Link className="links" to={`/plans/${plan._id}`}><Button className="button-view">
                  View
                </Button></Link>
                <Button className="button-delete" variant="danger" onClick={() => { handleDelete(plan._id) } } >Delete</Button>
                <Link className="link" to={`/plans/AddDay/${plan._id}`}><Button className="button-add-day">
                  Add
                </Button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ShowPlans;