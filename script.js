window.onload = () => {
  // MATRIX
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
    countdownEl.textContent = countdown;
    countdown--;
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
    { img: "anh 14.jpg", message: "Chúc một năm mới đầy bất ngờ và thú vị! 🎁" },
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
  const starsCanvas = document.getElementById("stars-canvas");
  const starsCtx = starsCanvas.getContext("2d");
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
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
const beautifulWords = `Hết hồn như gặp tiên, khuynh quốc khuynh thành, chim sa cá lặn, hoa nhường nguyệt thẹn, quốc sắc thiên hương, trời sinh quyến rũ, mắt ngọc mày ngài, thướt tha mềm mại, duyên dáng yêu kiều, quyến rũ mê người, tự nhiên phóng khoáng, dịu dàng động lòng người, khéo hiểu lòng người, hoạt bát đáng yêu duyên dáng yêu kiều như hoa như ngọc,nguyễn ngọc ôn hương, lan tâm huệ chất, khôn khéo thông minh, rúng động lòng người, mắt sáng mày thanh, thiên sinh lệ chất, quốc sắc thiên hương, môi đỏ răng trắng, đôi mắt sáng trong, má lúm đồng tiền, tay như cỏ mềm, da trắng nõn nà, cổ như cổ ngỗng, răng như ngà voi, trán tựa mỹ nhân, nụ cười duyên dáng, mắt đẹp lúng liếng, phong thái kiều diễn,sắc đẹp tự nhiên, chiếm trọn phong lưu, khuôn mặt khuynh thành đẹp như tranh, sáng như trăng thu, xinh đẹp thanh tú, tươi tắn non mềm,vẻ đẹp tuyệt thế, như trăng như hoa, xinh đẹp quyến rũ, thùy mị thướt tha,ngọt ngào tình cảm, thơm tho xinh tươi, ngay thẳng tử tế,đóa sen mới hé, đoan chính thanh nhã, có một không hai, không gì so cùng, trăm năm khó gặp, trầm ngư lạc nhạn, bế nguyệt tu hoa, phù dung xuất thủy, quốc sắc thiên hương, hoa nhan nguyệt mạo, rực rỡ tỏa sáng, phong thái ngời ngời, tuyệt sắc khó cầu, tuyệt sắc hơn người, tuyệt đại giai nhân, tuyệt sắc giai nhân, tuyệt thế giai nhân, lộng lẫy như hoa xuân, liên hoa tiên tử, xinh đẹp đoan trang tươi tán quyến rũ, đẹp hơn phù dung, mỹ mạo như tiên, đẹp không sao tả xiết, môi đỏ má hồng, khuynh quốc khuynh thành, dáng đẹp mặt xinh, mềm mại dịu lòng người, má đào mắt hạnh, đào hoa xinh đẹp, oanh thẹn yếu ghen, hằng nga trên trăng, dịu dàng mềm mại, xinh đẹp mỹ lệ, tươi đẹp vô song, xinh đẹp nhất thời, xinh đẹp nhất chốn, nhan sắc chói mắt, xinh xắn như đào, mài ăn thay cơm, hương thảo mỹ nhân, da trắng má hồng, vu nữ lạc thần, thiên tư quốc sắc, thiên sinh lệ chất, lục triêu phấn đại, tiên tư ngọc sắc, kim chi ngọc diệp, thanh tao nhàn hạ, đào thẹn mận nhường, khuôn mặt đào hoa,thú vị đáng yêu, rực rỡ như hoa xuân, trong sáng như trăng thu, đào chi yêu yêu, chước chước kỳ hoa, nhược thủy tam thiên, mỹ nhân như mây, hoa thơm cỏ lạ,thiên hương quốc diễm.`.split(",");
function showFlyingWords() {
  const container = document.getElementById("fancy-message-container");
  // Tạo bản sao mảng để xáo trộn mà không ảnh hưởng mảng gốc
  let shuffledWords = [...beautifulWords];
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }

  shuffledWords.forEach((word, index) => {
    const randomDelay = Math.random() * 2000; // Thời gian ngẫu nhiên từ 0 đến 2000ms
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

  // Lặp lại sau khi hoàn thành chu kỳ
  const totalDelay = shuffledWords.length * 300 + Math.max(...shuffledWords.map(() => Math.random() * 2000)) + 1000;
  setTimeout(showFlyingWords, totalDelay);
}

// Gọi hàm lần đầu sau khi nội dung hiển thị
setTimeout(showFlyingWords, 6000);
};