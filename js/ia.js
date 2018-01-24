class tNode  {
  constructor(board) {
    this.children = [];
    this.board = (board === undefined) ?  Array(9).fill(NaN) : Object.assign({},board);
    this.value = 0;
  }
}

function genTree(depth, node) {
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
        genTree(depth-1, n);
      }
        
    }
    else {
      continue;
    }
    
  }
  return
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

function miniMax(node, depth =  calcDepth(node)) {

  if(  isLeaf(node) || depth === 0 ) {
    return node.value;  
  }

  if (calcDepth(node) % 2 !== 0) {
    let a = 2;
    node.children.forEach( element => {
      // console.log("||[Min]depth: "+depth+" a: "+a +"||")
      // console.log(element)
      a = Math.min(a, miniMax(element, depth-1))  
      // console.log("********Returning**********")
      // console.log("[Min]depth: "+depth+" a: "+a)
    });  
    return a;
  }
  else {
    let a = -2;
    node.children.forEach( element => {
      // console.log("||[Max]depth: "+depth+" a: "+a +"||")
      // console.log(element)
      a = Math.max(a, miniMax(element, depth-1))
      // console.log("********Returning**********")
      // console.log("[Max]depth: "+depth+" a: "+a)
    })
    return a;
  }
}

function isLeaf(node) {
  return (node.children.length === 0) ? true : false;
}


function searchTest(node, depth) {
  if( (isLeaf(node) || depth == 0) && node.value === 0 ) {
    console.log(node)
    return;
  } 
    
  node.children.forEach( element => {
    searchTest(element, depth-1);
  })
  return
}

function calcDepth(node) {
  let qnt = 0;
  for(i=0; i<9;i++){
    if (node.board[i])
      qnt++; 
  }
  return 9-qnt;
}

let a = new tNode;

genTree(9, a);
