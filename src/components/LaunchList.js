import Launch from './Launch'

export default function LaunchList(props) {

    const {launches} = props;

    return (
        <ul className="LaunchList">
            <h2> Upcoming Launches </h2>
            {launches.map((launch) =>
                <p key={launch.id}><Launch item={launch}/></p>
            )}
        </ul>
    )
}