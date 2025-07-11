document.addEventListener("DOMContentLoaded", () => {
  // --- Navigation (Hamburger Menu) ---
  const hamburger = document.getElementById("hamburger");
  const navList = document.getElementById("navList");

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      navList.classList.toggle("active");
      hamburger.querySelector("i").classList.toggle("fa-bars");
      hamburger.querySelector("i").classList.toggle("fa-times"); // Change icon to 'X'
    });

    // Close nav when a link is clicked (for mobile)
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          // Only close on smaller screens
          navList.classList.remove("active");
          hamburger.querySelector("i").classList.remove("fa-times");
          hamburger.querySelector("i").classList.add("fa-bars");
        }
      });
    });
  }

  // --- Active Nav Link Highlighting ---
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".main-nav .nav-list a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // --- Donation Modal ---
  const donationModal = document.getElementById("donationModal");
  const openDonationModalBtn = document.getElementById("openDonationModal");
  const closeButton = donationModal.querySelector(".close-button");
  const amountButtons = donationModal.querySelectorAll(".btn-amount");
  const customAmountInput = document.getElementById("customAmount");
  const processDonationBtn = document.getElementById("processDonation");

  let selectedDonationAmount = 0;

  if (openDonationModalBtn && donationModal) {
    openDonationModalBtn.addEventListener("click", () => {
      donationModal.style.display = "flex"; // Use flex to center
    });

    closeButton.addEventListener("click", () => {
      donationModal.style.display = "none";
    });

    // Close modal if user clicks outside of it
    window.addEventListener("click", (event) => {
      if (event.target == donationModal) {
        donationModal.style.display = "none";
      }
    });

    amountButtons.forEach((button) => {
      button.addEventListener("click", () => {
        amountButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedDonationAmount = parseInt(button.dataset.amount);
        customAmountInput.value = ""; // Clear custom amount if preset is selected
      });
    });

    customAmountInput.addEventListener("input", () => {
      amountButtons.forEach((btn) => btn.classList.remove("selected")); // Deselect presets
      selectedDonationAmount = parseInt(customAmountInput.value) || 0;
    });

    processDonationBtn.addEventListener("click", () => {
      const finalAmount =
        selectedDonationAmount || parseInt(customAmountInput.value) || 0;
      if (finalAmount > 0) {
        alert(
          `Redirecting to payment gateway for ETB ${finalAmount}. (Integration required!)`
        );
        // Here, you would integrate with a payment gateway (Stripe, PayPal, etc.)
        // This would involve redirecting the user or opening their payment modal.
        // For example: StripeCheckout.open({ amount: finalAmount * 100, ... });
        donationModal.style.display = "none"; // Close modal after initiating payment
      } else {
        alert("Please select or enter a valid donation amount.");
      }
    });
  }

  // --- Add subtle scroll animations (Example) ---
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Trigger when 20% of the section is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.classList.add("fade-in-section"); // Add base class for animation
    observer.observe(section);
  });

  // Add CSS for fade-in-section and animate-in in style.css
});
