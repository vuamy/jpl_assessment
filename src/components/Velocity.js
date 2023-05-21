import React, { useEffect, useState } from "react";

export default function Velocity(props) {
    const {timer} = props;

    var countDownTime = new Date(timer).getTime();

    // No velocity before launch
    const getInitialVelocity = () => {
        const initialAcc = "NOT YET LAUNCHED";
        return initialAcc;
    }

    const [velocity, findVelocity] = useState(getInitialVelocity)

    // Get random velocity values
    const getVelocity = () => {
        var now = new Date().getTime();
        var distance = countDownTime - now;
        if (distance <= 0 && distance > -120000) {
            findVelocity(Math.random() * 1000);
        }
        if (distance < -120000) {
            findVelocity("EXPIRED");
        }
    }

    // Update velocity value every second
    useEffect(() => {
        const interval = setInterval(() => getVelocity(countDownTime), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="RocketLevels">Velocity: {velocity}</p>
    )
}