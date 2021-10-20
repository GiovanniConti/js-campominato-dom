const selectDifficulty =  document.getElementById("select");
const btn = document.getElementById("btn-input");
const grid = document.getElementById("grid");
let newBombArray = [];
const bombsNum = 16;   // => change it to change the ammount of bombs in the game

btn.addEventListener("click", function(){
    difficulty = selectDifficulty.value;
    // console.log(difficulty);

    const cellsNumber = GetCellsNumber(difficulty)
    // console.log(cellsNumber);

    GenerateGrid(cellsNumber);
    // function to generate array bomb (generate an array with rundom number that indicates the number of the cells that contain a bomb)
    newBombArray = BombArray(bombsNum, cellsNumber);
    console.log(newBombArray);
    
});

// Function that will return the number of cells after the player choose the difficulty level
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
function GenerateGrid(cellsNumber){
    // to empty the element "grid" if we created some previous grids
    grid.innerHTML = "";

    const cellSize = 100 / Math.sqrt(cellsNumber);

    for(i=0; i < cellsNumber; i++){
        //create the cell(div) and give the classes and the right dimentions to size the cell
        const cell = document.createElement("div");
        cell.classList.add("box")
        cell.style.width = cellSize + "%";
        cell.style.height = cellSize + "%";
        // add the number of the cell
        cell.cellNumber = i + 1;
        cell.textContent = cell.cellNumber;
        // console.log("consoleLog di cell", cell);
        // append "cell" to the html
        grid.append(cell);

        // call the function once clicked on a cell
        cell.addEventListener("click", OnCellClick);

    }

}

// function to give the class "clicked" to a cell
function OnCellClick(){

    let currentCellNum = parseInt(this.cellNumber);

    if(newBombArray.includes(currentCellNum)){
        this.classList.add("bomb");

    let clickedArray = document.querySelectorAll(".clicked");
    // console.log("clicked array", clickedArray);
    let points = clickedArray.length;
    console.log("Points:", points);
        
    } else{
        this.classList.add("clicked");
    }
}

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