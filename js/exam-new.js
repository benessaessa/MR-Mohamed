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

// Exam state variables
let currentQuestionIndex = 0;
let userAnswers = [];
let timer;
let timeLeft = 30 * 60; // 30 minutes in seconds
let examStarted = false;

// Save and load exam state functions
function saveExamState() {
    const examState = {
        currentQuestionIndex,
        userAnswers,
        timeLeft,
        examStarted
    };
    localStorage.setItem('examState_' + lessonName, JSON.stringify(examState));
}

function loadExamState() {
    const savedState = localStorage.getItem('examState_' + lessonName);
    if (savedState) {
        const state = JSON.parse(savedState);
        currentQuestionIndex = state.currentQuestionIndex;
        userAnswers = state.userAnswers;
        timeLeft = state.timeLeft;
        examStarted = state.examStarted;
        return true;
    }
    return false;
}

function clearExamState() {
    localStorage.removeItem('examState_' + lessonName);
}

// If lesson not found
if (!examData) {
    document.getElementById("exam-container").innerHTML = `
        <div class="alert alert-danger text-center">
            هذا الامتحان غير موجود!
        </div>
    `;
} else {
    // Initialize exam
    document.addEventListener('DOMContentLoaded', function() {
        showExamInstructions();
    });
}

function showExamInstructions() {
    const container = document.getElementById('exam-container');
    const hasSavedState = loadExamState();

    container.innerHTML = `
        <div class="exam-instructions-card">
            <div class="instructions-header">
                <h3>امتحان الدرس</h3>
                <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="instructions-body">
                <div class="exam-info-grid">
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <div class="info-content">
                            <span class="info-label">الوقت</span>
                            <span class="info-value">30 دقيقة</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-question-circle"></i>
                        <div class="info-content">
                            <span class="info-label">عدد الأسئلة</span>
                            <span class="info-value">${examData.length}</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-list"></i>
                        <div class="info-content">
                            <span class="info-label">نوع الأسئلة</span>
                            <span class="info-value">متعدد الخيارات</span>
                        </div>
                    </div>
                </div>
                <div class="exam-description">
                    <p>هذا الامتحان يتكون من ${examData.length} أسئلة متعددة الخيارات. الوقت المحدد هو 30 دقيقة.</p>
                </div>
                <div class="exam-rules">
                    <h5><i class="fas fa-exclamation-triangle"></i> قواعد الامتحان:</h5>
                    <ul>
                        <li><i class="fas fa-arrow-left"></i> يمكن العودة للأسئلة السابقة</li>
                        <li><i class="fas fa-tasks"></i> يجب الإجابة على جميع الأسئلة</li>
                        <li><i class="fas fa-check-circle"></i> سيتم تصحيح الإجابات تلقائياً</li>
                        <li><i class="fas fa-chart-bar"></i> النتيجة ستظهر فوراً بعد الانتهاء</li>
                    </ul>
                </div>
                ${hasSavedState ? `
                <div class="saved-exam-notice">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> لديك امتحان محفوظ سابقاً. يمكنك الاستمرار من حيث توقفت أو البدء من جديد.
                    </div>
                </div>
                ` : ''}
            </div>
            <div class="instructions-footer">
                ${hasSavedState ? `
                <button class="btn btn-success btn-lg me-2" onclick="resumeExam()">
                    <i class="fas fa-play"></i> استمر في الامتحان
                </button>
                <button class="btn btn-primary btn-lg" onclick="startExam()">
                    <i class="fas fa-redo"></i> ابدأ من جديد
                </button>
                ` : `
                <button class="btn btn-primary btn-lg" onclick="startExam()">
                    <i class="fas fa-play"></i> ابدأ الامتحان
                </button>
                `}
            </div>
        </div>
    `;
}

function startExam() {
    clearExamState(); // Clear any saved state when starting new
    examStarted = true;
    userAnswers = new Array(examData.length).fill(null);
    startTimer();
    showQuestion(0);
}

function resumeExam() {
    if (loadExamState()) {
        if (examStarted) {
            startTimer();
            showQuestion(currentQuestionIndex);
        } else {
            showExamInstructions();
        }
    }
}

function startTimer() {
    const timerElement = document.createElement('div');
    timerElement.id = 'exam-timer';
    timerElement.className = 'exam-timer';
    document.querySelector('.card-body').prepend(timerElement);

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById('exam-timer');

    timerElement.innerHTML = `
        <i class="fas fa-clock"></i>
        الوقت المتبقي: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
    `;

    // Add warning class when time is low
    if (timeLeft <= 300) { // 5 minutes
        timerElement.classList.add('timer-warning');
    }
}

