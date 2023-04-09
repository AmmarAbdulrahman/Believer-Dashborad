import axios from "axios";
import {React , useState , useEffect } from "react";
import {Form , Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AddDay.css";

const AddDay = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/signUp")
        }
        getExercise();
    },[])

    const getExercise = () => {
        axios.get("admin/exercises", {headers:{
            "x-auth-token":localStorage.getItem("token")
        }}).then((res)=>{
            console.log(res)
            setExercises(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const [exercises, setExercises] = useState([]);
    const [title,setTitle] = useState("")
    const [error,setError] = useState(false)

    const [inputFields,setInputFields] = useState([
        {exerciseId: '' ,duration: '', rest: ''}
    ])

    const handleChangeInput = (index,event)=>{
        const data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const handleSubmit = (e) =>{

        if(title.length===0){
            e.preventDefault();
            setError(true);
        }
        else
        {
            console.log("input",inputFields)
            axios.post("admin/plans/day" , {"exercises":inputFields,"title":title} , { headers : {
                "x-auth-token":localStorage.getItem("token")
            }}).then((res)=>{
                console.log(res)
                navigate("/days")
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    const handleAddField = () => {
        let newfield = {exerciseId: '' , rest: '', duration : ''};
        setInputFields([...inputFields, newfield]);
        //setInputFields([...inputFields ,{exerciseId:"" , rest:"", duration :""}])
    }

    const handleRemoveField = (index) => {
        let data = [...inputFields];
       // if(index >= 1){
            data.splice(index, 1)
        //}
        setInputFields(data)
    }

    return(
    <div>
        <Button onClick={()=> navigate("/days")} className="button-back" variant="success">Back to</Button>
        
        <Form.Group className="mb-3 label-day-title">
          <Form.Label><span className="color-title">Title of Day</span> </Form.Label>
          <Form.Control name="title" className="label-title" type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Enter title of day" />
          {error && title.length<=0?
          <label className="error">*Title can not be Empty</label>:""}
        </Form.Group>
        <br></br>
        
        <Form className="form-day" onSubmit={handleSubmit}>
            {inputFields.map((inputField,index)=> {
                return(
                    <div key={index}>
                        {
                        inputFields.length-1===index &&
                        <Button className="button-viewss" onClick={handleAddField} >Add</Button>
                    }
                    <Form.Select name="exerciseId" aria-label="Default select example" className="mb-3 label-day" onChange={event => handleChangeInput(index,event)} >
                        <option>Select exercise from the list</option>
                        {exercises.map((exercise) => (
                            <option key={exercise._id} value={exercise._id} >{exercise.name}</option>
                        ))}
                            
                    </Form.Select>
            
                    <Form.Group className="mb-3 label-day">
                        <Form.Control name="duration" type="number" value={inputField.duration} onChange={event => handleChangeInput(index,event)}  placeholder="Enter duration of exercise" />
                    </Form.Group>
            
                    <Form.Group className="mb-3 label-day">
                        <Form.Control name="rest" type="number" value={inputField.rest} onChange={event => handleChangeInput(index,event)}  placeholder="Enter rest of exercise" />
                    </Form.Group>
                    {
                        inputFields.length!==1 &&
                        <Button className="button-deletes" variant="danger" onClick={() => handleRemoveField(index)} >Delete</Button>        
                    }
                    </div>
                )
        })}
        </Form>
        <Button className="add-button-day" onClick={handleSubmit} >Submit</Button>
    </div>
    );

}

export default AddDay;