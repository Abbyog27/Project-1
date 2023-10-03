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


// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element
// This is used for drawing shapes, text, images, etc.
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


// ====================== ENTITIES ======================= //
class Player {
    constructor (playerImage, x, y, width, height) {
        this.playerImage = playerImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.color ='blue';

        this.render = function() {
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
        }
    }
}
const player = new Player(ninjaImage, 675, 500, 100, 100);
console.log(player);
player.render();