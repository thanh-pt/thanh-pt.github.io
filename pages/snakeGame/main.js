const UP    = "ArrowUp"
const DOWN  = "ArrowDown"
const LEFT  = "ArrowLeft"
const RIGHT = "ArrowRight"

const WINDOW_SIZE   = 400
const POINT_SIZE    = 10

window.addEventListener('keydown',this.keyHandle,false);
window.requestAnimationFrame(draw);

class Point {
    constructor() {
        this.x = -1
        this.y = -1
    }

    copy(p) {
        this.x = p.x
        this.y = p.y
    }

    setPosition(newX, newY){
        this.x = newX
        this.y = newY
    }
}

class Fruit extends Point {
    constructor(){
        super()
        this.reset()
    }

    reset(){
        this.x = Math.floor(Math.random() * WINDOW_SIZE/POINT_SIZE);
        this.y = Math.floor(Math.random() * WINDOW_SIZE/POINT_SIZE);
    }
}

function RevertWhenMax(params) {
    if (params < 0){
        return WINDOW_SIZE/POINT_SIZE
    }
    if (params > WINDOW_SIZE/POINT_SIZE){
        return 0
    }
    return params
}

class SnackHead extends Point {
    constructor(){
        super()
        this.direction = null
    }
    setDirection(dir){
        this.direction = dir
    }
    update(){
        if (this.direction == UP){
            --this.y
        } else if (this.direction == DOWN){
            ++this.y
        } else if (this.direction == LEFT){
            --this.x
        } else if (this.direction == RIGHT){
            ++this.x
        } else {
            console.log("No run");
        }
        this.x = RevertWhenMax(this.x)        
        this.y = RevertWhenMax(this.y)
    }
}

class Snack {
    constructor(){
        this.head = new SnackHead()
        this.body = []
        this.body.push(this.head)
    }

    get length(){
        return this.body.length;
    }

    updateDirection(dir){
        this.head.setDirection(dir)
    }

    growUp(){
        this.body.push(new Point())
    }

    update(){
        for (var i = this.length - 1; i > 0; --i){
            this.body[i].copy(this.body[i-1])
        }
        this.head.update()
    }
}

function draw() {
    var c = document.getElementById("canvas")
    var ctx = c.getContext("2d")
    ctx.clearRect(0, 0, WINDOW_SIZE, WINDOW_SIZE)
    ctx.fillStyle = '#34495e'
    ctx.fillRect(0, 0, WINDOW_SIZE, WINDOW_SIZE)
    ctx.fillStyle = '#27ae60'
    ctx.strokeStyle = '#27ae60'
    // Snack paint
    for (var i = 0; i < snack.length; ++i){
        ctx.fillRect(snack.body[i].x*POINT_SIZE, snack.body[i].y*POINT_SIZE, POINT_SIZE, POINT_SIZE)
    }
    // Fruit paint
    ctx.fillStyle = '#e74c3c'
    ctx.strokeStyle = '#e74c3c'
    ctx.fillRect(fruit.x*POINT_SIZE, fruit.y*POINT_SIZE, POINT_SIZE, POINT_SIZE)

    window.requestAnimationFrame(draw); 
}

function keyHandle(params) {
    var keyCode = params.key
    if (keyCode == UP || keyCode == DOWN || keyCode == LEFT || keyCode == RIGHT){
        snack.updateDirection(keyCode)
        snakeUpdateGlobal()
    }
}

function timerTriger() {
    snakeUpdateGlobal()
}

function snakeUpdateGlobal() {
    snack.update()
    if (snack.body[0].x == fruit.x && snack.body[0].y == fruit.y){
        fruit.reset()
        snack.growUp()
    }
}

snack = new Snack()
snack.head.setPosition(10, 10)
fruit = new Fruit()
var myVar = setInterval(timerTriger, 500);
