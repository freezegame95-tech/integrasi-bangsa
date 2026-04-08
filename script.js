// ==================== QUIZ SYSTEM (10 Pertanyaan) ====================
const quizData = [
  {
    question: "Apa yang dimaksud dengan Integrasi Bangsa?",
    options: [
      "Pemisahan antar suku dan agama",
      "Proses penyatuan berbagai kelompok sosial dan budaya menjadi satu identitas nasional",
      "Hanya fokus pada pembangunan ekonomi",
      "Menghilangkan semua perbedaan budaya"
    ],
    correct: 1
  },
  {
    question: "Integrasi Sosial bertujuan untuk menciptakan...",
    options: [
      "Persaingan antar kelompok",
      "Keharmonisan dan penyesuaian antar unsur masyarakat yang berbeda",
      "Dominasi satu kelompok atas yang lain",
      "Pemisahan wilayah berdasarkan suku"
    ],
    correct: 1
  },
  {
    question: "Salah satu perekat utama integrasi bangsa di Indonesia adalah...",
    options: [
      "Bahasa asing",
      "Pancasila",
      "Teknologi modern saja",
      "Persaingan global"
    ],
    correct: 1
  },
  {
    question: "Contoh sikap yang mendukung integrasi sosial adalah...",
    options: [
      "Mengejek teman yang berbeda suku",
      "Menghargai perbedaan pendapat dan budaya",
      "Hanya bergaul dengan orang dari suku sendiri",
      "Menyebarkan berita bohong antar kelompok"
    ],
    correct: 1
  },
  {
    question: "Apa yang akan terjadi jika integrasi bangsa tidak berhasil?",
    options: [
      "Negara menjadi lebih kuat",
      "Mudah terjadi konflik dan perpecahan",
      "Ekonomi akan semakin maju",
      "Semua suku akan hidup terpisah dengan damai"
    ],
    correct: 1
  },
  {
    question: "Gotong royong merupakan contoh dari...",
    options: [
      "Integrasi ekonomi saja",
      "Integrasi sosial yang kuat",
      "Persaingan antar daerah",
      "Pemisahan budaya"
    ],
    correct: 1
  },
  {
    question: "Bhinneka Tunggal Ika berarti...",
    options: [
      "Berbeda-beda tetapi tetap satu",
      "Sama saja dalam segala hal",
      "Setiap suku harus terpisah",
      "Hanya satu suku yang boleh mendominasi"
    ],
    correct: 0
  },
  {
    question: "Salah satu ancaman terhadap integrasi bangsa adalah...",
    options: [
      "Sikap toleransi antar umat beragama",
      "Ujaran kebencian dan hoaks di media sosial",
      "Kerjasama antar suku",
      "Peringatan Hari Kemerdekaan"
    ],
    correct: 1
  },
  {
    question: "Pancasila sebagai dasar negara berfungsi sebagai...",
    options: [
      "Alat untuk memisahkan suku",
      "Perekat dan pedoman integrasi bangsa",
      "Hanya aturan ekonomi",
      "Simbol budaya daerah saja"
    ],
    correct: 1
  },
  {
    question: "Apa yang dapat dilakukan siswa untuk mendukung integrasi bangsa?",
    options: [
      "Membuat kelompok hanya dengan teman sebaya suku sendiri",
      "Menghargai teman yang berbeda agama dan suku",
      "Tidak peduli dengan perbedaan di sekolah",
      "Menyebarkan berita yang memprovokasi"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.getElementById('quiz-start').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  
  document.getElementById('question').textContent = q.question;
  document.getElementById('question-number').textContent = `Pertanyaan ${currentQuestion + 1} / ${quizData.length}`;
  document.getElementById('progress').textContent = `${currentQuestion + 1} dari ${quizData.length}`;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = `quiz-option w-full text-left px-6 py-5 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-2xl text-lg transition-all`;
    button.innerHTML = `${String.fromCharCode(65 + index)}. ${option}`;
    button.onclick = () => selectAnswer(index, button);
    optionsContainer.appendChild(button);
  });

  document.getElementById('next-btn').classList.add('hidden');
}

function selectAnswer(selectedIndex, clickedButton) {
  const correctIndex = quizData[currentQuestion].correct;
  const allButtons = document.querySelectorAll('#options button');

  allButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) {
      btn.classList.add('bg-green-100', 'border-green-500', 'text-green-700');
    }
    if (i === selectedIndex && i !== correctIndex) {
      btn.classList.add('bg-red-100', 'border-red-500', 'text-red-700');
    }
  });

  if (selectedIndex === correctIndex) score++;

  document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-container').classList.add('hidden');
  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('hidden');

  const percentage = Math.round((score / quizData.length) * 100);
  document.getElementById('score').textContent = `${percentage}%`;

  let feedback = "";
  if (percentage >= 80) feedback = "Sangat baik! Pemahaman Anda tentang integrasi bangsa dan sosial sangat kuat.";
  else if (percentage >= 60) feedback = "Bagus! Pemahaman Anda sudah cukup baik.";
  else if (percentage >= 40) feedback = "Cukup baik. Masih ada ruang untuk meningkatkan.";
  else feedback = "Terima kasih telah mencoba. Mari kita pelajari lebih dalam tentang pentingnya integrasi.";

  document.getElementById('feedback').textContent = feedback;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
  loadQuestion();
}

