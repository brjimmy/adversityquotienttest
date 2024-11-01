// Ensure the page scrolls to the top on refresh
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Function to render questions
document.querySelector("#testBtn").addEventListener("click", () => {
    renderQuestions(questions);

    const formSection = document.querySelector("#formSection");
    const headerHeight = document.querySelector("header").offsetHeight;
    const scrollToPosition = formSection.offsetTop - headerHeight;
    window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
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
    form.id = "aqTestForm";

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
    submitBtn.classList.add("button-style");
    submitBtn.type = "submit";  // Ensures button is set to submit the form
    form.appendChild(submitBtn);

    formSection.innerHTML = "";
    formSection.appendChild(form);
    formSection.style.display = "block";

    form.addEventListener("submit", (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        handleFormSubmit(new FormData(form));
    });
};

// Function to handle form data after submission
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

    formSection.style.display = "none";
    document.querySelector("#testBtn").style.display = "none";

    const headerHeight = document.querySelector("header").offsetHeight;
    const scrollToPosition = resultSection.offsetTop - headerHeight;
    window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
};

// Coordinates for each point along the curve
const curvePoints = [
    { x: 0, y: 721 }, { x: 12, y: 719 }, { x: 27, y: 718 },
    { x: 42, y: 716 }, { x: 56, y: 713 }, { x: 71, y: 711 },
    { x: 85, y: 707 }, { x: 100, y: 704 }, { x: 114, y: 700 },
    { x: 128, y: 696 }, { x: 142, y: 691 }, { x: 156, y: 687 },
    { x: 170, y: 682 }, { x: 184, y: 676 }, { x: 197, y: 671 },
    { x: 211, y: 664 }, { x: 225, y: 658 }, { x: 238, y: 651 },
    { x: 251, y: 643 }, { x: 263, y: 636 }, { x: 275, y: 628 },
    { x: 287, y: 619 }, { x: 300, y: 611 }, { x: 312, y: 601 },
    { x: 323, y: 592 }, { x: 334, y: 583 }, { x: 345, y: 573 },
    { x: 357, y: 564 }, { x: 368, y: 553 }, { x: 378, y: 543 },
    { x: 390, y: 533 }, { x: 400, y: 523 }, { x: 411, y: 513 },
    { x: 421, y: 503 }, { x: 433, y: 492 }, { x: 443, y: 482 },
    { x: 453, y: 471 }, { x: 465, y: 462 }, { x: 475, y: 450 },
    { x: 485, y: 440 }, { x: 496, y: 430 }, { x: 507, y: 420 },
    { x: 518, y: 410 }, { x: 528, y: 400 }, { x: 540, y: 389 },
    { x: 551, y: 380 }, { x: 562, y: 370 }, { x: 573, y: 360 },
    { x: 585, y: 351 }, { x: 596, y: 341 }, { x: 608, y: 332 },
    { x: 619, y: 324 }, { x: 631, y: 315 }, { x: 644, y: 307 },
    { x: 657, y: 299 }, { x: 669, y: 291 }, { x: 682, y: 283 },
    { x: 695, y: 277 }, { x: 708, y: 270 }, { x: 721, y: 264 },
    { x: 735, y: 258 }, { x: 750, y: 252 }, { x: 763, y: 248 },
    { x: 777, y: 242 }, { x: 791, y: 237 }, { x: 805, y: 234 },
    { x: 820, y: 229 }, { x: 834, y: 225 }, { x: 848, y: 222 },
    { x: 863, y: 219 }, { x: 877, y: 216 }, { x: 892, y: 213 },
    { x: 906, y: 211 }, { x: 921, y: 209 }, { x: 936, y: 207 },
    { x: 951, y: 206 }, { x: 965, y: 205 }, { x: 980, y: 205 },
    { x: 995, y: 205 }, { x: 1010, y: 206 }, { x: 1025, y: 207 },
    { x: 1039, y: 209 }, { x: 1054, y: 211 }, { x: 1069, y: 214 },
    { x: 1083, y: 217 }, { x: 1098, y: 220 }, { x: 1112, y: 223 },
    { x: 1126, y: 227 }, { x: 1140, y: 232 }, { x: 1155, y: 236 },
    { x: 1169, y: 242 }, { x: 1183, y: 248 }, { x: 1196, y: 253 },
    { x: 1210, y: 260 }, { x: 1223, y: 266 }, { x: 1236, y: 273 },
    { x: 1249, y: 281 }, { x: 1261, y: 287 }, { x: 1275, y: 296 },
    { x: 1287, y: 303 }, { x: 1300, y: 311 }, { x: 1312, y: 319 },
    { x: 1324, y: 327 }, { x: 1336, y: 336 }, { x: 1348, y: 345 },
    { x: 1360, y: 354 }, { x: 1372, y: 363 }, { x: 1383, y: 372 },
    { x: 1395, y: 382 }, { x: 1407, y: 390 }, { x: 1418, y: 401 },
    { x: 1429, y: 410 }, { x: 1440, y: 419 }, { x: 1452, y: 429 },
    { x: 1463, y: 439 }, { x: 1474, y: 448 }, { x: 1485, y: 459 },
    { x: 1496, y: 468 }, { x: 1507, y: 478 }, { x: 1518, y: 489 },
    { x: 1530, y: 498 }, { x: 1540, y: 508 }, { x: 1551, y: 518 },
    { x: 1562, y: 528 }, { x: 1574, y: 538 }, { x: 1585, y: 548 },
    { x: 1596, y: 557 }, { x: 1607, y: 568 }, { x: 1619, y: 577 },
    { x: 1630, y: 586 }, { x: 1641, y: 596 }, { x: 1652, y: 605 },
    { x: 1665, y: 614 }, { x: 1676, y: 623 }, { x: 1688, y: 632 },
    { x: 1700, y: 641 }, { x: 1712, y: 649 }, { x: 1725, y: 657 },
    { x: 1738, y: 664 }, { x: 1751, y: 672 }, { x: 1764, y: 678 },
    { x: 1777, y: 685 }, { x: 1791, y: 690 }, { x: 1804, y: 696 },
    { x: 1818, y: 701 }, { x: 1832, y: 705 }, { x: 1847, y: 709 },
    { x: 1861, y: 713 }, { x: 1876, y: 716 }, { x: 1890, y: 718 },
    { x: 1905, y: 719 }, { x: 1919, y: 721 }
];





