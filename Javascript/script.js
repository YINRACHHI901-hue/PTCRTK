
// Marquee Ticker
const track = document.getElementById('track');
track.innerHTML += track.innerHTML; // duplicate content for seamless loop

// navbar shrink transition
const navbar = document.querySelector('.navbar-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// smooth auto scroll up
document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================qrcode-popup-image=======================================
function openModal(img) {
  document.getElementById('modalImg').src = img.src;
  document.getElementById('imgModal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('imgModal').style.display = 'none';
}
