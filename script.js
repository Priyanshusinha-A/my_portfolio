document.addEventListener('DOMContentLoaded', function () {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('.cursor');
  const terminal = document.getElementById('terminal');
  const commandInput = document.getElementById('commandInput');
  const suggestionBox = document.getElementById('suggestion-box');
  const output = document.getElementById('output');
  const reviewFormContainer = document.getElementById('reviewFormContainer');
  const reviewForm = document.getElementById('reviewForm');

  const terminalPopup = document.getElementById('terminalPopup');
  const popupBody = document.getElementById('popupBody');
  const closePopupButton = document.getElementById('closePopup');

  // Typing effect
  const text = "WELCOME TO MY PORTFOLIO";
  let index = 0;
  function typeEffect() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    } else {
      if (cursor) cursor.style.display = 'none';
      setTimeout(() => {
        document.querySelector('.typing-container').style.display = 'none';
        terminal.style.display = 'block';
      }, 1000);
    }
  }

  typingText.textContent = "";
  typeEffect();

  // Available commands
  const commands = {
    about: `
      > Hey there! I'm <span class="highlight">Priyanshu Kumar Sinha</span>, a driven and enthusiastic Computer Science undergraduate at <span class="highlight">Black Diamond College of Engineering and Technology</span>. I'm not just learning tech — I'm <em>living</em> it.<br><br>
      > My journey in technology is fueled by a relentless curiosity and a genuine passion for <span class="highlight">Cybersecurity</span> and <span class="highlight">Full Stack Web Development</span>. From designing clean, user-focused interfaces to diving deep into system vulnerabilities, I thrive on turning ideas into impactful digital solutions.<br><br>
      > 🛡️ With hands-on experience in <span class="highlight">Penetration Testing</span> and <span class="highlight">Bug Hunting</span>, I don’t just build websites — I secure them. I’ve sharpened my skills in <span class="highlight">HTML</span>, <span class="highlight">CSS</span>, <span class="highlight">JavaScript</span>, <span class="highlight">Java</span>, <span class="highlight">C</span>, and <span class="highlight">C++</span>, while exploring the exciting potential of <span class="highlight">AI technologies</span> like <span class="highlight">OpenAI</span>.<br><br>
      > 🚀 I believe in building solutions that are not only powerful and scalable, but also safe, ethical, and accessible. Whether it's developing secure web platforms or automating systems with AI, I'm here to shape the future of tech — one project at a time.<br><br>
      > 💡 I’m always open to exciting collaborations, innovative ideas, or just a good geeky conversation. Let's connect and explore the world of <span class="highlight">cybersecurity</span>, <span class="highlight">AI innovation</span>, and everything in between!<br>
    `,
    skills: "> HTML, CSS, JavaScript, C, C++, Java, Cyber Security, Data Analysis",
    projects: `
      > Projects:
      <ul>
        <li><a href="https://priyanshusinha-a.github.io/home-page/" target="_blank">Home Page - Cybersecurity and Web Development Resources</a></li>
        <li><a href="https://github.com/Priyanshusinha-A/E-PlantShopping-website" target="_blank">E-Plant Shopping - React + Express E-commerce</a></li>
        <li><a href="https://github.com/Priyanshusinha-A/expressBookReviews" target="_blank">Express Book Reviews - Backend Book Management</a></li>
      </ul>
    `,
    education: `
      > Education & Certifications
      - 🎓 <span class="highlight">B.Tech in Computer Science</span> - Ongoing (Black Diamond College of Engineering and Technology)<br>
      - 🏅 <span class="highlight">DCSC (Drop Certified Security Course)</span> - Completed in 2024<br>
      - 💻 <span class="highlight">ADCA (Advanced Diploma in Computer Applications) Hons</span> - Outstanding (2023)<br>
      - 🏫 <span class="highlight">12th in Science</span> - Bagwan Surya Narayan College, Deo (2022)<br>
      - 🏫 <span class="highlight">10th Standard</span> - Ganghar Public School (2020)<br>
    `,
    contact: `
      > Contact Me<br>
      Email: <a href="mailto:priyanshusinhatt@gmail.com">priyanshusinhatt@gmail.com</a><br>
      LinkedIn: <a href="https://www.linkedin.com/in/priyanshu-kumar-6716642b6/" target="_blank">LinkedIn</a><br>
      GitHub: <a href="https://github.com/Priyanshusinha-A/" target="_blank">GitHub</a>
    `,
    clear: () => {
      output.innerHTML = "";
      addToTerminal("> Screen cleared. Type a command to continue.");
    },
    review: () => {
      reviewFormContainer.style.display = 'block';
      addToTerminal("> Review form opened. Type 'clear' to exit without submitting.");
    },
    help: () => {
      addToTerminal(`> Available commands:
        <ul>
          <li><span class="highlight">about</span> - About me</li>
          <li><span class="highlight">skills</span> - My skills</li>
          <li><span class="highlight">projects</span> - Projects</li>
          <li><span class="highlight">education</span> - Education and certifications</li>
          <li><span class="highlight">contact</span> - Contact me</li>
          <li><span class="highlight">review</span> - Review form</li>
          <li><span class="highlight">clear</span> - Clear the screen</li>
          <li><span class="highlight">help</span> - Show all commands</li>
        </ul>`);
    }
  };

  function addToTerminal(text) {
    const newLine = document.createElement('div');
    newLine.className = 'line';
    newLine.innerHTML = text;
    output.appendChild(newLine);
    output.scrollTop = output.scrollHeight;
  }

  let currentSuggestions = [];
  let selectedIndex = -1;

  // Show suggestions
  commandInput.addEventListener('input', function () {
    const input = commandInput.value.trim().toLowerCase();
    suggestionBox.innerHTML = '';
    selectedIndex = -1;

    if (!input) {
      suggestionBox.style.display = 'none';
      return;
    }

    currentSuggestions = Object.keys(commands).filter(command =>
      command.startsWith(input)
    );

    if (currentSuggestions.length > 0) {
      currentSuggestions.forEach((suggestion, i) => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', function () {
          suggestionBox.style.display = 'none';
          commandInput.value = ''; // ✅ Clear input
          executeCommand(suggestion);
        });
        suggestionBox.appendChild(suggestionElement);
      });
      suggestionBox.style.display = 'block';
    } else {
      suggestionBox.style.display = 'none';
    }
  });

  // Keyboard navigation
  commandInput.addEventListener('keydown', function (event) {
    const suggestions = suggestionBox.querySelectorAll('.suggestion');

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % suggestions.length;
      updateActiveSuggestion(suggestions);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
      updateActiveSuggestion(suggestions);
    } else if (event.key === 'Enter') {
      event.preventDefault();

      let command = commandInput.value.trim().toLowerCase();

      // ✅ Use suggestion if selected
      if (selectedIndex >= 0 && selectedIndex < currentSuggestions.length) {
        command = currentSuggestions[selectedIndex];
      }

      suggestionBox.style.display = 'none';
      commandInput.value = ''; // ✅ Clear input after execution
      executeCommand(command);
    }
  });

  function updateActiveSuggestion(suggestions) {
    suggestions.forEach((s, i) => {
      s.classList.toggle('active', i === selectedIndex);
    });
  }

  function executeCommand(command) {
    output.innerHTML = '';
    if (commands[command]) {
      if (typeof commands[command] === 'function') {
        commands[command]();
      } else {
        addToTerminal(`> ${command}`);
        addToTerminal(commands[command]);
      }

      // Optional: show command output in popup
      if (terminalPopup && popupBody) {
        terminalPopup.style.display = 'block';
        popupBody.innerHTML = `<p>${commands[command]}</p>`;
      }
    } else {
      addToTerminal(`> Command not found: "${command}". Type "help" for a list of available commands`);
    }
  }

  // Review form submission
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const experience = document.querySelector('input[name="experience"]:checked')?.value;
    const comment = document.getElementById('comment').value;

    if (!name || !experience || !comment) {
      addToTerminal("> Please fill out all fields before submitting.");
      return;
    }

    fetch('https://my-portfolio-1-9b3k.onrender.com/send-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, experience, comment })
    })
      .then(response => response.json())
      .then(data => {
        addToTerminal(`> Thank you, ${name}! Your ${experience.toLowerCase()} feedback has been sent successfully.`);
        reviewFormContainer.style.display = 'none';
        e.target.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        addToTerminal("> Failed to send feedback. Please try again.");
      });
  });

  // Close popup
  if (closePopupButton) {
    closePopupButton.addEventListener('click', function () {
      terminalPopup.style.display = 'none';
    });
  }
});
