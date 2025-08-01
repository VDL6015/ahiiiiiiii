window.onload = () => {
  // === SETUP CANVAS MATRIX ===
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "HAPPYBIRTHDAY".split('');
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff69b4"; // hồng đậm
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

  // === COUNTDOWN ===
  const countdownEl = document.getElementById("countdown-text");
  let countdown = 3;

  const countdownInterval = setInterval(() => {
    countdownEl.textContent = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown-container").style.display = "none";
      document.querySelector(".container").style.display = "block";

      // Hiện lời chúc
      const message = "Chúc mừng sinh nhật! 🎈 Mong bạn luôn cười thật tươi!";
      document.getElementById("birthday-message").textContent = message;

      // Phát nhạc
      const music = document.getElementById("bg-music");
      music.play().catch(() => {
        document.body.addEventListener('click', () => music.play(), { once: true });
      });
    }
  }, 1000);
};