// ==================== AI CHATBOT (Versi Lebih Terbuka & Interaktif) ====================
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) {
    chatWindow.classList.toggle('hidden');
    
    const messages = document.getElementById('chat-messages');
    if (messages && messages.children.length === 0) {
      addChatMessage("AI Tutor", "Halo! 👋 Saya AI Tutor Integrasi Bangsa. Kamu boleh bertanya apa saja, tentang integrasi, kehidupan sehari-hari, atau topik lain. Saya siap berdiskusi!", "bg-white border");
    }
  }
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const messageText = input.value.trim();
  
  if (!messageText) return;

  addChatMessage("Anda", messageText, "bg-blue-100 text-right ml-auto");
  input.value = "";

  setTimeout(() => {
    const reply = getAIResponse(messageText);
    addChatMessage("AI Tutor", reply, "bg-white border");
  }, 700);
}

function getAIResponse(message) {
  const msg = message.toLowerCase().trim();

  // === Kategori Integrasi Bangsa & Sosial ===
  if (msg.includes("integrasi") || msg.includes("bangsa") || msg.includes("sosial")) {
    if (msg.includes("apa itu") || msg.includes("definisi") || msg.includes("pengertian")) {
      return "Integrasi bangsa adalah proses menyatukan berbagai kelompok yang berbeda (suku, agama, budaya) menjadi satu kesatuan yang harmonis di Indonesia.";
    }
    if (msg.includes("pancasila")) {
      return "Pancasila adalah perekat utama integrasi bangsa kita. Kelima silanya menjadi panduan agar kita bisa hidup rukun meski berbeda-beda.";
    }
    if (msg.includes("toleransi") || msg.includes("toleran")) {
      return "Toleransi adalah sikap menghargai perbedaan. Tanpa toleransi, integrasi sosial akan sulit terwujud.";
    }
    if (msg.includes("gotong royong")) {
      return "Gotong royong adalah salah satu nilai terkuat dalam integrasi sosial Indonesia. Semangat ini mengajarkan kita untuk saling membantu.";
    }
  }

  // === Pertanyaan Umum / Off-Topic ===
  else if (msg.includes("hai") || msg.includes("hello") || msg.includes("halo")) {
    return "Halo! Senang bertemu denganmu 😊 Ada yang ingin kamu diskusikan hari ini?";
  }
  else if (msg.includes("siapa kamu") || msg.includes("siapa dirimu")) {
    return "Saya adalah AI Tutor Integrasi Bangsa. Saya bisa bantu menjawab pertanyaan tentang integrasi, Pancasila, toleransi, atau topik lain yang kamu inginkan.";
  }
  else if (msg.includes("cuaca") || msg.includes("hari ini")) {
    return "Maaf, saya tidak bisa melihat cuaca secara real-time. Tapi kalau cuaca sedang mendung, itu mengingatkan saya pada pentingnya 'kehangatan' dalam integrasi sosial ya 😉";
  }
  else if (msg.includes("makan") || msg.includes("lapar")) {
    return "Wah, lapar ya? 😄 Kalau lagi makan, ingat ya bahwa makanan nusantara adalah salah satu contoh indahnya integrasi budaya kita.";
  }
  else if (msg.includes("belajar") || msg.includes("sekolah")) {
    return "Belajar itu penting! Kalau kamu sedang belajar tentang integrasi bangsa, saya bisa bantu jelaskan lebih dalam. Mau saya ceritakan contoh nyata?";
  }

  // === Jawaban Default yang Interaktif ===
  else {
    return `Terima kasih atas pertanyaannya: "${message}".\n\nMeskipun topiknya tidak langsung tentang integrasi, saya rasa kita bisa menghubungkannya dengan nilai persatuan dan keberagaman. Ada hal spesifik yang ingin kamu tanyakan tentang integrasi bangsa, toleransi, atau Pancasila?`;
  }
}

