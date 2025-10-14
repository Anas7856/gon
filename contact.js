document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("RfykHFLQa-55-j5-O"); // 🔹 Replace with your actual EmailJS public key

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      company: document.getElementById("company").value,
      service: document.getElementById("service").value,
      message: document.getElementById("message").value,
    };

    // Validation
    if (!formData.fullName || !formData.email || !formData.message) {
      showFormStatus("error", "Please fill out all required fields.");
      return;
    }

    showLoadingState();

    // Send email via EmailJS
    emailjs
      .send("service_g5fv4b7", "template_oybbc78", formData)
      .then(() => {
        showFormStatus(
          "success",
          "✅ Your message has been sent successfully!"
        );
        contactForm.reset();
        resetButtonState();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showFormStatus(
          "error",
          "❌ Failed to send message. Please try again later."
        );
        resetButtonState();
      });
  });

  // ===================== Helper Functions =====================

  function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;

    gsap.fromTo(
      formStatus,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
    );

    setTimeout(() => {
      gsap.to(formStatus, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
      });
    }, 4000);
  }

  function showLoadingState() {
    const btn = document.querySelector(".submit-btn");
    const btnText = btn.querySelector(".btn-text");
    const btnIcon = btn.querySelector(".btn-icon");
    btn.disabled = true;
    btnText.textContent = "Sending...";
    btnIcon.className = "fa-solid fa-spinner fa-spin btn-icon";
  }

  function resetButtonState() {
    const btn = document.querySelector(".submit-btn");
    const btnText = btn.querySelector(".btn-text");
    const btnIcon = btn.querySelector(".btn-icon");
    btn.disabled = false;
    btnText.textContent = "Send Message";
    btnIcon.className = "fa-solid fa-paper-plane btn-icon";
  }
});
