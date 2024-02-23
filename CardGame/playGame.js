
let deck = [];
let warPile=[];
let warPile1=[];
let warPile2=[];
let position=0;
let gameOver= false;
let playerOneCards = [];
let playerTwoCards = [];
let playerOnePoints = 26;
let playerTwoPoints = 26;

initialBoard();

const playGameButton = document.getElementById("playGame").addEventListener("click", () => {
    gameStarSound();
    showPlayTurnButton();
    hidePlayGameButton();
    
    off();
    resetAll();
    
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
        const id = card.id;
        const value = parseInt(card.dataset.value);
        deck.push({id, value});
    });
    
    deck
    .sort((a, b) => Math.random() - 0.5)
    
    playerOneCards = deck.splice(0,26);
    
    playerTwoCards = deck;
    
    playerOnePoints = playerOneCards.length;
    playerTwoPoints = playerTwoCards.length;
    
});

const playRoundButton = document.getElementById("playTurn").addEventListener("click", () => {
    playTurnSound();
    
    if(!gameOver) {
        removeCard1(); 
        removeCard2(); 
        
        playRound();
        checkWinner();
    }
    endGame();
    
});


function initialBoard(){
    const boardElementLeft = document.getElementById("backCardLeft");
    const boardElementRight = document.getElementById("backCardRight");
    
    const imgLeft = document.createElement("img");
    const imgRight = document.createElement("img");
    
    imgLeft.setAttribute("src", "images/cardBack.jpg");
    imgRight.setAttribute("src", "images/cardBack.jpg");
    
    boardElementLeft.appendChild(imgLeft);     
    boardElementRight.appendChild(imgRight);    
    
}

function playRound() {
    const boardElement1 = document.getElementById("player1Move");
    const boardElement2 = document.getElementById("player2Move");
    
    player1Card = playerOneCards.shift();
    player2Card = playerTwoCards.shift();
    
    
    let cardElement1 = document.getElementById(player1Card.id);
    let cardElement2 = document.getElementById(player2Card.id);
    
    applyPosition(cardElement1, position);
    applyPosition(cardElement2, position);
    position++;
    boardElement1.appendChild(cardElement1); 
    boardElement2.appendChild(cardElement2);
    
    roundWinner();
    scoreCount();
    checkWinner();
}

function applyPosition(card, position) {
    card.style.left = `${position}em`;
    card.style.top = `${position}em`;
    card.zIndex = position;
}

function roundWinner(){
    if(player1Card.value === player2Card.value){
        warPile1.push(player1Card);
        warPile2.push(player2Card);  
        tieCards();
        return;
    }
    
    else if (player1Card.value > player2Card.value) {
        playerOneCards.push(player1Card, player2Card);
        playerOneCards.push(...warPile1, ...warPile2);
        playerOnePoints = playerOneCards.length;
    } 
    else if (player1Card.value < player2Card.value) {
        playerTwoCards.push(player1Card, player2Card);
        playerTwoCards.push(...warPile2, ...warPile1);
        playerTwoPoints = playerTwoCards.length;
        
        console.log("Player 1", playerOneCards);
        console.log("Player 2", playerTwoCards);
    }
    position = 0;
    console.log("WarPile", warPile1)
    console.log("WarPile", warPile2)
    
    warPile= [];
    warPile1= [];
    warPile2= [];
    
}

function tieCards(){
    warPile1.push(...playerOneCards.splice(0,2));
    warPile2.push(...playerTwoCards.splice(0,2)); 
    
    const boardElement = document.getElementById("player1Move");
    const boardElement1 = document.getElementById("player2Move");
    
    const img1 = createBackCardImg();  
    const img2 = createBackCardImg();    
    const img3 = createBackCardImg();   
    const img4 = createBackCardImg();
    
    applyPosition(img1, position);
    applyPosition(img2, position++);
    setTimeout(() =>{ boardElement.appendChild(img1)},200); 
    setTimeout(() =>{ boardElement1.appendChild(img2)},400);
    
    applyPosition(img3, position);
    applyPosition(img4, position++);
    setTimeout(() =>{boardElement.appendChild(img3)},600);  
    
    setTimeout(() =>{ boardElement1.appendChild(img4)},800); 
    
    setTimeout(() =>{ playRound()},1000); 
    
}

function createBackCardImg() {
    const img1 = document.createElement("img");
    img1.setAttribute("src", "images/cardBack.jpg");
    img1.setAttribute("class", "back");
    return img1;
}

function removeCard1(){
    
    let parent = document.getElementById("player1Move");
    findAllChildren(parent);  
}  

function removeCard2(){   
    let parent = document.getElementById("player2Move");
    findAllChildren(parent);  
    
}
function findAllChildren(parent) {
    const deckElement = document.getElementById("deck");
    let child = parent.lastElementChild;
    while (child) {
        deckElement.appendChild(child);
        child = parent.lastElementChild;
    }
}

function scoreCount(){
    
    document.getElementById("playerOnePoints").textContent=(` ${playerOneCards.length}`);
    document.getElementById("playerTwoPoints").textContent=(` ${playerTwoCards.length}`);
    
}

function resetScore(){
    document.getElementById("playerOnePoints").textContent=(26);
    document.getElementById("playerTwoPoints").textContent=(26);
    
}
function resetAll(){
    resetGameOverMessage();
    removeCard1();
    removeCard2();
    resetScore();
    gameOver=false;
    deck = [];  
    playerOneCards = [];
    playerTwoCards = [];
    playerOnePoints = 26;
    playerTwoPoints = 26;
    
}

function checkWinner() {
    if (playerOneCards.length < 22) {
        gameOver = true;
        
        
    } else if (playerTwoCards.length < 22) {
        gameOver = true;
        
    } else {
        gameOver = false;
    }
    
}

function endGame() {
    if (gameOver){
        endGameMessage();
        setTimeout(() => {
            on();
            gameWinnerSound();
            showPlayGameButton();
        },1300);
        
        hidePlayTurnButton();  
        
    }
}

function endGameMessage() {
    const winner = playerOneCards.length < 22 ? 'Player 2' : 'Player 1';
    const message = `Game Over! ${winner} Wins the Game!! Press Play Game Button to play again.`;
    const gameOverTextElement = document.getElementById('gameOverText');
    gameOverTextElement.textContent = message;
}

function showPlayTurnButton() {
    document.getElementById("playTurn").style.display = "block";
}

function hidePlayGameButton() {
    document.getElementById("playGame").style.display = "none";
}

function showPlayGameButton() {
    document.getElementById("playGame").style.display = "block";
}

function hidePlayTurnButton() {
    document.getElementById("playTurn").style.display = "none";
}

function resetGameOverMessage() {
    
    document.getElementById('gameOverText').textContent = '';
}

function on() {
    
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

function playTurnSound() {
    let audio = new Audio('sounds/click.mp3');
    audio.play();
}

function gameWinnerSound() {
    let audio = new Audio('sounds/winner.mp3');
    audio.play();
}

function gameStarSound() {
    let audio = new Audio('sounds/gameStart.mp3');
    audio.play();
}
