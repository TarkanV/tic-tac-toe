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
  
    const playTurn = (cellNode, cells) => {
      let index = Array.from(cellNode.parentNode.children).indexOf(cellNode) - 1;
      cells[index].setStatus(mark);
    };
  
    return {
      get name() {
        return name;
      },
      upScore,
      mark,
      node,
      playTurn,
    };
  }
  
  function CPUPlayer(name, mark, nodeName) {
    const prototype = Player(name, mark, nodeName);
    const makeChoice = () => {};
  
    return { ...prototype };
  }



const gameBoard = ((doc) => {
  const templateCell = doc.querySelector("#template-cell");
  const boardNode = doc.querySelector(".container");
  const outcomeNode = doc.querySelector(".outcome");
  const menuNode = doc.querySelector(".menu-box");
  const startButton = doc.querySelector(".start-button");
  const turnInfo = doc.querySelector("turn-info");
  let player1;
  let player2;
  let players;
  
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

  const initialize = () => {
    if(cells.length > 0) cells.length = 0;
    for (let i = 0; i < 9; i += 1) {
      cells.push(Cell());
      if (i >= 3 && i <= 5) cells[cells.length - 1].setStatus("");
      else cells[cells.length - 1].setStatus("");
    }
  };

  function setPlayerName(inputName){
    let name = menuNode.querySelector(inputName).value;
    document.querySelector("." + inputName.split("-")[1]).querySelector("h2").textContent = name;
    return name;
  }

  startButton.addEventListener("click", () => {
    menuNode.classList.toggle("hidden");
    initialize();
    
    player1 = Player(setPlayerName("#name-player1"), "X");
    player2 = Player(setPlayerName("#name-player2"), "O");
    players = [player1, player2];
    gameBoard.play(players);
    // const cpu = CPUPlayer("CPU", "o");

    console.log(player1.name);
  });

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
  let winningMove = "";
  let isWin;
  let endGame = false;

  function checkWin(you, cpu) {
    winningMoves.find((move) => {
      let line = "";

      move.forEach((i) => {
        console.log("Case : " + i);
        line += cells[i - 1].getStatus();
        console.log(line);
      });

      if (line.match(/X{3}|O{3}/)) {
        winningMove = move.join();
        console.log("We Have A Solution! : " + winningMove);
        let winner;
        console.log("Move : " + move[0]);
        if (line[0] === you.mark) {
          isWin = true;
          winner = you;
        } else {
          isWin = false;
          winner = cpu;
        }
        winner.upScore();
        outcomeNode.textContent = `${winner.name} wins!`;
        
        endGame = true;
        return true;
      }
      return false;
    });
  }


  function play(players) {
    console.log(cells[0].node);
    cells.forEach((cell) =>
      cell.node.addEventListener("click", (e) => {
        if(!cell.getStatus() && !endGame){
            const player = players[currPlayerIDX];
            player.playTurn(e.target, cells);
            checkWin(...players);
            currPlayerIDX = +(!currPlayerIDX);
        }
      })
    );
  }

  return { initialize, checkWin, play };
})(document);


// Player constructor





