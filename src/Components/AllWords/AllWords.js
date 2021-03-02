import React from 'react';
import './AllWordsStyle.css';

const AllWords = (props) => {

    function handleClick(index) {
        props.handleClick(index);
    }

    return (
      <div className={props.show ? "words-div" : "words-div hidden"}>
          {props.words.map((word, index) => (
              <button className={props.found.has(word) ? "word correct" : "word"}
                      onClick={() => handleClick(index)}
                   key={`${index}${word}`}>
              <p>{word}</p>
              </button>
          ))}
      </div>
    );
}

export default AllWords;