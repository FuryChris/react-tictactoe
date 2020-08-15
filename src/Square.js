import React from 'react';

function Square(props) {
    const setClass = () => {
        const squareType = (props.value === 'X') ? 'square valX' : 'square valO'
        const winner = props.winner ? 'winner' : 'null';
        return (`square ${squareType} ${winner}`)
    }
    return (
        <button className={setClass()}
            onClick={props.onClick} >
            {props.value}
        </button >
    );
}

export default Square;