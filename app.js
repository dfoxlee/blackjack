let deck;
let userHand = [];
let dealerHand = [];
let userScore = 0;
let dealerScore;
let roundStart = false;

let dealBtn = document.getElementById("dealBtn");
let betAmount = document.getElementById("betAmount");
let bankBalance = document.getElementById("bankBalance");

let chip1 = document.getElementById("chip1");
let chip5 = document.getElementById("chip5");
let chip10 = document.getElementById("chip10");
let chip50 = document.getElementById("chip50");
let chip100 = document.getElementById("chip100");
let chip500 = document.getElementById("chip500");

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
                    deck[index] = [i, "S"];
                }else if(i == 11) {
                    deck[index] = ["J", "S"];
                }else if(i == 12) {
                    deck[index] = ["Q", "S"];
                }else if(i == 13) {
                    deck[index] = ["K", "S"];
                }else if(i == 14) {
                    deck[index] = ["A", "S"];
                }

            }else if(j ==1) {
                // Hearts
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = [i, "H"];
                }else if(i == 11) {
                    deck[index] = ["J", "H"];
                }else if(i == 12) {
                    deck[index] = ["Q", "H"];
                }else if(i == 13) {
                    deck[index] = ["K", "H"];
                }else if(i == 14) {
                    deck[index] = ["A", "H"];
                }

            }else if(j == 2) {
                // Clubs
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = [i, "C"];
                }else if(i == 11) {
                    deck[index] = ["J", "C"];
                }else if(i == 12) {
                    deck[index] = ["Q", "C"];
                }else if(i == 13) {
                    deck[index] = ["K", "C"];
                }else if(i == 14) {
                    deck[index] = ["A", "C"];
                }

            }else if(j == 3) {
                // Diamonds
                index = Math.floor(Math.random()*52);

                while(deck[index] != undefined) {
                    index = Math.floor(Math.random()*52);
                }

                if(i < 11){
                    deck[index] = [i, "D"];
                }else if(i == 11) {
                    deck[index] = ["J", "D"];
                }else if(i == 12) {
                    deck[index] = ["Q", "D"];
                }else if(i == 13) {
                    deck[index] = ["K", "D"];
                }else if(i == 14) {
                    deck[index] = ["A", "D"];
                }
            }
        }
    }
}

function dealFirstCards() {
    let index;
    for(let i=0; i<2; i++) {
        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);

        userHand[i] = deck[index];
        deck[index] = 0;
    }

    for(let i=0; i<2; i++) {
        do{
            index = Math.floor(Math.random()*52);
        }while(deck[index] == 0);

        dealerHand[i] = deck[index];
        deck[index] = 0;
    }
}

function checkUserHand() {
    userScore = 0;
    let tempArr = [];
    let aceIndex = 0;

    for(let i=0; i<userHand.length; i++) {
        if(userHand[i][0] == "J" || userHand[i][0] == "Q" || userHand[i][0] == "K") {
            tempArr.push(10);
        }else if(userHand[i][0] == "A") {
            aceIndex += 1;
        }else {
            tempArr.push(parseInt(userHand[i][0]));
        }
    }

    for(let i=0; i<tempArr.length; i++) {
        userScore += tempArr[i];
    }

    if(aceIndex > 0) {
        for(let i=0; i<aceIndex; i++) {
            if(userScore < 11) {
                userScore += 11;
            }else{
                userScore += 1;
            }
        }
    }
}

function addUserCard() {
    let index;

    do{
        index = Math.floor(Math.random()*52);
    }while(deck[index] == 0);

    userHand.push(deck[index]);
    deck[index] = 0;
}

function checkDealerHand() {
    dealerScore = 0;
    let tempArr = [];
    let aceIndex = 0;

    for(let i=0; i<dealerHand.length; i++) {
        if(dealerHand[i][0] == "J" || dealerHand[i][0] == "Q" || dealerHand[i][0] == "K") {
            tempArr.push(10);
        }else if(dealerHand[i][0] == "A") {
            aceIndex += 1;
        }else {
            tempArr.push(parseInt(dealerHand[i][0]));
        }
    }

    for(let i=0; i<tempArr.length; i++) {
        dealerScore += tempArr[i];
    }

    if(aceIndex > 0) {
        for(let i=0; i<aceIndex; i++) {
            if(dealerScore < 11) {
                dealerScore += 11;
            }else{
                dealerScore += 1;
            }
        }
    }
}

