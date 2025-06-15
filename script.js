// Sample data structure for Jake Ryan's resume
const sampleData = {
  personal: {
    fullName: "Jake Ryan",
    phone: "+1 (123) 456-7890",
    email: "jake@email.com",
    linkedin: "linkedin.com/in/jake",
    github: "github.com/jake",
    twitter: "x.com/jake",
  },
  summary:
    "Undergraduate student pursuing Computer Science with experience in Java, C/C++, JavaScript, and Python. Interested in software engineering, web development, and artificial intelligence.",
  education: [
    {
      institution: "Boston University",
      degree: "Bachelor of Science in Computer Science",
      gpa: "3.4/4.0",
      dates: "Sep. 2018 – May 2022",
      location: "Boston, MA",
      bullets: [],
    },
  ],
  experience: [
    {
      title: "Undergraduate Research Assistant",
      company: "Boston University",
      dates: "Jun 2020 – Present",
      location: "Boston, MA",
      bullets: [
        "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
        "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
        "Explored ways to visualize GitHub collaboration in a classroom setting",
      ],
    },
    {
      title: "Information Technology Support Specialist",
      company: "Simmons University",
      dates: "Sep. 2018 – Dec 2019",
      location: "Boston, MA",
      bullets: [
        "Communicated with staff and faculty to resolve software and hardware issues",
        "Installed and configured software, hardware, and wireless networks",
      ],
    },
  ],
  projects: [
    {
      title: "Gitlytics",
      technologies:
        "Python, Flask, React, PostgreSQL, Docker, TravisCI, Digital Ocean",
      dates: "Jun 2020 – Present",
      bullets: [
        "Developed a full-stack web application used by over 350 students at Boston University",
        "Application analyzes GitHub repositories for insights such as version control and specification compliance",
        "Used Celery and Redis to decrease query response time and support concurrent users",
      ],
    },
    {
      title: "Simple Paintball",
      technologies: "Spigot API, Java, Maven, TravisCI, Git",
      dates: "May 2018 – Aug 2018",
      bullets: [
        "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
        "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
        "Implemented continuous delivery using TravisCI to build the plugin upon new a release",
      ],
    },
  ],
  skills: {
    languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
    frameworks: "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI",
    developerTools:
      "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
    libraries: "pandas, NumPy, Matplotlib",
  },
  languageProficiency: [
    {
      language: "English",
      proficiency: 5,
    },
    {
      language: "Hindi",
      proficiency: 4,
    },
  ],
};

// Helper function to create date dropdown HTML
function createDateDropdowns(className, isRange = true) {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const years = [];
  for (let year = 2030; year >= 1925; year--) {
    years.push(year);
  }

  const monthOptions = months
    .map((month) => `<option value="${month}">${month}</option>`)
    .join("");
  const yearOptions = years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");

  if (isRange) {
    return `
      <div class="date-range ${className}">
        <div class="date-start">
          <select class="start-month" onchange="updateDateRange(this); updatePreview();">
            <option value="">Month</option>
            ${monthOptions}
          </select>
          <select class="start-year" onchange="updateDateRange(this); updatePreview();">
            <option value="">Year</option>
            ${yearOptions}
          </select>
        </div>
        <span class="date-separator">–</span>
        <div class="date-end">
          <select class="end-month" onchange="updateDateRange(this); updatePreview();">
            <option value="">Month</option>
            ${monthOptions}
          </select>
          <select class="end-year" onchange="updateDateRange(this); updatePreview();">
            <option value="">Year</option>
            ${yearOptions}
          </select>
        </div>
        <div class="present-checkbox">
          <label>
            <input type="checkbox" class="is-present" onchange="togglePresent(this); updateDateRange(this); updatePreview();">
            Present
          </label>
        </div>
        <input type="hidden" class="dates" value="">
      </div>
    `;
  } else {
    return `
      <div class="date-single ${className}">
        <select class="single-month" onchange="updateSingleDate(this); updatePreview();">
          <option value="">Month</option>
          ${monthOptions}
        </select>
        <select class="single-year" onchange="updateSingleDate(this); updatePreview();">
          <option value="">Year</option>
          ${yearOptions}
        </select>
        <input type="hidden" class="dates" value="">
      </div>
    `;
  }
}

// Toggle present checkbox and hide/show end date
function togglePresent(element) {
  const container = element.closest(".date-range");
  const dateEnd = container.querySelector(".date-end");
  const isPresent = element.checked;

  if (isPresent) {
    dateEnd.style.opacity = "0.3";
    dateEnd.style.pointerEvents = "none";
    // Clear end date values
    container.querySelector(".end-month").value = "";
    container.querySelector(".end-year").value = "";
  } else {
    dateEnd.style.opacity = "1";
    dateEnd.style.pointerEvents = "auto";
  }
}

