let deck;
let userHand = [];
let dealerHand = [];
let userScore = 0;
let dealerScore;

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