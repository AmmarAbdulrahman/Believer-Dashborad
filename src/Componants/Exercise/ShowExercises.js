import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Card, Col, Row , Button} from "react-bootstrap";
//import Headers from "../User/Headers.css"
import "./ShowExercises.css"
import Header from "../User/Header";

const ShowExercises = () => {

  const navigate = useNavigate()

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signUp")
    }
    else { 
    fetchAllExercises();}
  }, []);

  const fetchAllExercises = () => {
    axios.get("admin/exercises" , {
        headers: {
            "x-auth-token" : localStorage.getItem("token")
        }
    }).then((res) => {
      setExercises(res.data);
      console.log(res.data);
      //console.log(localStorage.getItem("token"))
    });
  };

  const handleDelete = (_id) => {
    axios.delete("admin/exercises/"+_id , {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    }).then ((response) => {
      fetchAllExercises();
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })

    }

  return (
    <div className="home-hon-ex">
      <div className="hed-f"><Header /></div>
      <img className="photo-navbar-ex" src="http://res.cloudinary.com/dqhzikck7/image/upload/v1680686384/tozscxjhs5ayxcrsv5eq.jpg"></img>
      <p className="titles" >Believer </p>
      <Button onClick={()=> navigate("/add") } className="button-added" variant="success">Add Exercise </Button>
      
      <Row xs={1} md={3} className="g-4 ex">
        {exercises.map((exercise, index) => (
          <Col className="columns" key={exercise._id}>
            <Card className="cards">
              <Card.Img className="imagee" variant="top" src={exercise.gifPath} />
              <Card.Body>
                <Card.Title>
                  {index + 1} : {exercise.name}
                </Card.Title>
                <Card.Text>{exercise.category}</Card.Text>
                <Link className="links-exe" to={`/exercise/${exercise._id}`}> <Button className="button-view">View</Button> </Link>
                <Button className="button-delete" variant="danger" onClick={() => { handleDelete(exercise._id) } } >Delete</Button>
                <Link className="links" to={`/exercises/update/${exercise._id}`}> <Button className="button-edit">edit</Button> </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShowExercises;

/*
This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
*/
