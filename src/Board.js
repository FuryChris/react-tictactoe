import React from 'react';
import Square from './Square';

class Board extends React.Component {


    renderSquare(i) {
        let winner;
        if (this.props.winnerMoves) {
            let moves;
            moves = this.props.winnerMoves;
            if (i === +moves.slice(0, 1) ||
                i === +moves.slice(2, 3) ||
                i === +moves.slice(4, 5)) {
                winner = true;
            }
        } else {
            winner = false;
        }

        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                winner={winner}
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

export default Board;