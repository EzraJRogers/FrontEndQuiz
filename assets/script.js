//Scoreboard Button System//
document.getElementById("scoreboardBtn").addEventListener("click", scoreboardToggle)

function scoreboardToggle() {
    const scoreboard = document.getElementById("scoreboardshow");
    if (scoreboard.style.display === 'none') {
        scoreboard.style.display = 'flex';
    } else {
        scoreboard.style.display = 'none';
    }
}

let timeleft = 60;
let questionIdx = 0;
let score = 0;
let scoreName = document.getElementById("scoreName");
let scoreboard = document.getElementById("scoreboardshow");
const qandabox = document.getElementById("qandabox");
const startbutton = document.getElementById("startButton");
const answerOneHtml = document.getElementById("btn1");
const answerTwoHtml = document.getElementById("btn2");
const answerThreeHtml = document.getElementById("btn3");
const answerFourHtml = document.getElementById("btn4");
const ulElement = document.querySelector("#scoreboardshow ul");
const scoreinput = document.getElementById("scoreinput");
const pElement = document.getElementById("finalscore");

startbutton.addEventListener('click',function (event) {
    scoreboard.style.display = 'none';
    startbutton.style.display = "none";
    displayQuestion()
    var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
          clearInterval(downloadTimer);
          document.getElementById("timer").textContent = "";
        } else {
          document.getElementById("timer").textContent = timeleft + " seconds remaining";
        }
        timeleft -= 1;
      }, 1000)
})

answerOneHtml.addEventListener('click', function (event){ checkAnswer(event)})
answerTwoHtml.addEventListener('click', function (event){ checkAnswer(event)})
answerThreeHtml.addEventListener('click', function (event){ checkAnswer(event)})
answerFourHtml.addEventListener('click', function (event){ checkAnswer(event)})


const questions = [
    {
        question: "What does HTML Stand for?",
        correct: 3,
        choices:  [
            "Hyper Text Making Language",
            "Hyper Text Multiple Language",
            "Hyper Text Marketing Language",
            "Hyper Text Markup Language"
        ]
   },
   {
        question: "Commonly used data types DO NOT include:",
        correct: 2,
        choices:  [
        "Strings",
        "Booleans",
        "Alerts",
        "Numbers"
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed with ____",
        correct: 2,
        choices:  [
            "Quotes",
            "Curly Brackets",
            "Parenthesis",
            "Square Brackets"
        ]
   },
   {
        question: "Arrays in JavaScript can be used to store ____",
        correct: 3,
        choices:  [
        "Numbers and strings",
        "Other arrays",
        "Booleans",
        "All of the above"
        ]
    },
    {
        question: "String values must be enclosed in ____ when being assigned to a variable.",
        correct: 1,
        choices:  [
            "Commas",
            "Quotes",
            "Curly Brackets",
            "Parenthesis"
        ]
   }
]

function displayQuestion() {
    qandaBox.style.display = "flex";
    const questionHtml = document.getElementById("questions");
    questionHtml.textContent = questions[questionIdx].question;
    answerOneHtml.textContent = questions[questionIdx].choices[0];
    answerTwoHtml.textContent = questions[questionIdx].choices[1];
    answerThreeHtml.textContent = questions[questionIdx].choices[2];
    answerFourHtml.textContent = questions[questionIdx].choices[3];
}

function checkAnswer(event) {
    console.log("Checking answer...");
    const buttonPressed = event.target.id;
    const idxPressed = buttonPressed.replace("btn", "") - 1;
    if (idxPressed === questions[questionIdx].correct) {
        console.log("Correct answer!");
        score += 1;
    } else {
        console.log("Incorrect answer!");
        timeleft -= 5;
    }
    console.log("Current question index:", questionIdx);
    console.log("Total number of questions:", questions.length);
    if (questionIdx < questions.length - 1) {
        questionIdx++;
        displayQuestion();
    } else {
        console.log("Reached end of quiz!");
        endQuiz();
    }
}
function endQuiz() {
    qandaBox.style.display = "none";
    scoreinput.style.display = "flex";
    timeleft = 0;
    questionIdx = 0;
    pElement.innerHTML = "Your final score is: " + score;
}

document.getElementById("scoreinputbtn").addEventListener("click", scoreStore)

function scoreStore() {
    scoreinput.style.display = "none";
    startbutton.style.display = ""
    const scoreAddition = document.createElement("li");
    scoreAddition.textContent = scoreName.value + ": " + score + " points";
    ulElement.appendChild(scoreAddition);
    scoreboard.style.display = "flex";
    score = 0;
    scoreName.value = "";
    timeleft = 60;
}
