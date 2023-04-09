import {React , useState , useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import { Form , Button } from "react-bootstrap";
import "./EditFood.css";

const EditFood = () => {

    const {_id} = useParams()

    const navigate = useNavigate()

    const [name,setName] = useState('')
    const [ar_name,setAr_name] = useState('')
    const [calories,setCalories] = useState('')
    const [amount,setAmount] = useState("")
    const [category,setCategory] = useState('')
    const [image,setImage] = useState(null)

    useEffect(()=>{
        if(!localStorage.getItem("token")){
          navigate("/signUp")
        }
        else
        {getFood();}
      },[])

      const getFood = async () => {
    
        await axios.get(`admin/food/${_id}` , { headers:{
          "x-auth-token" : localStorage.getItem("token")
        }}).then((data)=>{
          
          const {name , category , ar_name , calories , amount} = data.data
          setName(name)
          setAr_name(ar_name)
          setCalories(calories)
          setAmount(amount)
          setCategory(category)
    
        }).catch((err)=>{
          console.log(err)
        })
      }

      const editFood = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name" ,name)
        formData.append("ar_name",ar_name)
        formData.append("category" ,category)
        formData.append("calories" ,calories)
        formData.append("amount" ,amount)
        formData.append("image",image)
    
        const response = await axios.put(`admin/food/${_id}` ,formData , {headers: {
          "x-auth-token" : localStorage.getItem("token")
        }} ).then(()=>{
          navigate("/foods")
          console.log(response)
        }).catch((err)=>{
          console.log(err)
        })
      }

    return(
        <div>
      <Button onClick={()=> navigate("/foods")} className="button-back" variant="success">Back to</Button>
    <Form onSubmit={editFood} className="form">
        <Form.Group className="mb-3 label" >
          <Form.Label>Name of Food</Form.Label>
          <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name of food" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Arabic Name of Food</Form.Label>
          <Form.Control type="text" value={ar_name} onChange={(e)=>setAr_name(e.target.value)} placeholder="أدخل اسم الخاص بالغذاء" />
          <Form.Text className="text-muted">
            يجب عليك إدخال اسم الغذاء هنا باللغة العربية
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter category of exercise" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Calories</Form.Label>
          <Form.Control type="number" value={calories} onChange={(e)=>setCalories(e.target.value)} placeholder="Enter category of exercise" />
        </Form.Group>

        <Form.Group className="mb-3 label">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter category of exercise" />
        </Form.Group>

        <Form.Group className="mb-3 label" controlId="formBasicPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e)=>setImage(e.target.files[0])} placeholder="Enter gif of exercise" />
        </Form.Group>

        <Button className="add-button" onClick={editFood} variant="success">
          update
        </Button>
      </Form>

        </div>
    )
}

export default EditFood;