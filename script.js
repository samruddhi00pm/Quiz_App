function validation() {
    const fullname = document.getElementById("name").value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    var valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // name validation start
    if (fullname == "") {
        document.getElementById("name_err").innerHTML = "Please Enter Fullname";
        return false;
    }
    if ((fullname.length < 2) || (fullname.length > 20)) {
        document.getElementById('name_err').innerHTML = "** User length must be between 2 and 20";
        return false;
    }
    if (!isNaN(fullname)) {
        document.getElementById('name_err').innerHTML = "** Only characters are allowed";
        return false;
    }
    // name validation ends

    // email validation start
    if (email == "") {
        document.getElementById('email_span').innerHTML = "** Enter the Email-Id";
        return false;
    }
    if (!valid.test(email)) {
        document.getElementById('email_span').innerHTML = "** Enter a valid Email-Id";
        return false;
    }
    // email validation ends

    // password validation start
    if (pass == "") {
        document.getElementById('pass_span').innerHTML = "** Enter the password ";
        return false;
    }
    if ((pass.length < 6) || (pass.length > 12)) {
        document.getElementById('pass_span').innerHTML = "** Password should be between 6-12 characters";
        return false;
    }
    // password validation ends

    const formData = {
        fullname: fullname,
        email: email,
        password: pass
    };

    storagedata(formData);
}

function storagedata(formData) {
    // get from localstorage if there is existing user or make empty array
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];

    // check email exist before saving
    const userExists = storedFormData.find(user => user.email === formData.email);
    if (userExists) {
        alert("Already registered");
        return false;
    }

    // push new data into the array
    storedFormData.push(formData);

    // save updated array to localstorage
    localStorage.setItem('formData', JSON.stringify(storedFormData));

    // redirect to login
    window.location.href = "login.html";
}

function loginValidation() {
    const email = document.getElementById('email_login').value;
    const pass = document.getElementById('pass_login').value;

    // Regular expression for email validation
    var valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Clear previous error messages
    document.getElementById('email_login_err').innerHTML = "";
    document.getElementById('pass_login_err').innerHTML = "";
    console.log("login")
    // Email validation
    if (email == "") {
        document.getElementById('email_login_err').innerHTML = "** Enter the Email-Id";
        return false;
    }
    if (!valid.test(email)) {
        document.getElementById('email_login_err').innerHTML = "** Enter a valid Email-Id";
        return false;
    }

    // Password validation
    if (pass == "") {
        document.getElementById('pass_login_err').innerHTML = "** Enter the password";
        return false;
    }

    // Check credentials
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    const user = storedFormData.find(user => user.email === email && user.password === pass);

    if (user) {
        console.log("true")

        alert("Login successful!");
        // Redirect to the dashboard or another page
        localStorage.setItem("isLoggedin", JSON.stringify(user));
        console.log(user)
        window.location.href = "dashboard.html";
        // window.location.href = "quiz.html";
    } else {
        console.log("false")
        alert("Invalid email or password");
        return false;
    }
}
// console.log(formData.2fullname)
let userLogedIn = (localStorage.getItem('isLoggedin'));
let testUser = (JSON.parse(userLogedIn));


// const userNameElement =document.getElementById("userNameDisplay")
//         userNameElement.innerHTML =`Welcome samruddhi`

// function displayUserInfo(){
//     if(testUser.fullname){

//         const userNameElement =document.getElementById("userNameDisplay")
//         userNameElement.innerHTML =`Welcome, ${testUser.fullname}`
//         console.log(userNameElement)
//     }
// }
// displayUserInfo()

