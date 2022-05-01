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

let computerCardContainer = document.getElementById("computerCardContainer");
let userCardContainer = document.getElementById("userCardContainer");

let deck = [];
let userHand = [];
let computerHand = [];

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

function createCard(cardId, parent) {
    let newDiv = document.createElement("div");
    let topH2 = document.createElement("h2");
    let newImg = document.createElement("img");
    let bottomH2 = document.createElement("h2");

    newDiv.classList.add("card");
    topH2.classList.add("cardId", "card-top");
    newImg.classList.add("card-suit");
    bottomH2.classList.add("cardId", "card-bottom");
    
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
}

function dealInitialRound() {
    let index;

    for(let i=0; i<2; i++) {
        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);

        userHand.push(deck[index]);
        deck[index] = 0;

        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);

        dealerHand.push(deck[index]);
        deck[index] = 0;
    }
}

function newGame() {
    betAmount.innerHTML = 0;
    currentBalance.innerHTML = 1500;
    makeDeck();
}

newGameBtn.addEventListener("click", newGame);