function showQuestion(index) {
    currentQuestionIndex = index;
    const question = examData[index];
    const container = document.getElementById('exam-container');

    container.innerHTML = `
        <div class="exam-layout">
            <div class="question-main">
                <div class="question-card">
                    <div class="question-header">
                        <div class="question-title-row">
                            <span class="question-number">الأسئلة</span>
                        </div>
                        <div class="question-progress-row">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(index + 1) / examData.length * 100}%"></div>
                            </div>
                        </div>
                        <div class="question-navigation-row">
                            <div class="question-list">
                                ${examData.map((_, i) => `
                                    <button class="question-nav-btn ${i === currentQuestionIndex ? 'active' : ''} ${userAnswers[i] !== null ? 'answered' : ''}" onclick="jumpToQuestion(${i})">
                                        ${i + 1}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="question-actions mb-3">
                        <button class="btn btn-warning" onclick="endExam()">
                            <i class="fas fa-pause"></i> إنهاء الامتحان واستمرار لاحقاً
                        </button>
                    </div>
                    <div class="question-content">
                        <h5 class="question-text">${question.question}</h5>
                        <div class="options">
                            ${question.answers.map((option, optionIndex) => `
                                <div class="option" onclick="selectOption(${optionIndex})">
                                    <input type="radio" name="question-${index}" value="${optionIndex}" id="option-${index}-${optionIndex}">
                                    <label for="option-${index}-${optionIndex}">${option}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="question-footer">
                        <button class="btn btn-secondary" onclick="previousQuestion()" ${index === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-right"></i> السابق
                        </button>
                        <button class="btn btn-primary" onclick="nextQuestion()">
                            ${index === examData.length - 1 ? 'تسليم الامتحان' : 'التالي'} <i class="fas fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Restore previous answer if exists
    if (userAnswers[index] !== null) {
        const selectedOption = document.getElementById(`option-${index}-${userAnswers[index]}`);
        if (selectedOption) {
            selectedOption.checked = true;
        }
    }
}

function jumpToQuestion(index) {
    showQuestion(index);
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
}

function nextQuestion() {
    if (currentQuestionIndex < examData.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    } else {
        submitExam();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

function submitExam() {
    clearInterval(timer);
    examStarted = false;

    // Calculate results
    let correctAnswers = 0;
    let wrongAnswers = 0;

    examData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }
    });

    const totalQuestions = examData.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    let grade = '';

    if (percentage >= 90) grade = 'ممتاز';
    else if (percentage >= 80) grade = 'جيد جداً';
    else if (percentage >= 70) grade = 'جيد';
    else if (percentage >= 60) grade = 'مقبول';
    else grade = 'راسب';

    showResults(correctAnswers, wrongAnswers, grade, percentage);
}

function showResults(correct, wrong, grade, percentage) {
    const container = document.getElementById('exam-container');
    const submitBtn = document.querySelector('button[onclick="submitExam()"]');

    if (submitBtn) submitBtn.style.display = 'none';

    let correctAnswersHTML = '';
    examData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correct;
        const isCorrect = userAnswer === correctAnswer;
        correctAnswersHTML += `
            <div class="answer-card ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                <div class="answer-header">
                    <span class="answer-number">السؤال ${index + 1}</span>
                    <span class="answer-status">${isCorrect ? '<i class="fas fa-check"></i> صحيح' : '<i class="fas fa-times"></i> خطأ'}</span>
                </div>
                <div class="answer-content">
                    <h6 class="answer-question">${question.question}</h6>
                    <div class="answer-options">
                        ${question.answers.map((option, optionIndex) => `
                            <div class="answer-option ${optionIndex === correctAnswer ? 'correct' : ''} ${optionIndex === userAnswer && !isCorrect ? 'user-wrong' : ''}">
                                ${option}
                                ${optionIndex === correctAnswer ? '<i class="fas fa-check-circle"></i>' : ''}
                                ${optionIndex === userAnswer && !isCorrect ? '<i class="fas fa-times-circle"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="results-container">
            <h3 class="text-center mb-4">نتائج الامتحان</h3>
            <div class="results-cards">
                <div class="result-card correct-card">
                    <div class="card-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="card-content">
                        <h4>${correct}</h4>
                        <p>إجابات صحيحة</p>
                    </div>
                </div>
                <div class="result-card wrong-card">
                    <div class="card-icon">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="card-content">
                        <h4>${wrong}</h4>
                        <p>إجابات خاطئة</p>
                    </div>
                </div>
                <div class="result-card grade-card">
                    <div class="card-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="card-content">
                        <h4>${grade}</h4>
                        <p>${percentage}%</p>
                    </div>
                </div>
            </div>
            <div class="result-message text-center mt-4">
                ${percentage >= 60 ?
                    '<div class="success-message py-4"><i class="fas fa-trophy"></i><h5>مبروك! لقد نجحت في الامتحان</h5></div>' :
                    '<div class="fail-message py-4"><i class="fas fa-exclamation-triangle"></i><h5>تحتاج إلى المراجعة والمحاولة مرة أخرى</h5></div>'
                }
            </div>
            <div class="correct-answers-section mt-5">
                <h4 class="text-center mb-4">الإجابات الصحيحة</h4>
                <div class="answers-grid">
                    ${correctAnswersHTML}
                </div>
            </div>
            <div class="text-center pt-5 pb-4">
                <button class="btn btn-primary" onclick="retakeExam()">إعادة الامتحان</button>
                <button class="btn btn-secondary" onclick="goToCourses()">العودة للكورسات</button>
            </div>
        </div>
    `;
}

function retakeExam() {
    timeLeft = 30 * 60; // Reset timer
    startExam();
}

function endExam() {
    clearInterval(timer);
    saveExamState();
    window.location.href = 'my-courses.html';
}

function goToCourses() {
    window.location.href = 'my-courses.html';
}
