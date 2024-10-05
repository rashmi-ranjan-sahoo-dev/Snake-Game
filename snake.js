// game constant and variable
 let inputDir = {x:0,y:0}
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 3;
let score = 0;
let lastPointTime = 0 ;
let score_div = document.querySelector(".score");
let up_btn = document.querySelector(".up");
let down_btn = document.querySelector(".down");
let up = document.querySelector(".up-btn")
let down = document.querySelector(".down-btn")
let left = document.querySelector(".left-btn")
let right = document.querySelector(".right-btn")


let snakeArr = [
    {x:10,y:10}
];
    let board = document.querySelector(".board");
food =  {x:13, y:15};
// snake = { x:10 , y:10};

//-------------------- Game function  ----------------------

function main(ctime)
{
    window.requestAnimationFrame(main)
    // console.log(ctime);
    if((ctime-lastPointTime)/1000 < 1/speed)
    {
        return ;
    }

    lastPointTime = ctime;
    gameEngine();
}

     // Game speed

     up_btn.addEventListener("click",function()
    {
        if(speed >= 20)
        {
            speed = 20;
        }
        else{
            speed += 1;
        }
    })

    down_btn.addEventListener("click",function()
    {
        if(speed <= 3)
        {
                speed = 3;
        }
        else{
            speed -= 1;
        }
    })

function isCollide(snake)
{
//    if you bump your self
   for(let i = 1 ; i < snakeArr.length ; i++)
   {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
    {
        return true;
    }
     
   }
    // if you bump into the wall
    if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0)
    {
        return true;
    }
}

function gameEngine()
{
    //  part1 : updating the snake arrary and food

      if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0}
        alert("Game Over. Press any key to play")
        score = 0;
        score_div.innerHTML = "score :"+ score;
        snakeArr = [{x:10,y:10}];
      }

      // if you have eaten the food increment the score and regenerate the food
       if(snakeArr[0].y === food.y && snakeArr[0].x === food.x )
       {
        foodSound.play();
        score += 1;
        score_div.innerHTML = "score :"+ score;
           snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y})
           let a = 1;
           let b = 18;
           food = {x: Math.round(a + (b-a) * Math.random()) , y: Math.round(a + (b-a) * Math.random()) }    
        }

        // Moving the Snake
        for(let i = snakeArr.length - 2; i >= 0 ; i--)
        {
             snakeArr[i+1] = {...snakeArr[i]}
        }

        snakeArr[0].x +=inputDir.x;
        snakeArr[0].y +=inputDir.y;

    // part2 : dispaly the food and snake
     board.innerHTML = "";

         // Display the snake
     snakeArr.forEach((e,index)=>{
     snakeElement = document.createElement('div');
     snakeElement.style.gridRowStart = e.y;
     snakeElement.style.gridColumnStart = e.x;
     if(index === 0)
     {
         snakeElement.classList.add('head');      
     }
     else{
        snakeElement.classList.add("snake");
     }
     board.appendChild(snakeElement);
    })
     
    // Display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');  
    board.appendChild(foodElement);
}

// Main logic
window.requestAnimationFrame(main);

// sound btns
let play_btn = document.querySelector(".on");
let stop_btn = document.querySelector(".off");

play_btn.addEventListener("click",function(){
    musicSound.play();
})

stop_btn.addEventListener("click",function(){
    musicSound.pause();
})

// buttons
window.addEventListener("keydown",(e) => {
    inputDir = {x:0,y:1};
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
             break;

        case "ArrowRight":
            // console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;   
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
           inputDir.x = -1;
           inputDir.y = 0;
            break;

        default:
            break;
    }
})

up.addEventListener("click",()=>{
    inputDir.x = 0;
    inputDir.y = -1;
})
down.addEventListener("click",()=>{
    inputDir.x = 0;
    inputDir.y = 1;
})
left.addEventListener("click",()=>{
    inputDir.x = -1;
    inputDir.y = 0;
})
right.addEventListener("click",()=>{
    inputDir.x = 1;
    inputDir.y = 0;
})