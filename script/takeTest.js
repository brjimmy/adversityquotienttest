// Ensure the page scrolls to the top on refresh
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Function to render questions
document.querySelector("#testBtn").addEventListener("click", () => {
    renderQuestions(questions); // Render the quiz questions

    // Scroll to the form section smoothly
    const formSection = document.querySelector("#formSection");
    const headerHeight = document.querySelector("header").offsetHeight; // Get header height
    const scrollToPosition = formSection.offsetTop - headerHeight; // Calculate scroll position
    window.scrollTo({ top: scrollToPosition, behavior: "smooth" }); // Scroll to position
});

const formSection = document.querySelector("#formSection");
const resultSection = document.querySelector("#resultSection");

// Inline questions with placeholders for 20 questions
const questions = [
    { number: 1, test: "You suffer a financial setback. To what extent can you influence this situation?",
      startRange: "Not at all", endRange: "Completely", dimension: "control" },

    { number: 2, test: "You are overlooked for a promotion. To what extent do you feel responsible for improving the situation?",
      startRange: "Not responsible at all", endRange: "Completely responsible", dimension: "ownership" },

    { number: 3, test: "You are criticized for a big project. The consequences of this situation will:",
      startRange: "Affect all aspects of my life", endRange: "Be limited to this situation", dimension: "reach" },

    { number: 4, test: "You accidentally delete an important email. The consequences of this situation will:",
      startRange: "Last forever", endRange: "Quickly pass", dimension: "endurance" },

    { number: 5, test: "A high-priority project gets canceled. The consequences of this situation will:",
      startRange: "Affect all aspects of my life", endRange: "Be limited to this situation", dimension: "reach" },

    { number: 6, test: "Someone ignores your attempt to discuss an important issue. How responsible do you feel?",
      startRange: "Not responsible at all", endRange: "Completely responsible", dimension: "ownership" },

    { number: 7, test: "People respond unfavorably to your ideas. To what extent can you influence this situation?",
      startRange: "Not at all", endRange: "Completely", dimension: "control" },

    { number: 8, test: "You are unable to take a much-needed vacation. The consequences will:",
      startRange: "Last forever", endRange: "Quickly pass", dimension: "endurance" },

    { number: 9, test: "You hit every red light on your way to an important meeting. The consequences will:",
      startRange: "Affect all aspects of my life", endRange: "Be limited to this situation", dimension: "reach" },

    { number: 10, test: "You lose an important document. The consequences will:",
      startRange: "Last forever", endRange: "Quickly pass", dimension: "endurance" },

    { number: 11, test: "Your workplace is understaffed. How responsible do you feel for improving the situation?",
      startRange: "Not responsible at all", endRange: "Completely responsible", dimension: "ownership" },

    { number: 12, test: "You miss an important appointment. The consequences will:",
      startRange: "Affect all aspects of my life", endRange: "Be limited to this situation", dimension: "reach" },

    { number: 13, test: "Your personal and work obligations are out of balance. Can you influence the situation?",
      startRange: "Not at all", endRange: "Completely", dimension: "control" },

    { number: 14, test: "You never seem to have enough money. The consequences will:",
      startRange: "Last forever", endRange: "Quickly pass", dimension: "endurance" },

    { number: 15, test: "You are not exercising regularly. To what extent can you influence this situation?",
      startRange: "Not at all", endRange: "Completely", dimension: "control" },

    { number: 16, test: "Your organization is not meeting its goals. How responsible do you feel?",
      startRange: "Not responsible at all", endRange: "Completely responsible", dimension: "ownership" },

    { number: 17, test: "Your computer crashes repeatedly. To what extent can you influence the situation?",
      startRange: "Not at all", endRange: "Completely", dimension: "control" },

    { number: 18, test: "A meeting feels like a waste of time. How responsible do you feel to improve it?",
      startRange: "Not responsible at all", endRange: "Completely responsible", dimension: "ownership" },

    { number: 19, test: "You lose something important. The consequences will:", 
      startRange: "Last forever", endRange: "Quickly pass", dimension: "endurance" },

    { number: 20, test: "Your boss disagrees with your decision. The consequences will:",
      startRange: "Affect all aspects of my life", endRange: "Be limited to this situation", dimension: "reach" }
];

