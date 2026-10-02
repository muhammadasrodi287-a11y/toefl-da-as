/* ==========================================================================
   TOEFL PRACTICE APP - JAVASCRIPT LOGIC & QUESTION BANK
   ========================================================================== */

// --- QUESTION BANK DATA (Trusted Standard TOEFL ITP Sources) ---
const questionBank = {
    listening: [
        {
            id: 1,
            audioScript: "Man: Do you think you'll be able to make it to the study group tonight?\nWoman: I'd love to, but I have to finish my biology lab report before tomorrow morning.",
            question: "What does the woman mean?",
            options: [
                { key: "A", text: "She will join the study group later tonight." },
                { key: "B", text: "She cannot attend because she has homework to do." },
                { key: "C", text: "She already completed her biology report." },
                { key: "D", text: "She wants the man to help her with biology." }
            ],
            correct: "B",
            explanation: "Wanita tersebut mengatakan 'I'd love to, but I have to finish my biology lab report...' yang bermakna ia menolak secara halus karena harus menyelesaikan tugasnya."
        },
        {
            id: 2,
            audioScript: "Woman: Has Professor Jackson assigned the research topic yet?\nMan: Yes, it's on the syllabus, but he said we could change it if we get approval.",
            question: "What does the man imply about the research topic?",
            options: [
                { key: "A", text: "Students must stick strictly to the syllabus." },
                { key: "B", text: "The professor hasn't decided on the topic." },
                { key: "C", text: "Students have some flexibility if they ask the professor." },
                { key: "D", text: "The research topic was changed yesterday." }
            ],
            correct: "C",
            explanation: "Ungkapan 'we could change it if we get approval' mengindikasikan fleksibilitas topik penelitian selama mendapat izin profesor."
        },
        {
            id: 3,
            audioScript: "Man: I can't believe how crowded the library is today.\nWoman: Well, final exams start next week, so everyone is cramming.",
            question: "Why is the library crowded?",
            options: [
                { key: "A", text: "There is a special event in the library." },
                { key: "B", text: "Students are preparing for upcoming final exams." },
                { key: "C", text: "The library is closing early today." },
                { key: "D", text: "A new study group was formed." }
            ],
            correct: "B",
            explanation: "Frasa 'final exams start next week, so everyone is cramming' menjelaskan bahwa mahasiswa memadati perpustakaan untuk belajar ujian akhir."
        }
    ],

    structure: [
        {
            id: 1,
            question: "The North Pole _____ a latitude of 90 degrees North.",
            options: [
                { key: "A", text: "it has" },
                { key: "B", text: "has" },
                { key: "C", text: "which has" },
                { key: "D", text: "having" },
            ],
            correct: "B",
            explanation: "Kalimat ini membutuhkan Kata Kerja Utama (Verb). Subjeknya adalah 'The North Pole', sehingga butuh Verb tunggal yaitu 'has'."
        },
        {
            id: 2,
            question: "Greyhounds are the fastest dogs _____ can reach speeds of up to 45 miles per hour.",
            options: [
                { key: "A", text: "and" },
                { key: "B", text: "they" },
                { key: "C", text: "and they" },
                { key: "D", text: "or" }
            ],
            correct: "C",
            explanation: "Terdapat dua klausa terpisah yang membutuhkan Kata Hubung (Conjunction) dan Subjek tambahan, yaitu 'and they'."
        },
        {
            id: 3,
            question: "_____ vast amount of information available on the internet, finding reliable sources requires critical thinking.",
            options: [
                { key: "A", text: "Because" },
                { key: "B", text: "Despite" },
                { key: "C", text: "Due to the" },
                { key: "D", text: "Although" }
            ],
            correct: "C",
            explanation: "'vast amount of information' adalah frasa kata benda (Noun Phrase). 'Due to the' digunakan sebelum Noun Phrase untuk menunjukkan sebab-akibat."
        }
    ],

    reading: [
        {
            id: 1,
            passageTitle: "Photosynthesis and Plant Energy",
            passage: "Photosynthesis is the essential biological process by which green plants, algae, and certain bacteria convert light energy, usually from the sun, into chemical energy in the form of sugar or glucose. This complex process occurs primarily within specialized cellular organelles known as chloroplasts, which contain the green pigment chlorophyll.\n\nChlorophyll absorbs light energy in the blue and red wavelengths while reflecting green light, giving plants their characteristic appearance. During photosynthesis, carbon dioxide from the atmosphere and water absorbed by roots are transformed into glucose and oxygen through a series of light-dependent and light-independent reactions.",
            question: "According to the passage, where does photosynthesis primary take place within a plant cell?",
            options: [
                { key: "A", text: "In the cell wall" },
                { key: "B", text: "Within the chloroplasts" },
                { key: "C", text: "Inside the plant roots" },
                { key: "D", text: "In the carbon dioxide molecules" }
            ],
            correct: "B",
            explanation: "Paragraf 1 dengan jelas menyatakan: 'This complex process occurs primarily within specialized cellular organelles known as chloroplasts'."
        },
        {
            id: 2,
            passageTitle: "Photosynthesis and Plant Energy",
            passage: "Photosynthesis is the essential biological process by which green plants, algae, and certain bacteria convert light energy, usually from the sun, into chemical energy in the form of sugar or glucose. This complex process occurs primarily within specialized cellular organelles known as chloroplasts, which contain the green pigment chlorophyll.\n\nChlorophyll absorbs light energy in the blue and red wavelengths while reflecting green light, giving plants their characteristic appearance. During photosynthesis, carbon dioxide from the atmosphere and water absorbed by roots are transformed into glucose and oxygen through a series of light-dependent and light-independent reactions.",
            question: "The word 'essential' in paragraph 1 is closest in meaning to:",
            options: [
                { key: "A", text: "Crucial / Vital" },
                { key: "B", text: "Secondary" },
                { key: "C", text: "Optional" },
                { key: "D", text: "Complicated" }
            ],
            correct: "A",
            explanation: "Kata 'essential' berarti sangat penting atau mendasar, sepadan dengan kata 'Crucial' atau 'Vital'."
        }
    ]
};

