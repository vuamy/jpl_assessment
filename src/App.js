import './App.css';
import React, { useEffect, useState } from "react";
import LaunchList from './components/LaunchList';

function App() {
  // Array to hold entered launches
  const [launches, setLaunches] = useState([]);

  // Function to add saved launches to array
  const addLaunch = (rocketName, launchName, dateAndTime) => {
    const launch = {
      id: Math.floor(Math.random() * 1000),
      rocket: rocketName,
      launchpad: launchName,
      datetime: dateAndTime,
    };

    setLaunches(oldLaunches => [...oldLaunches, launch]);
  }

  // Fetch Rockets from API to display on dropdown
  const [rockets, setRockets] = useState([]);

  const fetchRocketData = () => {
      fetch("https://api.spacexdata.com/v4/rockets")
      .then(response => {
          return response.json()
      })
      .then(data => {
          setRockets(data)
      })
  }

  // Fetch Launchpads from API to display on dropdown
  const [launchpads, setLaunchpads] = useState([]);

  const fetchLaunchpadData = () => {
      fetch("https://api.spacexdata.com/v4/launchpads")
      .then(response => {
          return response.json()
      })
      .then(data => {
          setLaunchpads(data)
      })
  }

  // Grab rocket and launchpad data
  useEffect(() => {
      fetchRocketData()
      fetchLaunchpadData()
  }, [])

  // Default constructor
  const getInitialState = () => {
      const value = '';
      return value;
  }

  // Save rocket and launchpad on change
  const [rocketValue, setRocketValue] = useState(getInitialState);
  const [launchpadValue, setLaunchpadValue] = useState(getInitialState);

  const handleRocketChange = (event) => {
      setRocketValue(event.target.value);
      console.log(event.target.value);
  }
  const handleLaunchpadChange = (event) => {
      setLaunchpadValue(event.target.value);
  }

  // Save date and time value on change
  const [dateTime, setDateTime] = useState(getInitialState);

  const handleDateTimeChange = (event) => {
      setDateTime(event.target.value);
      console.log(event.target.value);
  }

   // save data to array launchItems
   const handleSubmit = (event) => {
      event.preventDefault();

      if(!rocketValue || !launchpadValue || !dateTime ){
        alert("Enter all items.")
        return;
      }

      addLaunch(rocketValue, launchpadValue, dateTime);
  }


  return (
    <div className="MissionControl">
      <h1>Rocket Mission Control Simulation</h1>
      <form className="CreateLaunchPage">
            <h2>Create New Launch</h2>
            <div className="CreateRocket">
                <label> Select a Rocket </label>
                <select className="DropdownOptions" onChange={handleRocketChange}>
                    {rockets.map(rocket => (
                        <option key ={rocket.id} value ={rocket.name}>{rocket.name}</option>
                    ))}
                </select>
                <p>Rocket Name: {rocketValue}</p>
            </div>  
            <div className="CreateLaunchpad">
                <label> Select a Launchpad </label>
                <select className="DropdownOptions" onChange={handleLaunchpadChange}>
                    {launchpads.map(launchpad => (
                        <option key ={launchpad.id} value ={launchpad.name}>{launchpad.name}</option>
                    ))}
                </select>
                <p>Launchpad Name: {launchpadValue}</p>
            </div>
            <label> Select a Date and Time for Launch </label>
            <input type="datetime-local" onChange={handleDateTimeChange}></input>
            <br></br>
            <button className="SubmitButton" onClick={handleSubmit}>Enter Launch</button>
        </form>
        <LaunchList launches={launches}/>
    </div>
  );
}

export default App;
