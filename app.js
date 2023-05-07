const breakout = document.querySelector('.breakout');
const scoreDisplay = document.querySelector('#score')
const gameDisplay = document.querySelector('#game')
const blockWidth = 100
const blockHeight = 20
const userStatus = [190, 10]
let userPosition = userStatus
const bordWidth = 455
const bordHeight = 300
const ballStatus = [230, 30]
let ballPosition = ballStatus
let timerId = null
let xDirection = -2
let yDirection = 2
const ballDiameter = 20
let score = 0

// create class Bock
class Block {
    constructor(x, y) {
       this.bottomLeft = [x, y]
       this.bottomRight = [x + blockWidth, y]
       this.topLeft = [x, y + blockHeight]
       this.topRight = [x + blockWidth, y + blockHeight]
    }
}

//create Blocks Array to Class bLock
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210)
]

//Create Function Add Blocks To Parent
function addBlocks() {
    for(let i = 0; i < blocks.length; i++) {
      const block = document.createElement('div')
      block.classList.add('block')
      block.style.left = blocks[i].bottomLeft[0] + 'px'
      block.style.bottom = blocks[i].bottomLeft[1] + 'px'
      breakout.append(block)
    }
}

addBlocks()

// Add User To Parent
const user = document.createElement('div')
user.classList.add('user')
drawUser()
breakout.appendChild(user)

function drawUser() {
    user.style.left = userPosition[0] + "px"
    user.style.bottom = userPosition[1] + "px"
}

function moveUser(e) {
    console.log(e.key)
    switch(e.key) {
        case 'ArrowLeft':
          userPosition[0] > 0 ? userPosition[0] -= 10 :''
          drawUser()
        break;
        case 'ArrowRight':
          userPosition[0] < bordWidth - blockWidth -10  ? userPosition[0] += 10 : ''
          drawUser()
        break;
    }
}

document.addEventListener('keydown', moveUser)

// Add Ball To Parent
const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
breakout.appendChild(ball)

function drawball() {
    ball.style.left = ballPosition[0] + "px"
    ball.style.bottom = ballPosition[1] + "px"
}

function moveBall() {
    ballPosition[0] += xDirection
    ballPosition[1] += yDirection
    drawball()
    balltraject()
}

timerId = setInterval(moveBall, 20)

function balltraject() {
   for(let i = 0; i < blocks.length; i++) {
      if(   (ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0])
         && ((ballPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[1])
        ) {
          const allBlocks = [...document.querySelectorAll('.block')]
          allBlocks[i].classList.remove('block')
          blocks.splice(i, 1)
          changeBallTraject()
          score++
          scoreDisplay.textContent = score + ' Points'
      }
   }

   if(ballPosition[0] >= (bordWidth - ballDiameter) || ballPosition[1] >= (bordHeight - ballDiameter) || ballPosition[0] <= 0) {
       changeBallTraject()
    }

    if(
        (ballPosition[0] > userPosition[0] && ballPosition[0] < userPosition[0] + blockWidth)
     && (ballPosition[1] > userPosition[1] && ballPosition[1] < userPosition[1] + blockHeight)
    ) {
        changeBallTraject()
    }

    if(blocks.length === 0) {
       gameDisplay.textContent = 'YOU WIN!'
       clearInterval(timerId)
       document.addEventListener('keydown', moveUser)
    }

   if(ballPosition[1] <= 0) {
      gameDisplay.textContent = 'GAME OVER!'
      clearInterval(timerId)
      document.addEventListener('keydown', moveUser)
   }
}

function changeBallTraject() {
  if(xDirection === 2 && yDirection === 2) {
    return yDirection = -2
  }
  if(xDirection === 2 && yDirection === -2) {
    return xDirection = -2
  }
  if(xDirection === -2 && yDirection === -2) {
    return yDirection = 2
  }
  if(xDirection === -2 && yDirection === 2) {
    return xDirection = 2
  }
}