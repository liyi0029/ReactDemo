import React from 'react';
import Board, { calculateWinner } from "./Board";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                selRow: 0,
                selCol: 0,
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,

        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                selRow: Math.floor(i / 3) + 1,
                selCol: (i % 3) + 1,
                squares: squares,
            }]),
            ascendingOrder: true,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    sortHistory(moves) {
        this.setState({
            ascendingOrder: !this.state.ascendingOrder,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const reversedHistory = history.slice().reverse();
        const reversedCoordinate = history.slice().reverse();
        let moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}(${step.selCol},${step.selRow})` :
                'Go to game start';
            return (
                <li key={move}>
                    <button style={move === this.state.stepNumber ? { fontWeight: "bold" } : {}} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        const reversedMoves = reversedHistory.map((step, move) => {

            const reversedMove = reversedHistory.length - 1 - move; //[0,1,2,3,4] => [4,3,2,1,0]
            const desc = (reversedMove) ?
                `Go to move #${move}(${step.selCol},${step.selRow})` :
                "Go to game start";

            return (
                <li key={move}>
                    <button onClick={this.jumpTo.bind(this, reversedMove)}>{desc}</button>
                </li>
            );
        });


        const sort = (<button onClick={() => this.sortHistory()}>Sort</button>);

        let status;
        if (winner) {
            status = 'Winner' + winner;
        }
        else {
            status = 'Next player' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{sort}</div>
                    {
                        this.state.ascendingOrder ?
                            <ol>{moves}</ol> :
                            <ul>{reversedMoves}</ul>
                    }
                </div>
            </div>
        )
    }
}