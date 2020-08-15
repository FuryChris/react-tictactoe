import React from 'react';
import Board from './Board';


const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a] + ' ' + lines[i];
        }
    }
    return null;
}
const initialState = {
    history: [
        {
            squares: Array(9).fill(null)
        },
    ],
    stepNumber: 0,
    xIsNext: true,
    //xIsNext: ((Math.round(Math.random()) === 0)) ? true : false,
};
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            // calculateWinner is 'X' or 'O' so - not null (true as boolean)
            // if clicked square is not null then also returns and function ends
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    astepNumber: history.length,

                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

    }


    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    movesReverse() {
        this.setState({
            history: this.state.history.reverse(),
        });
    }

    resetGame() {
        this.setState(initialState);
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares) ? calculateWinner(current.squares).slice(0, 1) : null;
        const winnerMoves = calculateWinner(current.squares) ? calculateWinner(current.squares).slice(2, 7) : null;
        const moves = history.map((step, move) => {
            const currentBtn = move === this.state.stepNumber ? 'moves-current' : ''
            const desc = step.astepNumber ? `Go to move # ${step.astepNumber}` : 'Go to game start';
            return (
                <li key={move}>
                    <button className={`${currentBtn} moves`} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li >
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (history.length === 10) {
            status = `Draw! `
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        console.log(`winnermoves: ${winnerMoves}`)
        return (

            <div className="game">
                <div className="game-board">
                    <Board
                        winnerMoves={winnerMoves}
                        onClick={i => this.handleClick(i)}
                        squares={current.squares} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <button className="btn" onClick={() => this.movesReverse()}>Sort Moves</button>
                    <button className="btn" onClick={() => this.resetGame()}>New Game</button>
                    <ol className="moves-list"><h2>Moves:</h2>{moves}</ol>

                </div>
            </div>
        );
    }
}


export default Game;
