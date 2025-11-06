document.addEventListener('DOMContentLoaded', function () {
  /* ============================
     ✅ Show First Modal on Load
  ============================ */
  const modalEl = document.getElementById('instructionsModal');
  if (modalEl) {
    const myModal = new bootstrap.Modal(modalEl, {
      backdrop: 'static',
      keyboard: false
    });
    myModal.show();
  }

  /* ============================
     ✅ Initialize Swiper Correctly
  ============================ */
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

  /* ============================
     ✅ Phone Submit Validation
  ============================ */
  const submitPhoneBtn = document.getElementById("submitPhone");

  if (submitPhoneBtn) {
    submitPhoneBtn.addEventListener("click", function () {
      const phoneInput = document.getElementById("phoneInput");
      const errorMsg = document.getElementById("phoneError");

      if (phoneInput.value.trim() === "") {
        errorMsg.style.display = "block";
        phoneInput.classList.add("is-invalid");
      } else {
        errorMsg.style.display = "none";
        phoneInput.classList.remove("is-invalid");

        // Close first modal (forgetPass)
        const firstModalEl = document.getElementById("forgetPass");
        if (firstModalEl) {
          const firstModal = bootstrap.Modal.getInstance(firstModalEl);
          if (firstModal) firstModal.hide();
        }

        // Show second modal
        const secondModalEl = document.getElementById("codeModal");
        if (secondModalEl) {
          const secondModal = new bootstrap.Modal(secondModalEl);
          secondModal.show();
        }
      }
    });
  }

  /* ============================
      ✅ Step Logic
  ============================ */
  window.showStep = function (step) {
    document.getElementById("firstStep").style.display = step === 1 ? "block" : "none";
    document.getElementById("secondStep").style.display = step === 2 ? "block" : "none";
  };

  window.clearErrors = function () {
    ["fistNameError", "lastNameError", "phoneNumError", "phoneNumFatherError"]
      .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
      });
  };

  window.validateStep1 = function () {
    clearErrors();

    const fistName = document.getElementById("fistName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phoneNum = document.getElementById("phoneNum").value.trim();
    const phoneNumFather = document.getElementById("phoneNumFather").value.trim();
    const regex = /^01[0-9]{9}$/;

    let isValid = true;

    if (!fistName) {
      document.getElementById("fistNameError").innerText = "يرجى ملء الإسم الأول.";
      document.getElementById("fistNameError").style.display = "block";
      isValid = false;
    }

    if (!lastName) {
      document.getElementById("lastNameError").innerText = "يرجى ملء الإسم الأخير.";
      document.getElementById("lastNameError").style.display = "block";
      isValid = false;
    }

    if (!regex.test(phoneNum)) {
      document.getElementById("phoneNumError").innerText =
        "رقم الهاتف (الطالب) يجب أن يبدأ بـ 01 وأن يكون 11 رقمًا.";
      document.getElementById("phoneNumError").style.display = "block";
      isValid = false;
    }

    if (!regex.test(phoneNumFather)) {
      document.getElementById("phoneNumFatherError").innerText =
        "رقم هاتف الأب يجب أن يبدأ بـ 01 وأن يكون 11 رقمًا.";
      document.getElementById("phoneNumFatherError").style.display = "block";
      isValid = false;
    }

    if (isValid) showStep(2);
  };
});
