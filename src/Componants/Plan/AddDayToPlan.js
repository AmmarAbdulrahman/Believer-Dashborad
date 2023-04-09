import { React , useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button , Form } from "react-bootstrap";
import axios from "axios";
import "./AddDayToPlan.css"

const AddDayToPlan = () => {

    const {_id} = useParams();
    const navigate = useNavigate();

    const [inputFields,setInputFields] = useState([
        { dayId: "", dayNumber: "" }
    ]);

    const [days, setDays] = useState([]);

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/signUp");
        }
        getDays();
    },[])

    const getDays = () => {
        axios.get("admin/plans/days", {headers:{
            "x-auth-token":localStorage.getItem("token")
        }}).then((res)=>{
            console.log(res)
            setDays(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleChangeInput = (index,event)=>{
        const data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const handleSubmit = () =>{
        console.log("input",inputFields)
        axios.post(`admin/plans/addDays/${_id}` , inputFields , { headers : {
            "x-auth-token":localStorage.getItem("token")
        }}).then((res)=>{
            console.log(res)
            navigate("/plans")
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleAddField = () => {
        let newDay = {dayId: '' , dayNumber: ''};
        setInputFields([...inputFields, newDay]);
        //setInputFields([...inputFields ,{exerciseId:"" , rest:"", duration :""}])
    }

    const handleRemoveField = (index) => {
        let data = [...inputFields];
        if(index >= 1){
            data.splice(index, 1)
        }
        setInputFields(data)
    }

    return(
        <div>
        <Button onClick={()=> navigate("/plans")} className="button-back" variant="success">Back to</Button>
        <Form className="form-day" onSubmit={handleSubmit}>
            {inputFields.map((inputField,index)=> {
                return(
                    <div key={index}>
                    <Form.Select name="dayId" aria-label="Default select example" className="mb-3 label-day" onChange={event => handleChangeInput(index,event)} >
                        <option>Select day from the list</option>
                        {days.map((day) => (
                            <option key={day._id} value={day._id} >{day.title}</option>
                        ))}
                    </Form.Select>
            
                    <Form.Group className="mb-3 label-day">
                        <Form.Control name="dayNumber" type="number" value={inputField.duration} onChange={event => handleChangeInput(index,event)}  placeholder="Enter number of day" />
                    </Form.Group>
            
                    <Button className="button-views" onClick={handleAddField} >Add</Button>
                    <Button className="button-deletes" variant="danger" onClick={() => handleRemoveField(index)} >Delete</Button>        
                    </div>
                )
        })}
        </Form>
        <Button className="add-button-day" onClick={()=> handleSubmit(_id)} >Submit</Button>
    </div>
    )
}

export default AddDayToPlan;
