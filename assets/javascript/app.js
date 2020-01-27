//Cited:I used the Trivia Game homework solution as a guideline as well as viewing the following:
//For the timer countdown: https://youtu.be/MLtAMg9_Svw, Quiz App with JavaScript: https://youtu.be/riDzcEQbX6k


$(document).ready(function () {


    // Set of Questions, Answers, correct answers, images and audio clips
    let questions = [{
            question: "Who was the first Disney princess?",
            answers: ["Snow White", "Ariel", "Cinderella", "Belle"],
            correctAnswer: "Snow White",
            image: "assets/images/snow-white-with-bird.gif",
            audio: "assets/audio/(snow-white-vocalizing-with-the-birds).mp3"

        },
        {
            question: "What are the names of Cinderella's evil stepsisters?",
            answers: ["Anastasia & Drizella", "Beatrice & Daphine", "Drizella & Beatrice", "Daphine & Anastasia"],
            correctAnswer: "Anastasia & Drizella",
            image: "assets/images/cinderella-evil-stepsisters.gif",
            audio: "assets/audio/thatsMySlash.mp3"
        },
        {
            question: "What is Simba's mother's name, in The Lion King?",
            answers: ["Narabi", "Akini", "Sarabi", "Zulu"],
            correctAnswer: "Sarabi",
            image: "assets/images/simba-mom-licking.gif",
            audio: "assets/audio/from-the-day-we-arrive-on-the-planet-and-blinking-step-into-the-sun.mp3"
        },
        {
            question: "In Aladdin, how long was Genie stuck in the lamp?",
            answers: ["20,000 years", "10,000 years", "15,000 years", "25,000 years"],
            correctAnswer: "10,000 years",
            image: "assets/images/aladdin-genie.gif",
            audio: "assets/audio/2you-aint-never-had-a-friend-like-me.mp3"
        },
        {
            question: "What was the last movie that Walt Disney was able to work on before he died?",
            answers: ["101 Dalmations", "Sleeping Beauty", "The Little Mermaid", "The Jungle Book"],
            correctAnswer: "The Jungle Book",
            image: "assets/images/the-jungle-book.gif",
            audio: "assets/audio/2ndthe-bare-necessities.mp3"
        },
        {
            question: "Who was Bambi's best friend?",
            answers: ["Hopper", "Thumper", "Jumper", "Bumper"],
            correctAnswer: "Thumper",
            image: "assets/images/bambi-and-thumper.gif",
            audio: "assets/audio/2nd-bambiOnTheIce.mp3"
        },
        {
            question: "Where do the lions live in The Lion King?",
            answers: ["Pride Kingdom", "Glory Rock", "Pride Rock", "The Kingdom"],
            correctAnswer: "Pride Rock",
            image: "assets/images/simba-mufasa-pride-rock.gif",
            audio: "assets/audio/kings-time-as-ruler-rises-and-falls-like-the-sun.mp3"
        },
        {
            question: "What country is Belle from in Beauty and the Beast?",
            answers: ["United Kingdom", "France", "Italy", "Swizterland"],
            correctAnswer: "France",
            image: "assets/images/3rd-belle-singing.gif",
            audio: "assets/audio/no-sir-not-me-i-guarantee-it-i-want-much-more-than-this-provincial-life.mp3"
        },
        {
            question: "In The Litte Mermaid, what does Ariel call the fork in her collection of human objects?",
            answers: ["Wumbus", "Sneedle", "Snarfblatt", "Dinglehopper"],
            correctAnswer: "Dinglehopper",
            image: "assets/images/ariel-with-fork.gif",
            audio: "assets/audio/a-dingle-hopper.mp3"
        },
        {
            question: "Who is the only Disney princess with a tattoo?",
            answers: ["Jasmine", "Pocahontas", "Mulan", "Elsa"],
            correctAnswer: "Pocahontas",
            image: "assets/images/pocahontas-leaves-blowing.gif",
            audio: "assets/audio/pocahontas-colors-of-the-wind.mp3"
        }
    ];



    // Setting variables
    let game = $("#quiz");
    let setTimeNumber = 15;

    // The setInterval variable
    let timer;


    let currentQuestion = 0;
    let timeCount = setTimeNumber;
    let correct = 0;
    let incorrect = 0;

    //Cited: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/javascript-cheatsheet/intervals-timeouts.js
    //This is the time countdown function. It decreases the time. Once the time get to zero, the times up function displays
    function countdownTime() {
        timeCount--;
        $("#timeCount-number").text(timeCount);
        if (timeCount === 0) {
            timesUp();
        }
    };

    //This function loads the questions and the answers to choose from and sets the timer to decrease every second
    function loadQuestion() {

        timer = setInterval(countdownTime, 1000);

        game.html("<h2>" + questions[currentQuestion].question + "</h2>");

        for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
            game.append("<button class='answer-button' id='button' data-name='" + questions[currentQuestion].answers[i] +
                "'>" + questions[currentQuestion].answers[i] + "</button>");
        }
    };

    //This function adds one question at a time
    function nextQuestion() {
        timeCount = setTimeNumber;
        $("#timeCount-number").text(timeCount);
        currentQuestion++;
        loadQuestion();
    };

    //This sets the out of time notification showing what the correct answer is and sets how much time the player will view this until the next question populates.
    function timesUp() {

        clearInterval(timer);

        $("#timeCount-number").html(timeCount);

        game.html("<h2>Out of Time!!</h2>");
        game.append("<h3>The Correct Answer was: " + questions[currentQuestion].correctAnswer);
        game.append("<img src='" + questions[currentQuestion].image + "'/>" + "<audio autoplay src='" + questions[currentQuestion].audio + "'/audio>");

        if (currentQuestion === questions.length - 1) {
            setTimeout(endResults, 4 * 2000);
        } else {
            setTimeout(nextQuestion, 4 * 2000);
        }
    };


    //This function shows the player their endResults of correct answers, wrong answers, the number of unanswered questions and a play again button and clears the timer = setInterval(countdown, 1000);.
    function endResults() {

        clearInterval(timer);

        game.html("<h2>Game Over! Here are your scores!</h2>");

        $("#timeCount-number").text(timeCount);

        //Cited: https://youtu.be/0ik6X4DJKCc, for DOM Manipulation
        game.append("<h3>Correct Answers: " + correct + "</h3>");
        game.append("<h3>Incorrect Answers: " + incorrect + "</h3>");
        game.append("<h3>Unanswered: " + (questions.length - (incorrect + correct)) + "</h3>");
        game.append("<br><button id='start-over'>Click To Play Again!</button>");
        game.append("<img src= 'assets/images/disney-castle.gif' height='200px' />");
    };

    //This function determines if the player clicked on the correct answer or not
    function clicked(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[currentQuestion].correctAnswer) {
            answeredCorrectly();
        } else {
            wrongAnswer();
        }
    };

    //The function of when the question is answered incorrectly.
    function wrongAnswer() {

        incorrect++;

        clearInterval(timer);

        game.html("<h2>Wrong!! But don't worry. Hakuna Matata!!</h2>");
        game.append("<h3>The Correct Answer was: " + questions[currentQuestion].correctAnswer + "</h3>");
        game.append("<img src='" + questions[currentQuestion].image + "'height='270px'/>");

        if (currentQuestion === questions.length - 1) {
            setTimeout(endResults, 4 * 2000);
        } else {
            setTimeout(nextQuestion, 4 * 2000);
        }
    };

    //The function of when the question is answered correctly. The timer stops. A point gets added to the correct score. Correct is displayed along with the image. This will display for 3 seconds then on to the next question.
    function answeredCorrectly() {

        clearInterval(timer);

        correct++;

        game.html("<h2>Correct!!</h2>");
        game.append("<img src='" + questions[currentQuestion].image + "' height='270px'/>" + "<audio autoplay src='" + questions[currentQuestion].audio + "'/audio>");

        if (currentQuestion === questions.length - 1) {
            setTimeout(endResults, 7000);
        } else {
            setTimeout(nextQuestion, 7000);
        }
    };


    //This function resets the game
    function reset() {
        currentQuestion = 0;
        timeCount = setTimeNumber;
        correct = 0;
        incorrect = 0;
        loadQuestion();
    };


    //At the end of the game when the play again button is clicked, the game will reset
    $(document).on("click", "#start-over", function () {
        reset();
    });

    //Click event that determines if the player clicked on the correct answer or not
    $(document).on("click", ".answer-button", function (e) {
        clicked(e);
    });

    //When the start button is clicked the game will load
    $(document).on("click", "#start", function () {
        $("#quiz-box").prepend("<h2>Time Remaining: <span id='timeCount-number'>15</span> Seconds</h2>");
        loadQuestion();
    });


});