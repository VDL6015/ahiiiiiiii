window.onload = () => {
  // MATRIX
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const starsCanvas = document.getElementById("stars-canvas");
  const starsCtx = starsCanvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const letters = "HAPPYBIRTHDAY".split("");
  const fontSize = 20;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff69b4";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  const matrixInterval = setInterval(drawMatrix, 50);

  // COUNTDOWN
  const countdownEl = document.getElementById("countdown-text");
  let countdown = 5;
  countdownEl.textContent = countdown;
  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      countdownEl.textContent = countdown;
    }
    if (countdown < 0) {
      clearInterval(countdownInterval);
      clearInterval(matrixInterval);
      document.getElementById("countdown-container").style.transition = "opacity 1s";
      document.getElementById("countdown-container").style.opacity = "0";
      setTimeout(() => {
        document.getElementById("countdown-container").style.display = "none";
        document.querySelector(".container").style.display = "flex";
        document.querySelector(".container").style.opacity = "1";
        startTypewriter();
        loadPage(currentPage);
        showFlyingWords();
      }, 1000);
    }
  }, 1000);

  // TYPEWRITER
  const fullMessage = "Chúc mừng sinh nhật! 🎈 Mong bạn luôn cười thật tươi!";
  let i = 0;
  function startTypewriter() {
    const messageEl = document.getElementById("birthday-message");
    messageEl.textContent = "";
    function type() {
      if (i < fullMessage.length) {
        messageEl.textContent += fullMessage.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    }
    type();
  }

  // MUSIC TOGGLE
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle");
  function tryPlay() {
    music.play().catch(() => {
      document.body.addEventListener("click", () => music.play(), { once: true });
    });
  }
  tryPlay();
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicBtn.textContent = "🔊";
    } else {
      music.pause();
      musicBtn.textContent = "🔇";
    }
  });

  // BOOK FLIP
  const pages = [
    { img: "anh 10.jpg", message: "Chúc bạn tuổi mới luôn rạng rỡ như ánh mặt trời!" },
    { img: "anh 11.jpg", message: "Mong mọi điều ước của bạn đều trở thành sự thật!" },
    { img: "anh 12.jpg", message: "Hạnh phúc, sức khỏe và thành công sẽ luôn bên bạn 🎂" },
    { img: "anh 13.jpg", message: "Luôn tràn đầy năng lượng tích cực trong cuộc sống!" },
    { img: "anh 15.jpg", message: "Chúc một năm mới đầy bất ngờ và thú vị! 🎁" },
  ];
  let currentPage = 0;
  function loadPage(index) {
    const page = pages[index];
    document.getElementById("page-image").src = page.img;
    document.getElementById("page-message").textContent = page.message;
  }
  document.getElementById("next-page").addEventListener("click", () => {
    currentPage = (currentPage + 1) % pages.length;
    loadPage(currentPage);
  });
  document.getElementById("prev-page").addEventListener("click", () => {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    loadPage(currentPage);
  });

  // STARRY SKY WITH COMET EFFECT
  let stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    });
  }
  function drawStars() {
    starsCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    starsCtx.fillRect(0, 0, starsCanvas.width, starsCanvas.height);
    for (let star of stars) {
      starsCtx.beginPath();
      const gradient = starsCtx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 5);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      starsCtx.fillStyle = gradient;
      starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starsCtx.fill();
      star.x += star.vx;
      star.y += star.vy;
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
      if (star.x < 0 || star.x > starsCanvas.width || star.y < 0 || star.y > starsCanvas.height) {
        star.x = Math.random() * starsCanvas.width;
        star.y = Math.random() * starsCanvas.height;
      }
    }
    requestAnimationFrame(drawStars);
  }
  drawStars();

  // FANCY FLYING TEXT EFFECT
  const beautifulWords = `Hết hồn như gặp tiên, khuynh quốc khuynh thành, chim sa cá lặn, hoa nhường nguyệt thẹn, quốc sắc thiên hương, trời sinh quyến rũ, mắt ngọc mày ngài, thướt tha mềm mại, duyên dáng yêu kiều, quyến rũ mê người, thơm tho xinh tươi...`.split(",");
  function showFlyingWords() {
    const container = document.getElementById("fancy-message-container");
    let shuffledWords = [...beautifulWords];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }

    shuffledWords.forEach((word, index) => {
      const randomDelay = Math.random() * 2000;
      setTimeout(() => {
        const span = document.createElement("span");
        span.textContent = word.trim();
        span.className = "fancy-word";
        span.style.top = `${Math.random() * window.innerHeight}px`;
        span.style.left = `-${Math.random() * 200}px`;
        container.appendChild(span);
        setTimeout(() => span.remove(), 5000);
      }, index * 300 + randomDelay);
    });

    const totalDelay = shuffledWords.length * 300 + Math.max(...shuffledWords.map(() => Math.random() * 2000)) + 1000;
    setTimeout(showFlyingWords, totalDelay);
  }
  setTimeout(showFlyingWords, 6000);
};