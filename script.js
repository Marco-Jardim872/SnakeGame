let canvas = document.getElementById("telaJogo");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

function makeBG(){
    context.fillStyle = "#21a05c"
    context.fillRect(0,0,16*box,16*box);
}

function makeSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
makeBG();
makeSnake();
