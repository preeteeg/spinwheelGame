import React from 'react';
import { auth } from '../utilities/auth'
import {Redirect} from 'react-router-dom';


class Login extends React.Component
{
    constructor(props)
    {
        super(props);
         this.state = {
            email: '',
             password: '',
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.auth = this.auth.bind(this);
    }

    handleChange(event)
    {
      this.setState({[event.target.name]: event.target.value});
    }
    
 async auth()
   {
    let info = {
      email: this.state.email,
      password: this.state.password,
      redirectToReferrer: false
    };

     await auth(info);
   

 }

    
    render()
    {
        if (this.state.redirectToReferrer || localStorage.getItem('userSession')){
            return (<Redirect to={'/home'}/>)
            }
        return (
 
            <div>
                <label>Username</label>
                <input type="text" name="email" onChange={this.handleChange} />
                <label>Password</label>
                <input type="password" name="password" onChange={this.handleChange} />
                <input type="submit" value="Login" onClick={this.auth} />
            </div>
        );
    }
}

export default Login;
