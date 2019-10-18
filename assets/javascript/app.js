//Cited:I used the Trivia Game homework solution as a guideline as well as viewing these videos:
//For the timer countdown and audio: https://youtu.be/MLtAMg9_Svw

$(document).ready(function () {

    let card = $("#quiz");
    let setTimeNumber = 30;

    // Set of Questions, Answers, correct answers and images
    let questions = [
        {
            question: "Who was the first Disney princess?",
            answers: ["Snow White", "Ariel", "Cinderella", "Belle"],
            correctAnswer: "Snow White",
            image: "assets/images/snow-white.gif"
        },
        {
            question: "What are the names of Cinderella's evil stepsisters?",
            answers: ["Anastasia and Drizella", "Beatrice and Daphine", "Drizella and Beatrice", "Daphine and Anastasia"],
            correctAnswer: "Anastasia and Drizella",
            image: "assets/images/cinderella-evil-stepsisters.gif"
        },
        {
            question: "What is Simba's mother's name, in The Lion King?",
            answers: ["Narabi", "Akini", "Sarabi", "Zulu"],
            correctAnswer: "Sarabi",
            image: "assets/images/simba-mom-licking.gif"
        },
        {
            question: "In Aladdin, how long was Genie stuck in the lamp?",
            answers: ["20,000 years", "10,000 years", "15,000 years", "25,000 years"],
            correctAnswer: "10,000 years",
            image: "assets/images/aladdin-genie.gif"
        },
        {
            question: "What was the last movie that Walt Disney was able to work on before he died?",
            answers: ["101 Dalmations", "Sleeping Beauty", "The Little Mermaid", "The Jungle Book"],
            correctAnswer: "The Jungle Book",
            image: "assets/images/the-jungle-book.gif"
        },
        {
            question: "Who was Bambi's best friend?",
            answers: ["Hopper", "Thumper", "Jumper", "Bumper"],
            correctAnswer: "Thumper",
            image: "assets/images/bambi-and-thumper.gif"
        },
        {
            question: "Where do the lions live in The Lion King?",
            answers: ["Pride Kingdom", "Glory Rock", "Pride Rock", "The Kingdom"],
            correctAnswer: "Pride Rock",
            image: "assets/images/simba-mufasa-pride-rock.gif"
        },
        {
            question: "What country is Belle from in Beauty and the Beast?",
            answers: ["United Kingdom", "France", "Italy", "Swizterland"],
            correctAnswer: "France",
            image: "assets/images/belle-walking-on-bridge.gif"
        },
        {
            question: "In The Litte Mermaid, what does Ariel call the fork in her collection of human objects?",
            answers: ["Wumbus", "Sneedle", "Snarfblatt", "Dinglehopper"],
            correctAnswer: "Dinglehopper",
            image: "assets/images/ariel-brushing-hair-with-fork.gif"
        },
        /*    {
               question: "What kind of ride did Aladdin take Princess Jasmine on?",
               answers: ["magic camel ride", "magic horse ride", "magic carpet ride", "magic blanket ride"],
               correctAnswer: "magic carpet ride",
               image: "assets/images/aladdin-magic-carpet-ride.gif"
           }, */
        {
            question: "Who is the only Disney princess with a tattoo?",
            answers: ["Jasmine", "Pocahontas", "Mulan", "Elsa"],
            correctAnswer: "Pocahontas",
            image: "assets/images/pocahontas-leaves-blowing.gif"
        }
    ];

    // The setInterval variable
    let timer;


    let currentQuestion = 0;
    let counter = setTimeNumber;
    let correct = 0;
    let incorrect = 0;

    function countdownTime() {
        counter--;
        $("#counter-number").text(counter);
        if (counter === 0) {
            console.log("TIME UP");
            timeUp();
        }
    };

    function loadQuestion() {

        timer = setInterval(countdownTime, 1000);

        card.html("<h2>" + questions[currentQuestion].question + "</h2>");

        for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
            card.append("<button class='answer-button' id='button' data-name='" + questions[currentQuestion].answers[i]
                + "'>" + questions[currentQuestion].answers[i] + "</button>");
        }
    };

    function nextQuestion() {
        counter = setTimeNumber;
        $("#counter-number").text(counter);
        currentQuestion++;
        loadQuestion();
    };

    //This sets the out of time notification showing what the correct answer is and sets how much time the player will view this until the next question populates.
    function timeUp() {

        clearInterval(timer);

        $("#counter-number").html(counter);

        card.html("<h2>Out of Time!!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[currentQuestion].correctAnswer);
        card.append("<img src='" + questions[currentQuestion].image + "' />");

        if (currentQuestion === questions.length - 1) {
            setTimeout(results, 4 * 2000);
        }
        else {
            setTimeout(nextQuestion, 4 * 2000);
        }
    };


    //This function shows the player their results of correct answers, wrong answers, the number of unanswered questions and a play again button and clears the timer = setInterval(countdown, 1000);.
    function results() {

        clearInterval(timer);

        card.html("<h2>All done, here are your scores!</h2>");

        $("#counter-number").text(counter);

        card.append("<h3>Correct Answers: " + correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (questions.length - (incorrect + correct)) + "</h3>");
        card.append("<br><button id='start-over'>Click Here To Play Again!</button>");
    };

    //This function determines if the player clicked on the correct answer or not
    function clicked(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[currentQuestion].correctAnswer) {
            answeredCorrectly();
        }
        else {
            answeredIncorrectly();
        }
    };

    //The function of when the question is answered incorrectly.
    function answeredIncorrectly() {

        incorrect++;

        clearInterval(timer);

        card.html("<h2>Wrong!! But don't worry. Hakuna Matata!!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[currentQuestion].correctAnswer + "</h3>");
        card.append("<img src='" + questions[currentQuestion].image + "' />");

        if (currentQuestion === questions.length - 1) {
            setTimeout(results, 4 * 2000);
        }
        else {
            setTimeout(nextQuestion, 4 * 2000);
        }
    };

    //The function of when the question is answered correctly. The timer stops. A point gets added to the correct score. Correct is displayed along with the image. This will display for 3 seconds then on to the next question.
    function answeredCorrectly() {

        clearInterval(timer);

        correct++;

        card.html("<h2>Correct!!</h2>");
        card.append("<img src='" + questions[currentQuestion].image + "' />");

        if (currentQuestion === questions.length - 1) {
            setTimeout(results, 4 * 2000);
        }
        else {
            setTimeout(nextQuestion, 4 * 2000);
        }
    };

    let snowWhite;

    function sound() {
        snowWhite = loadSound("");
    }


    //This function resets the game
    function reset() {
        currentQuestion = 0;
        counter = setTimeNumber;
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
        $("#quiz-box").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
        loadQuestion();
    });




});


