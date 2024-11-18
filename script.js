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

    } else {
        console.log("false")
        alert("Invalid email or password");
        return false;
    }
}
// console.log(formData.2fullname)
let userLogedIn = (localStorage.getItem('isLoggedin'));
let testUser = (JSON.parse(userLogedIn));

// console.log(testUser);
// console.log(testUser.fullname);

function getUserInitials() {
    const names = testUser.fullname.split(' ');
    // console.log(names);
    if (names.length >= 2) {
        return names[0][0].toUpperCase() + names[1][0].toUpperCase(); // Initials of first and last name
    } else {
        return names[0][0].toUpperCase(); // Initial if only one name
    }
}

// Function to display the user's name or initials near the logo
function displayUserName() {
    if (testUser.fullname) {
        const userNameElement =document.getElementById("userName");
        const initials = getUserInitials(testUser.fullname);
        userNameElement.innerHTML = `Welcome, ${initials}`
        // userNameElement.innerHTML = `Welcome, ${testUser.fullName.toUpperCase()}`
    }
}
displayUserName();

// function to handle logout Alert
let logoutDiv = document.getElementById("confirmLogoutOptionDiv");
let flag = 0;

function confirmLogout() {
    if (flag == 1) {
        logoutDiv.style.display = "none";
        // document.querySelector(".user-info").style.flexDirection = "column";
        flag = 0;
    }
    else {
        logoutDiv.style.display = "block";
        document.getElementById("userNameDisplay").innerHTML = `Hii ${testUser.fullname}`;
        document.getElementById("userEmailDisplay").innerHTML = testUser.email;
        flag = 1;
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem("isLoggedin"); // Optionally remove login status
    window.location.href = "login.html"; // Redirect to login page
}

// Function to take image input
let editOption = document.getElementsByClassName("edit-button")
let AvatarPic = document.getElementById("AvatarPic")
function editPic() {
    console.log(editOption, AvatarPic)
    //    personalAccount = document.querySelector(".account-img");

}
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
let quizQuestions = [
    {
        question: "How many letters are there in the English alphabet?",
        options: [
            { value: "24" },
            { value: "18" },
            { value: "27" },
            { value: "26" },
        ],
        rightAns: "26"
    },
    {
        question: "Rainbow consist of how many colours?",
        options: [
            { value: "10" },
            { value: "12" },
            { value: "7" },
            { value: "13" },
        ],
        rightAns: "7"
    },
    {
        question: "How many minutes are there in an hour?",
        options: [
            { value: "60 min" },
            { value: "60 sec" },
            { value: "50 min" },
            { value: "57 min" },
        ],
        rightAns: "60 min"
    },
    {
        question: "Baby frog is known as.......",
        options: [
            { value: "Tadpolee" },
            { value: "taddy" },
            { value: "Tadpole" },
            { value: "pole" }
        ],
        rightAns: "Tadpole"
    },
    {
        question: "Name the National animal of India?",
        options: [
            { value: "Lion" },
            { value: "Tiger" },
            { value: "Rabbit" },
            { value: "Jiraf" },
        ],
        rightAns: "Tiger"
    },
    {
        question: "Name the national flower of India?",
        options: [
            { value: "Rose" },
            { value: "Tulip" },
            { value: "Lotus" },
            { value: "Lily" },
        ],
        rightAns: "Lotus"
    },
    {
        question: "Name the National river of India?",
        options: [
            { value: "Ganga" },
            { value: "Savitri" },
            { value: "Godavari" },
            { value: "Yamuna" },
        ],
        rightAns: "Ganga"
    },
    {
        question: "Which is the smallest month of the year?",
        options: [
            { value: "March" },
            { value: "December" },
            { value: "April" },
            { value: "February" },
        ],
        rightAns: "February"
    },
    {
        question: "How many sides are there in a triangle?",
        options: [
            { value: "3" },
            { value: "6" },
            { value: "2" },
            { value: "2.5" },
        ],
        rightAns: "3"
    },
    {
        question: "Anti-clockwise is it from left or right?",
        options: [
            { value: "Left" },
            { value: "Right" },
            { value: "Left-Right" },
            { value: "None of these" },
        ],
        rightAns: "Left"
    },
    {
        question: "Name the hardest substance available on Earth?",
        options: [
            { value: "Diamond" },
            { value: "Zinc" },
            { value: "Bronze" },
            { value: "Star" },
        ],
        rightAns: "Diamond"
    },
    {
        question: "What is the main ingredient in chocolate?",
        options: [
            { value: "Choco" },
            { value: "Cocoa" },
            { value: "Cherry" },
            { value: "Rice ball" },
        ],
        rightAns: "Cocoa"
    },
    {
        question: "What do bees produce?",
        options: [
            { value: "Honey" },
            { value: "Beans" },
            { value: "eggs" },
            { value: "Mango" },
        ],
        rightAns: "Honey"
    },
    {
        question: " Which festival is known as the festival of light?",
        options: [
            { value: "Diwali" },
            { value: "Ganeshustov" },
            { value: "Chrismas" },
            { value: "Navratri" },
        ],
        rightAns: "Diwali"
    },
    {
        question: "Name the National tree of India?",
        options: [
            { value: "Banana Tree" },
            { value: "Banyan Tree" },
            { value: "Mango Tree" },
            { value: "Coconut Tree" },
        ],
        rightAns: "Banyan Tree"
    }
];

localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

let score = 0;
let questionNumber = 1;
let quizUsedIndexes = new Set();
let randomQuestion = [];
let totalQuestions = 10;
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

// Fetch the quiz questions from localStorage
const fetchQuize = (localStorage.getItem("quizQuestions"));

//  function to get a random index that's not repeated
function getRandomIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quizQuestions.length);
    } while (quizUsedIndexes.has(randomIndex));
    quizUsedIndexes.add(randomIndex);
    return randomIndex;
}

