import React, { useEffect, useState } from "react";

export default function Altitude(props) {
    const {timer} = props;

    var countDownTime = new Date(timer).getTime();

    // No acceleration before launch
    const getInitialAltitude = () => {
        const initialAltitude = "NOT YET LAUNCHED";
        return initialAltitude;
    }

    const [altitude, findAltitude] = useState(getInitialAltitude)

    // Get random altitude values
    const getAltitude = () => {
        var now = new Date().getTime();
        var distance = countDownTime - now;
        if (distance <= 0 && distance > -120000) {
            findAltitude(Math.random() * 1000);
        }
        if (distance < -120000) {
            findAltitude("EXPIRED");
        }
    }

    // Update altitude every second
    useEffect(() => {
        const interval = setInterval(() => getAltitude(countDownTime), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="RocketLevels">Altitude: {altitude}</p>
    )
}