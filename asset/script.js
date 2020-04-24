var startButton = document.querySelector("#start");
var countEl = document.getElementById("count");
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

//startButton.addEventListener("click", timerStart);

//we can have a timer function here and call this function in the function begin.

// function timerStart(){
//     var timeLeft = 10;

//     var timeInterval = setInterval (function(){
//         countEl.textContent = timeLeft;
//         timeLeft--;
//         //generateQuiz(Questions, quizContainer, answers, submitButton);

        
//         //we may need to also and an if answer is wrong 
//         //where is the best place to put wrong answers
//         if (timeLeft === 0){
//             timeLeft.textContent =" ";
//             alert (" You're done with the quiz!");
//             clearInterval(timeInterval);
//         }
//     }, 1000);
// }


//this function loops through a bunch of questions when we run the timerStart function
var myQuestions = [
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        answers: {
            a:	'Quotes',
            b:	'Curly brackets',
            c:	'Parenthesis',
            d:	'Square brackets',
        },      
        correctAnswer: 'b'
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
            a:  'Strings',
            b:  'Booleans',
            c:  'Alerts',
            d:	'Numbers',
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
    }
];

function showQuestions(questions, quizContainer){

    var output =[];
    var answers;

    for (var i=0; i<questions.length; i++){

        answers =[];

        for (letter in questions[i].answers){

            answers.push(
            
                '<label>'
                + '<input type = "radio" name="question' +i+ '" value="'+letter+'">'
                + letter + ': '
                + questions[i].answers[letter]
                +'</label>'
            );
        }

            output.push(
                '<div class="question">' + questions[i].question+ '</div>'
                + '<div class ="answers">' +answers.join('') + '</div>'
            );
    }
    quizContainer.innerHTML = output.join('');
}


//showQuestions(questions, quizContainer);
//the function is not doing anything.  Console says it's not correct

function showResults(questions, quizContainer, resultsContainer){

    var answerContainers = quizContainer.querySelectorAll('.answers');

    var userAnswer = '';
    var numCorrect = 0;

    for (var i=0; i<questions.length; i++){
        userAnswer = (answerContainers[i].querySelector ('input[name=question'+i+']:checked')||{}).value;
        
        if userAnswer === questions[i].correctAnswer){
            numCorrect++;
        }
        else{
            alert("Wrong!");
        }
    }
    resultsContainer.innerHTML = "Your final score is "+numCorrect+" !";
}



submitButton.addEventListener("click", showResults);