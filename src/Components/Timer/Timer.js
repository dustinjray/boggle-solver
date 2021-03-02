import React from 'react';

const Timer = (props) => {
    const [time, setTime] = React.useState(90);

    const updateTime = () => setTime(time - 1);

    React.useEffect(() => {
        let timerID = null;
            setTime(90);
            timerID = setInterval(updateTime, 1000);
    }, [props.gameStart, time]);





    return (
        <h2>Timer: {time}</h2>
    );
}

export default Timer;