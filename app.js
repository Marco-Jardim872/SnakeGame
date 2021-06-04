let canvas =document.getElementById("snake");
let ctx = canvas.getContext("2d");
let box = 32;
let snake = [];
let game;
snake[0]={
    x: 8*box,
    y: 8*box
};
let tamSnake = document.getElementById("tamSnake");
let bigSnake = document.getElementById("record");
let direction ="right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box ,
    y: Math.floor(Math.random() * 15 + 1) * box
}
function startGame(){
    game = setInterval(startSnake,150);
    document.getElementById("start").disabled = true;
    canvas.style.backgroundImage = "none";
    canvas.style.visibility = "visible";       
}
function pauseGame(){
    clearInterval(game);
    document.getElementById("start").disabled = false;
    canvas.style.backgroundImage = "none";
    canvas.style.visibility = "visible";    
}
function endGame(){
    clearInterval(game);
    document.getElementById("start").disabled = false;
    canvas.style.visibility = "hidden";
    location.reload();
}
function raiseBG(){
    ctx.fillStyle = "#339966";
    ctx.fillRect(0,0,16*box,16*box);
}
function raiseSnake(){
    for(i=0; i < snake.length; i++){
        ctx.fillStyle = "#006633";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        tamSnake.value = i + 1;
        tamSnake.innerHTML= "`${i}`";
       
    }
}
function guardaRecord(bigSnake) {
    let recordes;
   
    let rec;
    
    if (localStorage.getItem("recordes") == null) {
        recordes=[];
    } else {
     recordes = JSON.parse(localStorage.getItem("recordes"));
     let str = [];
     str = recordes.map(Number);
     rec =  Math.max.apply(null,str);
    }
    if(tamSnake.value >= rec){
        recordes.push(tamSnake.value );
    }
    localStorage.setItem("recordes", JSON.stringify(recordes));
}

document.addEventListener("DOMContentLoaded", carregarRecordes);

function carregarRecordes() {
       let recordes;
    if (localStorage.getItem("recordes") == null) {
        recordes=[];
    } else {
        recordes = JSON.parse(localStorage.getItem("recordes"));
        let str = [];
        str = recordes.map(Number);
        bigSnake.value = Math.max.apply(null,str);
       
    }
   
}


function drawFood(){
    ctx.fillStyle = "#f43525";
    ctx.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event){
    let tecla = event.keyCode;
    if(tecla == 37 && direction != "right") direction = "left";
    if(tecla == 38 && direction != "down") direction = "up";
    if(tecla == 39 && direction != "left") direction = "right";
    if(tecla == 40 && direction != "up") direction = "down";
}
function startSnake(){
    
    
    let snakepop = document.getElementById("snakepop");
    if(snake[0].x > 15 * box && direction == "right"){
        snakepop.setAttribute("src", "./img/SNAKE3.png");
        clearInterval(game);
        guardaRecord(bigSnake);
        gameOver();
    }
    if( snake[0].x < 0 && direction == "left") {
        snakepop.setAttribute("src", "./img/SNAKE3.png");
        clearInterval(game);
        guardaRecord(bigSnake);
        gameOver();
    }
    if(snake[0].y > 15 * box && direction == "down"){
        snakepop.setAttribute("src", "./img/SNAKE3.png");
        clearInterval(game);
        guardaRecord(bigSnake);
        gameOver();
    } 
    if( snake[0].y < 0 && direction == "up"){
        snakepop.setAttribute("src", "./img/SNAKE3.png");
        clearInterval(game);
        guardaRecord(bigSnake);
        gameOver();
    } 

    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            guardaRecord(bigSnake);
            gameOver();
        }
    }
    raiseBG();
    raiseSnake();
    drawFood();
   
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY +=box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }    
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
   
}
function gameOver(){
   
    let overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');
    
    overlay.classList.add('active');
    popup.classList.add('active');
    
    btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
    location.reload();
}); 

}
carregarRecordes();