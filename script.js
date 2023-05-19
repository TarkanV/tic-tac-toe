/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
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
            
            node.textContent = newStatus.toUpperCase();
            status = newStatus;
            
        };
        const getStatus = () => status;
        return{setStatus, getStatus};
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

    const winningMoves = [
        [1, 2, 3], // Row 1
        [4, 5, 6], // Row 2
        [7, 8, 9], // Row 3
        [1, 4, 7], // Column 1
        [2, 5, 8], // Column 2
        [3, 6, 9], // Column 3
        [1, 5, 9], // Diagonal 1
        [3, 5, 7]  // Diagonal 2
    ];
    let winningMove = "";
    let isWin;
    let endGame = false;
    
      
    function checkWin(you, cpu){
        winningMoves.find((move) => {
            let line = "";
            
            move.forEach((i) =>{
                console.log("Case : " + i);
                line += board[i-1].getStatus();
                console.log(line);
            });
            
            if(line.match(/[X|Y]{3}/)){
                winningMove = move.join();
                console.log("We Have A Solution! : " + winningMove);
                let winner;
                if(move[0] === you.mark) {isWin = true; winner = you.name; you.score+=1;}
                else {isWin = false; winner = cpu.name; cpu.score+=1;}
                endGame = true;
                return true;   
            }
            return false;    
        });
    }  

    return{initialize, checkWin};
}
)(document);

function Player(name, mark){
    let score = 0;
    return{
        get name(){ return name},
        score,
        mark,
    };
}

gameBoard.initialize();
const you = Player("You", "x");
const cpu = Player("CPU", "o");
gameBoard.checkWin(you, cpu);

console.log(you.name);