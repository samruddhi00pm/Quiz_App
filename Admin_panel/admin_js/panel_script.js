// let logoutDiv = document.getElementById("confirmLogoutOptionDiv");
// let flag = 0;

// function confirmLogout() {
//     if (flag == 1) {
//         logoutDiv.style.display = "none";
        // document.querySelector(".user-info").style.flexDirection = "column";
//         flag = 0;
//     }
//     else {
//         logoutDiv.style.display = "block";
//         document.getElementById("userNameDisplay").innerHTML = `Hii ${testUser.fullname}`;
//         document.getElementById("userEmailDisplay").innerHTML = testUser.email;
//         flag = 1;
//     }
// }

// Function to handle logout
// function logout() {
//     localStorage.removeItem("isLoggedin"); // Optionally remove login status
//     window.location.href = "login.html"; // Redirect to login page
// }

// Function to take image input
// let editOption = document.getElementsByClassName("edit-button")
// let AvatarPic = document.getElementById("AvatarPic")
// function editPic() {
//     console.log(editOption, AvatarPic)
    //    personalAccount = document.querySelector(".account-img");

// }

// Script for Admin Panel Interactions

// Confirm Logout
function AdminconfirmLogout() {
    const confirmLogoutOptionDiv = document.getElementById('confirmLogoutOptionDiv');
    confirmLogoutOptionDiv.style.display = confirmLogoutOptionDiv.style.display === 'none' ? 'block' : 'none';
}

// Logout function
function Adminlogout() {
    alert("Logging out...");
    // Redirect to login page or perform other logout operations
    window.location.href = '/login';
}

// Edit Profile Picture
function AdmineditPic() {
    alert("Opening profile picture editor...");
    // Add functionality for editing profile picture here
}


// Fetch quiz questions from localStorage
let AdminquizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

// Function to populate the questions table
function populateQuestionsTable() {
    const tableBody = document.getElementById("questionsTableBody");
    tableBody.innerHTML = ""; // Clear the table before adding rows

    AdminquizQuestions.forEach((question, index) => {
        const row = document.createElement("tr");

        // Sr No
        const srNoCell = document.createElement("td");
        srNoCell.textContent = index + 1;
        row.appendChild(srNoCell);

        // Questions
        const questionCell = document.createElement("td");
        questionCell.textContent = question.question;
        row.appendChild(questionCell);

        // Actions
        const actionsCell = document.createElement("td");

        // View button
        const viewButton = document.createElement("button");
        viewButton.innerHTML = "View";
        viewButton.onclick = () => viewQuestion(index);
        actionsCell.appendChild(viewButton);

        // Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = () => editQuestion(index);
        actionsCell.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = () => deleteQuestion(index);
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

// Function to view a question
function viewQuestion(index) {
    alert(`Viewing Question: ${AdminquizQuestions[index].question}`);
}

// Function to edit a question
function editQuestion(index) {
    let newQuestion = prompt("Edit Question:", AdminquizQuestions[index].question);
    if (newQuestion) {
        AdminquizQuestions[index].question = newQuestion;
        localStorage.setItem("quizQuestions", JSON.stringify(AdminquizQuestions));
        populateQuestionsTable();
    }
}

// Function to delete a question
function deleteQuestion(index) {
    if (confirm("Are you sure you want to delete this question?")) {
        AdminquizQuestions.splice(index, 1);
        localStorage.setItem("quizQuestions", JSON.stringify(AdminquizQuestions));
        populateQuestionsTable();
    }
}

// Populate table on page load
populateQuestionsTable();





 