// Update date range from dropdowns
function updateDateRange(element) {
  const container = element.closest(".date-range");
  const startMonth = container.querySelector(".start-month").value;
  const startYear = container.querySelector(".start-year").value;
  const endMonth = container.querySelector(".end-month").value;
  const endYear = container.querySelector(".end-year").value;
  const isPresent = container.querySelector(".is-present").checked;
  const hiddenInput = container.querySelector(".dates");

  let dateString = "";
  if (startMonth && startYear) {
    dateString = `${startMonth} ${startYear}`;
    if (isPresent) {
      dateString += " – Present";
    } else if (endMonth && endYear) {
      dateString += ` – ${endMonth} ${endYear}`;
    }
  }

  hiddenInput.value = dateString;
}

// Update single date from dropdowns
function updateSingleDate(element) {
  const container = element.closest(".date-single");
  const month = container.querySelector(".single-month").value;
  const year = container.querySelector(".single-year").value;
  const hiddenInput = container.querySelector(".dates");

  let dateString = "";
  if (month && year) {
    dateString = `${month} ${year}`;
  }

  hiddenInput.value = dateString;
}

// Helper function to set dropdown values from date string
function setDropdownFromDateString(container, dateString) {
  if (!dateString) return;

  const isRange = container.classList.contains("date-range");

  if (isRange) {
    // Parse range like "Sep. 2018 – May 2022" or "Jun 2020 – Present"
    const parts = dateString.split(" – ");
    if (parts.length >= 1) {
      const startParts = parts[0].trim().split(" ");
      if (startParts.length === 2) {
        const startMonth = container.querySelector(".start-month");
        const startYear = container.querySelector(".start-year");
        if (startMonth) startMonth.value = startParts[0];
        if (startYear) startYear.value = startParts[1];
      }
    }

    if (parts.length === 2) {
      const endPart = parts[1].trim();
      const endMonth = container.querySelector(".end-month");
      const endYear = container.querySelector(".end-year");
      const presentCheckbox = container.querySelector(".is-present");

      if (endPart === "Present") {
        if (presentCheckbox) {
          presentCheckbox.checked = true;
          togglePresent(presentCheckbox);
        }
      } else {
        const endParts = endPart.split(" ");
        if (endParts.length === 2) {
          if (endMonth) endMonth.value = endParts[0];
          if (endYear) endYear.value = endParts[1];
        }
        if (presentCheckbox) {
          presentCheckbox.checked = false;
          togglePresent(presentCheckbox);
        }
      }
    }
  } else {
    // Parse single date like "Feb. 2021"
    const parts = dateString.trim().split(" ");
    if (parts.length === 2) {
      const month = container.querySelector(".single-month");
      const year = container.querySelector(".single-year");
      if (month) month.value = parts[0];
      if (year) year.value = parts[1];
    }
  }

  // Update the hidden input
  const hiddenInput = container.querySelector(".dates");
  if (hiddenInput) hiddenInput.value = dateString;
}

// Dark mode toggle functionality
function toggleDarkMode() {
  const body = document.body;

  if (body.getAttribute("data-theme") === "dark") {
    // Switch to light mode
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    // Switch to dark mode
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme on page load
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;

  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  loadSavedTheme();
  updatePreview();
});

// Set up event listeners for all form fields
function setupEventListeners() {
  // Personal information fields
  const personalFields = [
    "fullName",
    "phone",
    "email",
    "linkedin",
    "github",
    "twitter",
    "summary",
  ];
  personalFields.forEach((field) => {
    const element = document.getElementById(field);
    if (element) {
      element.addEventListener("input", updatePreview);
    }
  });

  // Skills fields
  const skillsFields = [
    "languages",
    "frameworks",
    "developerTools",
    "libraries",
  ];
  skillsFields.forEach((field) => {
    const element = document.getElementById(field);
    if (element) {
      element.addEventListener("input", updatePreview);
    }
  });

  // Set up star rating event listeners
  setupStarRatingListeners();
}

// Set up star rating event listeners
function setupStarRatingListeners() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("star")) {
      handleStarClick(e.target);
    }
  });

  document.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("star")) {
      handleStarHover(e.target);
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("star")) {
      handleStarMouseOut(e.target);
    }
  });
}

// Handle star click
function handleStarClick(star) {
  const rating = parseInt(star.dataset.value);
  const starRating = star.parentElement;
  const hiddenInput =
    starRating.parentElement.querySelector(".proficiency-level");
  const label = starRating.querySelector(".rating-label");

  // Update rating
  starRating.dataset.rating = rating;
  hiddenInput.value = rating;

  // Update visual stars
  updateStarDisplay(starRating, rating);

  // Update label
  updateRatingLabel(label, rating);

  // Update preview
  updatePreview();
}

