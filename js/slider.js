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