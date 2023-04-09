import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter , Route, Routes} from "react-router-dom";
import './App.css';
import Login from './Componants/Authenticaion/Login';
import AddExercise from "./Componants/Exercise/AddExercise";
import UpdateExercise from "./Componants/Exercise/UpdateExercise";
import SignInSide from "./Componants/Authenticaion/SignUp";
import ShowExercises from "./Componants/Exercise/ShowExercises";
import ShowFood from "./Componants/Food/ShowFood";
import ShowPlans from "./Componants/Plan/ShowPlans";
import ShowUsers from "./Componants/User/ShowUsers";
import AddFood from "./Componants/Food/AddFood";
import ViewExercise from "./Componants/Exercise/ViewExercise";
import ViewFood from "./Componants/Food/ViewFood"
import PageNotFound from "./Componants/Authenticaion/PageNotFound";
import Home from "./Componants/Home_/home";
import ShowDays from "./Componants/Days/ShowDays" ;
import AddDay from "./Componants/Days/AddDay";
import AddPlan from "./Componants/Plan/AddPlan"
import ViewPlan from "./Componants/Plan/ViewPlan";
import EditFood from "./Componants/Food/EditFood";
import AddDayToPlan from "./Componants/Plan/AddDayToPlan";

function App() {
      
  return (
    <div className="App">
      <BrowserRouter>
      <Routes >
        <Route path="/addFood" element={<AddFood />} />
        <Route path="/add" element={<AddExercise />} />
        <Route path="/exercises/update/:_id" element={<UpdateExercise />} />
        <Route path="/foods/edit/:_id" element={<EditFood />} />
        <Route path="/plans/addDay/:_id" element={<AddDayToPlan/>} />
        <Route path="/addDay" element={<AddDay/>} />
        <Route path="/signUp" element={<SignInSide />} />
        <Route path="/days" element={<ShowDays />} />
        <Route path="/addDay" element={<AddDay />} />
        <Route path="addPlan" element={<AddPlan />} />


        <Route path="/plans/:_id" element={<ViewPlan/>} />
        <Route path="/exercise/:_id" element={<ViewExercise />} />
        <Route path="/food/:_id" element={<ViewFood />} />
        <Route path="/users" element={<ShowUsers />} />
        <Route path="/plans" element={<ShowPlans />} />
        <Route path="/exercises" element={<ShowExercises />} />
        <Route path="/foods" element={<ShowFood />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<ShowUsers />} />
        
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
