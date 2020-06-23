import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../utilities/useFetch'
import axios from 'axios'
const PlayerBalance = ({game,player,bettingSession,betAmount,stakeAmount,gameStatus}) =>
{
     const [endpoint, setEndpoint] = useState(`http://localhost:8888/bettingGames/api/v1/bettings/read_single.php?betting_id=${bettingSession}&user_id=${player}&game_id=${game}`)
    const [balance, setBalance] = useState(0)
    //const [{ data, isLoading, isError }] = useFetch(endpoint)
    //console.log(data)
    
    React.useEffect(() =>
    {
        const fetchData = async () =>
        {
            const response = await axios.get(endpoint)
            setBalance(response.data.user_balance)
           
           
        }
        

        fetchData();
        
    }, []);
   
    return (

        <div>
            Balance
            {
                balance
                
            }
            
        
        </div>
    );
};


PlayerBalance.propTypes = {

};


export default PlayerBalance;