// Handle star hover
function handleStarHover(star) {
  const rating = parseInt(star.dataset.value);
  const starRating = star.parentElement;
  updateStarDisplay(starRating, rating, true);
}

// Handle star mouse out
function handleStarMouseOut(star) {
  const starRating = star.parentElement;
  const currentRating = parseInt(starRating.dataset.rating);
  updateStarDisplay(starRating, currentRating);
}

// Update star display
function updateStarDisplay(starRating, rating, isHover = false) {
  const stars = starRating.querySelectorAll(".star");
  stars.forEach((star, index) => {
    const starValue = index + 1;
    star.classList.remove("active", "hover");

    if (starValue <= rating) {
      star.classList.add(isHover ? "hover" : "active");
    }
  });
}

// Update rating label
function updateRatingLabel(label, rating) {
  const labels = {
    1: "Basic",
    2: "Elementary",
    3: "Intermediate",
    4: "Advanced",
    5: "Native/Fluent",
  };

  label.textContent = labels[rating] || "Basic";
}

// Add new education entry
function addEducation() {
  const container = document.getElementById("educationContainer");
  const index = container.children.length;

  const educationHTML = `
        <div class="entry-item" data-type="education" data-index="${index}">
            <div class="entry-header">
                <span class="entry-title">Education ${index + 1}</span>
                <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="institution" placeholder="Boston University" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="degree" placeholder="Bachelor of Science in Computer Science" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>GPA (Optional)</label>
                <input type="text" class="gpa" placeholder="3.4/4.0" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Dates</label>
                ${createDateDropdowns("education-dates", true)}
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="location" placeholder="Boston, MA" oninput="updatePreview()">
            </div>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", educationHTML);
  updatePreview();
}

// Add new experience entry
function addExperience() {
  const container = document.getElementById("experienceContainer");
  const index = container.children.length;

  const experienceHTML = `
        <div class="entry-item" data-type="experience" data-index="${index}">
            <div class="entry-header">
                <span class="entry-title">Experience ${index + 1}</span>
                <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
            </div>
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="title" placeholder="Software Engineer" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="company" placeholder="Tech Company Inc." oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Dates</label>
                ${createDateDropdowns("experience-dates", true)}
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="location" placeholder="Boston, MA" oninput="updatePreview()">
            </div>
            <div class="bullet-points">
                <label>Key Responsibilities & Achievements</label>
                <div class="bullets-container"></div>
                <button type="button" class="add-bullet" onclick="addBulletPoint(this)">Add Bullet Point</button>
            </div>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", experienceHTML);

  // Add initial bullet point
  const newEntry = container.lastElementChild;
  const addBulletBtn = newEntry.querySelector(".add-bullet");
  addBulletPoint(addBulletBtn);

  updatePreview();
}

// Add new project entry
function addProject() {
  const container = document.getElementById("projectsContainer");
  const index = container.children.length;

  const projectHTML = `
        <div class="entry-item" data-type="project" data-index="${index}">
            <div class="entry-header">
                <span class="entry-title">Project ${index + 1}</span>
                <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
            </div>
            <div class="form-group">
                <label>Project Name</label>
                <input type="text" class="title" placeholder="Awesome Project" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Technologies Used</label>
                <input type="text" class="technologies" placeholder="React, Node.js, MongoDB" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Dates</label>
                ${createDateDropdowns("project-dates", true)}
            </div>
            <div class="bullet-points">
                <label>Project Description & Features</label>
                <div class="bullets-container"></div>
                <button type="button" class="add-bullet" onclick="addBulletPoint(this)">Add Bullet Point</button>
            </div>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", projectHTML);

  // Add initial bullet point
  const newEntry = container.lastElementChild;
  const addBulletBtn = newEntry.querySelector(".add-bullet");
  addBulletPoint(addBulletBtn);

  updatePreview();
}

// Add new honor entry
function addHonor() {
  const container = document.getElementById("honorsContainer");
  const index = container.children.length;

  const honorHTML = `
        <div class="entry-item" data-type="honor" data-index="${index}">
            <div class="entry-header">
                <span class="entry-title">Honor ${index + 1}</span>
                <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
            </div>
            <div class="form-group">
                <label>Award/Honor Title</label>
                <input type="text" class="title" placeholder="Certificate of Merit" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="description" rows="2" placeholder="Brief description of the award or achievement..." oninput="updatePreview()"></textarea>
            </div>
            <div class="form-group">
                <label>Date</label>
                ${createDateDropdowns("honor-dates", false)}
            </div>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", honorHTML);
  updatePreview();
}

