const boardElement = document.getElementById("board");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const gameContainer = document.getElementById("gameContainer");
const canvas = document.getElementById("lineCanvas");
const ctx = canvas.getContext("2d");
const timerElement = document.getElementById("timer");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const endMessage = document.getElementById("endMessage");
const statusMessage = document.getElementById("statusMessage");
const comboMessage = document.getElementById("comboMessage");
const hintBtn = document.getElementById("hintBtn");
const homeBtn = document.getElementById("homeBtn");
const matchSound = [new Audio("sound/match1.mp3"),
    new Audio("sound/match2.mp3"), new Audio("sound/match3.mp3")];
const wrongSound = [new Audio("sound/wrong1.mp3"),
    new Audio("sound/wrong2.mp3"), new Audio("sound/wrong3.mp3")];
const winSound = new Audio("sound/win.mp3"); 
const timeSound = new Audio("sound/outOfTime.mp3");
const shuffleSound = new Audio("sound/reshuffle.mp3");
const hurrySound = new Audio("sound/hurry.mp3");
const useHintSound = new Audio("sound/useHint.mp3");
const noHintLeftSound = new Audio("sound/noHintLeft.mp3");
const restartSound = new Audio("sound/restart.mp3");

let board = [];
let firstSelected = null;
let secondSelected = null;
let score = 0;
let matchSoundIndex = 0;
let wrongSoundIndex = 0;
let timeLeft = 0;
let timeInterval = null;
let isGameOver = false;
let statusTimeOut = null;
let hintsLeft = 0;
let hintCells = [];
let rows = 0;
let cols = 0;
let cellSize = 0;
let currentMode = null;
let isSoundOn = true;
let combo = 0;
let comboTimeOut = null;
let wrongCells = [];

const gameModes ={
    easy: {timeLeft: 600, hintsLeft: 3, rows: 10, cols: 10, cellSize: 30},
    hard: {timeLeft: 300, hintsLeft: 0, rows: 10, cols: 16, cellSize: 30}
}

function showStartScreen(){
    clearInterval(timeInterval);

    startScreen.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    endScreen.classList.add("hidden");

    firstSelected = null;
    secondSelected = null;
    hintCells = [];
    wrongCells = [];
    resetCombo();
    clearPath();
}

function startGame(mode){
    currentMode = gameModes[mode];
    startScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    endScreen.classList.add("hidden");
    timeLeft = currentMode.timeLeft;
    hintsLeft = currentMode.hintsLeft;
    rows = currentMode.rows;
    cols = currentMode.cols;
    cellSize = currentMode.cellSize;
    turnOnSound();
    updateTimerDisplay();
    updateHintDisplay();
    initGame();
    startTimer();
}

function updateHintDisplay(){
    hintBtn.textContent = `💡Hints: ${hintsLeft}`;
    hintBtn.disabled = hintsLeft <= 0;
}

function initGame(){
    clearInterval(timeInterval);
    score = 0;
    scoreElement.textContent = "Score: 0";
    firstSelected = null;
    secondSelected = null;
    isGameOver = false;
    hintCells = [];
    timerElement.style.color = "yellow";
    resetCombo();
    wrongCells = [];

    boardElement.style.gridTemplateColumns = `repeat(${cols},${cellSize}px)`;

    createBoard();
    renderBoard();
    resizeCanvas();
    clearPath();
}

function resetCombo(){
    combo = 0;
    comboMessage.classList.remove("show");
    comboMessage.textContent = "";
    clearTimeout(comboTimeOut);
    comboTimeOut = null;
}

function playMatchSound(){
    const sound = matchSound[matchSoundIndex];
    sound.currentTime = 0;
    sound.play().catch(()=>{});
    matchSoundIndex++;
    if(matchSoundIndex === matchSound.length) matchSoundIndex = 0;
}

function playWrongSound(){
    const sound = wrongSound[wrongSoundIndex];
    sound.currentTime = 0;
    sound.play().catch(()=>{});
    wrongSoundIndex++;
    if(wrongSoundIndex === wrongSound.length) wrongSoundIndex = 0;
}

