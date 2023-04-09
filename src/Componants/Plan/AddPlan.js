import axios from "axios";
import {React , useState , useEffect} from "react";
import {Form,Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import "./AddPlan.css";

const AddPlan =() =>{

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/signUp")
        }
    },[])

    const [title,setTitle] = useState("")
    const [BMI,setBMI] = useState("")
    const [gender,setGender] = useState("")
    const [calories,setCalories] = useState("")


//    let x = JSON.stringify(formData)  

    const handleAddPlan = () => {
    
        let formData = new FormData();

        formData.append("title",title)
        formData.append("bmi",BMI)
        formData.append("gender",gender)
        formData.append("calories",calories)

        axios.post("admin/plans" , {"title":title , "BMI":BMI , "gender":gender , "calories":calories } , {headers:{
            "x-auth-token" : localStorage.getItem("token")
        }}).then((res)=>{
            console.log(res)
            navigate("/plans")
        }).catch((err)=>{
            console.log(err)
            console.log(gender)
        })
    }

    return(
        <div>
            <Button onClick={()=> navigate("/plans")} className="button-back" variant="success">Back to</Button>
    <Form className="form">
        <Form.Group className="mb-3 label" >
          <Form.Label>Title of Plan</Form.Label>
          <Form.Control type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title of Plan" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>BMI</Form.Label>
          <Form.Control type="number" onChange={(e)=>setBMI(e.target.value)} placeholder="Enter BMI of plan" />
        </Form.Group>

        <Form.Select aria-label="Default select example" className="mb-3 labels" onChange={(e)=>setGender(e.target.value)}>
        <option>Select the Gender of Plan</option>
        <option>Male</option>
        <option>Female</option>
        </Form.Select>

        <Form.Group className="mb-3 label">
          <Form.Label>Calories</Form.Label>
          <Form.Control type="number" onChange={(e)=>setCalories(e.target.value)} placeholder="Enter calories of plan" />
        </Form.Group>

        <Button className="add-button" onClick={handleAddPlan} variant="success">
          Add
        </Button>
      </Form>
            
        </div>
    )

}
export default AddPlan;