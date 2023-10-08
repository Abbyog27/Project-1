//global DOM variables
const startPage = document.querySelector('#start-screen');
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
game.setAttribute('height', window.innerHeight);
game.setAttribute('width', window.innerWidth);


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
        this.speedY = 0;
        this.gravity = 2;
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

class Projectile {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.traveling = 5;
        this.travelingSpeed = 0;
        this.width = width;
        this.height = height;
        //rendering and making the ninja star to go across the canvas(game)
        this.render = function () {
            this.travelingSpeed += this.traveling;
            this.x += this.speedX + this.travelingSpeed;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}


// ====================== GAME PROCESSES ======================= //
//creating a new player, new target instance, and new projectile instance
ninja = new Player(ninjaImage, 350, 500, 100, 100);
// const target = new Target(sushiImage, 50, 50, 50, 50);
// const projectile = new Projectile(starImage, 50, 50, 50, 50);

const targets = [];
function targetSetup() {
    const targetRandomX = Math.floor(Math.random() * window.innerWidth);
    const targetRandomY = 0;
    const target = new Target(sushiImage, targetRandomX, targetRandomY, 50, 50);
    targets.push(target);
}

const projectiles = [];
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
    if (mouse.y <= ninja.height / 2) {
        mouse.y = ninja.height / 2;
    }
    if (mouse.y >= game.height - (ninja.height / 2)) {
        mouse.y = game.height - (ninja.height / 2);
    }
    ninja.render(mouse.x - (ninja.width / 2), mouse.y - (ninja.height / 2));
    console.log(ninja.x, ninja.y, mouse.x, mouse.y);

    if (ninja.alive) {
        ninja.render();
        // render all targets
        for (let i = 0; i < targets.length; i++) {
            sushi = targets[i]
            sushi.render();
            let hit = detectTargetHit(ninja, sushi);
        }

        // render all projectiles
        for (let i = 0; i < projectiles.length; i++) {
            star = projectiles[i];
            star.render();
            let hit = detectProjHit(ninja, star)
        }
    }
}

function displayGameBoard() {
    startPage.style.display = "none";
    game.style.display = "block";
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
            alert ('You WIN');
            ctx.clearRect(0, 0, game.width, game.height);
            score.textContent = 0;
        }
    }
}
function detectProjHit(player, projectile) {
    if (
        mouse.y + player.height > projectile.y &&
        mouse.y < projectile.y + projectile.height &&
        mouse.x + player.width > projectile.x &&
        mouse.x < projectile.x + projectile.width
    ) {
        ctx.clear
    }
    return false;
    console.log(target);

}
//start game on start screen
function startGame() {
    displayGameBoard();
    targetSetup();
    projectileSetup();
    setInterval(gameLoop, 100);
    setInterval(targetSetup, 5000);
    setInterval(projectileSetup, 4000);
}