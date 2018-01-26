
let filler = NaN;
let playerTurn = true;
let blocks = $('td');
let winner = '';
let board = Array(9).fill(filler);
let turn = 0;
$('#winner').hide();
$('#btn1').hide();

blocks.click( (e) => runGame(e) );

function runGame(e) {
  if( e.currentTarget.innerHTML == "") {
    if(playerTurn) {
      board[e.currentTarget.id] = 'X';
      e.currentTarget.innerHTML = 'X';
      turn++;
      if(isEnd())
        return
      playerTurn = !playerTurn;
      iaTurn();
    }
  }
}

function iaTurn() {
  //play() from ia.js
  iaPlay = play(board);
  let index = diffArray(board, iaPlay.board);
  board[index] = 'O';
  blocks[index].innerHTML = 'O';
  if(isEnd())
    return
  
  turn++;   
  playerTurn = !playerTurn;
}

function restartGame() {
  board = Array(9).fill(filler);
  turn = 0;
  playerTurn = true;
  $('#winner').hide();
  $('#btn1').hide();
  $('table td').text("");
  blocks.click ( (e) => runGame(e))
}

function isEnd() {
  if(turn > 4) {
    if(verifyWinner(board)) {
     winner = playerTurn ? 'X' : 'O';
     $('#winner').text('The Winner is: ' + winner);
     showEndGame();
     return true
    }
    if(turn === 9 && verifyWinner(board) === false) {
      $('#winner').text('DRAW');
      showEndGame();
     return true;
    }  
 }
}

function showEndGame() {
  $('#winner').show();
  $('#btn1').show();
  blocks.off();
}

function verifyWinner(board) {
  if( (board[0] === board[1] && board[0] === board[2]) ||
      (board[3] === board[4] && board[3] === board[5]) ||
      (board[6] === board[7] && board[6] === board[8]) ||
      (board[0] === board[3] && board[0] === board[6]) ||
      (board[1] === board[4] && board[1] === board[7]) ||
      (board[2] === board[5] && board[2] === board[8]) ||
      (board[0] === board[4] && board[0] === board[8]) || 
      (board[2] === board[4] && board[2] === board[6]) ) {
        return true;
      }
      
      return false;
}