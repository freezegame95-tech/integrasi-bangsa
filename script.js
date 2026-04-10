// ==================== QUIZ SYSTEM ====================
const quizData = [
  { question: "Apa yang dimaksud dengan Integrasi Bangsa?", options: ["Pemisahan antar suku dan agama","Proses penyatuan berbagai kelompok sosial dan budaya menjadi satu identitas nasional","Hanya fokus pada pembangunan ekonomi","Menghilangkan semua perbedaan budaya"], correct: 1 },
  { question: "Integrasi Sosial bertujuan untuk menciptakan...", options: ["Persaingan antar kelompok","Keharmonisan dan penyesuaian antar unsur masyarakat yang berbeda","Dominasi satu kelompok atas yang lain","Pemisahan wilayah berdasarkan suku"], correct: 1 },
  { question: "Salah satu perekat utama integrasi bangsa di Indonesia adalah...", options: ["Bahasa asing","Pancasila","Teknologi modern saja","Persaingan global"], correct: 1 },
  { question: "Contoh sikap yang mendukung integrasi sosial adalah...", options: ["Mengejek teman yang berbeda suku","Menghargai perbedaan pendapat dan budaya","Hanya bergaul dengan orang dari suku sendiri","Menyebarkan berita bohong antar kelompok"], correct: 1 },
  { question: "Apa yang akan terjadi jika integrasi bangsa tidak berhasil?", options: ["Negara menjadi lebih kuat","Mudah terjadi konflik dan perpecahan","Ekonomi akan semakin maju","Semua suku akan hidup terpisah dengan damai"], correct: 1 },
  { question: "Gotong royong merupakan contoh dari...", options: ["Integrasi ekonomi saja","Integrasi sosial yang kuat","Persaingan antar daerah","Pemisahan budaya"], correct: 1 },
  { question: "Bhinneka Tunggal Ika berarti...", options: ["Berbeda-beda tetapi tetap satu","Sama saja dalam segala hal","Setiap suku harus terpisah","Hanya satu suku yang boleh mendominasi"], correct: 0 },
  { question: "Salah satu ancaman terhadap integrasi bangsa adalah...", options: ["Sikap toleransi antar umat beragama","Ujaran kebencian dan hoaks di media sosial","Kerjasama antar suku","Peringatan Hari Kemerdekaan"], correct: 1 },
  { question: "Pancasila sebagai dasar negara berfungsi sebagai...", options: ["Alat untuk memisahkan suku","Perekat dan pedoman integrasi bangsa","Hanya aturan ekonomi","Simbol budaya daerah saja"], correct: 1 },
  { question: "Apa yang dapat dilakukan siswa untuk mendukung integrasi bangsa?", options: ["Membuat kelompok hanya dengan teman sebaya suku sendiri","Menghargai teman yang berbeda agama dan suku","Tidak peduli dengan perbedaan di sekolah","Menyebarkan berita yang memprovokasi"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.getElementById('quiz-start').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  currentQuestion = 0; score = 0;
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
    button.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(button);
  });
  document.getElementById('next-btn').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
  const correctIndex = quizData[currentQuestion].correct;
  document.querySelectorAll('#options button').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add('bg-green-100', 'border-green-500');
    if (i === selectedIndex && i !== correctIndex) btn.classList.add('bg-red-100', 'border-red-500');
  });
  if (selectedIndex === correctIndex) score++;
  document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) loadQuestion();
  else showResult();
}

function showResult() {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  const percentage = Math.round((score / quizData.length) * 100);
  document.getElementById('score').textContent = `${percentage}%`;
  let feedback = percentage >= 80 ? "Sangat baik! Pemahaman Anda sangat kuat." : percentage >= 60 ? "Bagus! Pemahaman Anda sudah cukup baik." : "Terima kasih telah mencoba. Mari pelajari lebih dalam.";
  document.getElementById('feedback').textContent = feedback;
}

function restartQuiz() {
  currentQuestion = 0; score = 0;
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
  loadQuestion();
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
// ==================== KOTAK SARAN ====================
document.addEventListener('DOMContentLoaded', function () {
  const saranForm = document.getElementById('saran-form');
  if (saranForm) {
    saranForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nama = document.getElementById('nama')?.value.trim() || 'Anonim';
      const pesan = document.getElementById('pesan')?.value.trim();
      if (!pesan) { alert("Mohon isi saran Anda."); return; }
      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('pesan', pesan);
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxaUR9avq-5ZMXh3VhfmljP9_PECXVc9sldax8DWbvrbXxBfPHu1PxnG0A-KnH69M4/exec", { method: 'POST', body: formData });
        if (response.ok) {
          const el = document.getElementById('saran-success');
          if (el) { el.classList.remove('hidden'); setTimeout(() => el.classList.add('hidden'), 4000); }
          saranForm.reset();
        } else { alert("Gagal mengirim saran."); }
      } catch (e) { alert("Terjadi kesalahan koneksi."); }
    });
  }
  console.log('%c✅ Website Integrasi Bangsa siap!', 'color:#1E40AF;font-weight:bold');
});
