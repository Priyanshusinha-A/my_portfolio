document.addEventListener('DOMContentLoaded', function () {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('.cursor');
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('commandInput');
  const output = document.getElementById('output');
  const reviewModal = document.getElementById('reviewModal');
  const loadingPopup = document.getElementById('loadingPopup');
  const closeModal = document.getElementById('closeModal');
  const suggestions = document.getElementById('suggestions');

  const text = "WELCOME TO MY PORTFOLIO";
  let index = 0;
  let commandHistory = [];
  let historyIndex = -1;
  let isDarkMode = true;

  const commandList = ['about', 'skills', 'projects', 'education', 'contact', 'review', 'clear', 'theme'];

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
        input.focus();
      }, 1000);
    }
  }

  typingText.textContent = "";
  typeEffect();

  const commands = {
    about: `
> Hey there! I'm <span class="highlight">Priyanshu Kumar Sinha</span>, a driven and enthusiastic Computer Science undergraduate at <span class="highlight">Black Diamond College of Engineering and Technology</span>. I'm not just learning tech — I'm <em>living</em> it.<br><br>

> My journey in technology is fueled by a relentless curiosity and a genuine passion for <span class="highlight">Cybersecurity</span> and <span class="highlight">Full Stack Web Development</span>. From designing clean, user-focused interfaces to diving deep into system vulnerabilities, I thrive on turning ideas into impactful digital solutions.<br><br>

> 🛡️ With hands-on experience in <span class="highlight">Penetration Testing</span> and <span class="highlight">Bug Hunting</span>, I don’t just build websites — I secure them. I’ve sharpened my skills in <span class="highlight">HTML</span>, <span class="highlight">CSS</span>, <span class="highlight">JavaScript</span>, <span class="highlight">Java</span>, <span class="highlight">C</span>, and <span class="highlight">C++</span>, while exploring the exciting potential of <span class="highlight">AI technologies</span> like <span class="highlight">OpenAI</span>.<br><br>

> 🚀 I believe in building solutions that are not only powerful and scalable, but also safe, ethical, and accessible. Whether it's developing secure web platforms or automating systems with AI, I'm here to shape the future of tech — one project at a time.<br><br>

> 💡 I’m always open to exciting collaborations, innovative ideas, or just a good geeky conversation. Let's connect and explore the world of <span class="highlight">cybersecurity</span>, <span class="highlight">AI innovation</span>, and everything in between!<br>
     `,
    skills: `> HTML, CSS, JavaScript, Java, C, C++, Cybersecurity, AI, Penetration Testing`,
    projects: `
> Projects:
<ul>
  <li><a href="https://priyanshusinha-a.github.io/home-page/" target="_blank">Home Page</a></li>
  <li><a href="https://github.com/Priyanshusinha-A/E-PlantShopping-website" target="_blank">E-Plant Shopping</a></li>
  <li><a href="https://github.com/Priyanshusinha-A/expressBookReviews" target="_blank">Express Book Reviews</a></li>
</ul>`,
    education: `
> Education & Certifications:
- 🎓 <span class="highlight">B.Tech CSE</span> - BDCE
- 🏅 DCSC - 2024
- 💻 ADCA Hons - 2023
- 🏫 12th - BSN College, Deo (2022)
- 🏫 10th - Ganghar Public School (2020)
    `,
    contact: `
> Contact Me:
Email: <a href="mailto:priyanshusinhatt@gmail.com">priyanshusinhatt@gmail.com</a><br>
LinkedIn: <a href="https://www.linkedin.com/in/priyanshu-kumar-6716642b6/" target="_blank">LinkedIn</a><br>
GitHub: <a href="https://github.com/Priyanshusinha-A/" target="_blank">GitHub</a>
    `,
    review: () => {
      reviewModal.classList.add('active');
      addToTerminal("> Review popup opened. Fill out the form or type 'clear' to close.");
    },
    clear: () => {
      output.innerHTML = "";
      reviewModal.classList.remove('active');
      addToTerminal("> Screen cleared. Type a command to continue.");
    },
    theme: () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle('light-theme', !isDarkMode);
      addToTerminal(`> Theme switched to ${isDarkMode ? 'dark' : 'light'} mode.`);
    }
  };

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      if (!command) return;
      input.value = '';
      suggestions.innerHTML = '';
      commandHistory.push(command);
      historyIndex = commandHistory.length;

      if (commands[command]) {
        addToTerminal(`> ${command}`);
        if (typeof commands[command] === 'function') {
          commands[command]();
        } else {
          addToTerminal(commands[command]);
        }
      } else {
        addToTerminal(`> Unknown command: "${command}". Try: ${commandList.join(', ')}`);
      }
    }

    // Command history
    if (event.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    }

    if (event.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        input.value = '';
        historyIndex = commandHistory.length;
      }
    }
  });

  // Autocomplete suggestions
  input.addEventListener('input', function () {
    const val = input.value.toLowerCase();
    suggestions.innerHTML = '';
    if (val.length === 0) return;
    const matches = commandList.filter(cmd => cmd.startsWith(val));
    matches.forEach(match => {
      const div = document.createElement('div');
      div.className = 'suggestion';
      div.textContent = match;
      div.addEventListener('click', () => {
        input.value = match;
        suggestions.innerHTML = '';
        input.focus();
      });
      suggestions.appendChild(div);
    });
  });

  closeModal.addEventListener('click', () => {
    reviewModal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      reviewModal.classList.remove('active');
    }
  });

  function addToTerminal(text) {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const experience = document.querySelector('input[name="experience"]:checked')?.value;
      const comment = document.getElementById('comment').value;
      const gmail = document.getElementById('gmail').value;

      if (!name || !experience || !comment) {
        addToTerminal("> Please fill all required fields before submitting.");
        return;
      }

      loadingPopup.style.display = 'flex';

      fetch('https://my-portfolio-1-9b3k.onrender.com/send-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, experience, comment, gmail })
      })
        .then(res => res.json())
        .then(() => {
          addToTerminal(`> Thanks ${name}, your feedback has been submitted!`);
          reviewModal.classList.remove('active');
          loadingPopup.style.display = 'none';
          reviewForm.reset();
        })
        .catch(() => {
          addToTerminal("> Something went wrong! Try again later.");
          loadingPopup.style.display = 'none';
        });
    });
  }
});
