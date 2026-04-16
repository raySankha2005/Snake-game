console.log("js started");
const board=document.querySelector(".board")
const startButton=document.querySelector(".btn-start");
const modal=document.querySelector(".modal");
const startGameModal=document.querySelector(".start-game");
const GameOverModal=document.querySelector(".game-over");
const restartbtn=document.querySelector(".btn-restart");
const highScore=document.querySelector("#high-score");
const score=document.querySelector("#score");
const time=document.querySelector("#time");
const blockwidth=30;
const blockheight=30;
const cols=Math.floor(board.clientWidth/blockwidth);
const rows=Math.floor(board.clientHeight/blockheight);
const blocks=[];
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
let direction="right"
let intervalId=null;
let timerIntervalId=null;
let snake=[{
    x:1,y:3
}]
 let scoreRes=0;
 let highScoreRes=Number(localStorage.getItem("highScoreRes") )|| 0;
 let timeRes='00-00';
 highScore.innerText=highScoreRes;
// for(let i=0;i< rows*cols;i++)
// {
//     const block=document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block);
// }
for (let i=0;i<rows;i++)
{
    for(let j=0;j<cols;j++)
    {
        const block=document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${i}-${j}`]=block;
    }
}
startButton.addEventListener("click",()=>{
     modal.style.display="none";
    intervalId=setInterval(()=>{
        render();
    },300)
     timerIntervalId=setInterval(()=>{
            let [min,sec]=timeRes.split("-").map(Number);
            if(sec==59)
            {
                min=min+1;
                sec=0;
            }
            else
            {
                sec=sec+1;
            }
            timeRes=`${min}-${sec}`;
            time.innerText=timeRes;
            
        },1000)
})
function render()
{
    let head=null
    blocks[`${food.x}-${food.y}`].classList.add("food")
    if(direction==="left")
    {
        head={x:snake[0].x,y:snake[0].y-1};
    }
    else if(direction==="right")
    {
         head={x:snake[0].x,y:snake[0].y+1};
    }
    else if(direction==="down")
    {
         head={x:snake[0].x+1,y:snake[0].y};
    }
    else if(direction==="up")
    {
         head={x:snake[0].x-1,y:snake[0].y};
    }
    if(head.x<0|| head.x>=rows ||head.y<0 ||head.y>=cols)
    {
        // alert("game over");
        clearInterval(intervalId);
        modal.style.display = "flex";
        startGameModal.style.display="none"
        GameOverModal.style.display="flex";
        return;
    }
    if(head.x==food.x && head.y==food.y)
    {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food")
         snake.unshift(head);
         scoreRes=scoreRes+10;
         score.innerText=scoreRes;
         if(scoreRes>highScoreRes)
         {
            highScoreRes=scoreRes;
            localStorage.setItem("highscoreRes",highScoreRes.toString())
         }
    }
    // else
    // {
    //     snake.pop();
    // }
    snake.forEach(el=>{
        blocks[`${el.x}-${el.y}`].classList.remove("fill");
    })
    snake.unshift(head);
    snake.pop();
    snake.forEach(el=>{
        blocks[`${el.x}-${el.y}`].classList.add("fill")
    })
    }
// intervalId=setInterval(()=>{
//     render();
// },500)
addEventListener("keydown",(event)=>{
    if(event.key==="ArrowUp"&& direction !== "down")
    {
        direction="up";
    }
    else if(event.key==="ArrowDown"&&direction !== "up")
    {
        direction="down";
    }
    else if(event.key==="ArrowLeft"&&direction !== "right")
    {
        direction="left";
    }
    else if(event.key==="ArrowRight" &&direction !== "left")
    {
        direction="right";
    }
})
restartbtn.addEventListener("click",restartGame)

function restartGame()
{
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(el=>{
        blocks[`${el.x}-${el.y}`].classList.remove("fill")
    })
    direction="down";
    modal.style.display="none";
     snake=[{
    x:1,y:3
}]
scoreRes=0;
timeRes='00-00';
time.innerText='00-00';
score.innerText=0;
highScore.innerText=highScoreRes;
food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
intervalId=setInterval(()=>{
        render();
    },500)
}