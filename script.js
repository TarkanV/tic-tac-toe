/* eslint-disable no-unused-vars */

const gameBoard = ((doc)=>{
    const templateCell = doc.querySelector("#template-cell");
    const boardNode = doc.querySelector(".container");
    const board = [];

    function Cell(){   
        let status = "empty";
        const node = (() => {
            const clone = templateCell.content.cloneNode(true).firstElementChild;
            boardNode.appendChild(clone);
            return clone;
        }
        )();

        const setStatus = (newStatus) =>{
            console.log(node);
            node.textContent = newStatus.toUpperCase();
            status = newStatus;
        };
        return{setStatus};
    } 
    
    const initialize = () =>{
        for(let i = 0; i < 9; i+=1) {
                board.push(Cell());
                if(i >= 3 && i <= 5) 
                    board[board.length - 1].setStatus("O");
                else 
                    board[board.length - 1].setStatus("X");

            }

    };

    return{initialize};
}
)(document);

gameBoard.initialize();