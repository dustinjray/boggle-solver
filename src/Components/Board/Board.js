import React from 'react';
import Letter from './Letter/Letter';
import './BoardStyle.css';

const Board = (props) => {

    function handleMouseEnter(x, y, letter) {
        props.handleMouseEnter(x, y, letter);
    }

    function handleMouseDown(x, y, isMouseDown) {
        props.handleMouseDown(x, y, isMouseDown);
    }

    const layout = props.dice.map((row, rowID) => (
        <div className={"letter-row"} key={rowID.toString()}>
            {row.map((letter, index) => (
                <Letter
                value={letter}
                key={rowID.toString() + index.toString()}
                row={rowID}
                id={index}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                isMouseDown={props.isMouseDown}
                selected={props.selected[rowID][index]}
                />
            ))}
        </div>
    ));
    return (<div className={"board"}>{layout}</div>);
}

export default Board;