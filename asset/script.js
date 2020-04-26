var startButton = document.querySelector("#start");
var countEl = document.getElementById("count");
var quizContainer = document.getElementById("quiz");
var content = document.getElementById("content");
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var initialSubmit;
var isHighScorePageDisplayed = false;

var quizLength = 20; //quiz length in seconds

var numCorrect  = 0;

var myQuestions = [
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        answers: {
            a:	'Quotes',
            b:	'Curly brackets',
            c:	'Parenthesis',
            d:	'Square brackets',
        },      
        correctAnswer: 'c'
    },
    {
        question: "Commonly used data types DO NOT Include:_________.",
        answers: {
            a:  'Strings',
            b:  'Booleans',
            c:  'Alerts',
            d:	'Numbers',
        },
        correctAnswer: 'c'
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: {
            a:  'Commas',
            b:  'Parenthesis',
            c:  'Quotes',
            d:	'Braces',
        },
        correctAnswer: 'c'
    },
    {
        question: "Arrays in JavaSript can be used to store:_________.",
        answers: {
            a:  'Numbers',
            b:  'Strings',
            c:  'Booleans',
            d:	'All of the above',
        },
        correctAnswer: 'd'
    },
    {
        question: "What does HTML stands for?",
        answers: {
            a:  'Hypertext Machine language',
            b:  'Hypertext and links markup language.',
            c:  'Hypertext Markup Language',
            d:	'Hightext machine language',
        },
        correctAnswer: 'c'
    }
];

var currentQuestion = 0;
var timeLeft = quizLength;

startButton.addEventListener("click", function(){

    toggleContentDiv();
    timeLeft = quizLength;
    timerStart();
    showOne(myQuestions, 0, quizContainer);
    
});

function timerStart(){

    var timeInterval = setInterval (function(){
        countEl.textContent = timeLeft;
        timeLeft--;
       
        if (timeLeft <= 0){
            countEl.textContent = "0";
            clearInterval(timeInterval);
            showResults();
        }
    }, 1000);
}



function showOne(questionsList, questionNum, quizContainer){
    var output =[];
    var answers =[];

      
    for (letter in questionsList[questionNum].answers){
        answers.push(            

             '<ul>'
             +'<li> <input id="list" type = "radio" name="question'+ questionNum +'"'
             +'value="'+letter+ '">'+ letter + ': '+ questionsList[questionNum].answers[letter]+' </li>'
             +'</ul>'
        
        );
    }

    output.push(
        '<div class="question">' + questionsList[questionNum].question+ '</div>'
        + '<div class ="answers">' +answers.join('') + '</div>'
    );
    
    //Display the button
   output.push(
       ' <button id ="submit" onclick = "checkAnswer(' + questionNum + ')"> Submit answer</button>  '
    );
   
    quizContainer.innerHTML = output.join('');
}

function showNextQuestion(questionNum){
    if (questionNum < myQuestions.length -1 ){
        showOne(myQuestions, questionNum+1, quizContainer);
    }

}

function checkAnswer(questionNum) {
    var buttons = document.getElementsByName('question' + questionNum);

    console.log("in checkAnswer function");

    for(i = 0; i < buttons.length;i++){
        if (buttons[i].checked){
           if(buttons[i].value == myQuestions[questionNum].correctAnswer){
                numCorrect++;
                console.log("question " + questionNum + "is correct.");
           }
           else {
                timeLeft = timeLeft-3;
                console.log("question " + questionNum + "is wrong."); 
           }
        }
    }

    showNextQuestion(questionNum);

    if(questionNum == myQuestions.length -1){
        timeLeft=0;
        showResults();
    }
}


function showResults(){
    var output=[];

    output.push(
        '<h1> All done!</h1>'
        +'<p>Your score is '+numCorrect+'</p>'
        + '<form id="frm1">'
        +  'Enter your name: <input type="text" id="name"><br>'
        + '<input type="button" value="Submit your score!" id = "submitResults" > '
        +'</form>'

    );
    quizContainer.innerHTML = output.join('');
    initialSubmit = document.getElementById('submitResults');

    initialSubmit.addEventListener("click", function(event){
        event.preventDefault();
        var initials =document.getElementById("name").value;
        console.log("initials from input: " +initials);
    
        if (initials ===""){
            displayMessage("Initials cannot be blank");
        } else {
            if(localStorage.getItem("score") < numCorrect){
                localStorage.setItem("name", initials);
                localStorage.setItem("score", numCorrect);
            }
            numCorrect = 0;

            toggleContentDiv();
            highScoreRegistered();
            
        }
    
       
    
    });
}

function displayMessage(message){
    content.textContent=message;
//    startButtonDiv.setAttribute("", );
}

function highScoreRegistered(){
    
    if(!isHighScorePageDisplayed){
        toggleContentDiv();
        var scores=[];
        var name = localStorage.getItem("name");
        var highScore = localStorage.getItem("score");
        
        console.log('Name from local storage in highscores: ' + name);
        scores.push(
            '<h1> Highscores</h1>'
            +'<p>' + highScore + '-' + name + '</p>'
            +'<button id= "goBack" onclick = "goBack()">  Go Back </button> '
            +'<button id="clearScores" onclick="clearScores()"> Clear Highscores </button> '
        );
        quizContainer.innerHTML = scores.join('');
        isHighScorePageDisplayed = true;
    }

}

function goBack(){
    
    //Hides high score info.
    var scores=[];
    quizContainer.innerHTML = scores.join('');
    isHighScorePageDisplayed = false;

    //Puts the quiz directions and start button back.
    toggleContentDiv();
  
}

function toggleContentDiv(){
    var hide = document.getElementById("content");
    console.log("toggleDiv: " + hide);

    if (hide.style.display ==="none"){
        hide.style.display ="block";
    }else{
        hide.style.display="none";
    }
}

function clearScores(){
    localStorage.setItem("name", "");
    localStorage.setItem("score", "");
    
    var scores=[];
    
    scores.push(
        '<h1> Highscores</h1>'
        +'<p> All scores cleared</p>'
        +'<button id= "goBack" onclick = "goBack()">  Go Back </button> '
        +'<button id="clearScores" > Clear Highscores </button> '
    );
    quizContainer.innerHTML = scores.join('');

}