import { React,useEffect,useState } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import { Card,ListGroup,Button } from "react-bootstrap";
import axios from "axios";
import "./ViewFood.css";
//import Headers from "../User/Headers.css"


const ViewFood = () =>{

    const navigate = useNavigate();
    const {_id} = useParams();

    const [food,setFood] = useState({
        name:"",
        category:"",
        calories:"",
        amount:"",
        image:""
    })

    useEffect(()=>{
      if(!localStorage.getItem("token")){
        navigate("/signUp")
      }
        getFood();
    },[])

    const getFood = async () => {
        const response = await axios.get( `/admin/food/${_id}` , { 
            headers:{
            "x-auth-token" : localStorage.getItem("token")
        }})
        setFood(response.data)
        console.log(response.data)
        
    }

    return(
        <div>
      <Button onClick={()=> navigate("/foods")} className="button-back" variant="success">Back to</Button>
      <Card className="food">
        <Card.Img className="images" variant="top" src={food.imagePath} />
        <Card.Body>
          <ListGroup>
            <ListGroup.Item><span className="name">Name</span> : {food.name}</ListGroup.Item>
            <ListGroup.Item><span className="name">Category</span> : {food.category}</ListGroup.Item>
            <ListGroup.Item><span className="name">Calories</span> : {food.calories}</ListGroup.Item>
            <ListGroup.Item><span className="name">Amount</span> : {food.amount} <span className="gram">g</span></ListGroup.Item>
          </ListGroup>
          <Card.Text className="description">{food.description}</Card.Text>
        </Card.Body>
      </Card>
      <br />
    </div>
    );

}

export default ViewFood;