// Populate randomQuestion with unique questions
for (let i = 0; i < totalQuestions; i++) {
    const randomIndex = getRandomIndex();
    randomQuestion.push(quizQuestions[randomIndex]);
}

// Function to display a question
function displayQuestion() {
    if (questionElement && optionElement) {
        let currentQuestion = randomQuestion[index];

        // question heading and question content
        questionHeading.innerHTML = `<h1>Question ${questionNumber} of ${totalQuestions}</h1>`;
        questionNumberElement.innerHTML = `${index + 1}.`;
        questionElement.innerHTML = currentQuestion.question;

        // Display 4 options..
        optionElement.innerHTML = currentQuestion.options.map((option, optionIndex) =>
            `<div class="optionText">
                <input type="radio" name="options" id="option${optionIndex}" value="${option.value}">
                <label for="option${optionIndex}">${optionIndex + 1}. ${option.value}</label>
            </div>`).join("");

        // Attach event listeners for option selection
        attachOptionSelector();

        // Show previously selected answer if available
        showSelectedAnswer();

        // Handle Next/Previous buttons display..
        if (index > 0) {
            previousButton.innerHTML = "<i class='fa-solid fa-arrow-left'></i> Previous";
        }
        if (index === 8) {
            questionHeading.innerHTML = "<h1>Last 2 Questions Left..</h1>";
        }
        if (index === 9) {
            questionHeading.innerHTML = "<h1>Hey, this is the Last Question</h1>";
        }
        nextButton.innerHTML = index === totalQuestions - 1
            ? "Submit and Continue <i class='fa-solid fa-arrow-right'></i>"
            : "Next <i class='fa-solid fa-arrow-right'></i>";
    }
    updateProgressBar();
}

// Function to update the progress bar
function updateProgressBar() {
    const progress = ((index + 1) / totalQuestions) * 100;
    if (progressBarElement) {
        progressBarElement.style.width = `${progress}%`;
    }
}

// Function to attach listeners to the options
function attachOptionSelector() {
    const options = document.querySelectorAll('input[name="options"]');
    options.forEach(option => {
        option.addEventListener('change', (event) => {
            const selectedDiv = event.target.closest('.optionText');
            // Remove selected-option class from all options
            const allOptions = document.querySelectorAll('.optionText');
            allOptions.forEach(opt => opt.classList.remove('selected-option'));

            // Add selected-option class to the selected one
            selectedDiv.classList.add('selected-option');

            // Store the selected answer
            randomQuestion[index].choosedAnswer = event.target.value;

            // Save selected answer for this question
            selectedAnswers[index] = event.target.value;

        });
    });
}

// Function to show the previously selected answer
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

// Function to move to the next question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="options"]:checked');

    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    // Save the selected answer
    randomQuestion[index].choosedAnswer = selectedOption.value;

    // Move to the next question or submit the quiz
    if (index < totalQuestions - 1) {
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

function submitQuiz() {
    let confirmAlert = confirm("Are you sure want to submit the quiz?");
    if (confirmAlert) {
        updateScore();

        const userScore = {
            testUserName: testUser.fullname,
            testUserEmail: testUser.email,
            score: score,
            selectedQuiz: [randomQuestion],
        };

        let storedScores = JSON.parse(localStorage.getItem('userScores')) || [];
        storedScores.push(userScore);

        localStorage.setItem('userScores', JSON.stringify(storedScores));
        console.log(score)
        window.location.href = "winner_page.html";
    }
}

function showLeaderboard() {
    let userScores = JSON.parse(localStorage.getItem('userScores')) || [];
    let sortedUsers = userScores.sort((a, b) => b.score - a.score).slice(0, 6);

    sortedUsers.forEach((user, index) => {
        document.getElementById(`top${index + 1}Name`).innerHTML = user.testUserName;
        document.getElementById(`top${index + 1}Score`).innerHTML = user.score;
        console.log(user.testUserName)
    });
}

function rankDisplay() {
    let userScores = JSON.parse(localStorage.getItem('userScores')) || [];
    let sortedUsers = userScores.sort((a, b) => b.score - a.score)
    let currentUserName = JSON.parse(localStorage.getItem('isLoggedin')).fullname;
    let currentUser = sortedUsers.find(user => user.testUserName === currentUserName);

    if (currentUser) {
        let userRank = sortedUsers.findIndex(user => user.testUserName === currentUserName) + 1;

        // condition for 1st, 2nd, 3rd display
        if (userRank == 1) {
            document.getElementById("currentscore").style.display = "none";

            document.getElementById("rankDisplay").innerHTML = `Wow Your Rank is: ${userRank}st`;
        }
        else if (userRank == 2) {
            document.getElementById("currentscore").style.display = "none";

            document.getElementById("rankDisplay").innerHTML = ` Wow Your Rank is: ${userRank}nd`;
        }
        else if (userRank == 3) {
            document.getElementById("currentscore").style.display = "none";

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
