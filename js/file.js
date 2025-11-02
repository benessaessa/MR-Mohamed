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
      const firstModal = bootstrap.Modal.getInstance(document.getElementById("forgetPass"));
      firstModal.hide();

      // Show the second modal
      const secondModal = new bootstrap.Modal(document.getElementById("codeModal"));
      secondModal.show();
    }
});

function showStep(step) {
    if (step === 1) {
        document.getElementById('firstStep').style.display = 'block';
        document.getElementById('secondStep').style.display = 'none';
    } else if (step === 2) {
        document.getElementById('firstStep').style.display = 'none';
        document.getElementById('secondStep').style.display = 'block';
    }
}