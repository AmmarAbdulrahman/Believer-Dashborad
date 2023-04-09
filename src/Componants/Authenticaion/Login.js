import React, { useState } from "react";
//import LoginBar from "./LoginBar.css";
import axios from "axios";

const Login = () => {
	
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

//		console.log(email,password);

		const data = {
			type : 0 ,
			email : email,
			password : password
		}

		console.log(email,password);

		axios.post('auth/login',data , {
			headers : {
				'x-is-dashboard': 'true' ,
			}
		})
		.then(response => {
			localStorage.setItem('token',response.data.token);
			console.log(response);
			console.log(response.data.token)
		})
		.catch(error => {
			console.log(error);
		})
	}

return (
	<div className="bodes">
<div className="container" id="container">
	<div className="form-container sign-in-container">
		<form onSubmit={handleSubmit}>
			<h1>Log In</h1>
			<span>or use your account</span>
			<input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
			<button>Login</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost" id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>



</div>
    );
};

export default Login;
