//global DOM variables
const ninjaImage = document.querySelector('#ninja');
const starImage = document.querySelector('#star');
const sushiImage = document.querySelector('#sushi');
const game = document.querySelector('#game');
const score = document.querySelector('#score');
const status = document.querySelector('#status');
const ctx = game.getContext('2d');
let ninja;
let star;
let sushi;

// ====================== PAINT INTIAL SCREEN ======================= //
// EVENT LISTENERS
document.addEventListener('mousemove', function (e) {
    let ninjaImage = document.querySelector('#ninja');
    let x = e.offsetX;
    let y = e.offsetY;
    ninjaImage.style.left = x + 'px';
    ninjaImage.style.top = y + 'px';
})

// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element
// This is used for drawing shapes, text, images, etc.
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


// ====================== ENTITIES ======================= //
class Player {
    constructor(playerImage, x, y, width, height) {
        this.playerImage = playerImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        //rendering Ninja on canvas
        this.render = function () {
            ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
        }
    }
}

class Target {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.width = width;
        this.height = height;
        //rendering and adding gravity so the target falls
        this.render = function () {
            this.gravitySpeed += this.gravity;
            this.y += this.speedY + this.gravitySpeed;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}
// ====================== GAME PROCESSES ======================= //
//creating a new player and new target instance
const player = new Player(ninjaImage, 350, 500, 100, 100);
const target = new Target (sushiImage, 50, 50, 50, 50);

//crate gameLoop function to keep target moving at set interval
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    player.render();
    target.render();
}

let runGame = setInterval(gameLoop, 60);

 