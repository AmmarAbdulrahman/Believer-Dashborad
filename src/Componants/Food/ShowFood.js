import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row, Modal, Button } from "react-bootstrap";
//import Headers from "../User/Headers.css";
import Header from "../User/Header";
import { Link ,useNavigate } from "react-router-dom";
import "./ShowFood.css"

const ShowFood = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const [foods, setFoods] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")){
      navigate("/signUp")
    }
    fetchAllFoods();
  }, []);

  const fetchAllFoods = () => {
    axios
      .get("admin/food", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFoods(res.data);
        //console.log(res.data)
        //console.log(localStorage.getItem("token"))
      });
  };

  const handleModal = (_id) => {
    //setFoods(foods);
    //setDeleteId(id)
    setShow(true)
    console.log(_id);
  }

  const handleClickDelete = (_id) => {

    axios.delete("/admin/food/"+_id , {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      },
    })
    .then((res) => {
      //console.log(res)
      setShow(false);
      fetchAllFoods();
    }).catch((err)=>{
      console.log(err)
    })
  };

  

  return (
    <div className="home-hon-f">
      <div className="hed-f"><Header /></div>
      <img className="photo-navbar-fo" src="http://res.cloudinary.com/dqhzikck7/image/upload/v1681947726/k5id8r6cyhuwssjd8jbf.jpg"></img>
      <p className="titles" >Believer</p>
      <Button className="button-added" variant="success"> <Link className="link" to="/addFood">Add Food</Link> </Button>
      
      <Row xs={1} md={3} className="g-4 fo">
        {foods.map((food, index) => (
          <Col className="columns" key={food._id}>
            <Card className="cards">
              <Card.Img className="imagee" variant="top" src={food.imagePath} />
              <Card.Body>
                <Card.Title>
                  {index + 1}- {food.name}
                </Card.Title>
                <Card.Text>{food.category}</Card.Text>
                <Link className="links" to={`/food/${food._id}`}><Button className="button-view-food">
                  View
                </Button></Link>
                <Button onClick={() => { handleClickDelete(food._id) } } className="button-delete-food" /*onClick={()=>handleModal(food) }*/ variant="danger">
                  Delete
                </Button>
                <Link className="links" to={`/foods/edit/${food._id}`}> <Button className="button-edit-food">edit</Button> </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}


<Modal
show={show}
onHide={handleClose}
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header closeButton>
  <Modal.Title>Check it</Modal.Title>
</Modal.Header>
<Modal.Body>Are you sure ? you want to delete this ?</Modal.Body>
<Modal.Footer>
  <Button variant="danger" onClick={() => handleClickDelete() } >
    OK
  </Button>
  <Button variant="secondary" onClick={handleClose} >
    Cancel 
  </Button>
</Modal.Footer>
</Modal>
        
      </Row>
    </div>
  );
};

export default ShowFood;
