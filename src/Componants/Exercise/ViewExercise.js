import { React, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { Card , ListGroup , Button , Tooltip , OverlayTrigger  } from "react-bootstrap";
import viewExercise from "./viewExercise.css";

const ViewExercise = () => {
  const navigate = useNavigate()
  
  const [exercise, setExercise] = useState({
    name: "",
    en_description: "",
    category: "",
    gif: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/signUp")
    }else{
    getExercise();}
  }, []);

  const getExercise = async () => {
    const response = await axios.get(`admin/exercises/${_id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    setExercise(response.data);
    console.log(response.data);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {exercise.ar_description}
    </Tooltip>
  );

  return (
    <div>
      <Button onClick={()=> navigate("/exercises")} className="button-back" variant="success">Back to</Button>
      <Card className="exercise">
        <Card.Img className="images" variant="top" src={exercise.gifPath} />
        <Card.Body>
          <ListGroup>
            <ListGroup.Item><span className="name">Name</span> : {exercise.name}</ListGroup.Item>
            <ListGroup.Item><span className="name">Category</span> : {exercise.category}</ListGroup.Item>
          </ListGroup>
          <Card.Text className="description">{exercise.en_description}</Card.Text>
        </Card.Body>
      </Card>
      <br />
      <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      >
      <Button className="button-view-tran" variant="success">Translate</Button>
      </OverlayTrigger>
    
    </div>
  );
};

export default ViewExercise;
