// Fetch quiz questions from localStorage
let quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

// Function to populate the questions table
function populateQuestionsTable() {
    const tableBody = document.getElementById("questionsTableBody");
    tableBody.innerHTML = ""; // Clear the table before adding rows

    quizQuestions.forEach((question, index) => {
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
    alert(`Viewing Question: ${quizQuestions[index].question}`);
}

// Function to edit a question
function editQuestion(index) {
    let newQuestion = prompt("Edit Question:", quizQuestions[index].question);
    if (newQuestion) {
        quizQuestions[index].question = newQuestion;
        localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
        populateQuestionsTable();
    }
}

// Function to delete a question
function deleteQuestion(index) {
    if (confirm("Are you sure you want to delete this question?")) {
        quizQuestions.splice(index, 1);
        localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
        populateQuestionsTable();
    }
}

// Populate table on page load
populateQuestionsTable();