function shuffle(array){
    for(let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function resizeCanvas(){
    const firstCell = getCanvasPoint(1,1);
    const secondCell = getCanvasPoint(1,2);
    const belowCell = getCanvasPoint(2,1);
    const stepX = secondCell.x - firstCell.x;
    const stepY = belowCell.y - firstCell.y;
    canvas.width = boardElement.offsetWidth + stepX * 2;
    canvas.height = boardElement.offsetHeight + stepY * 2;
    canvas.style.left = `${-stepX}px`;
    canvas.style.top = `${-stepY}px`;
}

function getCellCenter(row,col){
    const index = (row-1)*cols + col-1;
    const cell = boardElement.children[index];
    const boardRect = boardElement.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    return{
        x: cellRect.left - boardRect.left + cellRect.width/2,
        y: cellRect.top - boardRect.top + cellRect.height/2
    };
}

function createBoard(){
    const symbols = [ "image1.png","image2.png","image3.png","image4.png",
    "image5.png","image6.png","image7.png","image8.png",
    "image9.png","image10.png","image11.png","image12.png",
    "image13.png","image14.png","image15.png","image16.png"];
    let values = [];
    const totalCells = rows * cols;
    for(let i = 0; i < totalCells / 2; i++){
        const value = symbols[i % symbols.length];
        values.push(value, value);
    }
    shuffle(values);
    board = [];
    let index = 0;
    for(let row = 0; row < rows + 2; row++){
        let newRow = [];
        for(let col = 0; col<cols+2; col++){
            if(row === 0 || row === rows+1 || col === 0 || col === cols+1) newRow.push(0);
            else{
                newRow.push(values[index]);
                index++;
            }
        }
        board.push(newRow);
    }
}

function renderBoard(){
    boardElement.innerHTML = "";
    for(let row = 1; row<=rows;row++){
        for(let col = 1; col<=cols; col++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            if(board[row][col] === 0){
                cell.classList.add("removed");
            }
            else{
                const img = document.createElement("img");
                img.src = `image/${board[row][col]}`;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "contain";
                cell.appendChild(img);
            }
            if(firstSelected && firstSelected.row === row && firstSelected.col === col){
                cell.classList.add("selected");
            }
            const isHintCell = hintCells.some(item => item.col === col && item.row === row);
            if(isHintCell){
                cell.classList.add("hint");
            }
            const isWrongCell = wrongCells.some(item=>item.row === row && item.col === col);
            if(isWrongCell){
                cell.classList.add("wrong");
            }
            cell.addEventListener("click",() => handleCellClick(row,col));
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(row,col){
    if(isGameOver) return;
    if(board[row][col] === 0) return;
    if(firstSelected === null){
        firstSelected = {row,col};
        renderBoard();
        return;
    }
    if(firstSelected.row === row && firstSelected.col === col) {
        playWrongSound();
        resetCombo();
        wrongCells = [{...firstSelected},{...firstSelected}];
        renderBoard();
        setTimeout(()=>{
            firstSelected = null;
            wrongCells = []; 
            renderBoard();
            clearPath();
        },1000);
        return;
    }
    secondSelected = {row,col};
    const value1 = board[firstSelected.row][firstSelected.col];
    const value2 = board[secondSelected.row][secondSelected.col];
    const path = canConnect(firstSelected,secondSelected);
    if(value1 === value2 && path){
        playMatchSound();
        const p1 ={...firstSelected};
        const p2 = {...secondSelected};
        drawPath(path);
        clearTimeout(comboTimeOut);
        combo+=1;
        if(combo>1){
            comboMessage.classList.add("show");
            comboMessage.textContent = `COMBO: 🔥${combo}`;
        }
        else{
            comboMessage.classList.remove("show");
            comboMessage.textContent = "";
        }
        comboTimeOut = setTimeout(()=>{
            resetCombo();
        },3000);
        setTimeout(()=>{
            board[p1.row][p1.col] = 0;
            board[p2.row][p2.col] = 0;
            score+= 100 + (combo-1)*50;
            scoreElement.textContent = `Score: ${score}`;
            firstSelected = null;
            secondSelected = null;
            clearPath();
            renderBoard();
            if(checkWin()) return;
            if(!hasValidMove()){
                shuffleSound.currentTime = 0;
                shuffleSound.play().catch(()=>{});
                showStatusMessage("There are no choices left! Reshuffle!");
                reshuffleUntilValid();
                renderBoard();
                resizeCanvas();
                clearPath();
            }
        },300);
        return;
    }
    playWrongSound();
    wrongCells = [{...firstSelected},{...secondSelected}];
    renderBoard();
    resetCombo();
    setTimeout(()=>{
        firstSelected = null;
        secondSelected = null;
        wrongCells=[];
        renderBoard();
    },1000);
}

function reshuffleBoard(){
    let remainVal =[];
    for(let row = 1; row<=rows; row++)
        for(let col = 1; col<= cols; col++){
            if(board[row][col]!== 0) remainVal.push(board[row][col]);
        }
    shuffle(remainVal);
    let index = 0;
    for(let row = 1; row<=rows; row++)
        for(let col = 1; col<= cols; col++){
            if(board[row][col]!== 0){
                board[row][col] = remainVal[index];
                index++;
            }
        }
}

function reshuffleUntilValid(){
    let attempts = 0;
    do{
        reshuffleBoard();
        attempts++;
    }while(!hasValidMove() && attempts < 100)
}

function checkLineX(row,col1,col2){
    let min = Math.min(col1,col2);
    let max = Math.max(col1,col2);
    for(let i = min+1; i<max; i++){
        if(board[row][i] !== 0){
            return false;
        }
    }
    return true;
}

function checkLineY(col,row1,row2){
    let min = Math.min(row1,row2);
    let max = Math.max(row1,row2);
    for(let i = min+1; i<max;i++){
        if(board[i][col]!== 0){
            return false;
        }
    }
    return true;
}

function checkStraight(p1,p2){
    if(p1.row === p2.row && checkLineX(p1.row,p1.col,p2.col)){
        return [p1,p2];
    }
    if(p1.col === p2.col && checkLineY(p1.col,p1.row,p2.row)){
        return [p1,p2];
    }
    return null;
}

function checkOneTurn(p1,p2){
    let corner1 = {row: p1.row, col: p2.col};
    let corner2 = {row: p2.row, col: p1.col};
    if(board[corner1.row][corner1.col] === 0 &&
        checkLineX(corner1.row,p1.col,p2.col)&&
        checkLineY(corner1.col,p1.row,p2.row)) return [p1,corner1,p2];
    if(board[corner2.row][corner2.col] === 0 &&
        checkLineX(corner2.row,p1.col,p2.col) &&
        checkLineY(corner2.col,p1.row,p2.row)) return [p1,corner2,p2];
    return null;
}

function checkTwoTurns(p1,p2){
    for(let col = p1.col+1; col< cols + 2; col++){
        if(board[p1.row][col] !== 0) break;
        let mid = {row: p1.row, col: col};
        let subPath = checkOneTurn(mid,p2);
        if(subPath) return [p1,...subPath.slice(0)];
    }
    for(let col = p1.col-1 ; col>=0; col--){
        if(board[p1.row][col] !== 0) break;
        let mid = {row: p1.row, col: col};
        let subPath = checkOneTurn(mid,p2);
        if(subPath) return [p1,...subPath.slice(0)];
    }
    for(let row = p1.row-1; row>=0;row--){
        if(board[row][p1.col] !== 0) break;
        let mid = {row: row, col: p1.col};
        let subPath = checkOneTurn(mid,p2);
        if(subPath) return [p1,...subPath.slice(0)];
    }
    for(let row = p1.row+1; row<rows+2;row++){
        if(board[row][p1.col] !== 0) break;
        let mid = {row: row, col: p1.col};
        let subPath = checkOneTurn(mid,p2);
        if(subPath) return [p1,...subPath.slice(0)];
    }
    return ;
}
function canConnect(p1,p2){
    if(checkStraight(p1,p2)) return checkStraight(p1,p2);
    if(checkOneTurn(p1,p2)) return checkOneTurn(p1,p2);
    if(checkTwoTurns(p1,p2)) return checkTwoTurns(p1,p2);
    return null;
}

function clearPath(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function getCanvasPoint(row,col){
    const firstCell = getCellCenter(1,1);
    const secondCell = getCellCenter(1,2);
    const belowCell = getCellCenter(2,1);
    const stepX = secondCell.x - firstCell.x;
    const stepY = belowCell.y - firstCell.y;
    let x,y;
    if(col>=1 && col<= cols){
        x = getCellCenter(1,col).x + stepX;
    }
    if(col === 0){
        x = firstCell.x;
    }
    if(col === cols + 1){
        x = getCellCenter(1,cols).x + stepX * 2;
    }
    if(row>=1 && row<=rows){
        y = getCellCenter(row,1).y + stepY;
    }
    if(row === 0){
        y = firstCell.y;
    }
    if(row === rows + 1){
        y = getCellCenter(rows,1).y + stepY * 2;
    }
    return {x,y};
}

function drawPath(path){
    clearPath();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "blue";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const start = getCanvasPoint(path[0].row,path[0].col);
    ctx.moveTo(start.x,start.y);
    for(let i = 1; i<path.length; i++){
        const point = getCanvasPoint(path[i].row,path[i].col);
        ctx.lineTo(point.x,point.y);
    }
    ctx.stroke();
}

function findValidMove(){
    for(let row1 = 1; row1 <= rows; row1++)
        for(let col1 = 1; col1 <=cols; col1++){
            if(board[row1][col1] === 0) continue;
            for(let row2 = 1; row2 <= rows; row2++)
                for(let col2 = 1; col2 <= cols; col2++){
                    if(board[row2][col2] === 0) continue;
                    if(row1 === row2 && col1 === col2) continue;
                    if(board[row1][col1] !== board[row2][col2]) continue;
                    const p1 = {row: row1, col: col1};
                    const p2 = {row: row2, col: col2};
                    if(canConnect(p1,p2)){
                        return [p1,p2];
                    }
                }
        }
    return null;
}

function hasValidMove(){
    return findValidMove()!==null;
}

function checkWin(){
    for(let row = 1; row<=rows; row++)
        for(let col = 1; col<=cols; col++){
            if(board[row][col] !== 0) return false;
        }
    winSound.currentTime = 0;
    winSound.play().catch(()=>{});
    clearInterval(timeInterval);
    isGameOver = true;
    showEndScreen("CONGRATULATIONS, YOU WIN!");
    return true;
}

function formatTime(seconds){
    const minute = Math.floor(seconds/60);
    const second = seconds%60;
    const mm = String(minute).padStart(2,"0");
    const ss = String(second).padStart(2,"0");
    return `${mm}:${ss}`;
}

function updateTimerDisplay(){
    timerElement.textContent = `Time: ${formatTime(timeLeft)}`;
}

function startTimer(){
    clearInterval(timeInterval);
    timeInterval = setInterval(()=>{
        timeLeft--;
        updateTimerDisplay();

        if(timeLeft <= 30){
            timerElement.style.color = "red";
        }

        if(timeLeft === 30){
            showStatusMessage("ONLY 30s LEFT! HURRY UP");
            hurrySound.currentTime = 0;
            hurrySound.play().catch(()=>{});
        }

        if(timeLeft<0){
            timeLeft = 0;
            updateTimerDisplay();
            handleTimeUp();
        }
    },1000);
}

function handleTimeUp(){
    clearInterval(timeInterval);
    isGameOver = true;
    firstSelected = null;
    secondSelected = null;
    clearPath();
    renderBoard();
    showEndScreen("TIME'S UP!");
}

function showEndScreen(message){
    startScreen.classList.add("hidden");
    gameContainer.classList.add("hidden");
    endScreen.classList.remove("hidden");
    endMessage.textContent = message;

    endScreen.classList.remove("win-flash");
    endMessage.classList.remove("win-pop");
    if(endMessage.include("WIN")){
        void endScreen.offsetWidth;
        void endMessage.offsetWidth;
        endScreen.classList.add("win-flash");
        endMessage.classList.add("win-pop");
    }
}

function hideEndScreen(){
    gameContainer.classList.remove("hidden");
    endScreen.classList.add("hidden");
    endMessage.textContent = "";
}

function showStatusMessage(message,duration = 1500){
    statusMessage.textContent = message; 
    statusMessage.classList.add("show");
    clearTimeout(statusTimeOut);
    statusTimeOut = setTimeout(()=>{
        statusMessage.classList.remove("show");
        statusMessage.textContent = "";
    },duration);
}

function useHint(){
    if(isGameOver) return;
    if(hintsLeft <= 0) return;
    const move = findValidMove();
    hintCells = [move[0],move[1]];
    renderBoard();
    hintsLeft--;
    score=Math.max(0,score-200);
    scoreElement.textContent = `Score: ${score}`;
    hintBtn.textContent = `💡Hints: ${hintsLeft}`;
    if(hintsLeft >=1){
        useHintSound.currentTime = 0;
        useHintSound.play().catch(()=>{});
    }
    if(hintsLeft === 0){
        hintBtn.disabled = true;
        noHintLeftSound.currentTime = 0;
        noHintLeftSound.play().catch(()=>{});
        showStatusMessage("YOU HAVE USED ALL THE HINTS!");
    }
    setTimeout(()=>{
        hintCells = [];
        renderBoard();
    },5000);
}

function turnOnSound(){
    for(let i=0; i<3;i++){
        matchSound[i].volume = 0.5;
        wrongSound[i].volume = 0.5;
    }
    winSound.volume = 0.5;
    timeSound.volume = 0.5;
    shuffleSound.volume = 0.5;
    hurrySound.volume = 0.5;
    useHintSound.volume = 0.5;
    noHintLeftSound.volume = 0.5;
    restartSound.volume = 0.5;

    soundBtn.textContent = "🔊 Sound";
}

function turnOffSound(){
    for(let i = 0; i<3;i++){
        matchSound[i].volume = 0;
        wrongSound[i].volume = 0;
    }
    winSound.volume = 0;
    timeSound.volume = 0;
    shuffleSound.volume = 0;
    hurrySound.volume = 0;
    useHintSound.volume = 0;
    noHintLeftSound.volume = 0;
    restartSound.volume = 0;

    soundBtn.textContent = "🔇 Sound";
}

function restartGame(){
    if(!currentMode) return;

    clearInterval(timeInterval);
    score = 0;
    scoreElement.textContent = "Score: 0";
    firstSelected = null;
    secondSelected = null;
    boardElement.style.gridTemplateColumns = `repeat(${cols},${cellSize}px)`;
    timeLeft = currentMode.timeLeft;
    updateTimerDisplay();
    isGameOver = false;
    timerElement.style.color = "yellow";
    hintsLeft = currentMode.hintsLeft;
    hintCells = [];
    updateHintDisplay();
    restartSound.currentTime = 0;
    restartSound.play().catch(()=>{});
    hideEndScreen();
    initGame();
    startTimer();
}

soundBtn.addEventListener("click",()=>{
    if(isSoundOn) turnOffSound();
    else turnOnSound();
    isSoundOn = !isSoundOn;
});
homeBtn.addEventListener("click",showStartScreen);
hintBtn.addEventListener("click",useHint);
restartBtn.addEventListener("click",restartGame);
showStartScreen();

