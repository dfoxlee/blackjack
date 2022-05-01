let newGameBtn = document.getElementById("newGameBtn");
let hitBtn = document.getElementById("hitBtn");

let chip1 = document.getElementById("chip1");
let chip5 = document.getElementById("chip5");
let chip10 = document.getElementById("chip10");
let chip20 = document.getElementById("chip20");
let chip50 = document.getElementById("chip50");
let chip100 = document.getElementById("chip100");
let chip500 = document.getElementById("chip500");

let betAmount = document.getElementById("betAmount");
let currentBalance = document.getElementById("currentBalance");
let results = document.getElementById("results");

let computerCardContainer = document.getElementById("computerCardContainer");
let userCardContainer = document.getElementById("userCardContainer");

let deck = [];
let userHand = [];
let computerHand = [];
let userScore = 0;
let computerScore = 0;

function makeDeck() {
    deck = [];
    let index;
    
    for(let j=0; j<4; j++) {
        for(let i=2; i<15; i++) {
            if(j == 0) {
                //Spades
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = `S${i}`;
                }else if(i == 11) {
                    deck[index] = "SJ";
                }else if(i == 12) {
                    deck[index] = "SQ";
                }else if(i == 13) {
                    deck[index] = "SK";
                }else if(i == 14) {
                    deck[index] = "SA";
                }

            }else if(j ==1) {
                // Hearts
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = `H${i}`;
                }else if(i == 11) {
                    deck[index] = "HJ";
                }else if(i == 12) {
                    deck[index] = "HQ";
                }else if(i == 13) {
                    deck[index] = "HK";
                }else if(i == 14) {
                    deck[index] = "HA";
                }

            }else if(j == 2) {
                // Clubs
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = `C${i}`;
                }else if(i == 11) {
                    deck[index] = "CJ";
                }else if(i == 12) {
                    deck[index] = "CQ";
                }else if(i == 13) {
                    deck[index] = "CK";
                }else if(i == 14) {
                    deck[index] = "CA";
                }

            }else if(j == 3) {
                // Diamonds
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = `D${i}`;
                }else if(i == 11) {
                    deck[index] = "DJ";
                }else if(i == 12) {
                    deck[index] = "DQ";
                }else if(i == 13) {
                    deck[index] = "DK";
                }else if(i == 14) {
                    deck[index] = "DA";
                }
            }
        }
    }
}

function createCard(cardId, cardVal, parent) {
    if(parent == userCardContainer)
    {
        let newDiv = document.createElement("div");
        let topH2 = document.createElement("h2");
        let newImg = document.createElement("img");
        let bottomH2 = document.createElement("h2");

        newDiv.classList.add("card");
        topH2.classList.add(cardId, "card-top");
        newImg.classList.add("card-suit");
        bottomH2.classList.add(cardId, "card-bottom");

        topH2.innerHTML = cardVal;
        bottomH2.innerHTML = cardVal;
        
        if(cardId == "H") {
            newImg.src = "./resources/heart.png";
        }else if(cardId == "S") {
            newImg.src = "./resources/spade.jpg"
        }else if(cardId == "D") {
            newImg.src = "./resources/diamond.png"
        }else if(cardId == "C") {
            newImg.src = "./resources/club.jpg";
        }

        newDiv.appendChild(topH2);
        newDiv.appendChild(newImg);
        newDiv.appendChild(bottomH2);

        parent.appendChild(newDiv);
    }else {
        let newDiv = document.createElement("div");
        let topH2 = document.createElement("h2");
        let newImg = document.createElement("img");
        let bottomH2 = document.createElement("h2");

        newDiv.classList.add("card");
        topH2.classList.add(cardId, "card-top");
        newImg.classList.add("card-suit");
        bottomH2.classList.add(cardId, "card-bottom");

        newDiv.appendChild(topH2);
        newDiv.appendChild(newImg);
        newDiv.appendChild(bottomH2);

        parent.appendChild(newDiv);
    }
}

function dealInitialRound() {
    let index;
    userHand = [];
    computerHand = [];

    for(let i=0; i<2; i++) {
        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);

        userHand.push(deck[index]);
        deck[index] = 0;

        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);

        computerHand.push(deck[index]);
        deck[index] = 0;
    }

    for(let i=0; i<2; i++) {
        createCard(computerHand[i][0], computerHand[i].slice(1), computerCardContainer);
        createCard(userHand[i][0], userHand[i].slice(1), userCardContainer);
    }
}

function updateScoreHands() {
    let userCalcArr = [];
    let computerCalcArr = [];

    for(let i=0; i<userHand.length; i++) {
        userCalcArr[i] = userHand[i].slice(1);
    }

    for(let i=0; i<computerHand.length; i++) {
        computerCalcArr[i] = computerHand[i].slice(1);
    }

    let userAceCount = 0;
    let computerAceCount = 0;

    for(let i=0; i<userCalcArr.length; i++) {
        if(userCalcArr[i] == "J" || userCalcArr[i] == "Q" || userCalcArr[i] == "K") {
            userCalcArr[i] = "10";
        }else if(userCalcArr[i] == "A") {
            userAceCount += 1;
        }
    }

    for(let i=0; i<computerCalcArr.length; i++) {
        if(computerCalcArr[i] == "J" || computerCalcArr[i] == "Q" || computerCalcArr[i] == "K") {
            computerCalcArr[i] = "10";
        }else if(computerCalcArr[i] == "A") {
            computerAceCount += 1;
        }
    }

    for(let i=0; i<userCalcArr.length; i++) {
        if(userCalcArr[i] != "A") {
            userScore += parseInt(userCalcArr[i]);
        }
    }

    for(let i=0; i<computerCalcArr.length; i++) {
        if(computerCalcArr[i] != "A") {
            computerScore += parseInt(computerCalcArr[i]);
        }
    }

    if(userAceCount > 0) {
        for(let i=0; i<userAceCount; i++) {
            if(userScore < 11) {
                userScore += 11;
            }else {
                userScore += 1;
            }
        }
    }

    if(computerAceCount > 0) {
        for(let i=0; i<computerAceCount; i++) {
            if(computerScore < 11) {
                computerScore += 11;
            }else {
                computerScore += 1;
            }
        }
    }
}

function checkScore() {

}

function newGame() {
    betAmount.innerHTML = 0;
    currentBalance.innerHTML = 1500;
    userScore = 0;
    computerScore = 0;

    let userCardLength = document.getElementById("userCardContainer").children.length;
    let computerCardLength = document.getElementById("computerCardContainer").children.length;
    if(userCardLength > 0 || userCardLength > 0) {
        for(let i=0; i<userCardLength; i++) {
            userCardContainer.removeChild(userCardContainer.firstElementChild);
        }
    
        for(let i=0; i<computerCardLength; i++) {
            computerCardContainer.removeChild(computerCardContainer.firstElementChild);
        }
    }

    makeDeck();
    dealInitialRound();
    updateScoreHands();
    checkScore();
}

newGameBtn.addEventListener("click", newGame);