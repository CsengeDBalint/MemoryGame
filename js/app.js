//An array that holds all of the cards
const cardsArray = [
    "fa-power-off", 
    "fa-plug",
    "fa-print",
    "fa-save",
    "fa-keyboard-o",
    "fa-headphones",
    "fa-desktop",
    "fa-database",
    "fa-power-off", 
    "fa-plug",
    "fa-print",
    "fa-save",
    "fa-keyboard-o",
    "fa-headphones",
    "fa-desktop",
    "fa-database",
];

//Basic variables

let openedCardsArray = []; // Temporary array for viewed cards
let matchedCardsArray = []; // Temporary array for matched cards
let shuffledCardsArray = []; // Temporary array for all mixed cards


const deck = document.querySelector("ul.deck");


// START A GAME: a function calling shuffle() and createDeck() functions
function startGame() {
    shuffledCardsArray = shuffle(cardsArray);
    
    clearDeck();
    
    createDeck(shuffledCardsArray); //Add new "icons" to every card by calling the createDeck() function 
    
    stars[2].classList.add("purple"); //Set back the second rating star 
    
    stars[1].classList.add("purple"); //Set back the third rating star 

}

//Function to loop through every item of the shuffledCardsArray with an icon
function createDeck(shuffledCardsArray) {

    for (var i = 0; i < shuffledCardsArray.length; i++) {
        
        let liEl = document.createElement("li"); //Create element <li>
        
        liEl.classList.add("card"); // Add .card to <li>
        
        let iEl = document.createElement("i"); // Create element <i>
        
        iEl.classList.add("fa"); // Add .fa to <i>
        
        iEl.classList.add(shuffledCardsArray[i]);  // Also add .fa-x to <i> 
		
        liEl.appendChild(iEl); // Append the icon <i> to the <li> element 
        
        deck.appendChild(liEl); // Append every <li> element to the deck

        liEl.addEventListener("click", turnCard); // Add eventListener to the created card element
    }
}

