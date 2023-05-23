/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
function Player(name, mark, nodeName) {
    let score = 0;
    let upScore = () => {
      score += 1;
      return score;
    };
    let node = document.querySelector(nodeName);
    let isTurn = false;
  
  
    return {
      get name() {
        return name;
      },
      upScore,
      mark,
      node,
  
    };
  }
  
  function cpuChoice(){

  }



const gameBoard = ((doc) => {
  const templateCell = doc.querySelector("#template-cell");
  const boardNode = doc.querySelector(".container");
  
  const menuNode = doc.querySelector(".menu-box");
  const startButton = doc.querySelector(".start-button");
  const restartButton = doc.querySelector(".restart-button");
  const outcomeNode = doc.querySelector(".outcome");
  const turnInfo = doc.querySelector(".turn-info");
  let turnCounter = 1;
  let player1;
  let player2;
  let players;
  let cpuMode = false;

  let winningMove = "";
  let isWin;
  let endGame = false;
  
  function Cell() {
    let status = "";
    const node = (() => {
      const clone = templateCell.content.cloneNode(true).firstElementChild;
      boardNode.appendChild(clone);
      return clone;
    })();

    const setStatus = (newStatus) => {
      node.textContent = newStatus.toUpperCase();
      status = newStatus;
    };
    const getStatus = () => status;
    return { setStatus, getStatus, node };
  }

  const cells = [];
  let currPlayerIDX = 0;

  const markCase = (cellNode, player) => {
    let index = Array.from(cellNode.parentNode.children).indexOf(cellNode) - 1;
    console.log("Index : " + index);
    cells[index].setStatus(player.mark);
    
  };

  const initialize = () => {
    endGame = false;
    turnCounter = 1;
    if(cells.length > 0) {
      cells.forEach(cell=> boardNode.removeChild(cell.node));
      cells.length = 0;
      
    }
    for (let i = 0; i < 9; i += 1) {
      cells.push(Cell());
      
    }
    
  };

  function setPlayerName(inputName){
    let name = menuNode.querySelector(inputName).value;
    document.querySelector("." + inputName.split("-")[1]).querySelector("h2").textContent = name;
    return name;
  }

  startButton.addEventListener("click", () => {
    menuNode.classList.toggle("hidden");
    cpuMode = menuNode.querySelector("#mode").value;
    initialize();
    
    player1 = Player(setPlayerName("#name-player1"), "X");
    player2 = Player(setPlayerName("#name-player2"), "O");
    players = [player1, player2];
    
    gameBoard.play();
    // const cpu = CPUPlayer("CPU", "o");

  
  });

  (function restartGame(){
    restartButton.addEventListener("click", () => {
      menuNode.classList.toggle("hidden");
      initialize();
      gameBoard.play(players);
      currPlayerIDX = 0;
  });
  })();

  const winningMoves = [
    [1, 2, 3], // Row 1
    [4, 5, 6], // Row 2
    [7, 8, 9], // Row 3
    [1, 4, 7], // Column 1
    [2, 5, 8], // Column 2
    [3, 6, 9], // Column 3
    [1, 5, 9], // Diagonal 1
    [3, 5, 7], // Diagonal 2
  ];
  
  function stopGame(winMsg){
      menuNode.classList.toggle("hidden");
      restartButton.parentNode.classList.toggle("hidden", false);
      startButton.parentNode.classList.toggle("hidden", true);

      outcomeNode.textContent = winMsg;
      endGame = true;
  }

  function checkWin(you, cpu) {

    

    winningMoves.find((move) => {
      let line = "";
      console.log("Turn : " + turnCounter);

      

      move.forEach((i) => {
       
        line += cells[i - 1].getStatus();
        
      });

      if (line.match(/X{3}|O{3}/)) {
        winningMove = move.join();
        let winner;

        if (line[0] === you.mark) {
          isWin = true;
          winner = you;
        } else {
          isWin = false;
          winner = cpu;
        }
        winner.upScore();
        console.log("Someone Won");
        stopGame(`${winner.name} wins!`);
        return true;
      }
      
      
      return false;
    });
  }
  
  function playerAction(targetCase, cell){
    if(!cell.getStatus() && !endGame){
      const player = players[currPlayerIDX];
      console.log("test : " + targetCase);
      markCase(targetCase, player);
      checkWin(...players);
      if(!endGame){
        
        if(turnCounter == 9){
          console.log("FINISH");
          stopGame("It's a tie");
          return;
        }
        console.log(currPlayerIDX);
        currPlayerIDX = +(!currPlayerIDX);
        turnInfo.textContent = `It's ${players[currPlayerIDX].name} turn!`;
        turnCounter += 1;
      }      
  }
  }

  function play() {

    turnInfo.textContent = `It's ${players[0].name} turn!`
    console.log(cells[0].node);
    cells.forEach((cell) =>
      cell.node.addEventListener("click", (e) => {
        playerAction(e.target, cell);
        
      }
      ));
  }

  return { initialize, checkWin, play };
})(document);


// Player constructor