// --- APP STATE ---
let currentSection = 'listening';
let currentMode = 'exam';
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = {}; // { questionId: selectedKey }
let timerInterval = null;
let timeRemaining = 0; // seconds

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Attach Event Listeners
    setupRadioSelectionUI();
    document.getElementById('btnStartTest').addEventListener('click', startTest);
    document.getElementById('btnPrev').addEventListener('click', prevQuestion);
    document.getElementById('btnNext').addEventListener('click', nextQuestion);
    document.getElementById('btnFinishTest').addEventListener('click', finishTest);
    document.getElementById('btnRestart').addEventListener('click', resetToWelcome);
    document.getElementById('btnTogglePalette').addEventListener('click', togglePalette);
    document.getElementById('btnPlayAudio').addEventListener('click', playAudioTTS);
});

// --- UI EVENT HANDLERS ---
function setupRadioSelectionUI() {
    // Section Cards Active State
    document.querySelectorAll('.section-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.section-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            currentSection = radio.value;
        });
    });

    // Mode Cards Active State
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            currentMode = radio.value;
        });
    });
}

// --- START TEST ---
function startTest() {
    currentQuestions = questionBank[currentSection] || [];
    currentIndex = 0;
    userAnswers = {};

    if (currentQuestions.length === 0) {
        alert('Soal belum tersedia untuk section ini.');
        return;
    }

    // Hide Welcome, Show Test Workspace
    document.getElementById('screenWelcome').classList.add('hidden');
    document.getElementById('screenTest').classList.remove('hidden');
    document.getElementById('testHeaderControls').classList.remove('hidden');

    // Configure Timer
    if (currentMode === 'exam') {
        document.getElementById('modeBadge').textContent = 'EXAM MODE';
        document.getElementById('modeBadge').className = 'text-xs font-semibold px-2.5 py-1 rounded bg-red-800 text-red-200 border border-red-700';
        
        // Timer default: Listening=15m, Structure=20m, Reading=25m (Scalable)
        const timeLimitMinutes = currentSection === 'listening' ? 15 : (currentSection === 'structure' ? 20 : 25);
        timeRemaining = timeLimitMinutes * 60;
        startTimer();
    } else {
        document.getElementById('modeBadge').textContent = 'PRACTICE MODE';
        document.getElementById('modeBadge').className = 'text-xs font-semibold px-2.5 py-1 rounded bg-green-800 text-green-200 border border-green-700';
        document.getElementById('timerDisplay').textContent = '∞ UNLIMITED';
        if (timerInterval) clearInterval(timerInterval);
    }

    // Configure Left Panel Layout (Audio or Passage)
    const leftPanel = document.getElementById('leftPanel');
    const rightPanel = document.getElementById('rightPanel');
    const listeningContainer = document.getElementById('listeningContainer');
    const readingContainer = document.getElementById('readingContainer');

    if (currentSection === 'listening') {
        leftPanel.classList.remove('hidden');
        listeningContainer.classList.remove('hidden');
        readingContainer.classList.add('hidden');
        rightPanel.className = 'lg:col-span-6 bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-between min-h-[500px]';
    } else if (currentSection === 'reading') {
        leftPanel.classList.remove('hidden');
        listeningContainer.classList.add('hidden');
        readingContainer.classList.remove('hidden');
        rightPanel.className = 'lg:col-span-6 bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-between min-h-[500px]';
    } else {
        // Structure Section (No Left Panel)
        leftPanel.classList.add('hidden');
        rightPanel.className = 'lg:col-span-12 bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-between min-h-[500px]';
    }

    renderPaletteGrid();
    renderQuestion();
}

