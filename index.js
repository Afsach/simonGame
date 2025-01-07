let gameSeq = [];
let userSeq = [];
let level = 0;

let isGameStarted = false;
let btnColor = ["yellow", "green", "pink", "purple"]

const container = document.querySelector('body');
const levelText = document.querySelector('button');
const btns = document.querySelectorAll('.btn');

//To start the game when user clicks any key on the keyboard
//Remove the disabled attribute from buttons element
levelText.addEventListener('click', () => {
    if (isGameStarted === false) {
        //set to true so that keypress event is not trigered until the same over
        isGameStarted = true;

        //enabling the buttons(div) so that after starting the game user can click on any buttons
        for (let btn of btns) {
            btn.classList.remove('disable-div');
        }
        levelUp()
    }
})

//function to flash the button clicked by game
//adds a 'btn-flash' class in funtion and removes it afater 300ms
const btnFlash = function (btn) {
    btn.classList.add('btn-flash');
    setTimeout(() => {
        btn.classList.remove('btn-flash')
    }, 300);
}

//function to flash the button clicked by user
//adds a 'btn-flash' class in funtion and removes it afater 300ms
const userFlash = function (btn) {
    btn.classList.add('btn-flash');
    setTimeout(() => {
        btn.classList.remove('btn-flash')
    }, 300);
}

const levelUp = function () {
    userSeq = [];
    level += 1;
    levelText.textContent = `level ${level}`;   //1

    // generating random number between 0 to 3
    const randomNumber = Math.floor(Math.random() * 4);
    let color = btnColor[randomNumber]

    //creating the random button 
    let randomBtn = document.querySelector(`.${color}`);

    //clling the btnFlash() function to flash the button clicked by game
    //seding random button as a parameter
    btnFlash(randomBtn)     //1

    //pushing the color to gameSeq array by every level up
    gameSeq.push(color)
    //console.log() to log the gameSeq array
    // console.log("gameSeq : ", gameSeq)
}

const checkSeq = function (idx) {

    //checking if last and last value of gameSeq and userSeq array 
    if (gameSeq[idx] == userSeq[idx]) {

        //It is only going to check this value when in both the array all the values are same
        //bothe array have same length to call the levelUp function and increase the level
        //otherwise it will again wait for the user to click a button for checking next element with gameSeq array
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 500)
        }//
    }
    else {
        //It will execute if the value of first or last gameSeq and userSeq array is not same
        levelText.style.color = 'red';
        levelText.innerHTML = `<h2>YOUR SCORE :  ${level} <br> click again to restart the game</h2>`;
        container.style.backgroundColor = 'red';
        setTimeout(()=>{
            container.style.backgroundColor = 'white';
        }, 1000)
        resetGame();
    }
}

// btnPress funtion to flash the button on which user clicks
//get the id(id of element is already set to a color string) of the button which is clicked by user
//store that id to a color variable
//push color variable into userSeq array
const btnPress = function () {
    let btn = this;
    userFlash(btn)
    userColor = btn.getAttribute('id')
    userSeq.push(userColor)

    //to console.log() to track the userSeq array
    console.log("userSeq ", userSeq)
   
    checkSeq(userSeq.length - 1)
}


// loop for flashing the buttons as prer btnPress funtion
for (let btn of btns) {
    btn.addEventListener('click', btnPress)
}


//function to reset game if game is over
const resetGame = function () {
    isGameStarted = false
    level = 0;
    gameSeq = [];
    userSeq = [];

    //disabling the buttons(div) so that before starting the game user will not able to click on any buttons
    for (let btn of btns) {
        btn.classList.add('disable-div');
    }
}
