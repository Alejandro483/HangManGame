var questions = [
  {
    question:
      "Peter Buck played the same black ___(name the brand)_____ guitar on every single R.E.M record",
    answer: "Rickenbacker"
  },
  {
    question: "Led by vocalist Dolores O'Riordan, this band was popular in the 1990's",
    answer: "the cranberries"
  },
  {
    question:
      "Sting worked as a __(job)___ back in the day",
    answer: "tax collector"
  },
  {
    question:
      "Axl Rose wrote a song about his girlfriend, then released this song in 1988.",
    answer: "Sweet Child O Mine"
  },
  {
    question:
      "Kurt Cobain dropped out of High School, then worked there as a ___(job)__.",
    answer: "janitor"
  },
  {
    question:
      "In the Simpsons (1991), they were the first band to play at Moe’s Tavern .",
    answer: "Aerosmith"
  },
  {
    question:
      "Before they were popular, this group was calling itself Mookie Blaylock, named after the New Jersey Nets All-Star",
    answer: "Pearl Jam"
  }
];
let lossInput = [
  {
    input:
      "Try again."
  },
  {
    input:
      "Not bad. Try again."
  },
  {
    input: "WROOOOOONG."
  }
];

const setPlay = () => {
  let Random = {};
  const setQuestion = () => {
    Random = questions[Math.floor(Math.random() * questions.length)];
  };
  setQuestion();
  const { question, answer } = Random;

  var questionDocument = document.getElementById("question");
  var answerDocument = document.getElementById("answer");
  var turnsDocument = document.getElementById("turns");
  var guessesDocument = document.getElementById("guesses");
  var winAlert = document.getElementById("winAlert");
  var lossText = document.getElementById("lossText");
  var lossAlert = document.getElementById("lossAlert");

  questionDocument.innerHTML = question;

  let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  const resetPlay = () => {
    guessed = [];
    playing = true;
    correctCount = 0;
    guessedCorrectly = [];
    guessesRemaining = 10;
    setQuestion();
  };

  let word = "";
  for (var i = 0; i < answer.length; i++) {
    if (alphabet.includes(answer[i])) {
      console.log("_");
      word = word += "_";
    } else if (answer[i] === " ") {
      word = word += " ";
    }
  }
  answerDocument.innerHTML = word;
  let playing = true;
  let correctCount = 0;
  let guessed = [];
  let guessedCorrectly = [];
  let guessesRemaining = 10;

  document.onkeydown = () => {
    let key = event.key;

    const setPlaying = () => {
      playing = false;
      turnsDocument.innerHTML = 10;
      guessesDocument.innerHTML = "";
    };

    if (alphabet.includes(key)) {
      if (answer.indexOf(key) === -1 && guessed.indexOf(key) === -1) {
        guessed.push(key);
        guessesRemaining--;
        if (guessesRemaining === 0) {
          word = answer;
          lossAlert.innerHTML =
            lossInput[Math.floor(Math.random() * lossInput.length)].input;
          lossAlert.classList.add("alert");
          lossAlert.classList.add("alert-danger");
          console.log(again);
          if (again) {
            playing = false;
            setPlay();
          }
        }
      } else if (
        answer.indexOf(key) !== -1 &&
        guessedCorrectly.indexOf(key) == -1
      ) {
        guessedCorrectly.push(key);
        let newWord = "";
        for (var i = 0; i < answer.length; i++) {
          if (answer[i] === key) {
            newWord = newWord += answer[i];
            correctCount++;
          } else {
            newWord = newWord += word[i];
          }
          console.log(newWord);
        }
        word = newWord;
      }
      let Length = 0;
      for (var trueLength = 0; trueLength < answer.length; trueLength++) {
        if (answer[trueLength] !== " ") {
          Length++;
        }
      }

      console.log("correct " + correctCount);
      console.log("length" + Length);
      console.log("guessedCorrectly" + guessedCorrectly);

      if (correctCount === Length) {
        // alert("Woo hoo");
        console.log("classes should be added here");
        winAlert.classList.add("alert");
        winAlert.classList.add("alert-success");
        console.log("timeout function called");
        const resetAlerts = () => {
          winAlert.classList.remove("alert");
          winAlert.classList.remove("alert-success");
        };
        setTimeout(() => resetAlerts(), 3000);
        setTimeout(() => setPlaying(), 5000);
        setTimeout(() => setPlay(), 5000);
      }
    }
    if (playing === true) {
      answerDocument.innerHTML = word;
      turnsDocument.innerHTML = guessesRemaining;
      guessesDocument.innerHTML = guessed.join("");
    }
    if (playing === false) {
      turnsDocument.innerHTML = 10;
      guessesDocument.innerHTML = "";
    }
  };
};

setPlay();
