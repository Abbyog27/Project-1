//global DOM variables
const startPage = document.querySelector('#start-screen');
const ninjaImage = document.querySelector('#ninja');
const starImage = document.querySelector('#star');
const sushiImage = document.querySelector('#sushi');
const game = document.querySelector('#game');
const score = document.querySelector('#score');
const status = document.querySelector('#status');
const container = document.querySelector('#container');
const ctx = game.getContext('2d');
let ninja;
let star;
let sushi;

    // ====================== PAINT INTIAL SCREEN ======================= //
// EVENT LISTENERS
//having the game start when you click the start button and move to canvas

//having the ninja move with mouse movement
const mouse = {
    x: 400,
    y: 550
}
game.addEventListener("mousemove", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY
});


// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element
// This is used for drawing shapes, text, images, etc.
game.setAttribute('width', window.innerWidth);
game.setAttribute('height', window.innerHeight);

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
        this.render = function (x, y) {
            ctx.drawImage(this.playerImage, x, y, this.width, this.height);
        }
    }
}

class Target {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 20;
        this.width = width;
        this.height = height;
        //rendering and adding gravity so the target falls
        this.render = function () {
            this.y += this.speedY;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

class Projectile {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.speedX = 30;
        this.speedY = 0;
        this.width = width;
        this.height = height;
        //rendering and making the ninja star to go across the canvas(game)
        this.render = function () {
            this.x += this.speedX;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}


// ====================== GAME PROCESSES ======================= //
//creating a new player, new target instance, and new projectile instance
ninja = new Player(ninjaImage, 350, 500, 100, 100);

const targets = [];
function targetSetup() {
    const targetRandomX = Math.floor(Math.random() * window.innerWidth);
    const targetRandomY = 0;
    const target = new Target(sushiImage, targetRandomX, targetRandomY, 50, 50);
    targets.push(target);
}

let projectiles = [];
function projectileSetup() {
    const projectileRandomX = 0;
    const projectileRandomY = Math.floor(Math.random() * window.innerHeight);
    const projectile = new Projectile(starImage, projectileRandomX, projectileRandomY, 50, 50);
    projectiles.push(projectile);
}


//create gameLoop function to keep target moving at set interval
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    //create boundaries for the ninja within the canvas(game)
    // player movement 
    if (mouse.x <= ninja.width / 2) {
        mouse.x = ninja.width / 2;
    }
    if (mouse.x >= game.width - (ninja.width / 2)) {
        mouse.x = game.width - (ninja.width / 2);
    }
    if (mouse.y <= 80 + ninja.height / 2) {
        mouse.y = ninja.height / 2;
    }
    if (mouse.y >= game.height - 160 - (ninja.height / 2)) {
        mouse.y = game.height - (ninja.height / 2);
    }
    if (ninja.alive) {
        ninja.render(mouse.x - (ninja.width / 2), mouse.y - (ninja.height / 2));
        // render all targets
        for (let i = 0; i < targets.length; i++) {
            sushi = targets[i]
            sushi.render();
            if (detectTargetHit(ninja, sushi)) {
                targets.splice(i, 1);
            }
        }
    }

    // render all projectiles
    for (let i = 0; i < projectiles.length; i++) {
        star = projectiles[i];
        star.render();
        if(detectProjHit(ninja, star)) {
            projectiles = [];
            startPage.style.display = "block";
            container.style.display = "none";
            container.style.cursor = "";
            alert('You LOST');
        }
    }

}

function displayGameBoard() {
    startPage.style.display = "none";
    container.style.display = "block";
    container.style.cursor = "none"
}

// ====================== COLLISION DETECTION ======================= //
//detecting the sushi hit and updating score
function detectTargetHit(player, target) {
    let hitTest = (
        mouse.y + player.height > target.y &&
        mouse.y < target.y + target.height &&
        mouse.x + player.width > target.x &&
        mouse.x < target.x + target.width
    )
    if (hitTest) {
        console.log('it works');
        //add 100 points to the current score
        let newScore = Number(score.textContent) + 50;
        score.textContent = newScore;

        if (Number(score.textContent === 500)) {
            ctx.clearRect(0, 0, game.width, game.height);
            score.textContent = 0;
            alert('You WIN');
        }
    }
    return hitTest;
}

function detectProjHit(player, projectile) {
    let lost = (
        mouse.y + player.height > projectile.y &&
        mouse.y < projectile.y + projectile.height &&
        mouse.x + player.width > projectile.x &&
        mouse.x < projectile.x + projectile.width);
    if (lost) {
        ctx.clearRect(0, 0, game.width, game.height);
    }
    return lost;
}
//start game on start screen
function startGame() {
    displayGameBoard();
    targetSetup();
    projectileSetup();
    setInterval(gameLoop, 50);
    setInterval(targetSetup, 4000);
    setInterval(projectileSetup, 2000);
}