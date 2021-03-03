import React from 'react';

const Timer = (props) => {
    const [time, timeLeft] = React.useState(90);

    React.useEffect(() => {
        const timerId = setInterval(() => {
            timeLeft(time - 1);
        }, 1000);

        return function cleanup() {
            clearInterval(timerId);
        }
    }, [time]);

    if (time === 0) {
        props.showResults();
    }

    return (
        <h2>Time: {time}</h2>
    )
}

export default Timer;