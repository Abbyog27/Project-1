# Sushi Ninja
Getting started: 
1 created a repo in Github and clone.
2 created an index.html, style.css and app.js files
3 Looked for and downloaded sprites for the game

Goals:
- [X] Use HTML5 Canvas to make and add Ninja, sushis and ninja stars.
- [X] Be able to move the ninja by moving the mouse on canvas
- [X] Detect a collision between the ninja and the sushi or the ninja stars
- [X] When the ninja collides with the sushi, remove the sushi from the screen
- [X] ninja will get 50 points for every sushi they hit and add it to score
- [X] When the ninja collides with the ninja stars it's GAME OVER.

# HOW TO INSTALL 
1. `Fork` and `Clone` this respository to your local machine
2. Open `index.html` in your browser to play or
3. Open the directory in your text editor of choice to view or edit the code

# HOW TO PLAY
 Sushi Ninja begins when by clicking the start game button. Move ninja by moving the mouse throughout the canvas. Player acquires 50 points for every sushi piece that is hit. Beware of the ninja stars coming accross the canvas though! Get as many points collecting sushi while avoiding the ninja stars. Once the player is hit by a ninja star it is game over. 

![Start Page](<Screen Shot 2023-10-10 at 9.03.28 PM.png>)

# HOW IT WORKS
This code is an implements a simple 2D game. Sushi Ninja is built using HTML, CSS, and JavaScript. The game uses the HTML5 Canvas to update the game graphics and handle player input. JavaScript is used to manage the game state and updating the player's score. The game is played by controlling a ninja image using the mouse cursor to get sushi to get points while avoiding firing ninja stars. The main logic of the game is handled in a function called `gameLoop`, which is called every 60 milliseconds using the `setInterval` method.


Global variables needed are set for the game `start screen`,`score`, `status`, `game`, `sushi` `star` and `ninja`

```javascript
const startPage = document.querySelector('#start-screen')
const ninjaImage = document.querySelector('#ninja');
const starImage = document.querySelector('#star');
const sushiImage = document.querySelector('#sushi');
const game = document.querySelector('#game');
const score = document.querySelector('#score');
const ctx = game.getContext('2d');
const intervalArray = [];
let ninja;
let star;
let sushi;
```

### Making the Characters

The code creates classes to handle the characters the player`ninja` (which will be controlled by the movement of the mouse), Target `sushi` (which will be randomly moving along the y-axis), and  Projectile`stars` (which will be randomly moving a long the x axis). They all have their image accordingly. 

```javascript 
class Player {
    constructor(playerImage, x, y, width, height) {
        this.playerImage = playerImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.render = function (x, y) {
            ctx.drawImage(this.playerImage, x, y, this.width, this.height);
        }
    }
}
```
![Game](<Screen Shot 2023-10-10 at 9.06.03 PM.png>)

In the game, the player aims to get as many sushi which descend on the canvas every 2 seconds and creating a continuous loop until the game is over using the `setInterval` method.

create an array of targets (sushi)
```javascript
const targets = [];
```

creating new instances of sushi
```javascript
function targetSetup() {
    const targetRandomX = Math.floor(Math.random() * window.innerWidth);
    const targetRandomY = 0;
    const target = new Target(sushiImage, targetRandomX, targetRandomY, 50, 50);
    targets.push(target);
}
```
rendering new sushi every 2 seconds 
```javascript
const targetInterval = setInterval(targetSetup, 2000);
 ```

 The game detects collisions between the characters using the `detectTargetHit` and `detectProjHit` functions. It displays the player's score and updates it as they gather every sushi. It also alerts game over when the player is hit by a ninja star.

 ```javascript
 function detectTargetHit(player, target) {
    let hitTest = (
        mouse.y + player.height > target.y &&
        mouse.y < target.y + target.height &&
        mouse.x + player.width > target.x &&
        mouse.x < target.x + target.width
    )
    if (hitTest) {
        //add 50 points to the current score
        let newScore = Number(score.textContent) + 50;
        score.textContent = newScore;
    }
 }
```
Ending the game loop and going back to the start page when it's game over 
```javascript
//clearing each interval to end game 
        intervalArray.forEach(function endGame(interval) {
            clearInterval(interval);
        });
            alert('GAME OVER');
            //displaying start page once game is over
            startPage.style.display = "block";
            container.style.display = "none";
            container.style.cursor = "";
        
```

![Game over alert](<Screen Shot 2023-10-10 at 9.05.32 PM.png>)
# Unsolved problems and future enhancements

- add levels (make the sushi and ninja stars move faster) for intermediate and expert levels
- add sound when the ninja gets the sushi
- add sound when the ninja gets hit by the ninja star and is game over
- add "You win" alert when ninja gets a certain amount of points
- remove any white space from character images


