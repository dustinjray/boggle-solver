import React from 'react';
import './GuessStyle.css';

const guess = (props) => {
    return (
        <div className={"guess-div"}>
            <h2 className={"guess"}>{props.string}</h2>
        </div>
    );
}

export default guess;