import React, { useEffect, useState } from "react";

export default function Countdown(props) {
    const {timer} = props;

    var isLaunched = false;

    // Default display before launch
    const getInitialTimer = () => {
        const initialTime = "NOT YET LAUNCHED";
        return initialTime;
    }

    // Create states for timer
    const [timeLeft, getTimeLeft] = useState(getInitialTimer);

    var countDownTime = new Date(timer).getTime();

    // Function to get the leftover time and store in timeLeft
    const getCountdown = () => {
            var now = new Date().getTime();
            var distance = countDownTime - now;
            if (distance <= 300546) {
                isLaunched = true;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                getTimeLeft(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
                
                if (distance < 0) {
                getTimeLeft("LAUNCHED");
                }
            }
    }

    // Every second update the timer    
    useEffect(() => {
        const interval = setInterval(() => getCountdown(countDownTime), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="CountdownTimer">
        <p className="CountdownTarget">{timeLeft}</p>
    </div>
    )
}