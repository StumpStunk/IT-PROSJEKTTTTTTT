var board = [];
var rows = 8;
var columns = 8;

var minesCount = 10;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    boardEl.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
    boardEl.style.gridTemplateRows = `repeat(${rows}, 50px)`;
    restartGame()
}

let difficultyCounter = 0
const difficultyBtnEl = document.getElementById("difficulty-btn")
const boardEl = document.getElementById("board")

function setDifficulty() {
    if (difficultyCounter == 0) {
        difficultyCounter ++
        difficultyBtnEl.innerText = "Intermediate"
        difficultyBtnEl.style.backgroundColor = "gold"
        rows = 16 
        columns = 16 
        minesCount = 40
    }
    else if (difficultyCounter == 1) {
        difficultyCounter ++
        difficultyBtnEl.innerText = "Hard"
        difficultyBtnEl.style.backgroundColor = "red"
        rows = 16
        columns = 30 
        minesCount = 99
    }
    else if (difficultyCounter == 2) {
        difficultyCounter ++
        difficultyBtnEl.innerText = "Expert"
        difficultyBtnEl.style.backgroundColor = "#780606"
        rows = 20
        columns = 40 
        minesCount = 150
        difficultyBtnEl.style.position = "block"
    }
    else {
        difficultyCounter = 0
        difficultyBtnEl.innerText = "Beginner"
        difficultyBtnEl.style.backgroundColor = "green"
        rows = 8;
        columns = 8;
        minesCount = 10;
    }
    boardEl.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
    boardEl.style.gridTemplateRows = `repeat(${rows}, 50px)`;
    restartGame();
}

function setMinesLoc() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft --;
        }
    }
}

function startGame() {
    setMinesLoc(); 
    document.getElementById("mines-count").innerText = minesCount;

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row)
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "f") {
        setFlag()
    }
    if (event.key === "r") {
        restartGame()
    }
})

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-btn").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true
        document.getElementById("flag-btn").style.backgroundColor = "darkgray"
    }
}

function clickTile() {
    let tile = this;

    if (gameOver || this.classList.contains("tile-clicked")) {
        return
    }
    if (flagEnabled) {
        if (tile.innerText == "") {
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩") {
            tile.innerText = "";
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        gameOver = true
        revealMines();
        return
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red"
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked")
    tilesClicked += 1

    let minesFound = 0

    //øvre del
    minesFound += checkTile(r - 1, c - 1)   //topp venstre
    minesFound += checkTile(r - 1, c)       //topp midten
    minesFound += checkTile(r - 1, c + 1)   //topp høyre

    //venstre og høyre
    minesFound += checkTile(r, c - 1)       //venstre
    minesFound += checkTile(r, c + 1)       //høyre

    //nedre del
    minesFound += checkTile(r + 1, c - 1)   //nede venstre
    minesFound += checkTile(r + 1, c)       //nede midten
    minesFound += checkTile(r + 1, c + 1)   //nede høyre 

    if (minesFound > 0) {
        board[r][c].innerText = minesFound
        board[r][c].classList.add("x" + minesFound.toString())
    }
    else {
        checkMine(r - 1, c - 1);
        checkMine(r - 1, c);
        checkMine(r - 1, c + 1);
        checkMine(r, c - 1);
        checkMine(r, c + 1);
        checkMine(r + 1, c - 1);
        checkMine(r + 1, c);
        checkMine(r + 1, c + 1);
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared"
        gameOver = true
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}

function restartGame() {
    boardEl.innerHTML = "";
    board = [];
    minesLocation = [];
    tilesClicked = 0;
    gameOver = false;
    startGame();
}