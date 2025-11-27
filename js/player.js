let player;
let progress;
let playPauseBtn;
let volumeBar;
let volumeValue;
let timeDisplay;
let speedSelect;
let qualitySelect;
let originalPlayerSize = {};
let progressInterval;

function playVideo() {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });

  const videoElement = document.getElementById("courseVideo");
  videoElement.outerHTML = `
<div id="playerWrap">
<div id="player"></div>
<div id="overlay-blocker"></div>
<button id="forwardOverlay" class="overlay-btn forward-overlay" onclick="forward10()" aria-label="التقديم 10 ث">
    <svg viewBox="0 0 24 24">
        <path d="M11 19V5l-8 7 8 7zM21 19V5l-8 7 8 7z"></path>
    </svg>
    <span class="overlay-label">تقديم +10ث</span>
</button>
<button id="rewindOverlay" class="overlay-btn rewind-overlay" onclick="rewind10()" aria-label="الرجوع 10 ث">
    <svg viewBox="0 0 24 24">
        <path d="M13 5v14l8-7-8-7zM3 5v14l8-7-8-7z"></path>
    </svg>
    <span class="overlay-label">تأخير -10ث</span>
</button>
</div>
<div class="controls" role="region" aria-label="مشغل فيديو">
<div class="progress-container">
<input id="progress" type="range" min="0" value="0" aria-label="شريط التقدم">
<div id="timeDisplay" class="time-display">00:00</div>
</div>
<div class="buttons-row">
<div class="left-controls">
<div class="settings-container">
        <button id="settingsBtn" class="fabIcon" onclick="toggleSettings()">
            <svg viewBox="0 0 24 24">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path>
            </svg>
            <span class="label">إعدادات</span>
        </button>
        <div id="settingsDropdown" class="settings-dropdown">
            <div class="setting-item">
                <label for="volume">الصوت:</label>
                <input id="volume" type="range" min="0" max="100" value="100">
                <span id="volumeValue" class="label">100%</span>
            </div>
            <div class="setting-item">
                <label for="speedSelect">السرعة:</label>
                <select id="speedSelect">
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1" selected>1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                </select>
            </div>
        </div>
    </div>
</div>
<button id="playPauseBtn" class="fabIcon" aria-label="تشغيل / إيقاف" onclick="togglePlayPause()">
    <svg viewBox="0 0 24 24" class="icon-play">
        <path d="M5 3v18l15-9z"></path>
    </svg>
    <span class="label">  تشغيل الفيديو </span>
</button>
<div class="right-controls">
    <button class="fabIcon" onclick="toggleFullscreen()">
        <svg viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zM19 5h-5v2h3v3h2V5zM7 5h3V3H5v5h2V5zM19 19v-3h2v5h-5v-2h3z"></path>
        </svg>
        <span class="label">تكبير الشاشة</span>
    </button>
</div>
</div>
</div>
`;

  // Initialize the player
  onYouTubeIframeAPIReady();
}

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
  // Set progress max and initial volume
  setTimeout(() => {
    if (player && player.getDuration) {
      progress.max = player.getDuration();
      volumeBar.value = player.getVolume();
      volumeValue.textContent = player.getVolume() + '%';
      updateProgress();
      // Add event listeners after player is ready
      if (progress) progress.addEventListener('input', () => player && player.seekTo(parseFloat(progress.value), true));
      if (volumeBar) volumeBar.addEventListener('input', () => { if(player) player.setVolume(parseFloat(volumeBar.value)); volumeValue.textContent = volumeBar.value + '%'; });
      if (speedSelect) speedSelect.addEventListener('change', () => changeSpeed());
    }
  }, 1000);
  setTimeout(loadQualityLevels, 1200);
}

function onPlayerStateChange(e){
  const svg = playPauseBtn.querySelector('svg');
  const label = playPauseBtn.querySelector('.label');
  if(e.data === YT.PlayerState.PLAYING){
    svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>';
    if(label) label.textContent = 'إيقاف';
    // Start updating progress
    progressInterval = setInterval(updateProgress, 1000);
  } else {
    svg.innerHTML = '<path d="M5 3v18l15-9z"></path>';
    if(label) label.textContent = 'تشغيل';
    // Stop updating progress
    clearInterval(progressInterval);
  }
  if(e.data === YT.PlayerState.PLAYING) setTimeout(loadQualityLevels, 600);
}

function updateProgress(){
  if(player && player.getDuration){
    const c = player.getCurrentTime();
    const d = player.getDuration();
    progress.max = d || 0;
    progress.value = c || 0;
    timeDisplay.textContent = formatTime(c || 0) + ' / ' + formatTime(d || 0);
  }
}

function formatTime(sec){
  sec = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function togglePlayPause(){ if(!player)return; const st=player.getPlayerState(); st===YT.PlayerState.PLAYING?player.pauseVideo():player.playVideo(); }
function rewind10(){ if(player) player.seekTo(Math.max(0, player.getCurrentTime()-10), true); }
function forward10(){ if(player) player.seekTo(player.getCurrentTime()+10, true); }


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
function changeSpeed(){
  if(player && speedSelect) {
    const speed = parseFloat(speedSelect.value);
    console.log('Changing speed to:', speed);
    player.setPlaybackRate(speed);
    // Verify the speed was set
    setTimeout(() => {
      console.log('Current playback rate:', player.getPlaybackRate());
    }, 100);
  } else {
    console.log('Player or speedSelect not available');
  }
}

function toggleSettings(){
  const dropdown = document.getElementById('settingsDropdown');
  if(dropdown.style.display === 'block'){
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
    // Ensure speed control event listener is attached when dropdown opens
    if(speedSelect && !speedSelect.hasEventListener) {
      speedSelect.addEventListener('change', () => changeSpeed());
      speedSelect.hasEventListener = true; // Mark as attached
      console.log('Speed control event listener attached');
    }
  }
}

// Close settings dropdown when clicking outside
document.addEventListener('click', function(event) {
  const settingsBtn = document.getElementById('settingsBtn');
  const dropdown = document.getElementById('settingsDropdown');
  if (settingsBtn && dropdown && !settingsBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});


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
  volumeBar = document.getElementById('volume');
  volumeValue = document.getElementById('volumeValue');
  timeDisplay = document.getElementById('timeDisplay');
  speedSelect = document.getElementById('speedSelect');
  qualitySelect = document.getElementById('qualitySelect');
  controls = document.querySelector('.controls');

  console.log('speedSelect found:', speedSelect);
  console.log('speedSelect value:', speedSelect ? speedSelect.value : 'null');

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
