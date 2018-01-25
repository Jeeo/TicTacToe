class tNode  {
  constructor(board) {
    this.children = [];
    this.board = (board === undefined) ?  Array(9).fill(NaN) : Object.assign({},board);
    this.value = 0;
  }
}

function genTree(node, depth) {
  if (depth < 0 ) {
    return;
  }

  //gen children of node!
  for(let i = 0; i < 9; i++) {
    let n = new tNode(node.board);
    if ( !node.board[i] ) {
      if(depth % 2 === 0 ) {
        n.board[i] = "O";
      } 
      else {
        n.board[i] = "X";
      }

      if( verifyWinner(node.board) ){
        if(calcDepth(node) % 2 !== 0) {
          node.value = 1;
        } else {
          node.value = -1;
        }
        return;
      }
      else{
        node.children.push(n);
        genTree(n, depth-1);
      }
        
    }
    else {
      if( verifyWinner(node.board) ){
        if(calcDepth(node) % 2 !== 0) {
          node.value = 1;
        } else {
          node.value = -1;
        }
        return;
      }
      continue;
    }
  }
  return
}   


function miniMax(node, depth = calcDepth(node)) {

  if(  isLeaf(node) || depth === 0 ) {
    return node.value;  
  }

  if (calcDepth(node) % 2 !== 0) {
    let a = Number.MAX_SAFE_INTEGER;
    node.children.forEach( element => {
      a = Math.min(a, miniMax(element, depth-1))  
    });  
    return a;
  }
  else {
    let a = Number.MIN_SAFE_INTEGER;
    node.children.forEach( element => {
      a = Math.max(a, miniMax(element, depth-1))
    })
    return a;
  }
}

function isLeaf(node) {
  return (node.children.length === 0) ? true : false;
}


// function searchTest(node, depth) {
//   if( (isLeaf(node) || depth == 0) && node.value === 0 ) {
//     console.log(verifyWinner(node.board))
//     return;
//   } 
    
//   node.children.forEach( element => {
//     searchTest(element, depth-1);
//   })
//   return
// }

function calcDepth(node) {
  let qnt = 0;
  for(i=0; i<9;i++){
    if (node.board[i])
      qnt++; 
  }
  return 9-qnt;
}


function play(board) {
  let nodeGame = new tNode(board);
  genTree(nodeGame, calcDepth(nodeGame));
  return nodeGame;
  nodeGame.children.forEach( (element) => {

  })

}