// Function to interpolate between two points
function interpolate(point1, point2, t) {
    const x = point1.x + (point2.x - point1.x) * t;
    const y = point1.y + (point2.y - point1.y) * t;
    return { x, y };
}

// Function to calculate position along the curve based on score
function getCurvePosition(score) {
    const minScore = 40;
    const maxScore = 200;
    const numPoints = curvePoints.length;
    const index = Math.floor((score - minScore) / (maxScore - minScore) * (numPoints - 1));

    // Calculate t (the fractional distance between index and index + 1)
    const t = ((score - minScore) % ((maxScore - minScore) / (numPoints - 1))) / ((maxScore - minScore) / (numPoints - 1));

    const point1 = curvePoints[index];
    const point2 = curvePoints[Math.min(index + 1, numPoints - 1)];

    return interpolate(point1, point2, t);
}

// Function to display results with curve positioning
const displayResult = (totalScore, breakdown) => {
    const finalScore = totalScore * 2;

    resultSection.innerHTML = `
    <p style="font-size: 13px; margin-bottom: 30px;">
        At every question, the first radio button equates to a score of one, while the fifth equates to five. Add all the scores from all the questions, then multiply it by two. The result is your ARP, or Adversity Response Profile.
    </p>
    <h2 class="text-2xl mb-5">You have an Adversity Response Profile score lower than average.</h2>
    <p class="mb-5">Average score: 147.5</p>
    <div class="result-score">${finalScore}</div>
    <h3 class="core-score-title text-xl mt-5">CORE Score breakdown:</h3>
    <div class="result-container">
        <div>Control: ${breakdown.control}</div>
        <div>Ownership: ${breakdown.ownership}</div>
        <div>Reach: ${breakdown.reach}</div>
        <div>Endurance: ${breakdown.endurance}</div>
    </div>

    <!-- Mountain Score Display positioned directly after CORE Score breakdown -->
    <div class="mountain-score-container">
        <img src="./img/mountain.png" alt="Mountain background" class="mountain-image">
        <div id="scoreIndicator" class="score-indicator-dot"></div>
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

		<p class="centered-source">(www.winstonbrill.com)</p>
    </div>
`;


    // Calculate the position on the curve based on the score
    const curvePosition = getCurvePosition(finalScore);

    // Adjust position for center alignment of the dot (assuming dot diameter is 20px)
    const dotDiameter = 20;
    const scoreIndicator = document.getElementById("scoreIndicator");
    scoreIndicator.style.left = `calc(${(curvePosition.x - dotDiameter / 2) / 1920 * 100}%)`;
    scoreIndicator.style.bottom = `${((907 - curvePosition.y) - dotDiameter / 2) / 907 * 100}%`;

    resultSection.style.display = "block";
};
