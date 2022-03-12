const game=document.querySelector('.game')
const squares=Array.from(document.querySelectorAll('.game div'))
const start=document.querySelector('.start')
const popup=document.querySelector('.popup')
let ai='ai'
let human='human';
const players=[human,human]
let player;
const colors={
  'ai':'blue',
  'human':'red'
}
const points={
  'ai':10,
  'human':-10,
  'draw':0
}
let maximum=6
function getrandomplayer(){
  return players[Math.floor(Math.random()*2)]
}

//squares.reverse()

let board=['','','','','','','',
  '','','','','','','',
  '','','','','','','',
  '','','','','','','',
  '','','','','','','',
  '','','','','','',''];
  
function drawboard(){
  board.forEach((elem,index)=>{
    if(elem){
      squares[index].classList.add(colors[elem])
      }
    })
  }

squares.forEach((elem,index)=>{elem.addEventListener('click',()=>{
  if(player='human'){
  let avaibles=avaiblemoves(board)
  if(avaibles.indexOf(index)!=-1){
  board[index]=player;
  drawboard()
  if(!checkboard(board)){
  player='ai'
  popup.textContent='AI thinking . . .'
  setmax()
    setTimeout(aimove,500)
  }
  else{
    if(checkboard(board)=='draw'){
      setTimeout(()=>{alert('draw')
        window.location='./'
      },500)
    }
    setTimeout(()=>{alert(`${checkboard(board)} wins`)
      window.location='./'
    },500)
  }
  
  }}
})})

function avaiblemoves(b){
  let col1=[1,8,15,22,29,36].reverse().find((elem)=>{
    return b[elem]==''
  })
  let col2=[2,9,16,23,30,37].reverse().find((elem)=>{
    return b[elem]==''
  })
  let col3=[3,10,17,24,31,38].reverse().find((elem)=>{
    return b[elem]==''
  })
  let col4=[4,11,18,25,32,39].reverse().find((elem)=>{
    return b[elem]==''
  })
  let col5=[5,12,19,26,33,40].reverse().find((elem)=>{
    return b[elem]==''
  })
  let col6=[6,13,20,27,34,41].reverse().find((elem)=>{
    return b[elem]==''
  })
  let col7=[0,7,14,21,28,35].reverse().find((elem)=>{
    return b[elem]==''
  });
  let arr=[col3,col2,col4,col1,col5,col6,col7]
  arr=arr.filter((elem)=>{
    if(elem==0){return true}
   else{ return (elem)}
  })
  return arr
}
start.addEventListener('click',()=>{
  start.classList.add('hide')
  game.classList.add('grid')
  popup.classList.add('block')
  player=getrandomplayer()
  popup.textContent=`${player} to play`
  if(player=='ai'){
    aimove()
  }
})

function aimove(){
  let avaiblesarr=avaiblemoves(board)
  let best=-Infinity
  let move
  avaiblesarr.forEach((elem)=>{
    board[elem]='ai'
    let local=minimax(board,0,false)
    board[elem]=''
    if(local>best){
      best=local
      move=elem
    }
  })
  board[move]='ai'
  drawboard()
  if(!checkboard(board)){
  player='human'
  popup.textContent='human to play'}
  else{
    if(checkboard(board)=='draw'){
      setTimeout(()=>{alert('draw')
        window.location='./'
      },500)
    }
    setTimeout(()=>{alert(`${checkboard(board)} wins`)
      window.location='./'
    },500)
  }
}

const winningArray = [ [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 17, 25, 33], [8, 16, 24, 32], [11, 17, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] ]
   
   
function checkboard(boardo){
  if(winningArray.some((elem)=>{
   return boardo[elem[0]]==boardo[elem[1]] && boardo[elem[1]]== boardo[elem[2]] &&boardo[elem[2]]==boardo[elem[3]] && boardo[elem[1]]
  })){
    let x= winningArray.find((elem)=>{
   return boardo[elem[0]]==boardo[elem[1]] && boardo[elem[1]]== boardo[elem[2]] &&boardo[elem[2]]==boardo[elem[3]] && boardo[elem[1]]
  })[0]
  return boardo[x]
}
else if(boardo.every((elem)=>{elem !=''})){
  return 'draw'
}
else{
  return null
}
}

function minimax(b,depth,ismax){
  let rr=checkboard(b)
  if(rr !=null){
    return points[rr]
  }
  
    if (depth==maximum){
      return 0
      
    }
  if(ismax){
      let high=-Infinity
      let avaibles=avaiblemoves(b)
      avaibles.forEach((elem)=>{
        b[elem]='ai'
        let local=minimax(b,depth+1,false)
        b[elem]=''
        if(local>high){
          high=local
        }
      })
      return high
    }
    else{
      let high=Infinity
      let avaibles=avaiblemoves(b)
      avaibles.forEach((elem)=>{
        b[elem]='human'
        let local=minimax(b,depth+1,true)
        b[elem]=''
        if(local<high){
          high=local
        }
      })
      return high
    }
  
}

function setmax(){
  let alpha=board.filter((elem)=>{return (!elem)}).length
  if(alpha<30){
    maximum=6
  }
  if(alpha<25){
    maximum=7
  }
  if(alpha<20){
    maximum=7
  }
  if(alpha<15){
    maximum=11
  }
  if(alpha<10){
    maximum=25
  }
  if(alpha<5){
    maximum=30
  }
}
