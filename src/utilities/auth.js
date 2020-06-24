import React,{useEffect} from 'react';
import axios from 'axios';


const SERVER_URL = "http://localhost:8888/bettingGames/api/v1";

const auth =  async(data) =>
{
    const LOGIN_ENDPOINT = `${SERVER_URL}/user/login.php`;
    let response = await axios.post(LOGIN_ENDPOINT, data.fields);

    try
    {

          
        if (response.status === 200)
        {
            let userSession = response.data.userSession;
            let dateLogin = response.data.dateLogin;
            let userId = response.data.userId;
            let playerName = response.data.playername;
            localStorage.setItem("userSession", userSession);
            localStorage.setItem("dateLogin", dateLogin);
            localStorage.setItem("userId", userId);
            localStorage.setItem("playerName", playerName);
            
            return {
                status: true,
                message: response.data.message
            }
        }
        

    } catch (e)
    {
        console.log(e);
       // return false
        return {
            status: false,
            message: response.data.message
        }
        
    }
}


const logout = () =>
{
    localStorage.removeItem("userSession");
    localStorage.removeItem("dateLogin");
}

export { auth, logout } 