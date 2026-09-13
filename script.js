

const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    navigation.classList.toggle("open");
  });

  // Close menu after clicking a navigation link

  document.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("open");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },

    {
      threshold: 0.12,
    },
  );

  revealElements.forEach(function (element, index) {
    element.style.transitionDelay = Math.min(index * 0.035, 0.25) + "s";

    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers

  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });
}


const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Remove active class from all buttons

    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    // Add active class to clicked button

    button.classList.add("active");

    // Get selected category

    const selectedFilter = button.getAttribute("data-filter");

    // Filter projects

    projectCards.forEach(function (card) {
      const categoryData = card.getAttribute("data-category");

      if (!categoryData) {
        return;
      }

      const categories = categoryData.split(" ");

      const shouldShow =
        selectedFilter === "all" || categories.indexOf(selectedFilter) !== -1;

      if (shouldShow) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});



const copyButton = document.getElementById("copyEmail");

const emailAddress = "rautabhijit0739@gmail.com";

if (copyButton) {
  copyButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(emailAddress);

      const oldText = copyButton.textContent;

      copyButton.textContent = "Copied ✓";

      setTimeout(function () {
        copyButton.textContent = oldText;
      }, 1800);
    } catch (error) {
      // Fallback if clipboard is not available

      window.location.href = "mailto:" + emailAddress;
    }
  });
}



const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}



document.addEventListener("click", function (event) {
  if (!navigation || !menuButton) {
    return;
  }

  const clickedInsideMenu = navigation.contains(event.target);

  const clickedMenuButton = menuButton.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    navigation.classList.remove("open");
  }
});

// ========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", function () {
  let currentSection = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    const linkTarget = link.getAttribute("href");

    if (linkTarget === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});


document.querySelectorAll('a[href="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
  });
});
