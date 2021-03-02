import React from 'react';
import './LetterStyle.css';

const Letter = (props) => {
    return (
        <div className={props.selected ? "letter selected" : "letter"}
             onMouseDown={(e) => {
                 e.preventDefault();
                 props.handlePointerDown(props.row, props.id, true);
             }}
             onMouseEnter={(e) => {
                 if(props.isMouseDown){
                     e.preventDefault();
                     props.handlePointerEnter(props.row, props.id, props.value);
                 }
             }}
        >
            <p>{props.value}</p>
        </div>
    );
}

export default Letter;