let player;
let progress;
let playPauseBtn;
let muteBtn;
let volumeBar;
let volumeValue;
let timeDisplay;
let speedSelect;
let qualitySelect;
let originalPlayerSize = {};

function onYouTubeIframeAPIReady(){
  player = new YT.Player('player', {
    videoId: '1o90sTllcCs',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0
    },
    events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange }
  });
}

function onPlayerReady(){
  player.playVideo();
  initializePlayerElements();
  setTimeout(loadQualityLevels, 1200);
}

function onPlayerStateChange(e){
  const svg = playPauseBtn.querySelector('svg');
  const label = playPauseBtn.querySelector('.label');
  if(e.data === YT.PlayerState.PLAYING){
    svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>';
    if(label) label.textContent = 'إيقاف';
  } else {
    svg.innerHTML = '<path d="M5 3v18l15-9z"></path>';
    if(label) label.textContent = 'تشغيل';
  }
  if(e.data === YT.PlayerState.PLAYING) setTimeout(loadQualityLevels, 600);
}

function updateProgress(){
  if(player && player.getDuration){
    const c = player.getCurrentTime();
    const d = player.getDuration();
    progress.max = d || 0;
    progress.value = c || 0;
    timeDisplay.textContent = formatTime(c || 0);
  }
}

function formatTime(sec){
  sec = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

progress.addEventListener('input', ()=> player && player.seekTo(parseFloat(progress.value), true));
function togglePlayPause(){ if(!player)return; const st=player.getPlayerState(); st===YT.PlayerState.PLAYING?player.pauseVideo():player.playVideo(); }
function rewind10(){ if(player) player.seekTo(Math.max(0, player.getCurrentTime()-10), true); }
function forward10(){ if(player) player.seekTo(player.getCurrentTime()+10, true); }

function muteVideo(){
  if(!player) return;
  const icon = muteBtn.querySelector('svg');
  const label = muteBtn.querySelector('.label');
  if(player.isMuted()){
    player.unMute();
    icon.innerHTML = '<path d="M5 10v4h4l5 5V5l-5 5H5z"></path>';
    label.textContent = 'صوت';
  } else {
    player.mute();
    icon.innerHTML = '<path d="M16.5 12c0-1.77-.77-3.37-2-4.47l1.41-1.41C18.09 7.62 19 9.71 19 12s-.91 4.38-2.09 5.88l-1.41-1.41c1.23-1.1 2-2.7 2-4.47zM5 10v4h4l5 5V5l-5 5H5z"></path>';
    label.textContent = 'كتم';
  }
}

volumeBar.addEventListener('input', ()=> { if(player) player.setVolume(volumeBar.value); volumeValue.textContent = volumeBar.value + '%'; });
function toggleFullscreen(){
    const elem = document.getElementById('playerWrap');
    const controls = document.querySelector('.controls');
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        // set back to normal
        elem.classList.remove('fullscreen');
        controls.classList.remove('fullscreen');
        elem.style.position = '';
        elem.style.inset = '';
        elem.style.zIndex = '';
        elem.style.borderRadius = '';
        controls.style.position = '';
        controls.style.left = '';
        controls.style.right = '';
        controls.style.bottom = '';
    } else {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        // set to fullscreen
        elem.classList.add('fullscreen');
        controls.classList.add('fullscreen');
        elem.style.position = 'fixed';
        elem.style.inset = '0';
        elem.style.zIndex = '10';
        elem.style.borderRadius = '0';
        controls.style.position = 'fixed';
        controls.style.left = '0';
        controls.style.right = '0';
        controls.style.bottom = '0';
    }
}
function changeSpeed(){ if(player) player.setPlaybackRate(parseFloat(speedSelect.value)); }


function translateQuality(code){
  const map = { small:'240p', medium:'360p', large:'480p', hd720:'720p', hd1080:'1080p', hd1440:'2K', hd2160:'4K', highres:'أعلى جودة' };
  return map[code] || code;
}

// منع الكلك اليمين
document.addEventListener('contextmenu', event => event.preventDefault());

// منع استخدام F12 و Ctrl+Shift+I و غيرها
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    const elem = document.getElementById('playerWrap');
    const controls = document.querySelector('.controls');
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    // Always remove fullscreen class and reset styles
    elem.classList.remove('fullscreen');
    controls.classList.remove('fullscreen');
    elem.style.position = '';
    elem.style.inset = '';
    elem.style.zIndex = '';
    elem.style.borderRadius = '';
    controls.style.position = '';
    controls.style.left = '';
    controls.style.right = '';
    controls.style.bottom = '';
  } else if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "J") ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
// ✅ إخفاء الأزرار بعد 5 ثواني من عدم التفاعل
let hideControlsTimeout;
let controls;

function initializePlayerElements() {
  progress = document.getElementById('progress');
  playPauseBtn = document.getElementById('playPauseBtn');
  muteBtn = document.getElementById('muteBtn');
  volumeBar = document.getElementById('volume');
  volumeValue = document.getElementById('volumeValue');
  timeDisplay = document.getElementById('timeDisplay');
  speedSelect = document.getElementById('speedSelect');
  qualitySelect = document.getElementById('qualitySelect');
  controls = document.querySelector('.controls');

  // Add event listeners after elements are available
  if (progress) progress.addEventListener('input', () => player && player.seekTo(parseFloat(progress.value), true));
  if (volumeBar) volumeBar.addEventListener('input', () => { if(player) player.setVolume(volumeBar.value); volumeValue.textContent = volumeBar.value + '%'; });

  // Listen for fullscreen changes to handle Esc key exit
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

  // مستمعات الحركة (ماوس أو لمس)
  document.addEventListener('mousemove', showControls);
  document.addEventListener('touchstart', showControls);

  // يبدأ المؤقت عند تشغيل الصفحة
  resetHideTimer();
}

function handleFullscreenChange() {
  const elem = document.getElementById('playerWrap');
  const controls = document.querySelector('.controls');
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    // Exited fullscreen (e.g., via Esc or browser exit)
    elem.classList.remove('fullscreen');
    controls.classList.remove('fullscreen');
    elem.style.position = 'relative';
    elem.style.inset = '';
    elem.style.zIndex = '1';
    elem.style.borderRadius = 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0';
    controls.style.position = 'relative';
    controls.style.left = '';
    controls.style.right = '';
    controls.style.bottom = '';
  }
}

// دالة لإظهار الأزرار
function showControls() {
  if (controls) {
    controls.style.opacity = '1';
    controls.style.transition = 'opacity 0.5s ease';
    resetHideTimer();
  }
}

// دالة لإخفاء الأزرار
function hideControls() {
  if (controls) {
    controls.style.opacity = '0';
  }
}

// إعادة ضبط المؤقت كل مرة يتحرك فيها الماوس أو يلمس المستخدم الشاشة
function resetHideTimer() {
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(hideControls, 5000);
}
