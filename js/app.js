document.addEventListener('DOMContentLoaded', () => {
    const qwerty = document.getElementById('qwerty');
    // const phrase = document.getElementById('phrase');
    const resetBtn = document.querySelector('.btn__reset');
    let missed = 0;
    const phrases = [
        'Better late than never',
        'Hang in there',
        'So far so good',
        'Break a leg',
        'No pain no gain'
    ];
    const ul = document.querySelector('ul');
    const allButtons = document.getElementsByTagName('BUTTON');
    const heart = document.querySelectorAll('.tries img');
    const showClass = document.getElementsByClassName('show'); 

    function getRandomPhraseAsArray(arg) { // Selects a random phrase from given arg and returns it
        const randomNumber = Math.floor(Math.random() * arg.length); // Get a random number based on the length of arg
        const randomPhrase = arg[randomNumber]; // Selects a phrase using the randomNumber
        return randomPhrase; // Returns randomPhrase
    }

    function addPhraseToDisplay(arg){ // Adds given phrase to the display 
        const letters = arg.split(''); // Take the arg array and splits it into characters
        let li; // Initalize an li variable
        for(let i = 0; i < letters.length; i++){ // Loop through letters array
            li = document.createElement('li'); // Create li element
            li.textContent = letters[i]; // Add the character to the li 
            ul.appendChild(li); // Add the li to the ul
            if (letters[i] !== ' '){     // If the character isn't an empty string
                li.classList.add('letter'); // Add class of 'letter'
            } else {                     // If the character is an empty string
                li.classList.add('space');  // Add class of 'space'
            }
        }
        return li; // Returns li
    }

    function checkLetter(clickedButton){ // Checks the letter to see if it matches one in the phraseLetters array and also sets the buttons to disabled when clicked
        const phraseLetters = document.querySelectorAll('#phrase li'); // Selects the li's of the phrase id
        const chosenLetters = document.getElementsByClassName('chosen'); // Selects the letters with the class of 'chosen'
        let match = null;   // Initialize match to null
        for(let i = 0; i < chosenLetters.length; i ++){ // Loops through the chosenLetters array
            chosenLetters[i].setAttribute('disabled', true); // Sets the attribute of disabled to current chosenLetter
        }
        for(let i = 0; i < phraseLetters.length; i ++){ // Loops through the phraseLetters array
            if(clickedButton.textContent === phraseLetters[i].textContent.toLowerCase()){ // If the textContent of clickedButton and phraseLetters match
                phraseLetters[i].classList.add('show'); // Adds class of 'show' to the current phraseLetter
                match += clickedButton.textContent; // Sets the match variable to the text content of the clickedButton
            } 
        }
        return match; // Returns match
    }

    function checkWin(){ // Checks if all letters match or if there have been over 5 wrong guesses. Changes the overlay as appropriate and resetBtn text
        const letterClass = document.querySelectorAll('.letter'); // Selects elements with the class of 'letter'
        const headline = document.querySelector('.title'); // Selects elements with the class of 'title'
        let win = false; // Initialize win to false
        if(letterClass.length === showClass.length){ // If letterClass and showClass arrays are the same length
            changeOverlayClassAndStyle('win', 'flex'); // Calls the changeOverlayClassAndStyle function
            headline.textContent = "Congratulations! You won!"; // Change the headlines text to this
            win = true; // Change the win variable to true
            resetBtn.textContent = 'Play Again'; // Change the reset Buttons text to this
        }
        else if (missed > 4){ // If the missed variable is over 4
            changeOverlayClassAndStyle('lose', 'flex'); // Calls the changeOverlayClassAndStyle function
            headline.textContent = "Sorry. You lose"; // Change the headlines text to this
            win = false;  // Change the win variable to false
            resetBtn.textContent = 'Try Again'; // Change the reset Buttons text to this
        }
        return win; // Returns win
    }

    function changeOverlayClassAndStyle(arg, styleChange) { // Changes the className and display settings of the overlay
        const overlay = document.getElementById('overlay'); // Stores the overlay element
        overlay.className = arg; // Change the value of overlay className to the arg
        overlay.style.display = styleChange; // Change the value of the display to styleChange
    }

    resetBtn.addEventListener('click', () => { // When resetBtn is clicked
        missed = 0; // Change missed variable to 0
        changeOverlayClassAndStyle('start', 'none'); // Calls the changeOverlayClassAndStyle function
        ul.innerHTML = ''; // Set the ul's HTML to an empty string
        for(let i = 0; i < allButtons.length; i++){ // Loops through the allButtons array
            allButtons[i].removeAttribute('class'); // Removes the class attribute from allButtons
            allButtons[i].removeAttribute('disabled'); // Removes the disabled attribute from allButtons
        }
        for(let i = 0; i < heart.length; i++){ // Loops through the heart array
            heart[i].src='images/liveHeart.png'; // Changes the image of the current heart
        }
        const currentPhrase = getRandomPhraseAsArray(phrases); // Stores the getRandomPhraseAsArray() inside a variable
        addPhraseToDisplay(currentPhrase); // Calls the addPhraseToDisplay() using the phrase picked in the currentPhrase variable
    });

    qwerty.addEventListener('click', (e) => { // When a child of qwerty is clicked
        if(e.target.tagName === 'BUTTON'){ // If the event target's tag name is 'button'
            e.target.classList.add('chosen'); // Add the class of 'chosen' to the event target
            const check = checkLetter(e.target); // Calls the checkLetter function on the event target
            if(check === null){ // If the checkLetter functions returns the match variable as null
                heart[missed].src='images/lostHeart.png'; // Target the heart index that was missed and change the image to lostHeart.png
                missed += 1; // Increase the number stored in missed variable by 1
            }
            for(let i = 0; i < showClass.length; i++){ // Loop through the showClass array
                showClass[i].style.transition = 'all ease-out 0.6s'; // Adds a transition to the current index in showClass array
            }
        }
        checkWin(); // Calls the checkWin function
    });
});


