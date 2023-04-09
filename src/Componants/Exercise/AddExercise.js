import axios from "axios";
import {React , useState} from "react";
import { Form, Button } from "react-bootstrap";
import "./AddExercise.css"

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddExercise = () => {

  useEffect (()=>{
    if(!localStorage.getItem("token")){
      navigate("/signUp")
    }
  },[])

  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [category,setCategory] = useState("")
  const [en_description,setEn_description] = useState("")
  const [ar_description,setAr_description] = useState("")
  const [gif,setGif] = useState("")
  const [error,setError] = useState(false)

  const handleAddExercise = (e) => {
    if(name.length===0 || category.length===0 || en_description.length===0 || ar_description.length===0 || gif.length===0){
      e.preventDefault();
      setError(true);
    }
    else{
      const formData = new FormData();
    formData.append("name",name)
    formData.append("category",category)
    formData.append("ar_description",ar_description)
    formData.append("en_description",en_description)
    formData.append("gif",gif)

    axios.post("admin/exercises",formData , {
      headers:{
        "x-auth-token" : localStorage.getItem("token")
      }
    }).then((res)=>{
      console.log(res)
      navigate("/exercises")
      //window.alert("added success" + res.data.name)
      console.log(res)
    }).catch((err)=> {
      //errors= err;
      console.log(err)
      //window.alert("added failed" + error)
    })
    }

    
  }


  return (
    <div>
      <Button onClick={()=> navigate("/exercises")} className="button-back" variant="success">Back to</Button>
      <Form className="form">
        <Form.Group className="mb-3 label" >
          <Form.Label>Name Exercise</Form.Label>
          <Form.Control type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter name of exercise" />
          {error && name.length<=0?
        <label className="error">*Name can not be Empty</label>:""}
        </Form.Group>
        

        <Form.Group className="mb-3 label">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" onChange={(e)=>setCategory(e.target.value)} placeholder="Enter category of exercise" />
          {error && category.length<=0?
          <label className="error">*Category can not be Empty</label>:""}
        </Form.Group>
        
        <Form.Group className="mb-3 label">
          <Form.Label>English Description</Form.Label>
          <Form.Control type="text" onChange={(e)=>setEn_description(e.target.value)} placeholder="Enter english description of exercise" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {error && en_description.length<=0?
        <label className="error-d">*English Description can not be Empty</label>:""}

        <Form.Group className="mb-3 label">
          <Form.Label>Arabic Description</Form.Label>
          <Form.Control type="text" onChange={(e)=>setAr_description(e.target.value)} placeholder="أدخل الوصف الخاص بالتمرين" />
          <Form.Text className="text-muted">
            يجب عليك إدخال وصف التمرين هنا باللغة العربية
          </Form.Text>
          
        </Form.Group>
        {error && ar_description.length<=0?
          <label className="error-d">*Arabic Description can not be Empty</label>:""}

        <Form.Group className="mb-3 label">
          <Form.Label>Gif</Form.Label>
          <Form.Control type="file" onChange={(e)=>setGif(e.target.files[0])} placeholder="Enter gif of exercise" />
          {error && gif.length<=0?
        <label className="error">*Please Send a file </label>:""}
        </Form.Group>

        <Button className="add-button" onClick={handleAddExercise} variant="success">
          Add
        </Button>
      </Form>

      {/* {
        errors ? <label>{errors}</label> : ""
      } */}
    </div>
  );
};

export default AddExercise;
