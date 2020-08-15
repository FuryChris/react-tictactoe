import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={(props.value === 'X') ? 'square valX' : 'square valO'}
            onClick={props.onClick} >
            {props.value}
        </button >
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const rows = [0, 1, 2]
        return (
            <div>

                {rows.map((value, index) => {
                    return <div className="board-row">
                        {this.renderSquare(index * 3)}
                        {this.renderSquare(index * 3 + 1)}
                        {this.renderSquare(index * 3 + 2)}
                    </div>
                })}
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            //xIsNext: ((Math.round(Math.random()) === 0)) ? true : false,
        };
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
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
        setCurrentMove(this.state.stepNumber + 1);

    }


    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
        setCurrentMove(step);
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button className="moves moves-current" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (

            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={i => this.handleClick(i)}
                        squares={current.squares} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
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
            return squares[a];
        }
    }
    return null;
}

function setCurrentMove(move) {
    const moves = [...document.querySelectorAll('.moves')]
    console.log(moves[move] + ' ...........' + move);

    moves.forEach(element => {
        element.classList.remove('moves-current');
    });

    if (moves[move] !== undefined) {
        moves[move].classList.add("moves-current");
    } else {
        return;
    }
}