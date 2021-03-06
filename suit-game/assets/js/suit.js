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
    const computerOptions = ["rock", "paper", "scissors"];

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
          // console.log(this.innerText, 'inner text');
          // console.log(this.textContent, 'text content');
          playerHand.src = `/img/${this.innerText}.png`;
          computerHand.src = `/img/${computerChoice}.png`;
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

  // testing
  const updateWinner = (playerScore, computerScore) => {
    if(pScore >= 5){
      words = ["Yo Nice Game",
      "Lets do it again buddy",
      "Congrats Dude, Well Played",
      "Ah, you're just lucky",
      "You're Doing Great, Good Game"
    ]
      randomInt = Math.floor(Math.random() * 4) + 1
      console.log(randomInt);
      Swal.fire({
        title: words[randomInt],
        // width: 600,
        // padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: `rgba(0,0,123,0.4)`,
      }).then(() => {
        playerScore == "0"
        computerScore == "0"
        window.location = "/suit"
      })
    }

    if(cScore >= 5){
      words = ["Accepting failure is one of the positive thing for your life", 
      "You Lose Dummy", 
      "Well Well Well, S*ck being u", 
      "Nice Try Buddy", 
      "tch such a noob guys"
    ]
      randomInt = Math.floor(Math.random() * 4) + 1
      console.log(randomInt);
      Swal.fire({
        title: words[randomInt],
        // width: 600,
        // padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: `rgba(0,0,123,0.4)`,
      }).then(() => {
        playerScore == "0"
        computerScore == "0"
        window.location = "/suit"
      });
    }
  }
  
  //update score
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    // Check score
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    updateWinner(playerScore, computerScore);
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
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
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
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
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
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
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

function exitGame() {
  let timerInterval
  Swal.fire({
    title: 'Thank You!<br>Pls consider to give us good marks!',
    width: 500,
    padding: '2em',
    background: '#fff',
    // html: '<b></b>',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      // console.log('aaaa')
      window.location = "../#games"
    }
  })
}

//start the game function
game();
