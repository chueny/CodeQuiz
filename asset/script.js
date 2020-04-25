var startButton = document.querySelector("#start");
var countEl = document.getElementById("count");
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

var numCorrect  = 0;

// startButton.addEventListener("click", timerStart);

function timerStart(){
    var timeLeft = 10;

    var timeInterval = setInterval (function(){
        countEl.textContent = timeLeft;
        timeLeft--;
        //generateQuiz(Questions, quizContainer, answers, submitButton);
        //we may need to also and an if answer is wrong 
        //where is the best place to put wrong answers
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
    
    //Display radio buttons
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
function showResults(){
    var output=[];

    output.push(
        '<div class="Finish">All done!</div>'
        + '<p>Your score is'+numCorrect+'</p>'
        +'<label for="initials">Enter initials:</label>'
        + '<input type="initials" placeholder="supersecure123"/>' 
        +'<button id="initialSubmit">Submit</button>'
    );
    quizContainer.innerHTML = output.join('');
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
    showOne(myQuestions, 0, quizContainer);
});
