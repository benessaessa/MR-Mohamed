
AOS.init();

document.addEventListener('DOMContentLoaded', function () {
  var modalEl = document.getElementById('instructionsModal');

  // Create Modal instance with options (optional because you already set via data- attributes)
  var myModal = new bootstrap.Modal(modalEl, {
    backdrop: 'static', // prevent closing by clicking backdrop
    keyboard: false     // prevent closing with ESC
  });

  // Show the modal
  myModal.show();
});

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

document.getElementById("submitPhone").addEventListener("click", function () {
  const phoneInput = document.getElementById("phoneInput");
  const errorMsg = document.getElementById("phoneError");

  if (phoneInput.value.trim() === "") {
    // Show error message
    errorMsg.style.display = "block";
    phoneInput.classList.add("is-invalid");
  } else {
    // Hide error if previously shown
    errorMsg.style.display = "none";
    phoneInput.classList.remove("is-invalid");

    // Example: send phone number to server here via AJAX if needed

    // Close the first modal
    const firstModal = bootstrap.Modal.getInstance(
      document.getElementById("forgetPass")
    );
    firstModal.hide();

    // Show the second modal
    const secondModal = new bootstrap.Modal(
      document.getElementById("codeModal")
    );
    secondModal.show();
  }
});

function showStep(step) {
  if (step === 1) {
    document.getElementById("firstStep").style.display = "block";
    document.getElementById("secondStep").style.display = "none";
  } else if (step === 2) {
    document.getElementById("firstStep").style.display = "none";
    document.getElementById("secondStep").style.display = "block";
  }
}
function clearErrors() {
  document.getElementById("fistNameError").style.display = "none";
  document.getElementById("lastNameError").style.display = "none";
  document.getElementById("phoneNumError").style.display = "none";
  document.getElementById("phoneNumFatherError").style.display = "none";
}

function validateStep1() {
  clearErrors(); // Clear previous error messages

  const fistName = document.getElementById("fistName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phoneNum = document.getElementById("phoneNum").value.trim();
  const phoneNumFather = document.getElementById("phoneNumFather").value.trim();
  const regex = /^01[0-9]{9}$/;

  let isValid = true;

  // Check if all inputs are filled
  if (!fistName) {
    document.getElementById("fistNameError").innerText =
      "يرجى ملء الإسم الأول.";
    document.getElementById("fistNameError").style.display = "block";
    isValid = false;
  }

  if (!lastName) {
    document.getElementById("lastNameError").innerText =
      "يرجى ملء الإسم الأخير.";
    document.getElementById("lastNameError").style.display = "block";
    isValid = false;
  }

  // Validate phone numbers
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

  // Move to step 2 if validation is successful
  if (isValid) {
    showStep(2);
  }
}
