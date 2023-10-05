# Project-1
Create a simple fun game
Getting started: 
1 created a repo in Github and clone.
2 created an index.html, style.css and app.js files
3 Looked for and downloaded sprites for the game

Goals:
- [X ] Use HTML5 Canvas to make and add Ninja, sushis and ninja stars.
- [X] Be able to move the ninja by moving the mouse on canvas
- [ ] Detect a collision between the ninja and the sushi or the ninja stars
- [ ] When the ninja collides with the sushi, remove the sushi from the screen
- [ ] When the ninja collides with the ninja stars, remove the ninja star from the screen
- [ ] ninja will get 50 points for every sushi they hit
- [ ] If ninja gets hit by 3 ninja stars it's game over

Game instructions: Sushi Ninja is a game where you get 50 points for every sushi piece you hit. If you get to 500 points you win. Beware of the ninja stars coming at you though! If you get hit three times by any ninja stars, it is game over. Tap or slide your cursor around the screen to get as much sushi as you can while avoiding the ninja stars.

Look at the `index.html` again. What elements will we need to access?

In your `app.js` put a `console.log` and run your index.html in your browser to check that everything is linked up correctly. Once you've tested that, make a reference to a couple of things in the HTML that we'll need to access consistently.

```
* `<canvas id="game">`: This is the main piece of our game; it's where we will be rendering our game an what we will be updating.
```javascript
let game = document.querySelector('#game')
```

Next, we are going to set the rest of our global variables that are needed for the game `score`, `status`, `game`, `sushi` `star` and `ninja`

```javascript
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
```

We do this by assigning getting the context from the canvas element and assigning it to a variable. The syntax is `canvasElement.getContext('2d')`

### Make Some Characters!

It's time to make our game! So our goal is to have an `ninja` (which will be controlled by the movement of the mouse), our `sushi` (which will be randomly falling), and our `ninja stars` (which will be randomly crossing the game canvas). They will all have their image accordingly. 

We will creat a class for each character which will have everything to render the ninja (player), sushi (target) and ninja star (projectile). 
We make an instance of the class by calling it using javascript's `new`. 

```javascript 
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

class Projectile {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.traveling = 0.15;
        this.travelingSpeed = 0;
        this.width = width;
        this.height = height;
        //rendering and making the ninja star to go across the canvas(game)
        this.render = function (x, y) {
            this.travelingSpeed += this.traveling;
            this.x += this.speedX + this.travelingSpeed;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}```