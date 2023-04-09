import axios from "axios";
import {React , useState , useEffect} from "react";
import {Form ,  Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import "./AddFood.css"

const AddFood = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/signUp")
    }
  },[])

    const [name,setName] = useState("")
    const [ar_name,setAr_name] = useState("")
    const [category,setCategory] = useState("")
    const [calories,setCalories] = useState("")
    const [amount,setAmount] = useState("")
    const [image,setImage] = useState("")


    let formData = new FormData();
    formData.append("name",name)
    formData.append("ar_name",ar_name)
    formData.append("category",category)
    formData.append("calories",calories)
    formData.append("amount",amount)
    formData.append("image",image)


    const handleAddFood = () => {

      axios.post("admin/food" , formData , {
        headers : {
          "x-auth-token" : localStorage.getItem("token")
        }
      }).then((response)=> {
        console.log(response)
        navigate("/foods");
      
      }).catch((error) => {
        console.log(error)
        window.alert("added failed" + error)
      })
    }


    return (
        <div>
      <Button onClick={()=> navigate("/foods")} className="button-back" variant="success">Back to</Button>
    <Form className="form">
        <Form.Group className="mb-3 label" >
          <Form.Label>Name of Food</Form.Label>
          <Form.Control type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter name of food" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Arabic Name of Food</Form.Label>
          <Form.Control type="text" onChange={(e)=>setAr_name(e.target.value)} placeholder="أدخل اسم الخاص بالغذاء" />
          <Form.Text className="text-muted">
            يجب عليك إدخال اسم الغذاء هنا باللغة العربية
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" onChange={(e)=>setCategory(e.target.value)} placeholder="Enter category of exercise" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Calories</Form.Label>
          <Form.Control type="number" onChange={(e)=>setCalories(e.target.value)} placeholder="Enter category of exercise" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" onChange={(e)=>setAmount(e.target.value)} placeholder="Enter category of exercise" />
        </Form.Group>

        <Form.Group className="mb-3 label" controlId="formBasicPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e)=>setImage(e.target.files[0])} placeholder="Enter gif of exercise" />
        </Form.Group>

        <Button className="add-button" onClick={handleAddFood} variant="success">
          Add
        </Button>
      </Form>

        </div>
    )
}


export default AddFood;