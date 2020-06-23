import React,{useEffect} from 'react';
import axios from 'axios';


const SERVER_URL = "http://localhost:8888/bettingGames/api/v1";

const auth =  async(data) =>
{
    const LOGIN_ENDPOINT = `${SERVER_URL}/user/login.php`;

    try
    {

        let response = await axios.post(LOGIN_ENDPOINT, data);
        
        if (response.status === 200)
        {
            let userSession = response.data.userSession;
            let dateLogin = response.data.dateLogin;
           
            localStorage.setItem("userSession", userSession);
            localStorage.setItem("dateLogin", dateLogin);
            

        }


    } catch (e)
    {
        console.log(e);
        
    }
}


const logout = () =>
{
    localStorage.removeItem("userSession");
    localStorage.removeItem("dateLogin");
}

export { auth, logout } 