function addChatMessage(sender, message, className) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `p-4 rounded-2xl max-w-[85%] ${className}`;
  msgDiv.innerHTML = `<strong>${sender}:</strong><br>${message.replace(/\n/g, '<br>')}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
// ==================== AI CHATBOT DENGAN ANIMASI TYPING ====================
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) {
    chatWindow.classList.toggle('hidden');
    
    const messages = document.getElementById('chat-messages');
    if (messages && messages.children.length === 0) {
      addChatMessage("AI Tutor", "Halo! 👋 Saya AI Tutor Integrasi Bangsa. Kamu boleh bertanya apa saja. Saya akan mencoba menghubungkannya dengan nilai integrasi jika memungkinkan.", "bg-white border");
    }
  }
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const messageText = input.value.trim();
  
  if (!messageText) return;

  addChatMessage("Anda", messageText, "bg-blue-100 text-right ml-auto");
  input.value = "";

  // Tampilkan animasi typing
  showTypingIndicator();

  setTimeout(() => {
    hideTypingIndicator();
    const reply = getAIResponse(messageText);
    addChatMessage("AI Tutor", reply, "bg-white border");
  }, 1200); // Durasi typing 1.2 detik
}

function showTypingIndicator() {
  document.getElementById('typing-indicator').classList.remove('hidden');
  // Scroll ke bawah
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  document.getElementById('typing-indicator').classList.add('hidden');
}

function getAIResponse(message) {
  const msg = message.toLowerCase().trim();

  // Pertanyaan terkait Integrasi
  if (msg.includes("integrasi") || msg.includes("bangsa") || msg.includes("sosial") || msg.includes("pancasila") || msg.includes("toleransi")) {
    if (msg.includes("apa itu") || msg.includes("pengertian") || msg.includes("definisi")) {
      return "Integrasi bangsa adalah proses menyatukan berbagai perbedaan suku, agama, budaya, dan wilayah menjadi satu kesatuan nasional yang harmonis di Indonesia.";
    }
    if (msg.includes("pancasila")) {
      return "Pancasila adalah ideologi negara dan fondasi utama integrasi bangsa. Ia mengajarkan kita untuk bersatu meski berbeda-beda.";
    }
    if (msg.includes("toleransi")) {
      return "Toleransi adalah sikap saling menghargai perbedaan. Ini menjadi kunci penting agar integrasi sosial dapat terwujud dengan baik.";
    }
    if (msg.includes("gotong royong")) {
      return "Gotong royong adalah semangat bekerja sama untuk kepentingan bersama — salah satu nilai terkuat dalam integrasi bangsa Indonesia.";
    }
  }

  // Jawaban umum & interaktif
  if (msg.includes("hai") || msg.includes("halo") || msg.includes("hello")) {
    return "Halo! Senang sekali bisa berdiskusi denganmu hari ini 😊 Ada yang ingin kamu tanyakan?";
  }
  if (msg.includes("siapa kamu")) {
    return "Saya adalah AI Tutor Integrasi Bangsa. Saya bisa membantu menjawab pertanyaan tentang integrasi, Pancasila, toleransi, atau topik lain yang kamu inginkan.";
  }
  if (msg.includes("cuaca") || msg.includes("hari ini")) {
    return "Maaf, saya belum bisa melihat cuaca real-time. Tapi cuaca apa pun hari ini, semoga kita tetap menjaga kehangatan persatuan ya!";
  }

  // Default response yang ramah
  return `Terima kasih atas pertanyaannya: "${message}".\n\nSaya akan coba hubungkan dengan tema integrasi bangsa. Apa yang ingin kamu ketahui lebih dalam tentang persatuan, toleransi, atau keberagaman Indonesia?`;
}

function addChatMessage(sender, message, className) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `p-4 rounded-2xl max-w-[85%] ${className}`;
  msgDiv.innerHTML = `<strong>${sender}:</strong><br>${message.replace(/\n/g, '<br>')}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
// ==================== SORTING GAME ====================
function startSortingGame() {
  alert("🎯 Sorting Game sedang dalam pengembangan.\n\nFitur ini akan segera ditambahkan di update berikutnya.");
}

// ==================== KOTAK SARAN (Diperbarui) ====================
const saranForm = document.getElementById('saran-form');
const saranList = document.getElementById('saran-list');

function loadSaran() {
  const saved = JSON.parse(localStorage.getItem('saranList') || '[]');
  saranList.innerHTML = '';

  if (saved.length === 0) {
    saranList.innerHTML = `<p class="text-blue-200 text-center py-12">Belum ada saran yang dikirim.</p>`;
    return;
  }

  saved.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = "bg-white/10 p-6 rounded-2xl flex justify-between items-start group";
    div.innerHTML = `
      <div>
        <p class="font-medium">${item.nama || 'Anonim'}</p>
        <p class="mt-2 text-blue-100">${item.pesan}</p>
        <p class="text-xs text-blue-300 mt-4">${item.time}</p>
      </div>
      <button onclick="deleteSaran(${index})" 
              class="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition p-2">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    saranList.appendChild(div);
  });
}

function deleteSaran(index) {
  if (confirm("Hapus saran ini?")) {
    let saved = JSON.parse(localStorage.getItem('saranList') || '[]');
    saved.splice(index, 1);
    localStorage.setItem('saranList', JSON.stringify(saved));
    loadSaran();
  }
}

function clearAllSaran() {
  if (confirm("Hapus SEMUA saran?")) {
    localStorage.removeItem('saranList');
    loadSaran();
  }
}

saranForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  if (!pesan) return alert("Mohon isi saran Anda");

  const saranBaru = {
    nama: nama || 'Anonim',
    pesan: pesan,
    time: new Date().toLocaleString('id-ID')
  };

  let saved = JSON.parse(localStorage.getItem('saranList') || '[]');
  saved.unshift(saranBaru);
  localStorage.setItem('saranList', JSON.stringify(saved));

  loadSaran();
  saranForm.reset();
  alert("Terima kasih! Saran Anda telah diterima.");
});

// Inisialisasi
window.onload = () => {
  loadQuestion();   // Quiz
  loadSaran();      // Kotak Saran
};