import {React , useState} from "react";
import { Nav, Navbar, ListGroup, Container, Button , Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Headers from "./Headers.css";

const Header = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

    const handleLogOut = () => {
    axios
    .get("auth/logout", {
        headers: {
        "x-auth-token": localStorage.getItem("token"),
        },
    })
    .then((res) => {
        console.log(res);
        localStorage.clear();
        setShow(false);
        navigate("/signUp")
    })
    .catch((err) => {
        console.log(err);
        setShow(false);
    });
    };

    return (
    <div>
      <Navbar style={{ backgroundColor: "blueviolet" }} variant="dark">
        <Nav className="me-auto navbar_warapper">
          <Link
          className="hido"
            style={{
              color: "white",
              marginTop: 7,
              marginRight: 10,
              marginLeft: 280,
              textDecoration: "none",
            }}
            to="/users"
          >
            <span className="hido">Users</span>
          </Link>
          <Link
            style={{
              color: "white",
              marginTop: 7,
              marginRight: 10,
              textDecoration: "none",
            }}
            to="/exercises"
          >
            <span className="hido">Exercises</span>
          </Link>
          <Link
            style={{
              color: "white",
              marginTop: 7,
              marginRight: 10,
              textDecoration: "none",
            }}
            to="/foods"
          >
            <span className="hido">Food</span>
          </Link>
          <Link
            style={{
              color: "white",
              marginTop: 7,
              marginRight: 10,
              textDecoration: "none",
            }}
            to="/plans"
          >
            <span className="hido">Plans</span>
          </Link>
          <Link
            style={{
              color: "white",
              marginTop: 7,
              marginRight: 10,
              textDecoration: "none",
            }}
            to="/days"
          >
            <span className="hido">Days</span>
          </Link>
          <Button
          className="hido"
          onClick={handleOpen}
            style={{
              backgroundColor: "blueviolet",
              border: "none",
              marginLeft: 600,
            }}
          >
            {" "}
            Log Out
          </Button>
        </Nav>
      </Navbar>

      {/* <Navbar style={{ backgroundColor: "blueviolet" }} fixed="top" variant="dark">
        <Container>
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Navbar.Brand href="/home"></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/foods">Foods</Nav.Link>
            <Nav.Link href="/exercises">Exercises</Nav.Link>
            <Nav.Link href="/plans">Plans</Nav.Link>
            <Nav.Link href="/days">Days</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleOpen} eventKey={4}>
              LogOut
            </Nav.Link>
            <Nav.Link></Nav.Link>
            
          </Nav>

        </Container>
      </Navbar> */}

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Check it</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ? you want to leave ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleLogOut()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Header;

/**
 * 
 * <>
            <ListGroup className="cc">
                <ListGroup.Item className="mes"> <Link to="/add" > Add </Link> </ListGroup.Item>
                <ListGroup.Item className="mes"> <Link to="/update" > Add </Link></ListGroup.Item>
                <ListGroup.Item className="mes"> <Link to="/hello" > Add </Link></ListGroup.Item>
            </ListGroup>

            </>
 */
