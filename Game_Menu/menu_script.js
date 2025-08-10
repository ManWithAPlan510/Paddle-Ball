import { createBall } from '../Game/script.js'
import { createPaddle } from '../Game/script.js'
import { Ball } from '../Game/script.js'
import { Paddle } from '../Game/script.js'

const canvas = document.getElementById('element-preview')
const ctx = canvas.getContext('2d')

let element = new Paddle(canvas.width/2,canvas.height/2,20,10,'red','blue')
createPaddle(element.x,element.y,element.height,element.width,element.fillColor,element.borderColor)
createPaddle()