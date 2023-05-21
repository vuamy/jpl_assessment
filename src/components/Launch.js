import Countdown from './Countdown.js';
import Altitude from './Altitude.js';
import Velocity from './Velocity.js';

export default function Launch(props) {

    const {item} = props;
    const timer = item.datetime;

    return (
        <div className="SingleLaunch">
            <div>
                <p>Rocket Name: {item.rocket}</p>
                <p>Launchpad Name: {item.launchpad}</p>
                <p>Date/Time of Launch: {item.datetime}</p>
            </div>
            <div>
                <Countdown timer={timer}/>
                <Altitude timer={timer}/>
                <Velocity timer={timer}/>
            </div>
        </div>
    )
}