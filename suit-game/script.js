const game = () => {
  let pScore = 0;
  let cScore = 0;

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".start");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
      introScreen.classList.remove("fadeIn");
    });
  };
  
  //settings
  const goSettings = () => {
    const settingsBtn = document.querySelector(".settingsBtn");
    const introScreen = document.querySelector(".intro");
    const settings = document.querySelector(".settings");

    settingsBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      settings.classList.add("fadeIn");
      introScreen.classList.remove("fadeIn");
    });
  };
  
  // close match
  const closeGameButton = document.querySelectorAll("[data-quit-button]");
  const match = document.querySelector(".match");

  closeGameButton.forEach((button) => {
    button.addEventListener("click", () => {
      const match = button.closest(".match");
      closeMatch(match);
    });
  });

  function closeMatch(match) {
    if (match == null) return;
    introScreen.classList.add("fadeIn");
    match.classList.remove("fadeIn");
  }
  
  //close button settings
  const closeSettingsButtons = document.querySelectorAll("[data-close-button]");
  const introScreen = document.querySelector(".intro");
  const settings = document.querySelector(".settings");

  closeSettingsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const settings = button.closest(".settings");
      closeSettings(settings);
    });
  });

  function closeSettings(settings) {
    if (settings == null) return;
    introScreen.classList.add("fadeIn");
    settings.classList.remove("fadeIn");
  }
  
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
        console.log('hand function right here');
      });
    });

    //Computer Options
    const computerOptions = ["Rock", "Paper", "Scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.innerText, computerChoice);

          //Update Images
          // console.log(this.textContent, 'player ');
          console.log(this.innerText, 'player ');
          playerHand.src = `./img/${this.innerText}.png`;
          computerHand.src = `./img/${computerChoice}.png`;
        }, 2000);
        
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };
  
  //Sound effect
  let win = new Audio();
  let loss = new Audio();
  let tie = new Audio();

  win.src = "audio/win.mp3";
  loss.src = "audio/loss.mp3";
  tie.src = "audio/tie.mp3";

  //Music
  var musik = new Audio();
  musik.src = "audio/bgm.mp3";
  musik.loop = true;
  musik.play();

  // Volume Slider
  window.setVolume = function (val) {
    musik.volume = val / 100
  }

  // Volume Slider Custom
  musicVolume = document.getElementById("musicVolume")
    
  musicVolume.addEventListener("input", function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, rgb(128, 12, 12) 0%, rgb(128, 12, 12) ' + value + '%, #fff ' + value + '%, #fff 100%)'
  })
  
  function playAudio() {
    var play = document.getElementById("musicbtn");
    var mute = document.getElementById("stopbtn");

    play.addEventListener("click", fplay);

    function fplay() {
      if (musik.paused) {
        musik.play();
        play.style.background = "url(img/pause.png)";
      } else {
        musik.pause();
        play.style.background = "url(img/playy.png)";
      }
    }
  }
  window.addEventListener("load", playAudio);

  //update score
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "Oops, It's a tie";
      tie.play();
      return;
    }
    
    //Check for Rock
    if (playerChoice === "Rock") {
      if (computerChoice === "Scissors") {
        winner.textContent = "You Win :D";
        pScore++;
        updateScore();
        win.play();
        return;
      } else {
        winner.textContent = "Computer Win :(";
        cScore++;
        loss.play();
        updateScore();
        return;
      }
    }
    
    //Check for Paper
    if (playerChoice === "Paper") {
      if (computerChoice === "Scissors") {
        winner.textContent = "Computer Win :(";
        cScore++;
        loss.play();
        updateScore();
        return;
      } else {
        winner.textContent = "You Win :D";
        pScore++;
        win.play();
        updateScore();
        return;
      }
    }
    
    //Check for Scissors
    if (playerChoice === "Scissors") {
      if (computerChoice === "Rock") {
        winner.textContent = "Computer Win :(";
        cScore++;
        loss.play();
        updateScore();
        return;
      } else {
        winner.textContent = "You Win :D";
        pScore++;
        win.play();
        updateScore();
        return;
      }
    }
  };

  //call all the inner function
  startGame();
  goSettings();
  playMatch();
};

//start the game function
game();