// --- TIMER LOGIC ---
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Waktu tes telah habis! Jawaban Anda akan otomatis dikirim.');
            finishTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    document.getElementById('timerDisplay').textContent = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// --- RENDER QUESTION ---
function renderQuestion() {
    const q = currentQuestions[currentIndex];

    // Indicator Title
    document.getElementById('sectionTitleDisplay').textContent = `SECTION: ${currentSection.toUpperCase()}`;
    document.getElementById('questionNumberIndicator').textContent = `Soal No. ${currentIndex + 1} dari ${currentQuestions.length}`;
    document.getElementById('questionText').textContent = q.question;

    // Update Left Panel Content if Listening or Reading
    if (currentSection === 'listening') {
        document.getElementById('scriptTextContent').textContent = q.audioScript;
    } else if (currentSection === 'reading') {
        document.getElementById('passageTitle').textContent = q.passageTitle || "Reading Passage";
        document.getElementById('passageContent').textContent = q.passage;
    }

    // Render Options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    q.options.forEach(opt => {
        const isSelected = userAnswers[q.id] === opt.key;
        const btn = document.createElement('div');
        
        let borderClass = 'border-gray-200 hover:border-blue-400 bg-white';
        let badgeClass = 'bg-gray-100 text-gray-700';

        if (isSelected) {
            borderClass = 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700';
            badgeClass = 'bg-blue-900 text-white';
        }

        btn.className = `option-btn border-2 rounded-lg p-3.5 cursor-pointer flex items-start space-x-3 transition ${borderClass}`;
        btn.innerHTML = `
            <span class="w-6 h-6 rounded-full ${badgeClass} text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${opt.key}</span>
            <span class="text-sm text-gray-800 font-medium leading-normal">${opt.text}</span>
        `;

        btn.addEventListener('click', () => selectAnswer(q.id, opt.key));
        optionsContainer.appendChild(btn);
    });

    // Explanation in Practice Mode
    const practiceExp = document.getElementById('practiceExplanation');
    if (currentMode === 'practice' && userAnswers[q.id]) {
        practiceExp.classList.remove('hidden');
        document.getElementById('explanationText').textContent = q.explanation;
    } else {
        practiceExp.classList.add('hidden');
    }

    // Navigation Buttons Disable State
    document.getElementById('btnPrev').disabled = currentIndex === 0;
    
    if (currentIndex === currentQuestions.length - 1) {
        document.getElementById('btnNext').innerHTML = `<span>Selesai</span><i data-lucide="check" class="w-4 h-4"></i>`;
    } else {
        document.getElementById('btnNext').innerHTML = `<span>Berikutnya</span><i data-lucide="chevron-right" class="w-4 h-4"></i>`;
    }

    if (window.lucide) lucide.createIcons();
    updatePaletteGridUI();
}

