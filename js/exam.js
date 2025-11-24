// --------------------------------------------------------
// 1️⃣ Your Exams Here — Add as many lessons as you want
// --------------------------------------------------------
const exams = {
    "lesson1": [
        {
            question: "ما نتيجة 2 + 2 ؟",
            answers: ["3", "4", "5"],
            correct: 1
        },
        {
            question: "عاصمة مصر ؟",
            answers: ["القاهرة", "دبي", "الدوحة"],
            correct: 0
        },
        {
            question: "ماذا تعني HTML ؟",
            answers: ["HyperText Markup Language", "How To Make Lasagna"],
            correct: 0
        },
        {
            question: "أطول نهر في العالم هو:",
            answers: ["الأمازون", "النيل", "الكونغو"],
            correct: 1
        }
    ],
    "lesson2": [
        {
            question: "ماذا تعني HTML ؟",
            answers: ["HyperText Markup Language", "How To Make Lasagna"],
            correct: 0
        }
    ],
    "lesson3": [
        {
            question: "أطول نهر في العالم هو:",
            answers: ["الأمازون", "النيل", "الكونغو"],
            correct: 1
        }
    ]
};
// --------------------------------------------------------

// 2️⃣ Get lesson name from URL
// Example: exam.html?lesson=lesson1
const lessonName = new URLSearchParams(window.location.search).get("lesson");
const examData = exams[lessonName];

// If lesson not found
if (!examData) {
    document.getElementById("exam-container").innerHTML = `
        <div class="alert alert-danger text-center">
            هذا الامتحان غير موجود!
        </div>
    `;
}

// 3️⃣ Render Exam Questions
function renderExam() {
    const container = document.getElementById("exam-container");
    examData.forEach((q, index) => {

        let html = `
        <div class="question-box">
            <div class="question-title">${index + 1}) ${q.question}</div>
            <div class="mt-2">
                ${q.answers.map((a, i) => `
                    <label class="d-block">
                        <input type="radio" name="q${index}" value="${i}"> ${a}
                    </label>
                `).join("")}
            </div>
        </div>`;
        container.innerHTML += html;
    });
}

renderExam();

// 4️⃣ Submit Exam & Calculate Score
function submitExam() {
    let score = 0;

    examData.forEach((q, i) => {
        let userAnswer = document.querySelector(`input[name='q${i}']:checked`);
        if (userAnswer && Number(userAnswer.value) === q.correct) {
            score++;
        }
    });

    let resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";

    if (score === examData.length) {
        resultDiv.classList.add("bg-success", "text-white");
        resultDiv.innerHTML = `🌟 ممتاز! نتيجتك: ${score} / ${examData.length}`;
    } else {
        resultDiv.classList.add("bg-danger", "text-white");
        resultDiv.innerHTML = `نتيجتك: ${score} / ${examData.length}`;
    }
}