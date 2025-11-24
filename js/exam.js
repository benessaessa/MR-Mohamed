// --------------------------------------------------------
// 1️⃣ Your Exams Here — Add as many lessons as you want
// --------------------------------------------------------
const exams = {
    "lesson1": [
        {
            "question": "ما المقصود بعلم التاريخ؟",
            "answers": ["دراسة الماضي البعيد فقط", "دراسة الأحداث التي وقعت في الماضي", "دراسة الجغرافيا القديمة"],
            "correct": 1
        },
        {
            "question": "ما مصدر معرفتنا بحياة المصريين القدماء؟",
            "answers": ["الحفريات فقط", "النقوش والبرديات والآثار", "الروايات الشفهية"],
            "correct": 1
        },
        {
            "question": "من هو مؤسس أول أسرة حاكمة في مصر القديمة؟",
            "answers": ["نارمر (مينا)", "أحمس", "خوفو"],
            "correct": 0
        },
        {
            "question": "ما العاصمة التي اتخذها الملك مينا بعد توحيد البلاد؟",
            "answers": ["طيبة", "منف", "الإسكندرية"],
            "correct": 1
        },
        {
            "question": "ما أهم إنجازات عصر الدولة القديمة؟",
            "answers": ["بناء الأهرامات", "طرد الهكسوس", "تأسيس الإمبراطورية المصرية"],
            "correct": 0
        },
        {
            "question": "إلى أي عصر ينتمي الملك خوفو؟",
            "answers": ["الدولة القديمة", "الدولة الوسطى", "الدولة الحديثة"],
            "correct": 0
        },
        {
            "question": "بماذا تميزت الدولة الوسطى في مصر القديمة؟",
            "answers": ["بناء الأهرامات", "الاستقرار والنهضة الاقتصادية", "طرد الهكسوس"],
            "correct": 1
        },
        {
            "question": "من القائد الذي طرد الهكسوس من مصر؟",
            "answers": ["أحمس", "تحتمس الثالث", "رمسيس الثاني"],
            "correct": 0
        },
        {
            "question": "ما أشهر إنجازات الملك تحتمس الثالث؟",
            "answers": ["بناء السدود", "إنشاء إمبراطورية مصرية قوية", "بناء الهرم الأكبر"],
            "correct": 1
        },
        {
            "question": "ما النظام الذي كان يحكم مصر القديمة؟",
            "answers": ["جمهوري", "ملكي وراثي", "ديمقراطي"],
            "correct": 1
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