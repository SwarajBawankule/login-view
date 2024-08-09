const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

document.getElementById('sign-up-form').addEventListener('submit', function(event) {
    let valid = true;

    // Get form values
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const gender = document.getElementById('gender').value;
    const signupEmail = document.getElementById('signup-email').value.trim();
    const signupPassword = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Validate Full Name
    if (!firstName) {
      alert("First Name cannot be empty.");
      valid = false;
    } else if (!/^[A-Z]/.test(firstName)) {
      alert("First Name must start with an uppercase letter.");
      valid = false;
    }

    // Validate Last Name
    if (!lastName) {
      alert("Last Name cannot be empty.");
      valid = false;
    } else if (!/^[A-Z]/.test(lastName)) {
      alert("Last Name must start with an uppercase letter.");
      valid = false;
    }

    // Validate Gender
    if (!gender) {
      alert("Gender must be selected.");
      valid = false;
    }

    // Validate Sign Up Email
    if (!signupEmail) {
      alert("Email cannot be empty.");
      valid = false;
    } else if (!/.+@.+\..+/.test(signupEmail)) {
      alert("Invalid email format.");
      valid = false;
    }

    // Validate Sign Up Password
    if (!signupPassword) {
      alert("Password cannot be empty.");
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}/.test(signupPassword)) {
      alert("Password must be at least 10 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.");
      valid = false;
    }

    // Validate Confirm Password
    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match.");
      valid = false;
    }

    if (valid) {
      // Save user data in local storage
      const userData = {
        firstName,
        lastName,
        gender,
        signupEmail,
        signupPassword
      };

      localStorage.setItem('userData', JSON.stringify(userData));

      // Display success message
      alert("User registered successfully!");

      // Redirect to welcome page
      window.location.href = 'welcome.html';
    } else {
      event.preventDefault();
    }
});

document.getElementById('sign-in-form').addEventListener('submit', function(event) {
  let valid = true;

  const signinEmail = document.getElementById('signin-email').value.trim();
  const signinPassword = document.getElementById('signin-password').value.trim();

  // Validate Sign In Email
  if (!signinEmail) {
    alert("Email cannot be empty.");
    valid = false;
  } else if (!/.+@.+\..+/.test(signinEmail)) {
    alert("Invalid email format.");
    valid = false;
  }

  // Validate Sign In Password
  if (!signinPassword) {
    alert("Password cannot be empty.");
    valid = false;
  } else if (signinPassword.length < 4) {
    alert("Password must be at least 4 characters long.");
    valid = false;
  }

  // Check if user is already registered
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData && signinEmail === userData.signupEmail && signinPassword === userData.signupPassword) {
    alert("Sign in successful!");
    console.log("User Data:");
    console.log(userData);
    // Redirect to welcome page after 1 second
    setTimeout(function() {
      window.location.href = 'http://www.w3schools.com';
    }, 1000);
  } else {
    event.preventDefault();
    alert("Invalid email or password.");
    console.log("Invalid credentials:");
    console.log("Email:", signinEmail);
    console.log("Password:", signinPassword);
  }
});