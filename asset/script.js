var startButton = document.querySelector("#start");
var countEl = document.getElementById("count");
var quizContainer = document.getElementById("quiz");
var content = document.getElementById("content");
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var initialSubmit;

var numCorrect  = 0;

// startButton.addEventListener("click", timerStart);

function timerStart(){
    var timeLeft = 10;

    var timeInterval = setInterval (function(){
        countEl.textContent = timeLeft;
        timeLeft--;
       
        if (timeLeft <= 0){
            timeLeft.textContent = " ";
            alert ("You're done with the quiz!");
            clearInterval(timeInterval);
        }
    }, 1000);
}

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
    }
];

var currentQuestion = 0;

function showOne(questionsList, questionNum, quizContainer){
    var output =[];
    var answers =[];

      
    for (letter in questionsList[questionNum].answers){
        answers.push(            
            '<label>'
             + '<input type = "radio" name="question' +questionNum+ '" value="'+letter+ '">'
             + letter + ': '
             + questionsList[questionNum].answers[letter]
             +'</label>'
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
    for(i = 0; i < buttons.length;i++){
        if (buttons[i].checked){
           if(buttons[i].value == myQuestions[questionNum].correctAnswer){
                numCorrect++;
                console.log('question ' + questionNum+ ' is correct');
           }
           else {
                console.log('wrong!!!!');
           }
        }
    }

    showNextQuestion(questionNum);

    if(questionNum == myQuestions.length -1){
        showResults();
    }
}

startButton.addEventListener("click", function(){
//Hide Div "Coding throiugh start quiz"
    // var scores=[];
    // scores.push('');
    // content.innerHTML = scores.join('');
    toggleContentDiv();
    showOne(myQuestions, 0, quizContainer);
    
});

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
            localStorage.setItem("name", initials);
            localStorage.setItem("score", numCorrect);
    
            console.log('name from local storage in showResults: ' + localStorage.getItem("name"));
            console.log('score from local storage in showResults: '+ localStorage.getItem("score"));

            highScoreRegistered();
        }
    
       
    
    });
}

function displayMessage(message){
    content.textContent=message;
//    startButtonDiv.setAttribute("", );
}

function highScoreRegistered(){

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
}

function goBack(){
    
    //Hides high score info.
    var scores=[];
    quizContainer.innerHTML = scores.join('');

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
    var scores=[];
    
    scores.push(
        '<h1> Highscores</h1>'
        +'<p> All scores cleared</p>'
        +'<button id= "goBack" onclick = "goBack()">  Go Back </button> '
        +'<button id="clearScores" > Clear Highscores </button> '
    );
    quizContainer.innerHTML = scores.join('');

}