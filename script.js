const items = document.querySelectorAll('.coverflow-item');
let activeIndex = 0;

function updateCoverflow() {
  items.forEach((item, index) => {
    // Reset semua class
    item.className = 'coverflow-item';

    // Tambahkan class sesuai posisi relatif terhadap activeIndex
    if (index === activeIndex) {
      item.classList.add('active');
    } else if (index === (activeIndex - 1 + items.length) % items.length) {
      item.classList.add('left');
    } else if (index === (activeIndex + 1) % items.length) {
      item.classList.add('right');
    } else if (index === (activeIndex - 2 + items.length) % items.length) {
      item.classList.add('far-left');
    } else if (index === (activeIndex + 2) % items.length) {
      item.classList.add('far-right');
    }
  });
}

// Tombol prev: pindah ke item sebelah kiri
document.getElementById('prev').addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + items.length) % items.length;
  updateCoverflow();
});

// Tombol next: pindah ke item sebelah kanan
document.getElementById('next').addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % items.length;
  updateCoverflow();
});

// Jalankan update awal
updateCoverflow();

const faders = document.querySelectorAll('.fade-in-up');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.style.animationPlayState = 'running';
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  fader.style.animationPlayState = 'paused'; // pause awal animasi
  appearOnScroll.observe(fader);
});