function addDealerCard() {
    let index;

    do{
        index = Math.floor(Math.random()*52);
    }while(deck[index] == 0);

    dealerHand.push(deck[index]);
    deck[index] = 0;
}

function acceptBet(ele) {
    if(roundStart == false) {
        let currentBet = parseInt(betAmount.innerHTML);
        let currentBankBalance = parseInt(bankBalance.innerHTML);

        if((currentBankBalance - parseInt(ele.target.innerText.slice(1))) >= 0) {
            currentBet += parseInt(ele.target.innerText.slice(1));
            currentBankBalance -= parseInt(ele.target.innerText.slice(1));
            betAmount.innerHTML = currentBet;
            bankBalance.innerHTML = currentBankBalance;
        }
    }else {
        return;
    }
}

function dealInitialCards() {
    let currentBet = parseInt(betAmount.innerHTML);
    if(currentBet == 0) {
        alert("Please place a bet before the deal.");
        return;
    }

    if(roundStart == false) {
        roundStart = true;
        makeDeck();
        dealFirstCards();
        checkUserHand();

        let dealerCards = document.getElementsByClassName("dealer-card");
        let userCards = document.getElementsByClassName("user-card");

        dealerCards[1].style.background = "none";
        dealerCards[1].style.backgroundColor = "white";

        let dealerTopSuit = document.createElement("span");
        let dealerSuit = document.createElement("img")
        let dealerBottomSuit = document.createElement("span");

        dealerTopSuit.classList.add("top-suit", dealerHand[1][1]);
        dealerTopSuit.innerHTML = dealerHand[1][0];
        switch(dealerHand[1][1]) {
            case "H":
                dealerSuit.src = "./resources/heart.png";
                dealerSuit.classList.add("suit");
                break;
            case "D":
                dealerSuit.src = "./resources/diamond.png";
                dealerSuit.classList.add("suit");
                break;
            case "S":
                dealerSuit.src = "./resources/spade.jpg";
                dealerSuit.classList.add("suit");
                break;
            case "C":
                dealerSuit.src = "./resources/club.jpg";
                dealerSuit.classList.add("suit");
                break;
        }
        dealerBottomSuit.classList.add("bottom-suit", dealerHand[1][1]);
        dealerBottomSuit.innerHTML = dealerHand[1][0];

        dealerCards[1].appendChild(dealerTopSuit);
        dealerCards[1].appendChild(dealerSuit);
        dealerCards[1].appendChild(dealerBottomSuit);

        

        for(let i=0; i<2; i++) {
            userCards[i].style.background = "none";
            userCards[i].style.backgroundColor = "white";

            let userTopSuit = document.createElement("span");
            let userSuit = document.createElement("img")
            let userBottomSuit = document.createElement("span");

            userTopSuit.classList.add("top-suit", userHand[i][1]);
            userTopSuit.innerHTML = userHand[i][0];
            switch(userHand[i][1]) {
                case "H":
                    userSuit.src = "./resources/heart.png";
                    userSuit.classList.add("suit");
                    break;
                case "D":
                    userSuit.src = "./resources/diamond.png";
                    userSuit.classList.add("suit");
                    break;
                case "S":
                    userSuit.src = "./resources/spade.jpg";
                    userSuit.classList.add("suit");
                    break;
                case "C":
                    userSuit.src = "./resources/club.jpg";
                    userSuit.classList.add("suit");
                    break;
            }
            userBottomSuit.classList.add("bottom-suit", userHand[i][1]);
            userBottomSuit.innerHTML = userHand[i][0];

            userCards[i].appendChild(userTopSuit);
            userCards[i].appendChild(userSuit);
            userCards[i].appendChild(userBottomSuit);
        }
    }
}

dealBtn.addEventListener("click", dealInitialCards);
chip1.addEventListener("click",acceptBet);
chip5.addEventListener("click",acceptBet);
chip10.addEventListener("click",acceptBet);
chip50.addEventListener("click",acceptBet);
chip100.addEventListener("click",acceptBet);
chip500.addEventListener("click",acceptBet);