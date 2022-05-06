let deck;
let userHand = [];
let dealerHand = [];
let userScore = 0;
let dealerScore;
let roundStart = false;

let newGameBtn = document.getElementById("newGameBtn");
let dealBtn = document.getElementById("dealBtn");
let betAmount = document.getElementById("betAmount");
let bankBalance = document.getElementById("bankBalance");
let hitBtn = document.getElementById("hitBtn");
let stayBtn = document.getElementById("stayBtn");
let userCardWrapper = document.getElementById("userCardWrapper");
let dealerCardWrapper = document.getElementById("dealerCardWrapper");
let gameMessage = document.getElementById("gameMessage");
let gameMessageWrapper = document.getElementById("gameMessageWrapper");

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

function updateUserScore() {
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

function updateDealerScore() {
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
    if(roundStart == false && parseInt(bankBalance.innerText) == 0 && parseInt(betAmount.innerText) == 0) {
        gameMessage.innerHTML = "You are broke.<br/>Start a new game to play again.";
        gameMessageWrapper.style.display = "block";
        return;
    }
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
    gameMessageWrapper.style.display = "none";

    let currentBet = parseInt(betAmount.innerHTML);
    if(currentBet == 0) {
        alert("Please place a bet before the deal.");
        return;
    }

    if(roundStart == false) {
        roundStart = true;
        makeDeck();
        clearHands();
        userScore = 0;
        dealerScore = 0;
        userHand = [];
        dealerHand = [];
        dealFirstCards();
        updateUserScore();
        updateDealerScore();

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

            userCards[i].style.zIndex = "-1";

            userCards[i].appendChild(userTopSuit);
            userCards[i].appendChild(userSuit);
            userCards[i].appendChild(userBottomSuit);
        }

        hitBtn.style.backgroundColor = "darkred";
        stayBtn.style.backgroundColor = "darkred";
        hitBtn.style.color = "gainsboro";
        stayBtn.style.color = "gainsboro";

        hitBtn.addEventListener("click", hitUserCard);
        stayBtn.addEventListener("click", updateDealerHand);

        if(userScore == 21) {
            userWins();
        }
    }
}

