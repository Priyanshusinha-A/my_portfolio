document.addEventListener('DOMContentLoaded', function () {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('.cursor');
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('commandInput');
  const output = document.getElementById('output');
  const reviewFormContainer = document.getElementById('reviewFormContainer');
  const loadingPopup = document.getElementById('loadingPopup');

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

  const commands = {
    about: `
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
      > Contact Me
      Email: <a href="mailto:priyanshusinhatt@gmail.com">priyanshusinhatt@gmail.com</a><br>
      LinkedIn: <a href="https://www.linkedin.com/in/priyanshu-kumar-6716642b6/" target="_blank">LinkedIn</a><br>
      GitHub: <a href="https://github.com/Priyanshusinha-A/" target="_blank">GitHub</a>
    `,
    clear: () => {
      output.innerHTML = "";
      reviewFormContainer.style.display = 'none';
      addToTerminal("> Screen cleared. Type a command to continue.");
    },
    review: () => {
      reviewFormContainer.style.display = 'block';
      addToTerminal("> Review form opened. Type 'clear' to exit without submitting.");
    }
  };

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      input.value = '';

      if (commands[command]) {
        if (typeof commands[command] === 'function') {
          commands[command]();
        } else {
          addToTerminal(`> ${command}`);
          addToTerminal(commands[command]);
        }
      } else {
        addToTerminal(`> Command not found: "${command}". Try: about, skills, projects, education, contact, review, clear`);
      }
    }
  });

  function addToTerminal(text) {
    const newLine = document.createElement('div');
    newLine.className = 'line';
    newLine.innerHTML = text;
    output.appendChild(newLine);
    output.scrollTop = output.scrollHeight;
  }

  document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const experience = document.querySelector('input[name="experience"]:checked')?.value;
    const comment = document.getElementById('comment').value;

    if (!name || !experience || !comment) {
      addToTerminal("> Please fill out all fields before submitting.");
      return;
    }

    loadingPopup.style.display = 'flex';

    fetch('https://my-portfolio-1-9b3k.onrender.com/send-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, experience, comment })
    })
    .then(response => response.json())
    .then(data => {
      addToTerminal(`> Thank you, ${name}! Your ${experience.toLowerCase()} feedback has been sent successfully.`);
      reviewFormContainer.style.display = 'none';
      loadingPopup.style.display = 'none';
      e.target.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      addToTerminal("> Failed to send feedback. Please try again.");
      loadingPopup.style.display = 'none';
    });
  });
});
