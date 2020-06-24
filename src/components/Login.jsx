import React from 'react';
import { auth } from '../utilities/auth'
import {Redirect} from 'react-router-dom';
import './Login/login.css'

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            redirectToReferrer: false,
            message:{}
            
        }
            
        

        this.handleChange = this.handleChange.bind(this);
        this.auth = this.auth.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange(event)
    {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        });
    }
    validateForm()
    {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["email"])
        {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }
        if (typeof fields["email"] !== "undefined")
        {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"]))
            {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }
        if (!fields["password"])
        {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        this.setState({
            errors: errors
        });
       
        return formIsValid
       
    }

   async auth(e)
    {
        e.preventDefault()
        if (this.validateForm())
        {
            let fields = {};
            fields["email"] = "";
            fields["password"] = "";
            this.setState({ fields: fields });

            //  let info = {
            //      email: this.state.email,
            //      password: this.state.password,
            //      redirectToReferrer: false
            //  };
            const response = await auth(this.state);
            this.setState({ ...this.state, result: response })
                .response.json().then(errorsData =>
                {
                    console.log(errorsData);
                })
            
            
          

            
        }
     
    
   

 }


    
    render()
    {
        
        if (this.state.result)
        {
            return (<Redirect to={'/home'} />)
        }
        else
        {
            
        }
        return (
 
            <div id="login">
                <form method="post" name="loginForm" onSubmit={this.auth} >

                <label>Email</label>
                <input type="text" name="email" onChange={this.handleChange} />
                <div className="errorMsg">{this.state.errors.email}</div>
                <label>Password</label>
                <input type="password" name="password" onChange={this.handleChange} />
                <div className="errorMsg">{this.state.errors.password}</div>
                <input type="submit" className="button" value="Login" />
               </form>
            </div>
        );
    }
}

export default Login;
