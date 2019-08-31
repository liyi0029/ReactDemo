import React from 'react';
import Square from "./Square";

export default class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                key={'col_'+ i} 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />);
    }

    render() {
        var rows = [];
        for (let i = 0; i < 3; i++) {            
            var col = [];
            for(let j=0;j<3;j++){
                const num = i*3+j
                col.push(this.renderSquare(num));
            }
            rows.push(<div className="board-row" key={'row_'+i}>
               {col}
            </div>);
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

export function calculateWinner(squares) {
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