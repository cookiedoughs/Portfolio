/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function

themeButton.addEventListener("click", toggleDarkMode);



/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE)
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here

let rsvpButton = document.getElementById("rsvp-button");

// Helper function to update RSVP count
const updateRSVPCount = () => {

  let participantList =
    document.querySelectorAll(".rsvp-participants p");

  let count = participantList.length;

  document.getElementById("rsvp-count").textContent =
    count + " people have RSVP'd!";
}

// Step 2: Write your code to manipulate the DOM here

const addParticipant = () => {

  let name = document.getElementById("name").value;
  let state = document.getElementById("state").value;
  let email = document.getElementById("email").value;

  let newParticipant = document.createElement("p");

  newParticipant.textContent =
    "🎟️ " + name + " from " + state + " has RSVP'd.";

  document
    .querySelector(".rsvp-participants")
    .appendChild(newParticipant);

  updateRSVPCount();

  let person = {
    name: name,
    state: state,
    email: email
  };

  toggleModal(person);
}

// Step 3: Add a click event listener to the submit RSVP button here



/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = () => {

  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;

  // TODO: Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {

    // TODO: Inside loop, validate the value of each input
    if (rsvpInputs[i].value.trim().length < 2) {

      containsErrors = true;

      rsvpInputs[i].classList.add("error");

    } else {

      rsvpInputs[i].classList.remove("error");
    }
  }

  // Email validation

  let email = document.getElementById("email");

  if (
    !email.value.includes("@") ||
    !email.value.includes(".")
  ) {

    containsErrors = true;

    email.classList.add("error");

  } else {

    email.classList.remove("error");
  }

  // TODO: If no errors, call addParticipant() and clear fields

  if (containsErrors == false) {

    addParticipant();

    for (let i = 0; i < rsvpInputs.length; i++) {

      rsvpInputs[i].value = "";
    }
  }
}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()

rsvpButton.addEventListener("click", validateForm);



/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [ ] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll(".revealable");
let reduceMotion = document.getElementById("reduce-motion");

// Track whether motion is reduced
let motionReduced = false;

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {

    // If reduce motion is enabled, show everything immediately
    if (motionReduced) {
        for (let i = 0; i < revealableContainers.length; i++) {
            revealableContainers[i].classList.add('active');
        }
        return;
    }

    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = current.getBoundingClientRect().top;
        let revealDistance = parseInt(
            getComputedStyle(current).getPropertyValue('--reveal-distance'),
            10
        );

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add('active');
        }
        // If the container is not within range, hide it by removing the 'active' class
        else {
            current.classList.remove('active');
        }
    }
}

// Reduce Motion button
reduceMotion.addEventListener("click", () => {
    motionReduced = !motionReduced;

    if (motionReduced) {
        document.body.classList.add("reduce-motion");
    } else {
        document.body.classList.remove("reduce-motion");
    }

    reveal();
});

// Throttle guard so reveal() runs at most once per animation frame
// instead of once per scroll-event pixel (this is what was making
// scrolling feel janky / heavy on longer pages).
let scrollTicking = false;

const onScroll = () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            reveal();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
};

// Step 3: Whenever the user scrolls, check if any containers should be revealed
window.addEventListener('scroll', onScroll);

// Reveal elements already visible on page load
reveal();

/*** Success Modal [ADDED IN UNIT 9] ***/

let rotateFactor = 0;
let modalIntervalId = null;
let modalTimeoutId = null;

const animateImage = () => {
    const modalImage = document.getElementById("modal-image");

    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 10;
    }

    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

let modalCloseButton = document.getElementById("modal-close");

const closeModal = () => {
    const modal = document.getElementById("success-modal");
    modal.style.display = "none";
    if (modalIntervalId) clearInterval(modalIntervalId);
    if (modalTimeoutId) clearTimeout(modalTimeoutId);
    modalIntervalId = null;
    modalTimeoutId = null;
};

modalCloseButton.addEventListener("click", closeModal);

const toggleModal = (person) => {

    const modal = document.getElementById("success-modal");

    modal.style.display = "flex";

    const modalText = document.getElementById("modal-text");

    modalText.textContent =
        `Thank you, ${person.name}!
        Your RSVP has been received. We can't wait to see you at the Women in Tech Networking Picnic! 
        Get ready for an afternoon of networking, new friendships, inspiration, and community. See you soon!`;

    if (modalIntervalId) clearInterval(modalIntervalId);
    if (modalTimeoutId) clearTimeout(modalTimeoutId);

    // Reduce Motion also disables the modal image animation
    if (!motionReduced) {
        modalIntervalId = setInterval(animateImage, 500);
    }

    modalTimeoutId = setTimeout(() => {
        modal.style.display = "none";
        if (modalIntervalId) clearInterval(modalIntervalId);
        modalIntervalId = null;
    }, 5000);
};