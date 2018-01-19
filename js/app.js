
let fill = NaN;
let playerTurn = true;
let blocks = $('td');
let winner = '';
let board = [fill, fill, fill, fill, fill, fill, fill, fill, fill];
let turn = 0;
$('#winner').hide();
$('#btn1').hide();

blocks.click( (e) => {
  if(playerTurn) {
    board[e.currentTarget.id] = 'X';
    e.currentTarget.innerHTML = 'X';
  }
  else {
    board[e.currentTarget.id] = 'O';
    e.currentTarget.innerHTML = 'O';
  } 

  turn++;

  if(turn > 4) {
     if(verifyWinner(board)) {
      winner = e.currentTarget.innerHTML;
      $('#winner').text('The Winner is: ' + e.currentTarget.innerHTML);
      $('#winner').show();
      $('#btn1').show();
      blocks.off();
     }

     if(turn === 9 && verifyWinner(board) === false) {
      $('#winner').text('TIE');
      $('#winner').show();
      $('#btn1').show();
      blocks.off();
     }
      
  }

  playerTurn = !playerTurn;


});

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