// question storing
let questionList = [
    {
        // first question
        ques: "what is number of Rajya Sabha seats from Maharastra?",
        options: ["17", "18", "19", "20"],
        correct_ans: "19",
    },
    {
        //    second question
        ques: "A number of Parlimentary Constituencies in Maharastra?",
        options: ["42", "48", "36", "50"],
        correct_ans: "48",
    },
    {
        // third question
        ques: "Sub capital of the Maharastra state is",
        options: ["Aurangabad", "Nagpur", "Mumbai", "pune"],
        correct_ans: "Nagpur",
    },
    {
        // four question
        ques: "The most important river of Maharastra which is a lifeline of the whole South Maharatra is",
        options: ["Koyana", "Krishna", "Warna", "Wardha"],
        correct_ans: "Krishna",
    },
    {
        // fifth question
        ques: "Total population of Maharastra According to 2011 Census",
        options: ["55,27,92,925", "90,23,72,935", "11,22,52,972", "11,23,72,972"],
        correct_ans: "11,23,72,972",
    },
    {
        // sixth question
        ques: "What is area rank According to 2011?",
        options: ["5th", "4th", "3rd", "6th"],
        correct_ans: "c",
    },
    {
        // seven question
        ques: "How many Tehsils are there in Mahrastra?",
        options: ["958", "540", "358", "670"],
        correct_ans: "11,23,72,972",
    },
    {
        // eight question
        ques: "What is capital of Maharastra",
        options: ["Mumbai", "Nagpur", "Both A and B", "None of thease"],
        correct_ans: "Mumbai",
    },
    {
        // ninth question
        ques: "What is second largest city of Maharastra",
        options: ["Nagpur", "pune", "Both A and B", "None of thease"],
        correct_ans: "pune",
    },
    {
        // tenth question
        ques: "Who is know as the spiritual guru of shivaji",
        options: ["Guru Kumbhar", "Ramdas swami", "Eknath", "Tukaram"],
        correct_ans: "Ramdas swami",
    }

]

localStorage.setItem("questionList", questionList);

let score = 0;
let questionNumber = 1;
let quizIndex = new Set();
let randomQuestion = [];
let totalQuestion = 10;
let index = 0;
let selectedAnswers = [];
const progressBarElement = document.getElementById("progress");
const questionHeading = document.getElementById("questionHead");
const questionNumberElement = document.getElementById("questionNum");
const questionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const nextButton = document.getElementById("nextquestion");
const previousButton = document.getElementById("previousquestion");
const displayScore = document.getElementById("displayScore");

const fetchQuize = (localStorage.getItem("questionList"));

function RandomIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questionList.length);

    } while (quizIndex.has(randomIndex));
    quizIndex.add(randomIndex);
    return randomIndex
}
// itrate random question
for (let i = 0; i < totalQuestion; i++) {
    const randomIndex = RandomIndex();
    randomQuestion.push(questionList[randomIndex]);
}
// display questions
function displayQuestion() {
    if (questionElement && optionElement) {
        let currentQuestion = randomQuestion[index];
        console.log(currentQuestion)
        questionHeading.innerHTML = `<h1> Question ${questionNumber} of ${totalQuestion}</h1>`;
        questionNumberElement.innerHTML = `${index + 1}.`;
        questionElement.innerHTML = currentQuestion.ques;

        // display option
        optionElement.innerHTML = currentQuestion.options.map((option, index) =>
            `<div class ="optionText">
        ${index + 1}.
        <input type="radio" name="options" id="option ${index}" value="${option}">
        <label for="option${index}">${option}</label>
        </div>`).join("");

        if (index == 0) {
            previousButton.style.display = "none"
        }

        if (index > 0) {
            previousButton.style.display = "inline"
            nextButton.innerHTML = "Next <i class='fa-solid fa-arrow-right'></i>"
        }

        if (index == 8) {
            questionHeading.innerHTML = "<h1>Last 2 questions left...</h1>"
        }

        if (index == 9) {
            questionHeading.innerHTML = "<h1>Hey this is the last question</h1>"
            nextButton.innerHTML = "Submit and Continue"
        }
        nextButton.innerHTML = index === totalQuestion - 1
            ? "submit and continue <i class='fa-solid fa-arrow-right'></i>"
            : "Next <i class='fa-solid fa-arrow-right'></i>";
    }
    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((index + 1) / totalQuestion) * 100;
    if (progressBarElement) {
        progressBarElement.style.width = `${progress}%`;
    }
}

function attachOptionSelector() {
    const options = document.querySelectorAll('input[name="option"]');
    options.foreach(option => {
        option.addEventlistener('change', (event) => {
            const selectedDiv = event.target.closest(' .optionText');
            const allOptions = document.querySelectorAll('.optionText');
            allOptions.forEach(opt => opt.classList.remove('selected-option'));

            selectedDiv.classList.add('selected-option');

            randomQuestion[index].choosedAnswer = event.target.value;

        });
    });
}

