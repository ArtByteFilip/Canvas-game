//canvas
const canvas = document.querySelector('canvas');
const render = canvas.getContext("2d");

//player
const playerSize = 120;

let playerPosX = 100;
let playerPosY = canvas.height / 2 - playerSize / 2;

let playerSpeed = 30;

//player 2

const player2Size = 120;

let player2PosX = 100;
let player2PosY = canvas.height / 2 - playerSize / 2;

let score = 0;

// coins

const coinSize = 60;

function newCoinPos() {
  coinPosX = (parseInt(Math.random() * (canvas.width - coinSize))); 
  coinPosY = (parseInt(Math.random() * (canvas.height - coinSize)));  
}

newCoinPos();

// listeners

  document.addEventListener('keydown', keyPush1);
  document.addEventListener('keydown', keyPush2);

function gameLoop() {

  drawObjekty();
  drawStuff();
  moveStuff();
  getScore();
  debugMod();

  //setTimeout( gameLoop, 1000 / 144); // Max FPS na základe maximálneho limutu FPS
  requestAnimationFrame(gameLoop);
}

function drawStuff() {

  drawObjekty("gray", 0, 0, canvas.width, canvas.height);

  //drawObjekty("blue", canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100); // coin

  drawObjekty("yellow", coinPosX, coinPosY, coinSize, coinSize);

  drawObjekty("black", playerPosX, playerPosY, playerSize, playerSize);

  drawObjekty("white", player2PosX, player2PosY, player2Size, player2Size);

  
}

function steny() {
  if (playerPosX > canvas.width - playerSize) { // stena v pravo
    playerPosX = canvas.width - playerSize;
  }

  if (playerPosX < 0) { // stena v lavo
    playerPosX = 0 ;
  }

  if (playerPosY > canvas.height - playerSize) { // stena dole
    playerPosY = 800 - playerSize;
  }

  if (playerPosY < 0) { // stena hore
    playerPosY = 0;
  }

  // player 2 

  if (player2PosX > canvas.width - player2Size) { // stena v pravo
    player2PosX = canvas.width - player2Size;
  }

  if (player2PosX < 0) { // stena v lavo
    player2PosX = 0 ;
  }

  if (player2PosY > canvas.height - player2Size) { // stena dole
    player2PosY = 800 - playerSize;
  }

  if (player2PosY < 0) { // stena hore
    player2PosY = 0;
  }
}

function moveStuff() {
  steny();
}

function getScore() {     // player 1

  if (playerPosX >= coinPosX - coinSize && playerPosX <= coinPosX + coinSize) {
    if (playerPosY >= coinPosY - coinSize && playerPosY <= coinPosY + coinSize) {
      score += 1;
      newCoinPos();
    }
  }

  if (player2PosX >= coinPosX - coinSize && player2PosX <= coinPosX + coinSize) { // player 2
    if (player2PosY >= coinPosY - coinSize && player2PosY <= coinPosY + coinSize) {
      score += 1;
      newCoinPos();
    }
  }
  
  render.font = "30px Arial";
  render.fillText("Score:" + " " + score, 10, 40);
  
}


function drawObjekty(color, x, y, width, height) {
  render.fillStyle = color;
  render.fillRect(x, y, width, height);
}

function keyPush1(event) {
  switch(event.key) {
    case 'ArrowUp':
      playerPosY -= playerSpeed;
      break;
  }
  switch(event.key) {
    case 'ArrowDown':
      playerPosY += playerSpeed;
      break;
  }
  switch(event.key) {
    case 'ArrowLeft':
      playerPosX -= playerSpeed;
      break;
  }
  switch(event.key) {
    case 'ArrowRight':
      playerPosX += playerSpeed;
      break;
  }

}

function keyPush2(event) {
  switch(event.key) {
    case 'w':
      player2PosY -= playerSpeed;
      break;
  }
  switch(event.key) {
    case 's':
      player2PosY += playerSpeed;
      break;
  }
  switch(event.key) {
    case 'a':
      player2PosX -= playerSpeed;
      break;
  }
  switch(event.key) {
    case 'd':
      player2PosX += playerSpeed;
      break;
  }
}

function debugMod() {
  render.font = "30px Arial";
  
  render.fillText("CoinPosX:" + " " + coinPosX, 500, 40);
  render.fillText("CoinPosY:" + " " + coinPosY, 500, 80);

  render.fillText("playerPosX:" + " " + playerPosX, 1000, 40);
  render.fillText("playerPosY:" + " " + playerPosY, 1000, 80);
}

gameLoop();