const apiKey = "AIzaSyA68yFj-VuT9fgV-VFJhmhtNrULEaEZffQ"; // hanya untuk tugas, jangan pakai untuk publik

// Datasetnya bisa kamu ubah sesuai kebutuhan
const contextText = `
Pura Suradayu terletak di Banjar Tatag, Desa Manukaya, Kecamatan Tampaksiring, Kabupaten Gianyar, Bali,, pada titik koordinat -8.409449401977426, 115.30705572593826. Lokasinya dapat dilihat di Google Maps melalui link berikut: https://maps.app.goo.gl/SX2VvX1QVJSiJi3s9
Tempat suci ini memiliki makna spiritual yang mendalam dan erat kaitannya dengan sejarah runtuhnya Kerajaan Bali Kuno yang dipimpin oleh Raja Mayadenawa. 
Nama Suradayu berasal dari bahasa Sanskerta, yaitu Sura yang berarti “baik” atau “positif” dan Ayu yang berarti “lembut” atau “kehidupan”, sehingga melambangkan kekuatan kebaikan yang lembut dan menenangkan. Menurut kepercayaan masyarakat, ketika Raja Mayadenawa tumbang, tubuhnya tergeletak di wilayah Tanah Pegat. Dari tempat tersebut, mengalir air suci yang disebut Tukad Petanu, yang dipercaya mampu menghanyutkan kekotoran dan energi negatif. Di salah satu sumber airnya yang paling sakral dibangunlah Pura Suradayu, yang juga memiliki tempat pembersihan rohani (melukat) bernama Tirta Sudha Mala. Tempat ini dipercaya mampu membersihkan energi negatif, menyucikan lahir dan batin, serta memulihkan keseimbangan diri.

Pura ini memiliki keunggulan berupa lingkungan yang alami dan bersih, dikelilingi sawah serta jauh dari kebisingan kendaraan. Akses menuju pura berupa jalan setapak yang sejuk dengan pemandangan pedesaan. Air sucinya sangat jernih dan diyakini berkhasiat secara spiritual. Suasana di pura ini tenang, sejuk, dan penuh dengan nuansa spiritual yang autentik. Melukat di Pura Suradayu bisa dilakukan pada pagi, siang, maupun sore hari, dan tidak dikenakan biaya alias gratis. Masyarakat hanya perlu menghaturkan sarana sederhana seperti canang, pejati, dan sesajen seikhlasnya. Tujuan utama melukat di sini adalah untuk membersihkan energi negatif serta menyucikan lahir dan batin. Waktu kunjungan ideal adalah 07.00 – 18.00 WITA, agar pengunjung dapat menikmati suasana segar dan cahaya yang cukup. Melukat bisa dilakukan pagi, siang, atau sore, dan tidak ada hari khusus yang diwajibkan. Pengunjung hanya perlu memastikan dalam keadaan suci, tidak sedang berhalangan (misalnya datang bulan atau sawan).

Upacara odalan atau hari suci di pura ini dilaksanakan setiap Purnama Kapat (Kawulu), dan dipimpin oleh seorang pemangku bernama Jero Mangku. Sarana dan fasilitas yang tersedia di pura ini meliputi area parkir, tempat ganti pakaian, dan area khusus untuk persembahyangan, sehingga memberikan kenyamanan bagi para pemedek yang datang. Akses ke Pura Suradayu melalui jalan setapak yang cukup jauh dan menurun, namun tingkat kesulitannya mudah dilalui. Perjalanan menuju pura justru menjadi pengalaman tersendiri karena pengunjung akan melewati pemandangan sawah dan alam pedesaan yang asri.
`;

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const userPrompt = input.value.trim();
  if (!userPrompt) return;

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div class="chat-message user">${userPrompt}</div>`;
  input.value = "";

  const loadingId = `loading-${Date.now()}`;
  chatBox.innerHTML += `<div class="chat-message bot" id="${loadingId}">⏳ AI sedang menjawab...</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  const fullPrompt = `
Jawab pertanyaan ini dengan bahasa Indonesia yang sopan dan singkat, berdasarkan informasi berikut:

${contextText}

Pertanyaan: ${userPrompt}
Jawaban:
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
      }),
    });

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Maaf, saya tidak bisa menjawab.";
    document.getElementById(loadingId).remove();
    chatBox.innerHTML += `<div class="chat-message bot">${answer}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById(loadingId).remove();
    chatBox.innerHTML += `<div class="chat-message bot">⚠️ Terjadi kesalahan saat mengambil jawaban.</div>`;
  }
}

function handleKey(e) {
  if (e.key === "Enter") sendMessage();
}

function toggleChat() {
  document.getElementById("chatContainer").style.display = "block";
  document.getElementById("chatToggleButton").style.display = "none";
}

function closeChat() {
  document.getElementById("chatContainer").style.display = "none";
  document.getElementById("chatToggleButton").style.display = "inline-block";
}

const sejarahSlides = [
  {
    text: "Pura Suradayu merupakan tempat suci yang memiliki makna spiritual mendalam. Nama Suradayu berasal dari dua kata dalam bahasa Sanskerta, yaitu Sura yang berarti baik atau positif, dan Ayu yang berarti lembut atau kehidupan. Dengan demikian, nama Suradayu melambangkan kekuatan kebaikan yang lembut dan menenangka.....",
    image: "gambar/sejarah2.jpg",
  },
  {
    text: "Pura ini berkaitan erat dengan kisah runtuhnya Kerajaan Bali Kuno yang dipimpin oleh Raja Mayadenawa. Menurut tradisi dan kepercayaan masyarakat setempat, saat Mayadenawa tumbang, tubuhnya tergeletak di wilayah yang kini dikenal dengan nama Tanah Pegat. Dari tempat itu, mengalirlah air suci yang dipercaya mampu menghanyutkan segala bekas kekotoran dan energi negatif peninggalan Mayadenawa.....",
    image: "gambar/sejarah1.jpg",
  },
  {
    text: "Air suci tersebut kemudian dikenal dengan nama Tukad Petanu. Di salah satu sumber mata airnya yang dianggap sangat sakral, dibangunlah sebuah pura yang diberi nama Pura Suradayu. Di lokasi inilah juga terdapat tempat pembersihan rohani (melukat) yang disebut Tirta Sudha Mala. Tempat ini diyakini memiliki kekuatan spiritual untuk membersihkan energi negatif, menyucikan lahir dan batin, serta memulihkan keseimbangan diri....",
    image: "gambar/gambar2.jpg",
  },
  {
    text: "Dalam prosesi melukat, masyarakat biasanya menghaturkan sarana sederhana berupa sesajen seperti canang, pejati, dan persembahan seikhlasnya sesuai kemampuan. Upacara odalan (peringatan hari suci pura) di Pura Suradayu dilaksanakan setiap Purnama Kapat (Kaulu), dan dipimpin oleh seorang pemangku yang menjaga kesucian serta kelangsungan ritual di pura ini.",
    image: "gambar/gambar1.jpg",
  },
];

const wrapper = document.getElementById("sejarah-wrapper");
sejarahSlides.forEach((slide) => {
  const slideEl = document.createElement("div");
  slideEl.className = "swiper-slide";
  slideEl.innerHTML = `
    <div class="slide-content">
      <img src="${slide.image}" alt="Sejarah Pura Suradayu" />
      <p>${slide.text}</p>
    </div>
  `;
  wrapper.appendChild(slideEl);
});

// Langkah 2: Baru inisialisasi Swiper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

function toggleMenu() {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("open");
}
