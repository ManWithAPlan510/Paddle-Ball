const canvas = document.getElementById("screen");
const ctx = canvas.getContext('2d');
let playerOneScoreDisplay = document.getElementById('player-one-score')
let playerTwoScoreDisplay = document.getElementById('player-two-score')
let playerOneScoreNumber = 0
let playerTwoScoreNumber = 0
let ballXPosition = document.getElementById('x-position')
let ballYPosition = document.getElementById('y-position')
let xincrement = 1
let yincrement = 1 

function Paddle(x,y,height,width,fillColor,borderColor) {
    this.x = x
    this.y = y
    this.fillColor = fillColor
    this.height = height
    this.width = width
    this.borderColor = borderColor
}

function Ball (x,y,radius,color) {
   this.x = x
   this.y = y
   this.radius = radius
   this.color = color
   this.moveBall = (xspeed,yspeed) => {ball.x += xspeed; ball.y += yspeed}
}

function createBall(x,y,radius,fillColor) {
    ctx.beginPath()
    ctx.arc(x,y,radius,0,Math.PI * 2)
    ctx.fillStyle = fillColor
    ctx.fill()

}

function createPaddle(x,y,height,width,fillColor,borderColor) {
    ctx.beginPath()
    ctx.fillStyle = fillColor
    ctx.fillRect(x,y,width,height)
    ctx.lineWidth = 20
    ctx.strokeStyle = borderColor
    ctx.stroke()
    
}

let paddle1= new Paddle(5,0,40,5,'red','black')
paddle1.y = (canvas.height /2) - (paddle1.height /2)
let paddle2= new Paddle(0, 0, 40,5,'blue','black')
paddle2.x = canvas.width - 10
paddle2.y = (canvas.height /2) - (paddle1.height /2)
let ball = new Ball(canvas.width/2,Math.floor(Math.random() * canvas.height),5,"green")

function collisionDetection () {
    if ((ball.y + ball.radius) >= canvas.height) {
        yincrement = -1
    }
    else if ((ball.y - ball.radius) <= 0) {
        yincrement = 1
    }
    else if (((ball.y + ball.radius) >= paddle2.y) && ((ball.x - ball.radius) > paddle2.x)) {
        yincrement = -1
    }
    else if (((ball.y + ball.radius) >= paddle1.y) && ((ball.x + ball.radius) < paddle1.x)) {
        yincrement = -1
    }
    else if (((ball.x + ball.radius) >= paddle2.x) && (ball.y > paddle2.y) && (ball.y < (paddle2.y + paddle2.height))){
        xincrement = -1
    }
    else if (((ball.x - ball.radius) <= (paddle1.x + paddle1.width)) && (ball.y > paddle1.y) && (ball.y < (paddle1.y + paddle1.height))){
        xincrement = 1
    }
    else if (ball.x + ball.radius >= canvas.width) {
        playerOneScoreNumber += 1
        xincrement = -1
    }
    else if (ball.x - ball.radius <= 0) {
        playerTwoScoreNumber += 1
        xincrement = 1
    }
    ball.moveBall(xincrement,yincrement)
}


function paddelRenderer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    createPaddle(paddle1.x,paddle1.y,paddle1.height,paddle1.width,paddle1.fillColor)
    createPaddle(paddle2.x,paddle2.y,paddle1.height,paddle2.width,paddle2.fillColor)
    requestAnimationFrame(paddelRenderer)
}

function ballRenderer() {
    createBall(ball.x,ball.y,ball.radius,ball.color)
    collisionDetection()  
    requestAnimationFrame(ballRenderer)
}
function gameInfoDisplay() {
    ballXPosition.innerHTML = ball.x
    ballYPosition.innerHTML = ball.y
    playerOneScoreDisplay.innerHTML = playerOneScoreNumber
    playerTwoScoreDisplay.innerHTML = playerTwoScoreNumber
    requestAnimationFrame(gameInfoDisplay)
}

window.addEventListener('keydown', (e) => {
    if ((e.key == 'w') && (paddle1.y > 0)) {
        paddle1.y -= 10        
    }
    if ((e.key == 's') && ((paddle1.y + paddle1.height) < canvas.height)) {
        paddle1.y += 10
    }
    if ((e.key == 'ArrowUp') && (paddle2.y > 0)) {
        paddle2.y -= 10        
    }
    if ((e.key == 'ArrowDown') && ((paddle2.y + paddle2.height) < canvas.height)) {
        paddle2.y += 10
    }
})
console.log(ball.y + ball.radius)
requestAnimationFrame(paddelRenderer)
requestAnimationFrame(ballRenderer)
requestAnimationFrame(gameInfoDisplay)
