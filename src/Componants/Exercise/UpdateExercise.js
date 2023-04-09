import {React , useState , useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import { Form , Button } from "react-bootstrap";
import AddExercise from "./AddExercise.css";
import "./UpdateExercise.css"

const UpdateExercise = () => {

  const {_id} = useParams()

  const navigate = useNavigate()

  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [en_description,setEn_description] = useState('')
  const [ar_description,setAr_description] = useState('')
  const [gif,setGif] = useState(null)

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/signUp")
    }
    else
    {getExercise();}
  },[])

  const getExercise = async () => {
    
    await axios.get(`admin/exercises/${_id}` , { headers:{
      "x-auth-token" : localStorage.getItem("token")
    }}).then((data)=>{
      
      const {name , category , ar_description , en_description} = data.data
      setName(name)
      setAr_description(ar_description)
      setCategory(category)
      setEn_description(en_description)

    }).catch((err)=>{
      console.log(err)
    })
  }

  const editExercise = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name" ,name)
    formData.append("category" ,category)
    formData.append("ar_description" ,ar_description)
    formData.append("en_description" ,en_description)
    formData.append("gif",gif)

    const response = await axios.put(`admin/exercises/${_id}` ,formData , {headers: {
      "x-auth-token" : localStorage.getItem("token")
    }} ).then(()=>{
      navigate("/exercises")
      console.log(response)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
          <div>
      <Button onClick={()=> navigate("/exercises")} className="button-back" variant="success">Back to</Button>
      <Form onSubmit={editExercise} className="form">
        <Form.Group className="mb-3 label" >
          <Form.Label>Name Exercise</Form.Label>
          <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name of exercise" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter category of exercise" />
        </Form.Group>
        
        <Form.Group className="mb-3 label" controlId="formBasicPassword">
          <Form.Label>English Description</Form.Label>
          <Form.Control type="text" value={en_description} onChange={(e)=>setEn_description(e.target.value)} placeholder="Enter english description of exercise" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 label" controlId="formBasicPassword">
          <Form.Label>Arabic Description</Form.Label>
          <Form.Control type="text" value={ar_description} onChange={(e)=>setAr_description(e.target.value)} placeholder="أدخل الوصف الخاص بالتمرين" />
          <Form.Text className="text-muted">
            يجب عليك إدخال وصف التمرين هنا باللغة العربية
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 label" controlId="formBasicPassword">
          <Form.Label>Gif</Form.Label>
          <Form.Control type="file" onChange={(e)=>setGif(e.target.files[0])} placeholder="Enter gif of exercise" />
        </Form.Group>

        <Button className="update-button" onClick={editExercise} variant="success">
          update
        </Button>
      </Form>
    </div>
  )

}

export default UpdateExercise;