// Add new certification entry
function addCertification() {
  const container = document.getElementById("certificationsContainer");
  const index = container.children.length;

  const certificationHTML = `
        <div class="entry-item" data-type="certification" data-index="${index}">
            <div class="entry-header">
                <span class="entry-title">Certification ${index + 1}</span>
                <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
            </div>
            <div class="form-group">
                <label>Certification Name</label>
                <input type="text" class="title" placeholder="Prompt Engineering for ChatGPT" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Issuing Organization</label>
                <input type="text" class="issuer" placeholder="Vanderbilt University" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Date</label>
                ${createDateDropdowns("certification-dates", false)}
            </div>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", certificationHTML);
  updatePreview();
}

// Add new language entry
function addLanguage() {
  const container = document.getElementById("languagesContainer");
  const index = container.children.length;

  const languageHTML = `
        <div class="entry-item" data-type="language" data-index="${index}">
            <div class="entry-header">
                <span class="entry-title">Language ${index + 1}</span>
                <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
            </div>
            <div class="form-group">
                <label>Language</label>
                <input type="text" class="language-name" placeholder="English" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Proficiency Level</label>
                <div class="star-rating" data-rating="5">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                    <span class="rating-label">Native/Fluent</span>
                </div>
                <input type="hidden" class="proficiency-level" value="5">
            </div>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", languageHTML);

  // Initialize the star rating for the new entry
  const newEntry = container.lastElementChild;
  const starRating = newEntry.querySelector(".star-rating");
  if (starRating) {
    updateStarDisplay(starRating, 5); // Default to 5 stars
  }

  updatePreview();
}

// Add bullet point to an entry
function addBulletPoint(button) {
  const container = button.previousElementSibling;
  const bulletHTML = `
        <div class="bullet-point">
            <textarea placeholder="Describe your achievement or responsibility..." oninput="updatePreview()"></textarea>
            <button type="button" class="bullet-remove" onclick="removeBulletPoint(this)">×</button>
        </div>
    `;

  container.insertAdjacentHTML("beforeend", bulletHTML);
  updatePreview();
}

// Remove bullet point
function removeBulletPoint(button) {
  button.parentElement.remove();
  updatePreview();
}

// Remove entry
function removeEntry(button) {
  button.closest(".entry-item").remove();
  updatePreview();
}

// Update the live preview
function updatePreview() {
  updatePersonalInfo();
  updateSummary();
  updateEducationPreview();
  updateExperiencePreview();
  updateProjectsPreview();
  updateHonorsPreview();
  updateCertificationsPreview();
  updateSkillsPreview();
  updateLanguagesPreview();
}

function updatePersonalInfo() {
  const fullName = document.getElementById("fullName").value || "Your Name";
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;
  const twitter = document.getElementById("twitter").value;

  document.getElementById("previewName").textContent = fullName;

  // Update phone
  const phoneElement = document.getElementById("previewPhone");
  const phoneLink = phoneElement.querySelector(".contact-link");
  const phoneText = phoneLink.querySelector(".contact-text");
  if (phone.trim()) {
    phoneText.textContent = phone;
    // Create tel: link - remove spaces, parentheses, and dashes for the href
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    phoneLink.href = `tel:${cleanPhone}`;
    phoneElement.style.display = "flex";
  } else {
    phoneElement.style.display = "none";
  }

  // Update email
  const emailElement = document.getElementById("previewEmail");
  const emailLink = emailElement.querySelector(".contact-link");
  if (email.trim()) {
    emailLink.textContent = email;
    emailLink.href = `mailto:${email}`;
    emailElement.style.display = "flex";
  } else {
    emailElement.style.display = "none";
  }

  // Update LinkedIn
  const linkedinElement = document.getElementById("previewLinkedin");
  const linkedinLink = linkedinElement.querySelector(".contact-link");
  if (linkedin.trim()) {
    linkedinLink.textContent = "LinkedIn";
    linkedinLink.href = linkedin.startsWith("http")
      ? linkedin
      : `https://${linkedin}`;
    linkedinElement.style.display = "flex";
  } else {
    linkedinElement.style.display = "none";
  }

  // Update GitHub
  const githubElement = document.getElementById("previewGithub");
  const githubLink = githubElement.querySelector(".contact-link");
  if (github.trim()) {
    githubLink.textContent = "GitHub";
    githubLink.href = github.startsWith("http") ? github : `https://${github}`;
    githubElement.style.display = "flex";
  } else {
    githubElement.style.display = "none";
  }

  // Update Twitter/X
  const twitterElement = document.getElementById("previewTwitter");
  const twitterLink = twitterElement.querySelector(".contact-link");
  const twitterText = twitterLink.querySelector(".contact-text");
  if (twitter.trim()) {
    twitterText.textContent = "";
    twitterLink.href = twitter.startsWith("http")
      ? twitter
      : `https://${twitter}`;
    twitterElement.style.display = "flex";
  } else {
    twitterElement.style.display = "none";
  }
}