function selectAnswer(questionId, optionKey) {
    userAnswers[questionId] = optionKey;
    renderQuestion();
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        finishTest();
    }
}

// --- PALETTE GRID NAV ---
function renderPaletteGrid() {
    const grid = document.getElementById('paletteGrid');
    grid.innerHTML = '';

    currentQuestions.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.className = `w-9 h-9 text-xs font-bold rounded-lg border transition flex items-center justify-center palette-btn-${idx}`;
        btn.textContent = idx + 1;
        btn.addEventListener('click', () => {
            currentIndex = idx;
            renderQuestion();
            document.getElementById('palettePopup').classList.add('hidden');
        });
        grid.appendChild(btn);
    });
}

function updatePaletteGridUI() {
    currentQuestions.forEach((q, idx) => {
        const btn = document.querySelector(`.palette-btn-${idx}`);
        if (!btn) return;

        const isAnswered = userAnswers[q.id] !== undefined;
        const isCurrent = idx === currentIndex;

        if (isCurrent) {
            btn.className = 'w-9 h-9 text-xs font-bold rounded-lg border-2 border-blue-900 bg-blue-100 text-blue-900';
        } else if (isAnswered) {
            btn.className = 'w-9 h-9 text-xs font-bold rounded-lg border bg-blue-900 text-white';
        } else {
            btn.className = 'w-9 h-9 text-xs font-bold rounded-lg border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100';
        }
    });
}

function togglePalette() {
    document.getElementById('palettePopup').classList.toggle('hidden');
}

// --- AUDIO TTS (TEXT TO SPEECH) ---
function playAudioTTS() {
    const script = document.getElementById('scriptTextContent').textContent;
    if (!script) return;

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Reset previous audio
        const utterance = new SpeechSynthesisUtterance(script);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Standard listening speed
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Fitur audio Web Speech API tidak didukung di browser ini.');
    }
}

// --- FINISH TEST & SCORE CALCULATION ---
function finishTest() {
    if (timerInterval) clearInterval(timerInterval);

    // Calculate Correct Count
    let correctCount = 0;
    currentQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correct) {
            correctCount++;
        }
    });

    const totalQuestions = currentQuestions.length;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    // Standard TOEFL Scaled Score Approximation Formula
    // Raw % converted to TOEFL Scale (310 - 677)
    const convertedScore = Math.round(310 + ((correctCount / totalQuestions) * (677 - 310)));

    // CEFR Level Mapping
    let cefr = "A2";
    let cefrDesc = "Elementary / Basic User";
    if (convertedScore >= 627) {
        cefr = "C1"; cefrDesc = "Effective Operational Proficiency (Advanced)";
    } else if (convertedScore >= 543) {
        cefr = "B2"; cefrDesc = "Vantage (Upper-Intermediate)";
    } else if (convertedScore >= 460) {
        cefr = "B1"; cefrDesc = "Threshold (Intermediate)";
    }

    // Render Result Screen UI
    document.getElementById('screenTest').classList.add('hidden');
    document.getElementById('testHeaderControls').classList.add('hidden');
    document.getElementById('screenResult').classList.remove('hidden');

    document.getElementById('finalToeflScore').textContent = convertedScore;
    document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
    document.getElementById('correctCountText').textContent = correctCount;
    document.getElementById('totalCountText').textContent = totalQuestions;
    document.getElementById('cefrLevel').textContent = cefr;
    document.getElementById('cefrTitle').textContent = cefrDesc;

    // Render Recommendations
    renderRecommendations(accuracy, currentSection);

    // Render Detailed Question Review
    renderReviewList();
}