// Function to render questions
const renderQuestions = (questions) => {
    const form = document.createElement("form");

    questions.forEach((q) => {
        const questionWrapper = document.createElement("div");
        questionWrapper.classList.add("question-wrapper");

        const questionText = document.createElement("p");
        questionText.textContent = `${q.number}. ${q.test}`;
        questionWrapper.appendChild(questionText);

		const radioGroup = document.createElement("div");
		radioGroup.classList.add("radio-group");

		const startLabel = document.createElement("label");
		startLabel.textContent = q.startRange;
		radioGroup.appendChild(startLabel);

		for (let i = 1; i <= 5; i++) {
		const radio = document.createElement("input");
		radio.type = "radio";
		radio.name = `question-${q.number}`;
		radio.value = i;
		radio.required = true;
		radioGroup.appendChild(radio);
}

const endLabel = document.createElement("label");
endLabel.textContent = q.endRange;
radioGroup.appendChild(endLabel);

questionWrapper.appendChild(radioGroup);
        form.appendChild(questionWrapper);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Test";
    submitBtn.classList.add("button-style"); // Use the shared class
    form.appendChild(submitBtn);

    formSection.innerHTML = "";
    formSection.appendChild(form);
    formSection.style.display = "block";

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormSubmit(new FormData(form));
    });
};

// Handle form submission
const handleFormSubmit = (formData) => {
    let totalScore = 0;
    let control = 0, ownership = 0, reach = 0, endurance = 0;

    formData.forEach((value, key) => {
        const questionNumber = parseInt(key.split('-')[1]) - 1;
        const dimension = questions[questionNumber].dimension;
        const score = parseInt(value);

        totalScore += score;
        if (dimension === "control") control += score;
        if (dimension === "ownership") ownership += score;
        if (dimension === "reach") reach += score;
        if (dimension === "endurance") endurance += score;
    });

    displayResult(totalScore, { control, ownership, reach, endurance });

    // Hide the form section after submission
    formSection.style.display = "none";

    // Disable the Take AQ Test button
	document.querySelector("#testBtn").style.display = "none"; // Hide the button instead of disabling it

    // Scroll to the results section after displaying results
    const headerHeight = document.querySelector("header").offsetHeight; // Get header height
    const scrollToPosition = resultSection.offsetTop - headerHeight; // Calculate scroll position
    window.scrollTo({ top: scrollToPosition, behavior: "smooth" }); // Scroll to results
};

// Function to display results
const displayResult = (totalScore, breakdown) => {
    resultSection.innerHTML = `
        <p style="font-size: 13px; margin-bottom: 30px;">
            At every question, the first radio button equates to a score of one, while the fifth equates to five. Add all the scores from all the questions, then multiply it by two. The result is your ARP, or Adversity Response Profile.
        </p>
        <h2 class="text-2xl mb-5">You have an Adversity Response Profile score lower than average.</h2>
        <p class="mb-5">Average score: 147.5</p>
        <div class="result-score">${totalScore * 2}</div>
        <h3 class="text-xl mt-5">CORE Score breakdown:</h3>
        <div class="result-container">
            <div>Control: ${breakdown.control}</div>
            <div>Ownership: ${breakdown.ownership}</div>
            <div>Reach: ${breakdown.reach}</div>
            <div>Endurance: ${breakdown.endurance}</div>
        </div>
        <div id="explanation">
            <h3>C = Control</h3>
            <p>To what extent can you influence the situation? How much control do you perceive you have? Those with higher AQs perceive they have significantly more control and influence in adverse situations than do those with lower AQs. Even in situations that appear overwhelming or out of their hands, those with higher AQs find some facet of the situation they can influence. Those with lower AQs respond as if they have little or no control and often give up.</p>

            <h3>O = Ownership</h3>
            <p>To what extent do you hold yourself responsible for improving this situation? To what extent are you accountable to play some role in making it better? Accountability is the backbone of action. Those with higher AQs hold themselves accountable for dealing with situations regardless of their cause. Those with lower AQs deflect accountability and most often feel victimized and helpless.</p>

            <h3>R = Reach</h3>
            <p>How far does the fallout of this situation reach into other areas of your work or life? To what extent does the adversity extend beyond the situation at hand? Keeping the fallout under control and limiting the reach of adversity is essential for efficient and effective problem solving. Those with higher AQs keep setbacks and challenges in their place, not letting them infest the healthy areas of their work and lives. Those with lower AQs tend to catastrophize, allowing a setback in one area to bleed into other, unrelated areas and become destructive.</p>

            <h3>E = Endurance</h3>
            <p>How long will the adversity endure? Seeing beyond even enormous difficulties is an essential skill for maintaining hope. Those with higher AQs have the uncanny ability to see past the most interminable difficulties and maintain hope and optimism. Those with lower AQs see adversity as dragging on indefinitely, if not permanently.</p>

            <p>(www.winstonbrill.com)</p>
        </div>
    `;
    resultSection.style.display = "block"; // Show the result section
};