function updateSummary() {
  const summary = document.getElementById("summary").value;
  const summarySection = document.getElementById("previewSummarySection");
  const summaryText = document.getElementById("previewSummary");

  if (summary.trim()) {
    summaryText.textContent = summary;
    summarySection.style.display = "block";
  } else {
    summarySection.style.display = "none";
  }
}

function updateEducationPreview() {
  const container = document.getElementById("educationContainer");
  const preview = document.getElementById("previewEducation");
  const section = document.getElementById("previewEducationSection");

  if (container.children.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  preview.innerHTML = "";

  Array.from(container.children).forEach((entry) => {
    const institution = entry.querySelector(".institution").value;
    const degree = entry.querySelector(".degree").value;
    const gpa = entry.querySelector(".gpa").value;
    const dates = entry.querySelector(".dates").value;
    const location = entry.querySelector(".location").value;

    if (institution || degree) {
      const educationHTML = `
                <div class="resume-entry">
                    <div class="entry-header-preview">
                        <div>
                            <div class="entry-title-preview">${institution}</div>
                            <div class="entry-subtitle-preview">${degree}${
        gpa ? `, GPA: ${gpa}` : ""
      }</div>
                        </div>
                        <div>
                            <div class="entry-date-preview">${dates}</div>
                            <div class="entry-location-preview">${location}</div>
                        </div>
                    </div>
                </div>
            `;
      preview.insertAdjacentHTML("beforeend", educationHTML);
    }
  });
}

function updateExperiencePreview() {
  const container = document.getElementById("experienceContainer");
  const preview = document.getElementById("previewExperience");
  const section = document.getElementById("previewExperienceSection");

  if (container.children.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  preview.innerHTML = "";

  Array.from(container.children).forEach((entry) => {
    const title = entry.querySelector(".title").value;
    const company = entry.querySelector(".company").value;
    const dates = entry.querySelector(".dates").value;
    const location = entry.querySelector(".location").value;
    const bullets = Array.from(entry.querySelectorAll(".bullet-point textarea"))
      .map((textarea) => textarea.value.trim())
      .filter((bullet) => bullet);

    if (title || company) {
      let bulletsHTML = "";
      if (bullets.length > 0) {
        bulletsHTML = `
                    <div class="entry-bullets-preview">
                        <ul>
                            ${bullets
                              .map((bullet) => `<li>${bullet}</li>`)
                              .join("")}
                        </ul>
                    </div>
                `;
      }

      const experienceHTML = `
                <div class="resume-entry">
                    <div class="entry-header-preview">
                        <div>
                            <div class="entry-title-preview">${title}</div>
                            <div class="entry-subtitle-preview">${company}</div>
                        </div>
                        <div>
                            <div class="entry-date-preview">${dates}</div>
                            <div class="entry-location-preview">${location}</div>
                        </div>
                    </div>
                    ${bulletsHTML}
                </div>
            `;
      preview.insertAdjacentHTML("beforeend", experienceHTML);
    }
  });
}

function updateProjectsPreview() {
  const container = document.getElementById("projectsContainer");
  const preview = document.getElementById("previewProjects");
  const section = document.getElementById("previewProjectsSection");

  if (container.children.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  preview.innerHTML = "";

  Array.from(container.children).forEach((entry) => {
    const title = entry.querySelector(".title").value;
    const technologies = entry.querySelector(".technologies").value;
    const dates = entry.querySelector(".dates").value;
    const bullets = Array.from(entry.querySelectorAll(".bullet-point textarea"))
      .map((textarea) => textarea.value.trim())
      .filter((bullet) => bullet);

    if (title || technologies) {
      let bulletsHTML = "";
      if (bullets.length > 0) {
        bulletsHTML = `
                    <div class="entry-bullets-preview">
                        <ul>
                            ${bullets
                              .map((bullet) => `<li>${bullet}</li>`)
                              .join("")}
                        </ul>
                    </div>
                `;
      }

      // Format title with technologies inline (LaTeX style)
      const projectTitleHTML = technologies
        ? `<span class="project-title-bold">${title}</span> | <span class="project-tech-italic">${technologies}</span>`
        : `<span class="project-title-bold">${title}</span>`;

      const projectHTML = `
                <div class="resume-entry">
                    <div class="entry-header-preview">
                        <div class="entry-title-preview">${projectTitleHTML}</div>
                        <div class="entry-date-preview">${dates}</div>
                    </div>
                    ${bulletsHTML}
                </div>
            `;
      preview.insertAdjacentHTML("beforeend", projectHTML);
    }
  });
}

function updateSkillsPreview() {
  const languages = document.getElementById("languages").value;
  const frameworks = document.getElementById("frameworks").value;
  const developerTools = document.getElementById("developerTools").value;
  const libraries = document.getElementById("libraries").value;

  const preview = document.getElementById("previewSkills");
  const section = document.getElementById("previewSkillsSection");

  const skills = [
    { label: "Languages", value: languages },
    { label: "Frameworks", value: frameworks },
    { label: "Developer Tools", value: developerTools },
    { label: "Libraries", value: libraries },
  ].filter((skill) => skill.value.trim());

  if (skills.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";

  const skillsHTML = skills
    .map(
      (skill) => `
        <div class="skill-category">
            <span class="skill-label">${skill.label}:</span>
            <span class="skill-value">${skill.value}</span>
        </div>
    `
    )
    .join("");

  preview.innerHTML = `<div class="skills-preview">${skillsHTML}</div>`;
}

function updateHonorsPreview() {
  const container = document.getElementById("honorsContainer");
  const preview = document.getElementById("previewHonors");
  const section = document.getElementById("previewHonorsSection");

  if (container.children.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  preview.innerHTML = "";

  Array.from(container.children).forEach((entry) => {
    const title = entry.querySelector(".title").value;
    const description = entry.querySelector(".description").value;
    const dates = entry.querySelector(".dates").value;

    if (title) {
      const honorHTML = `
                <div class="resume-entry">
                    <div class="entry-header-preview">
                        <div>
                            <div class="entry-title-preview">${title}</div>
                            ${
                              description
                                ? `<div class="entry-subtitle-preview">${description}</div>`
                                : ""
                            }
                        </div>
                        <div class="entry-date-preview">${dates}</div>
                    </div>
                </div>
            `;
      preview.insertAdjacentHTML("beforeend", honorHTML);
    }
  });
}

function updateCertificationsPreview() {
  const container = document.getElementById("certificationsContainer");
  const preview = document.getElementById("previewCertifications");
  const section = document.getElementById("previewCertificationsSection");

  if (container.children.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  preview.innerHTML = "";

  Array.from(container.children).forEach((entry) => {
    const title = entry.querySelector(".title").value;
    const issuer = entry.querySelector(".issuer").value;
    const dates = entry.querySelector(".dates").value;

    if (title) {
      const certificationHTML = `
                <div class="resume-entry">
                    <div class="entry-header-preview">
                        <div>
                            <div class="entry-title-preview">${title}</div>
                            ${
                              issuer
                                ? `<div class="entry-subtitle-preview">Issued by ${issuer}</div>`
                                : ""
                            }
                        </div>
                        <div class="entry-date-preview">${dates}</div>
                    </div>
                </div>
            `;
      preview.insertAdjacentHTML("beforeend", certificationHTML);
    }
  });
}

function updateLanguagesPreview() {
  const container = document.getElementById("languagesContainer");
  const preview = document.getElementById("previewLanguages");
  const section = document.getElementById("previewLanguagesSection");

  if (container.children.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  preview.innerHTML = "";

  const languageEntries = [];

  Array.from(container.children).forEach((entry) => {
    const languageName = entry.querySelector(".language-name").value;
    const proficiencyLevel = parseInt(
      entry.querySelector(".proficiency-level").value
    );

    if (languageName) {
      // Generate star rating
      const stars =
        "★".repeat(proficiencyLevel) + "☆".repeat(5 - proficiencyLevel);

      languageEntries.push(`${languageName} ${stars}`);
    }
  });

  if (languageEntries.length > 0) {
    const languagesHTML = `
      <div class="languages-row">
        ${languageEntries.join(" | ")}
      </div>
    `;
    preview.innerHTML = languagesHTML;
  }
}

// Load sample data
function loadSampleData() {
  // Personal information
  document.getElementById("fullName").value = sampleData.personal.fullName;
  document.getElementById("phone").value = sampleData.personal.phone;
  document.getElementById("email").value = sampleData.personal.email;
  document.getElementById("linkedin").value = sampleData.personal.linkedin;
  document.getElementById("github").value = sampleData.personal.github;
  document.getElementById("twitter").value = sampleData.personal.twitter;
  document.getElementById("summary").value = sampleData.summary;

  // Skills
  document.getElementById("languages").value = sampleData.skills.languages;
  document.getElementById("frameworks").value = sampleData.skills.frameworks;
  document.getElementById("developerTools").value =
    sampleData.skills.developerTools;
  document.getElementById("libraries").value = sampleData.skills.libraries;

  // Clear existing entries
  document.getElementById("educationContainer").innerHTML = "";
  document.getElementById("experienceContainer").innerHTML = "";
  document.getElementById("projectsContainer").innerHTML = "";

  // Load education
  sampleData.education.forEach(() => {
    addEducation();
  });

  const educationEntries = document.querySelectorAll(
    "#educationContainer .entry-item"
  );
  educationEntries.forEach((entry, index) => {
    const edu = sampleData.education[index];
    entry.querySelector(".institution").value = edu.institution;
    entry.querySelector(".degree").value = edu.degree;
    entry.querySelector(".gpa").value = edu.gpa;

    // Set date dropdowns
    const dateContainer = entry.querySelector(".date-range");
    if (dateContainer) {
      setDropdownFromDateString(dateContainer, edu.dates);
    }

    entry.querySelector(".location").value = edu.location;
  });

  // Load experience
  sampleData.experience.forEach(() => {
    addExperience();
  });

  const experienceEntries = document.querySelectorAll(
    "#experienceContainer .entry-item"
  );
  experienceEntries.forEach((entry, index) => {
    const exp = sampleData.experience[index];
    entry.querySelector(".title").value = exp.title;
    entry.querySelector(".company").value = exp.company;

    // Set date dropdowns
    const dateContainer = entry.querySelector(".date-range");
    if (dateContainer) {
      setDropdownFromDateString(dateContainer, exp.dates);
    }

    entry.querySelector(".location").value = exp.location;

    // Clear existing bullets and add new ones
    const bulletsContainer = entry.querySelector(".bullets-container");
    bulletsContainer.innerHTML = "";

    exp.bullets.forEach((bullet) => {
      const addBulletBtn = entry.querySelector(".add-bullet");
      addBulletPoint(addBulletBtn);
      const lastBullet =
        bulletsContainer.lastElementChild.querySelector("textarea");
      lastBullet.value = bullet;
    });
  });

  // Load projects
  sampleData.projects.forEach(() => {
    addProject();
  });

  const projectEntries = document.querySelectorAll(
    "#projectsContainer .entry-item"
  );
  projectEntries.forEach((entry, index) => {
    const proj = sampleData.projects[index];
    entry.querySelector(".title").value = proj.title;
    entry.querySelector(".technologies").value = proj.technologies;

    // Set date dropdowns
    const dateContainer = entry.querySelector(".date-range");
    if (dateContainer) {
      setDropdownFromDateString(dateContainer, proj.dates);
    }

    // Clear existing bullets and add new ones
    const bulletsContainer = entry.querySelector(".bullets-container");
    bulletsContainer.innerHTML = "";

    proj.bullets.forEach((bullet) => {
      const addBulletBtn = entry.querySelector(".add-bullet");
      addBulletPoint(addBulletBtn);
      const lastBullet =
        bulletsContainer.lastElementChild.querySelector("textarea");
      lastBullet.value = bullet;
    });
  });

  // Load language proficiency
  document.getElementById("languagesContainer").innerHTML = "";
  sampleData.languageProficiency.forEach(() => {
    addLanguage();
  });

  const languageEntries = document.querySelectorAll(
    "#languagesContainer .entry-item"
  );
  languageEntries.forEach((entry, index) => {
    const lang = sampleData.languageProficiency[index];
    entry.querySelector(".language-name").value = lang.language;

    // Set star rating
    const starRating = entry.querySelector(".star-rating");
    const hiddenInput = entry.querySelector(".proficiency-level");
    const label = entry.querySelector(".rating-label");

    if (starRating && hiddenInput && label) {
      starRating.dataset.rating = lang.proficiency;
      hiddenInput.value = lang.proficiency;
      updateStarDisplay(starRating, lang.proficiency);
      updateRatingLabel(label, lang.proficiency);
    }
  });

  updatePreview();
}

// Export to PDF
function exportToPDF() {
  const element = document.getElementById("resumePreview");
  const options = {
    margin: 0.5,
    filename: `${document.getElementById("fullName").value || "Resume"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
}

// Export to Image
function exportToImage() {
  const element = document.getElementById("resumePreview");
  const filename = `${
    document.getElementById("fullName").value || "Resume"
  }.png`;

  html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Get current resume data
function getCurrentResumeData() {
  const data = {
    personal: {
      fullName: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      linkedin: document.getElementById("linkedin").value,
      github: document.getElementById("github").value,
      twitter: document.getElementById("twitter").value,
    },
    summary: document.getElementById("summary").value,
    education: [],
    experience: [],
    projects: [],
    skills: {
      languages: document.getElementById("languages").value,
      frameworks: document.getElementById("frameworks").value,
      developerTools: document.getElementById("developerTools").value,
      libraries: document.getElementById("libraries").value,
    },
  };

  // Get education data
  document
    .querySelectorAll("#educationContainer .entry-item")
    .forEach((entry) => {
      data.education.push({
        institution: entry.querySelector(".institution").value,
        degree: entry.querySelector(".degree").value,
        gpa: entry.querySelector(".gpa").value,
        dates: entry.querySelector(".dates").value,
        location: entry.querySelector(".location").value,
      });
    });

  // Get experience data
  document
    .querySelectorAll("#experienceContainer .entry-item")
    .forEach((entry) => {
      const bullets = Array.from(
        entry.querySelectorAll(".bullet-point textarea")
      )
        .map((textarea) => textarea.value.trim())
        .filter((bullet) => bullet);

      data.experience.push({
        title: entry.querySelector(".title").value,
        company: entry.querySelector(".company").value,
        dates: entry.querySelector(".dates").value,
        location: entry.querySelector(".location").value,
        bullets: bullets,
      });
    });

  // Get projects data
  document
    .querySelectorAll("#projectsContainer .entry-item")
    .forEach((entry) => {
      const bullets = Array.from(
        entry.querySelectorAll(".bullet-point textarea")
      )
        .map((textarea) => textarea.value.trim())
        .filter((bullet) => bullet);

      data.projects.push({
        title: entry.querySelector(".title").value,
        technologies: entry.querySelector(".technologies").value,
        dates: entry.querySelector(".dates").value,
        bullets: bullets,
      });
    });

  return data;
}

// Generate DOCX content (simplified version)
function generateDocxContent(data) {
  const content = [];

  // Add header
  content.push(
    new docx.Paragraph({
      children: [
        new docx.TextRun({
          text: data.personal.fullName,
          bold: true,
          size: 32,
        }),
      ],
      alignment: docx.AlignmentType.CENTER,
    })
  );

  // Add contact info
  const contactInfo = [
    data.personal.phone,
    data.personal.email,
    data.personal.linkedin,
    data.personal.github,
    data.personal.twitter,
  ]
    .filter((info) => info)
    .join(" | ");

  if (contactInfo) {
    content.push(
      new docx.Paragraph({
        children: [new docx.TextRun({ text: contactInfo })],
        alignment: docx.AlignmentType.CENTER,
      })
    );
  }

  // Add summary
  if (data.summary) {
    content.push(
      new docx.Paragraph({
        children: [
          new docx.TextRun({ text: "PROFESSIONAL SUMMARY", bold: true }),
        ],
        spacing: { before: 240 },
      }),
      new docx.Paragraph({
        children: [new docx.TextRun({ text: data.summary })],
      })
    );
  }

  return content;
}

// Data persistence functions
function saveResumeData() {
  const data = getCurrentResumeData();
  localStorage.setItem("resumeBuilderData", JSON.stringify(data));
  alert("Resume data saved locally! 💾");
}

function loadResumeData() {
  const savedData = localStorage.getItem("resumeBuilderData");
  if (savedData) {
    const data = JSON.parse(savedData);
    loadDataIntoForm(data);
    alert("Resume data loaded from local storage! 📁");
  } else {
    alert('No saved data found. Use "Load Sample" to get started! 📝');
  }
}

function loadDataIntoForm(data) {
  // Load personal information
  Object.keys(data.personal).forEach((key) => {
    const element = document.getElementById(key);
    if (element) element.value = data.personal[key];
  });

  // Load summary
  if (data.summary) {
    document.getElementById("summary").value = data.summary;
  }

  // Load skills
  Object.keys(data.skills).forEach((key) => {
    const element = document.getElementById(key);
    if (element) element.value = data.skills[key];
  });

  // Clear and load sections
  document.getElementById("educationContainer").innerHTML = "";
  document.getElementById("experienceContainer").innerHTML = "";
  document.getElementById("projectsContainer").innerHTML = "";

  // Load education, experience, and projects similar to loadSampleData
  // ... (implementation details)

  updatePreview();
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "s":
        e.preventDefault();
        saveResumeData();
        break;
      case "p":
        e.preventDefault();
        exportToPDF();
        break;
    }
  }
});

// Auto-save functionality
setInterval(function () {
  const data = getCurrentResumeData();
  localStorage.setItem("resumeBuilderAutoSave", JSON.stringify(data));
}, 30000); // Auto-save every 30 seconds
