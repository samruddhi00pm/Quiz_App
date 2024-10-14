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
    window.location.href = "http://127.0.0.1:5500/login.html";
}

function loginValidation() {
    const email = document.getElementById('email_login').value;
    const pass = document.getElementById('pass_login').value;

    // Regular expression for email validation
    var valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Clear previous error messages
    document.getElementById('email_login_err').innerHTML = "";
    document.getElementById('pass_login_err').innerHTML = "";

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
        alert("Login successful!");
        // Redirect to the dashboard or another page
        window.location.href = "http://127.0.0.1:5500/dashboard.html";
    } else {
        alert("Invalid email or password");
        return false;
    }
}
// question storing
let questionList=[
{     
    // first question
    ques:"what is number of Rajya Sabha seats from Maharastra?",
    options:["17","18", "19", "20"],
    correct_ans:"19",
},
{ 
//    second question
    ques:"A number of Parlimentary Constituencies in Maharastra?",
    options:["42","48", "36", "50"],
    correct_ans:"48",
},
{
    // third question
    ques:"Sub capital of the Maharastra state is",
    options:["Aurangabad","Nagpur", "Mumbai", "pune"],
    correct_ans:"Nagpur",
},
{
    // four question
    ques:"The most important river of Maharastra which is a lifeline of the whole South Maharatra is",
    options:["Koyana","Krishna", "Warna", "Wardha"],
    correct_ans:"Krishna",
},
{
    // fifth question
    ques:"Total population of Maharastra According to 2011 Census",
    options:["55,27,92,925","90,23,72,935", "11,22,52,972", "11,23,72,972"],
    correct_ans:"11,23,72,972",
},
{
    // sixth question
    ques:"What is area rank According to 2011?",
    options:["5th","4th", "3rd", "6th"],
    correct_ans:"c",
},
{
    // seven question
    ques:"How many Tehsils are there in Mahrastra?",
    options:["958","540", "358", "670"],
    correct_ans:"11,23,72,972",
},
{
    // eight question
    ques:"What is capital of Maharastra",
    options:["Mumbai","Nagpur", "Both A and B", "None of thease"],
    correct_ans:"Mumbai",
},
{
    // ninth question
    ques:"What is second largest city of Maharastra",
    options:["Nagpur","pune", "Both A and B", "None of thease"],
    correct_ans:"pune",
},
{
    // tenth question
    ques:"Who is know as the spiritual guru of shivaji",
    options:["Guru Kumbhar","Ramdas swami", "Eknath", "Tukaram"],
    correct_ans:"Ramdas swami",
}

]
