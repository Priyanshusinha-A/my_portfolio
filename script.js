document.addEventListener('DOMContentLoaded', function () {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('.cursor');
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('commandInput');
  const output = document.getElementById('output');
  const reviewModal = document.getElementById('reviewModal');
  const loadingPopup = document.getElementById('loadingPopup');
  const closeModal = document.getElementById('closeModal');

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
> Hey there! I'm <span class="highlight">Priyanshu Kumar Sinha</span>, a driven and enthusiastic Computer Science undergraduate at <span class="highlight">Black Diamond College of Engineering and Technology</span>...<br><br>
> My journey in tech is powered by curiosity and passion for <span class="highlight">Cybersecurity</span> and <span class="highlight">Full Stack Web Development</span>...`,
    skills: "> HTML, CSS, JavaScript, C, C++, Java, Cyber Security, Data Analysis",
    projects: `
> Projects:
<ul>
  <li><a href="https://priyanshusinha-a.github.io/home-page/" target="_blank">Home Page</a></li>
  <li><a href="https://github.com/Priyanshusinha-A/E-PlantShopping-website" target="_blank">E-Plant Shopping</a></li>
  <li><a href="https://github.com/Priyanshusinha-A/expressBookReviews" target="_blank">Express Book Reviews</a></li>
</ul>`,
    education: `
> Education & Certifications:
- 🎓 <span class="highlight">B.Tech in Computer Science</span> - BDCE
- 🏅 DCSC - Completed 2024
- 💻 ADCA Hons - 2023
- 🏫 12th - BSN College, Deo (2022)
- 🏫 10th - Ganghar Public School (2020)`,
    contact: `
> Contact Me:
Email: <a href="mailto:priyanshusinhatt@gmail.com">priyanshusinhatt@gmail.com</a><br>
LinkedIn: <a href="https://www.linkedin.com/in/priyanshu-kumar-6716642b6/" target="_blank">LinkedIn</a><br>
GitHub: <a href="https://github.com/Priyanshusinha-A/" target="_blank">GitHub</a>`,
    
    review: () => {
      reviewModal.style.display = 'flex';
      addToTerminal("> Review popup opened. Fill out the form or type 'clear' to close.");
    },
    
    clear: () => {
      output.innerHTML = "";
      reviewModal.style.display = 'none';
      addToTerminal("> Screen cleared. Type a command to continue.");
    }
  };

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      input.value = '';

      if (commands[command]) {
        addToTerminal(`> ${command}`);
        if (typeof commands[command] === 'function') {
          commands[command]();
        } else {
          addToTerminal(commands[command]);
        }
      } else {
        addToTerminal(`> Unknown command: "${command}". Try about, skills, projects, education, contact, review, clear.`);
      }
    }
  });

  // Handle popup close
  closeModal.addEventListener('click', () => {
    reviewModal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      reviewModal.style.display = 'none';
    }
  });

  function addToTerminal(text) {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  document.getElementById('reviewForm').addEventListener('submit', function (e) {
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
        reviewModal.style.display = 'none';
        loadingPopup.style.display = 'none';
        e.target.reset();
      })
      .catch(() => {
        addToTerminal("> Something went wrong! Try again later.");
        loadingPopup.style.display = 'none';
      });
  });
});