function showSelectedAnswer() {
    const previousAnswer = selectedAnswers[index];
    if (previousAnswer) {
        const selectedPrevOption = document.querySelector(`input[value="${previousAnswer}"]`);
        if (selectedPrevOption) {
            selectedPrevOption.checked = true;
            selectedPrevOption.closest('.optionText').classList.add('selected-option');
        }
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    // randomQuestion[index].choosedAnswer = selectedOption.value;

    console.log(selectedOption);
    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    // Save the selected answer
    randomQuestion[index].choosedAnswer = selectedOption.value;

    // Move to the next question or submit the quiz
    if (index < totalQuestion - 1) {
        index++;
        questionNumber++;
        displayQuestion();
    } else {
        submitQuiz();
    }
}

function updateScore() {
    score = randomQuestion.reduce((acc, question) => {
        return acc + (question.choosedAnswer === question.rightAns ? 2 : 0);
    }, 0);
    // console.log(acc)
    // console.log(score)
    // console.log(`your score is ${acc, score}`)
}

function previousQuestion() {
    if (index > 0) {
        index--;
        questionNumber--;
        displayQuestion();
    }
}

function submitQuiz(){
    let confirmAlert = confirm("Are you sure want to submit the quiz?");
    if(confirmAlert) {
        updateScore();

        const userScore ={
            testUserName:testUser.fullname,
            testUserEmail:testUser.email,
            score:score,
            selectedQuiz:[randomQuestion],
        };

        let storedScores =  JSON.parse(localStorage.getItem('userScores')) || [];
        storedScores.push(userScore);

        localStorage.setItem('userScores',JSON.stringify(storedScores));
        console.log(score)
        window.location.href = "leaderboard.html";
    }
}

function showLeaderboard(){
    let userScores = JSON.parse(localStorage.getItem('userScores'))||[];
    let sortedUsers = userScores.sort((a,b) =>b.scores -a.score).slice(0,6);

    sortedUsers.forEach((user,index)=> {
    document.getElementById(`top${index + 1}Name`).innerHTML = user.testUserName;
    document.getElementById(`top${index + 1}Name`).innerHTML = user.testUserName;
    console.log(user.testUserName)
    });
}

function rankDisplay(){
    let userScores = JSON.parse(localStorage.getItem('userScores')) || [];
    let sortedUsers =userScores.sort((a,b) => b.score -a.score)
    let currentUserName = JSON.parse(localStorage.getItem('isLoggedin')).fullname;
    let currentUser = sortedUsers.find(user => user.testUserName === currentUserName);

    if (currentUser) {
        let userRank = sortedUsers.findIndex(user => user.testUserName === currentUserName) + 1;

        // condition for 1st, 2nd, 3rd display
        if (userRank == 1) {
            document.getElementById("currentscore").style.display = "none"

            document.getElementById("rankDisplay").innerHTML = `Wow Your Rank is: ${userRank}st`;
        }
        else if (userRank == 2) {
            document.getElementById("currentscore").style.display = "none"

            document.getElementById("rankDisplay").innerHTML = ` Wow Your Rank is: ${userRank}nd`;
        }
        else if (userRank == 3) {
            document.getElementById("currentscore").style.display = "none"

            document.getElementById("rankDisplay").innerHTML = `Wow Your Rank is: ${userRank}rd`;
        }
        // condition for userrank greater than 6 display on 4th place div
        else if (userRank > 6) {
            console.log('hi', currentUserName)
            document.getElementById("currentscore").style.backgroundColor = " #E8BE21"

            document.getElementById("currentUserRank").innerHTML = `#${userRank}`;
            document.getElementById("currentUserName").innerHTML = ` ${currentUserName}`;
            document.getElementById("currentUserScore").innerHTML = currentUser.score
        }

        if (userRank > 3) {
            document.getElementById("rankDisplay").innerHTML = `Your Rank is : ${userRank}th`;
        }
        document.getElementById("rankScore").innerHTML = `Your Score: ${currentUser.score}`;
    }
    else {
        document.getElementById("rankDisplay").innerHTML = "User not found.";
    }
}


displayQuestion();

// document.addEventListener("DOMContentLoaded", function () {
//     let userLoggedIn = JSON.parse(localStorage.getItem('isLoggedin'));

//     // If user is not logged in, redirect to login page
//     if (!userLoggedIn) {
//         alert("Please login first");
//         window.location.href = "login.html";
//     }
// });
