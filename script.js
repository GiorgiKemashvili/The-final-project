let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
});

document.addEventListener("DOMContentLoaded", () => {
  const mySkillsSection = document.querySelector(".my-skills");
  const skills = document.querySelectorAll(".progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fillProgressBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(mySkillsSection);

  function fillProgressBars() {
    skills.forEach((skill) => {
      const percentage = skill.dataset.progress;
      animateProgressBar(skill, percentage);
    });
  }

  function animateProgressBar(skill, percentage) {
    const width = parseFloat(skill.style.width) || 0;
    const targetWidth = parseFloat(percentage);
    const duration = 2000;

    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const increment = (targetWidth - width) * (progress / duration);

      skill.style.width = width + increment + "%";

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        skill.style.width = percentage + "%";
      }
    }

    window.requestAnimationFrame(step);
  }
});
