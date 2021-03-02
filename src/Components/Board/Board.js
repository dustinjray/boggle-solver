import React from 'react';
import Letter from './Letter/Letter';
import './BoardStyle.css';

const Board = (props) => {

    function handlePointerEnter(x, y, letter) {
        props.handlePointerEnter(x, y, letter);
    }

    function handlePointerDown(x, y, isMouseDown) {
        props.handlePointerDown(x, y, isMouseDown);
    }

    const layout = props.dice.map((row, rowID) => (
        <div className={"letter-row"} key={rowID.toString()}>
            {row.map((letter, index) => (
                <Letter
                value={letter}
                key={rowID.toString() + index.toString()}
                row={rowID}
                id={index}
                handlePointerDown={handlePointerDown}
                handlePointerEnter={handlePointerEnter}
                isMouseDown={props.isMouseDown}
                selected={props.selected[rowID][index]}
                />
            ))}
        </div>
    ));
    return (<div className={"board"}>{layout}</div>);
}

export default Board;