//Function to remove every card from deck
function clearDeck() {
    
    moves.innerHTML = 0; //Set moveCounter to 0
    
    let currDeck = document.querySelectorAll("li.card");
    
    for(let i = 0; i < currDeck.length ; i++) {
		currDeck[i].remove();
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        
        currentIndex -= 1;
        
        temporaryValue = array[currentIndex];
        
        array[currentIndex] = array[randomIndex];
        
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// PLAY GAME: On every clicked card will be called this function 
function turnCard(event) {

    event.target.classList.add("open", "show"); //If turned up add classes "open" and "show" to liEl
    
    event.target.removeEventListener("click", turnCard); // Disable clicking and turning on the same card twice

    checkCards(event); 
}

//Function to compare the cards if there are two of them opened 
function checkCards(event) {

    openedCardsArray.push(event.target.firstChild); 

    if (openedCardsArray.length === 2) { 
        
        deck.style.pointerEvents = "none"; // After turning two cards there is no possible turning other cards for 1 second 
        
        moveCount(); // With every two cards, moveCounter increments by 1
        
        updateRatingStars(); // By every move the rating stars number will be updated
        
      
        if(openedCardsArray[0].className === openedCardsArray[1].className) {

            openedCardsArray[0].parentNode.classList.add("match");
            openedCardsArray[1].parentNode.classList.add("match");

            matchedCardsArray.push(openedCardsArray[0]);
            matchedCardsArray.push(openedCardsArray[1]);

            openedCardsArray = []; //Empty openedCardsArray
            deck.style.pointerEvents = "auto";

        } else {

            setTimeout(function() { //Function that both cards of the array makes clickable  after a second again
                for (let i = 0; i < openedCardsArray.length; i++) {
                    openedCardsArray[i].parentNode.addEventListener("click", turnCard);
                }
            }, 1000);

            setTimeout(turnBackCard, 1000);

        }
    
    }


    // END GAME: if there are 8 pairs in the matchedCardsArray open the Modal window and make it clickable
    if (matchedCardsArray.length === 16) {
    
        openModal();
        document.body.style.pointerEvents = "auto";
        deck.style.pointerEvents = "none"; // Prevent all cards of the deck from being clickable
    
    }

}

//Remove all added classes and emtpy openedCardsArray
function turnBackCard() {

    for (let i = 0; i < openedCardsArray.length; i++) {
        openedCardsArray[i].parentNode.classList.remove("open", "show"); //Turn back cards
    }
    
    openedCardsArray = []; //Empty openCardsArray
    
    deck.style.pointerEvents = "auto"; //Make the deck clickable again
}

//Add moveCounter and handle stars rating
let moveCounter = 0;
let moves = document.querySelector(".moves");

function moveCount () { //By every turn of a card the number of moves will increased by 1
  
  moveCounter = moveCounter+1;
  
  moves.innerHTML = moveCounter; //Hold the stand of the move counter
  
}

//  Update rating stars
let ratingStarsNumber;

const stars = document.querySelectorAll(".fa-star");

function updateRatingStars() { //Update gained stars number according the number of moves
    ratingStarsNumber = 3;

    if (moveCounter === 1) { 
        myTimer(); //Start timer as the first pair of cards are turned
    }
    else if (moveCounter >= 2 && moveCounter <= 20) { 
        
        ratingStarsNumber =3;   //Between 2 and 20 moves the user gaines 3 stars
        resultStars.innerHTML = ratingStarsNumber;  //Save the current rating stars number
    } 
    else if (moveCounter >= 21 && moveCounter <= 36) {  //Between 21 and 36 moves the user gaines 2 stars
		
        stars[2].classList.remove("purple"); //Remove the first purple star
        ratingStarsNumber =2; 
        resultStars.innerHTML = ratingStarsNumber;
        
	} else if (moveCounter >= 37) { //Above 37 moves the user gains only one star
		
		stars[1].classList.remove("purple"); //Remove the second purple star
        ratingStarsNumber = 1;
        resultStars.innerHTML = ratingStarsNumber; 
	}
}




// Open Modal
const modal = document.getElementById("myModal");
const score = document.querySelector(".score");
const resultMoves = document.querySelector(".resultMoves");
const resultStars = document.querySelector(".resultStars");
const resultTime = document.querySelector(".resultTime");



function openModal() { //Open modal window showing the number of moves, gained rating stars number and time
	setTimeout(function() {
        
        modal.style.display = "block";
        
        resultMoves.innerHTML = moveCounter;
        
        resultStars.innerHTML = ratingStarsNumber;
        
        resultTime.innerHTML = timer.innerHTML; 
    
    }, 1000);
        
    stopTimer(); 
}

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Close modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
document.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Add Timer
let timer = document.querySelector(".timer");
let minutes = 0;
let seconds = 0;
let time;

function myTimer() { //Timer counting seconds and minutes
    
    time = setInterval(function() {
    
        timer.textContent = ` ${minutes} min.${seconds} sec.`; //Add timer the current time
            seconds++;
        
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }

    }, 1000);
    
}

//Stop Timer
function stopTimer() {
    clearInterval(time); //Stop timer as game finished
}


//Restart the game by clicking the Play again! button of the modal windoww
const playAgain = document.querySelector(".playAgain");

playAgain.addEventListener("click", function () {
    
    modal.style.display = "none"; // Not show modal anymore
    
    matchedCardsArray = []; //Empty the 8 pairs of cards from matchedCardsArray
    
    clearInterval(time); //Set timer to 0
    
    timer.textContent = "0min.0sec."; //Set timer display to 0min.0sec. 
    
    moveCounter = 0; //Set the move counter to 0
    
    deck.style.pointerEvents = "auto"; //Enable to turn the cards again
    
    startGame(); //Start a new game
});

//Restart the game by clicking the Restart icon in the Panel-score
const restart = document.querySelector(".restart");

restart.addEventListener("click", function (event) {
    
    matchedCardsArray = [];
    
    timer.textContent = "0min.0sec.";
    
    clearInterval(time);
    
    moveCounter = 0;
    
    deck.style.pointerEvents = "auto";
    
    startGame();
});

//Start a game
startGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

