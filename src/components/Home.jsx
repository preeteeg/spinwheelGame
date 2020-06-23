import React, { useRef, useState, useEffect} from 'react';
import OdddsPanel from './odds.component';
import {Jumbotron,Row,Container,Col,Button} from 'react-bootstrap';

import PossibleWin from './PossibleWin';
import InputField from './fields/InputField.component';
import Wheel from './Wheel'
import axios from 'axios'
import PlayerBalance from './PlayerBalance';
import WheelSquare from './squaredOdds'
const Home=()=>
{

  const [predictions, setPredictions] = useState({})
  const [gameid, setgameId] = useState(3)
  const [userid, setUserId] = useState(1)
  const [bettingId, setBettingSessionId] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const endpoint = `http://localhost:8888/bettingGames/api/v1/game/read_single.php?id=${gameid}`;
  const [randomNum,setRandomNum]=useState({})

  React.useEffect(() =>
  {
    const fetchData = async () =>
    {
      const response = await axios.get(endpoint);
      setPredictions(JSON.parse(response.data.predictions));
      //console.log(typeof predictions)
    }

    fetchData();
  }, []);



 //INPUT FIELD
  const inputRefs = useRef([
    React.createRef(), React.createRef()
  ]);
  const [data, setData] = React.useState({});
  //const [odds, setOdd] = React.useState({});

  const [error, setError] = React.useState("");

  const handleChange = (name, value,error) =>
  {
    setData(prev => ({ ...prev, [name]: value }))
    setError("")
   // setOdd(prev => ({ ...prev, [name]: value }))
 
  }

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    let isValid = true;
     // for (let i = 0; i < inputRefs.current.length; i++)
    // {
    const validateSelectedOdd = inputRefs.current[0].current.validateOdds()
    if (!validateSelectedOdd)
    {
      setError("Please select one Odd to play!")
    }
    else
    {
      setError("")
    }
    const valid = inputRefs.current[1].current.validate()
    //console.log(validateSelectedOdd)
    if (!valid || !validateSelectedOdd)
      {
      isValid = false
      
      }
    //}

    if (!isValid && !validateSelectedOdd)
    {
      return
    }
    else
    {
      const min = 1;
      const max = 20;
     // const rand = min + Math.random() * (max - min);
      setRandomNum({ randomNum: generateNumber(min,max) });
      console.log(randomNum)
    }
  }
  const generateNumber = (min, max) =>
  {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return (
  
    <div className="App">
      
       <Container className="p-3">
       <Jumbotron className="pb-1">
          <h1 className="header">Spin wheel Game</h1>
          <Container>
            <Row>
              <Col><Wheel wheelOptions={predictions} /></Col>
              <Col><WheelSquare wheelOptions={predictions} random={randomNum}/></Col>
              <Col>

                <form onSubmit={handleSubmit}>
                  <OdddsPanel
                    ref={inputRefs.current[0]}
                    predictions={predictions}
                    name="odds"
                    onChange={handleChange}
                    validation={"required"}
                  />
                  {error && (
                    <p className="error">{error}</p>
                  )}
                  Odds selected  {data.odds}
                  <InputField
                    ref={inputRefs.current[1]}
                    name="stakeAmount"
                    label="Stake*:"
                    onChange={handleChange}
                    validation={"required|min:10|max:100"}
                    type="number"
                  />
                 

                  <PossibleWin stakeInput={data.stakeAmount} oddSelected={data.odds}  />
                  <PlayerBalance game={gameid} player={userid} bettingSession={bettingId} gameStatus={"win"} betAmount={data.stakeAmount * data.odds} stakeAmount={data.stakeAmount}/>
                  
                  <Button type='submit'>Spin</Button>
                </form>
              
              </Col>
            </Row>
           
          </Container>
        </Jumbotron>
        </Container>

    </div>
  );
}

export default Home;
