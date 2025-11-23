const swiper = new Swiper('.swiper-course', {
  watchSlidesProgress: true,
  loop: true,
  spaceBetween: 20,

  slidesPerView: 1, // default desktop

  breakpoints: {
    0: {
      slidesPerView: 1, // mobile
    },
    768: {
      slidesPerView: 1 // mobile
    },
    1024: {
      slidesPerView: 2 // tablet
    },
    1200: {
      slidesPerView: 3 // desktop
    }
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  scrollbar: {
    el: '.swiper-scrollbar'
  }
});
(function() {
    const toggle = document.getElementById('darkModeToggle');
    const className = 'dark-mode';
    // init: prefer saved, else system preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    if (isDark) document.body.classList.add(className);
    toggle.checked = isDark;

    toggle.addEventListener('change', function() {
        if (this.checked) {
          document.body.classList.add(className);
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove(className);
          localStorage.setItem('theme', 'light');
        }
    });
})();
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  const sidebarText = toggleBtn.querySelector(".sidebar-text"); // ✅ define this correctly

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");

    // ✅ Toggle visibility of the button text
    if (sidebar.classList.contains("collapsed")) {
      sidebarText.style.display = "none";
    } else {
      sidebarText.style.display = "inline";
    }
  });

  // ✅ Sticky sidebar adjustment near footer
  const footer = document.querySelector(".footer");
  function adjustSidebarSticky() {
    const sidebarRect = sidebar.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    if (footerRect.top < window.innerHeight) {
      sidebar.style.position = "absolute";
      sidebar.style.top = `${window.scrollY + footerRect.top - sidebar.offsetHeight}px`;
    } else {
      sidebar.style.position = "fixed";
      sidebar.style.top = "0";
    }
  }

  window.addEventListener("scroll", adjustSidebarSticky);
  window.addEventListener("resize", adjustSidebarSticky);
});
(function(){
    var btn = document.getElementById('toggleSidebar');
    var leftIcon = document.getElementById('toggleIconLeft'); // icon to append on the left when clicked
    var rightIcon = document.getElementById('toggleIconRight'); // default right icon
    var bothLeft = document.getElementById('toggleIconBothLeft'); // alternate icon shown after toggle

    btn.addEventListener('click', function(){
        // toggle visibility of icons
        leftIcon.classList.toggle('d-none');
        rightIcon.classList.toggle('d-none');
        bothLeft.classList.toggle('d-none');

        // ensure leftIcon is placed at the start of the button to appear on the left
        if (!leftIcon.classList.contains('d-none')) {
            btn.insertBefore(leftIcon, btn.firstChild);
        }
    });
})();
const ctx = document.getElementById('educationActivityChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['الخميس', 'الجمعة', 'السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
    datasets: [
      {
        label: 'الأسبوع الحالي',
        data: [0, 0, 0, 0, 1, 1, 0], // example data
        borderColor: '#FF4B4B',
        backgroundColor: '#FF4B4B',
        tension: 0.4,
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        fontFamily: "Jannet",
      },
      {
        label: 'الأسبوع الماضي',
        data: [100, 0, 0, 0, 0, 0, 0], // example data
        borderColor: '#4CD964',
        backgroundColor: '#4CD964',
        tension: 0.4,
        fill: false,
        pointRadius: 8,
        pointHoverRadius: 10,
        fontFamily: "Jannet",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: { size: 14 },
          usePointStyle: true,
          pointStyle: 'circle',
        },
        rtl: true,
        align: 'start',
      },
    },
    scales: {
      x: {
        grid: { color: '#f0f0f0' },
        ticks: {
          font: { size: 14 },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f0f0f0' },
        ticks: {
          stepSize: 10,
          font: { size: 14 },
        },
      },
    },
  },
});

const progress = 60; // Example: 60%
document.querySelector('.progress-fill').style.width = progress + '%';
document.querySelector('.progress-value').textContent = progress + '%';
