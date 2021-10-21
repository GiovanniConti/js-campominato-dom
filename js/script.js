"use strict"

const selectDifficulty =  document.getElementById("select");
const btn = document.getElementById("btn-input");
const grid = document.getElementById("grid");
let newBombArray = [];
const bombsNum = 16;   // => change it to change the ammount of bombs in the game

btn.addEventListener("click", function(){
    const difficulty = selectDifficulty.value;
    // console.log(difficulty);

    const cellsNumber = GetCellsNumber(difficulty)
    // console.log(cellsNumber);

    // function that resets (removes) the overlay
    RemoveOverlay()

    GenerateGrid(cellsNumber, bombsNum);
    // function to generate array bomb (generate an array with random numbers that indicates the number of the cells that contain a bomb)
    newBombArray = BombArray(bombsNum, cellsNumber);
    // console.log(newBombArray);   /* ==> uncomment to see where the bombs are displayed in the grid */

});

// Function that will return the number of cells after the player chose the difficulty level
function GetCellsNumber(difficulty){
    let result;

    switch(parseInt(difficulty)){
        case 1:
            result = 100;
            break;
        
        case 2:
            result = 81;
            break;
        
        case 3:
            result = 49;
            break;
    }

    return result;
}

// function that generate the grid after getting the number of cells
function GenerateGrid(cellsNumber, bombsNum){
    // to empty the element "grid" if we created some previous grids
    grid.innerHTML = "";

    const cellSize = 100 / Math.sqrt(cellsNumber);
    let i = 0;

    for(i=0; i < cellsNumber; i++){
        //creates the cell(div) and gives the classes and the right dimentions to size the cell
        const cell = document.createElement("div");
        
        cell.classList.add("box")
        cell.style.width = cellSize + "%";
        cell.style.height = cellSize + "%";
        
        // add the number of the cell
        cell.cellNumber = i + 1;
        cell.textContent = cell.cellNumber;
        // console.log("consoleLog di cell", cell);
        
        // number of cells without bombs
        cell.bombfreecells = cellsNumber - bombsNum;

        // append "cell" to the html
        grid.append(cell);

        // call the function once clicked on a cell
        cell.addEventListener("click", OnCellClick);

    }

}

// function called once clicked on a cell
function OnCellClick(){

    let currentCellNum = parseInt(this.cellNumber);

    // create an array to get all the clicked cells
    let clickedArray = document.querySelectorAll(".clicked");
    // console.log("clicked array", clickedArray);

    let points = clickedArray.length;
    // console.log("Points:", points);
    let bombClicked;

    if(newBombArray.includes(currentCellNum)){
        this.classList.add("bomb");
        bombClicked = true
        DisplayOverlay(points, bombClicked)
    } else{
        this.classList.add("clicked");
    }

    if(points == this.bombfreecells - 1){
        bombClicked = false
        DisplayOverlay(points, bombClicked);
    }
}

// function to generate an array that contains the positions of the bombs
function BombArray(bombs, maxRandomNum){
    let bombArray = [];

    while(bombArray.length < bombs){

        // generate random number between 1 and the number of cells (cellsNumber)
        const randomNum = Math.floor(Math.random() * maxRandomNum + 1);
        let exist = bombArray.includes(randomNum);

        if(!exist){
            bombArray.push(randomNum);
        }
    }
    return bombArray;
}

// function to display the overlay once clicked on a bomb or clicked all the bomb free cells
function DisplayOverlay(points, clickedBomb){

    // adds class displayOverlay to resultOverlay
    const displayOverlay = document.getElementById("resultsOverlay");
    displayOverlay.classList.add("displayOverlay");

    // checks if clicked a bomb or if clicked all bombs free cells and displays the correct overlay
    if(clickedBomb){
        const gameOver = document.getElementById("gameOver");
        gameOver.classList.add("displayed");
    } else{
        const win = document.getElementById("win");
        win.classList.add("displayed");
        points = points+1;
    }

    // adds to the overlay the ammount of points gained
    const score = document.getElementById("score");
    score.innerHTML  = points;
}

// function to reset (remove) the overlay and play again
function RemoveOverlay(){
    const displayOverlay = document.getElementById("resultsOverlay");
    displayOverlay.classList.remove("displayOverlay");

    const gameOver = document.getElementById("gameOver");
    gameOver.classList.remove("displayed");

    const win = document.getElementById("win");
    win.classList.remove("displayed");

    // removees the ammount of points gained the previous game
    const score = document.getElementById("score");
    score.innerHTML  = "";
}