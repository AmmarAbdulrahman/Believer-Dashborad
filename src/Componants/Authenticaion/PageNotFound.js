import React from "react";
import { Row , Col , Container , Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pageNotFound from "./pageNotFound.css"


const PageNotFound = () => {

    const navigate = useNavigate()

    return (
        <Container>
            <Row>
                <Col xs={{span: 8, offset:2 }} style= {{marginTop :30}} >
                    <div>
                        <h1 >Oops!</h1>
                        <p>Sorry, unexpected error has occurred.</p>
                        <p style={{ color: "red" }}> Not found </p>
                    </div>
                    <img className="photo-not-found" src="http://res.cloudinary.com/dqhzikck7/image/upload/v1681947726/k5id8r6cyhuwssjd8jbf.jpg"></img>
                    <Button onClick={()=> navigate("/", { replace:true })} className="buttons" variant="success">Back to</Button>
                </Col>
            </Row>
        </Container>
    )

}

export default PageNotFound;