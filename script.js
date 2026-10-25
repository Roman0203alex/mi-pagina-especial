const song = document.querySelector('#song');
const playButton = document.querySelector('#playButton');
const soundToggle = document.querySelector('#soundToggle');
const icon = soundToggle.querySelector('.sound-icon');
const label = soundToggle.querySelector('.sound-label');

function refreshSoundUI() {
  const playing = !song.paused;
  icon.textContent = playing ? 'Ⅱ' : '▶';
  label.textContent = playing ? 'Pausar' : 'Música';
  playButton.querySelector('.play-disc').textContent = playing ? 'Ⅱ' : '▶';
  playButton.querySelector('small').textContent = playing ? 'SONANDO AHORA' : 'TOCA PARA ESCUCHAR';
}

async function toggleSong() {
  if (song.paused) {
    try { await song.play(); } catch (error) { console.warn('El navegador bloqueó la reproducción:', error); }
  } else {
    song.pause();
  }
  refreshSoundUI();
}

playButton.addEventListener('click', toggleSong);
soundToggle.addEventListener('click', toggleSong);
song.addEventListener('play', refreshSoundUI);
song.addEventListener('pause', refreshSoundUI);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
document.querySelectorAll('.photo-card').forEach((card) => {
  card.addEventListener('click', () => card.classList.toggle('active'));
});

refreshSoundUI();