// --- RECOMMENDATION GENERATOR ---
function renderRecommendations(accuracy, section) {
    const container = document.getElementById('recommendationContent');
    let recHTML = "";

    if (accuracy >= 80) {
        recHTML = `
            <div class="p-3 bg-green-50 border-l-4 border-green-600 rounded text-green-950">
                <p class="font-bold">🎉 Hasil Luar Biasa!</p>
                <p class="text-xs mt-1">Pemahaman Anda pada bagian <strong>${section.toUpperCase()}</strong> sudah sangat baik. Pertahankan performa dengan rutin berlatih soal berdurasi ketat.</p>
            </div>
            <p class="text-xs text-gray-600"><strong>Langkah Selanjutnya:</strong> Fokus pada variasi kosakata akademik bernuansa spesifik dan percepat waktu pengerjaan per soal hingga di bawah 45 detik.</p>
        `;
    } else if (accuracy >= 50) {
        recHTML = `
            <div class="p-3 bg-yellow-50 border-l-4 border-yellow-600 rounded text-yellow-950">
                <p class="font-bold">⚠️ Performa Cukup Baik (Perlu Penguatan)</p>
                <p class="text-xs mt-1">Anda sudah memahami konsep dasar, namun masih ada beberapa kekeliruan pada tata bahasa atau pemahaman detail teks.</p>
            </div>
            <p class="text-xs text-gray-600"><strong>Langkah Selanjutnya:</strong> Pelajari kembali pola-pola klausa kompleks (Subject-Verb agreement, Relative clauses) dan pelajari strategi scanning/skimming untuk bagian reading.</p>
        `;
    } else {
        recHTML = `
            <div class="p-3 bg-red-50 border-l-4 border-red-600 rounded text-red-950">
                <p class="font-bold">🚨 Butuh Latihan Intensif</p>
                <p class="text-xs mt-1">Tingkat akurasi Anda masih di bawah target standar TOEFL ITP (500+).</p>
            </div>
            <p class="text-xs text-gray-600"><strong>Langkah Selanjutnya:</strong> Mulailah dengan memperbanyak kosakata dasar (Vocabulary Builder), gunakan **Mode Latihan** untuk membaca pembahasan secara langsung setiap kali menjawab soal.</p>
        `;
    }

    container.innerHTML = recHTML;
}

// --- DETAILED REVIEW RENDER ---
function renderReviewList() {
    const container = document.getElementById('reviewQuestionsContainer');
    container.innerHTML = '';

    currentQuestions.forEach((q, idx) => {
        const userAns = userAnswers[q.id];
        const isCorrect = userAns === q.correct;

        const card = document.createElement('div');
        card.className = `border rounded-xl p-4 ${isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`;

        let statusBadge = isCorrect 
            ? `<span class="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1"><i data-lucide="check" class="w-3 h-3"></i><span>BENAR</span></span>`
            : `<span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1"><i data-lucide="x" class="w-3 h-3"></i><span>SALAH / TIDAK DIJAWAB</span></span>`;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-gray-500">Soal #${idx + 1}</span>
                ${statusBadge}
            </div>
            <p class="text-sm font-semibold text-gray-900 mb-3">${q.question}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                <div class="p-2 rounded border ${userAns === q.correct ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}">
                    <strong>Jawaban Anda:</strong> ${userAns ? userAns : 'Tidak dijawab'}
                </div>
                <div class="p-2 rounded border bg-blue-100 border-blue-300 text-blue-900">
                    <strong>Kunci Jawaban:</strong> ${q.correct}
                </div>
            </div>

            <div class="text-xs bg-white p-3 rounded border text-gray-700 leading-relaxed">
                <strong class="text-blue-900 block mb-1">💡 Pembahasan:</strong>
                ${q.explanation}
            </div>
        `;

        container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

function resetToWelcome() {
    document.getElementById('screenResult').classList.add('hidden');
    document.getElementById('screenWelcome').classList.remove('hidden');
}