function hitUserCard() {
    addUserCard();
    updateUserScore();
    let userCardsIndex = (userHand.length - 1);

    let userCard = document.createElement("div");
    let userTopSuit = document.createElement("span");
    let userSuit = document.createElement("img")
    let userBottomSuit = document.createElement("span");

    userCard.classList.add("user-card");
    userCard.style.background = "none";
    userCard.style.backgroundColor = "white";
    userCard.style.zIndex = "-1";
    userTopSuit.classList.add("top-suit", userHand[userCardsIndex][1]);
    userTopSuit.innerHTML = userHand[userCardsIndex][0];
    switch(userHand[userCardsIndex][1]) {
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
    userBottomSuit.classList.add("bottom-suit", userHand[userCardsIndex][1]);
    userBottomSuit.innerHTML = userHand[userCardsIndex][0];

    userCard.appendChild(userTopSuit);
    userCard.appendChild(userSuit);
    userCard.appendChild(userBottomSuit);

    userCardWrapper.appendChild(userCard);

    if(userScore == 21) {
        userWins();
    }else if(userScore > 21) {
        userLoses();
    }
}

function updateDealerHand() {
    updateDealerScore();

    let dealerCards = document.getElementsByClassName("dealer-card");

    dealerCards[0].style.background = "none";
    dealerCards[0].style.backgroundColor = "white";

    let newDealerCardTop = document.createElement("span");
    let newDealerCardSuit = document.createElement("img");
    let newDealerCardBottom = document.createElement("span");

    newDealerCardTop.classList.add("top-suit", dealerHand[0][1]);
    newDealerCardBottom.classList.add("bottom-suit", dealerHand[0][1]);
    newDealerCardTop.innerText = dealerHand[0][0];
    newDealerCardBottom.innerText = dealerHand[0][0];

    switch(dealerHand[0][1]) {
        case "H":
            newDealerCardSuit.src = "./resources/heart.png";
            newDealerCardSuit.classList.add("suit");
            break;
        case "D":
            newDealerCardSuit.src = "./resources/diamond.png";
            newDealerCardSuit.classList.add("suit");
            break;
        case "S":
            newDealerCardSuit.src = "./resources/spade.jpg";
            newDealerCardSuit.classList.add("suit");
            break;
        case "C":
            newDealerCardSuit.src = "./resources/club.jpg";
            newDealerCardSuit.classList.add("suit");
            break;
    }
    dealerCards[0].appendChild(newDealerCardTop);
    dealerCards[0].appendChild(newDealerCardSuit);
    dealerCards[0].appendChild(newDealerCardBottom);

    while(dealerScore < 17) {
        addDealerCard();
        updateDealerScore();
    }

    if(dealerHand.length > 2) {
        for(let i=2; i<dealerHand.length; i++) {
            let newDealerCardDiv = document.createElement("div");
            newDealerCardTop = document.createElement("span");
            newDealerCardSuit = document.createElement("img");
            newDealerCardBottom = document.createElement("span");

            newDealerCardDiv.classList.add("dealer-card");
            newDealerCardTop.classList.add("top-suit", dealerHand[i][1]);
            newDealerCardBottom.classList.add("bottom-suit", dealerHand[i][1]);
            newDealerCardTop.innerText = dealerHand[i][0];
            newDealerCardBottom.innerText = dealerHand[i][0];

            newDealerCardDiv.style.background = "none";
            newDealerCardDiv.style.backgroundColor = "white";

            switch(dealerHand[i][1]) {
                case "H":
                    newDealerCardSuit.src = "./resources/heart.png";
                    newDealerCardSuit.classList.add("suit");
                    break;
                case "D":
                    newDealerCardSuit.src = "./resources/diamond.png";
                    newDealerCardSuit.classList.add("suit");
                    break;
                case "S":
                    newDealerCardSuit.src = "./resources/spade.jpg";
                    newDealerCardSuit.classList.add("suit");
                    break;
                case "C":
                    newDealerCardSuit.src = "./resources/club.jpg";
                    newDealerCardSuit.classList.add("suit");
                    break;
            }
            newDealerCardDiv.appendChild(newDealerCardTop);
            newDealerCardDiv.appendChild(newDealerCardSuit);
            newDealerCardDiv.appendChild(newDealerCardBottom);

            dealerCardWrapper.appendChild(newDealerCardDiv);
        }
    }

    if(dealerScore < userScore || dealerScore > 21) {
        userWins();
    }else if(dealerScore > userScore && dealerScore <= 21) {
        userLoses();
    }else if(userScore == dealerScore) {
        draw();
    }
}

function userWins() {
    updateUserScore();
    hitBtn.removeEventListener("click", hitUserCard);
    stayBtn.removeEventListener("click", updateDealerHand);
    roundStart = false;
    gameMessageWrapper.style.display = "block";
    if(userScore == 21) {
        gameMessage.innerText = "Blackjack! Player Wins!";
    }else {
        gameMessage.innerText = "Player Wins!";
    }

    bankBalance.innerText = (3/2)*parseInt(betAmount.innerText) + parseInt(bankBalance.innerText);
    betAmount.innerText = 0;
}

function userLoses() {
    updateDealerScore();
    updateUserScore();
    hitBtn.removeEventListener("click", hitUserCard);
    stayBtn.removeEventListener("click", updateDealerHand);
    roundStart = false;
    gameMessageWrapper.style.display = "block";
    if(dealerScore == 21) {
        gameMessage.innerText = "Blackjack. Player Loses.";
    }else if(userScore > 21){
        gameMessage.innerText = "Player Busts.";
    }else {
        gameMessage.innerText = "Dealer wins."
    }

    betAmount.innerText = 0;
}

function draw() {
    updateDealerScore();
    updateUserScore();
    roundStart = false;
    gameMessage.innerText = "It's a Draw."
    gameMessageWrapper.style.display = "block";

    bankBalance.innerText = parseInt(bankBalance.innerText) + parseInt(betAmount.innerText);
    betAmount.innerText = 0;
}

function clearHands() {
    while(userCardWrapper.firstChild) {
        userCardWrapper.removeChild(userCardWrapper.firstChild);
    }

    while(dealerCardWrapper.firstChild) {
        dealerCardWrapper.removeChild(dealerCardWrapper.firstChild);
    }

    for(let i=0;i<2;i++) {
        let newDealerCard = document.createElement("div");
        let newUserCard = document.createElement("div");

        newDealerCard.classList.add("dealer-card");
        newUserCard.classList.add("user-card");

        dealerCardWrapper.appendChild(newDealerCard);
        userCardWrapper.appendChild(newUserCard);
    }
}

function newGame() {
    clearHands();
    userScore = 0;
    dealerScore = 0;
    userHand = [];
    dealerHand = [];
    bankBalance.innerText = 1500;
    betAmount.innerText = 0;
    gameMessageWrapper.style.display = "none";
}

newGameBtn.addEventListener("click", newGame);
dealBtn.addEventListener("click", dealInitialCards);
chip1.addEventListener("click",acceptBet);
chip5.addEventListener("click",acceptBet);
chip10.addEventListener("click",acceptBet);
chip50.addEventListener("click",acceptBet);
chip100.addEventListener("click",acceptBet);
chip500.addEventListener("click",acceptBet);