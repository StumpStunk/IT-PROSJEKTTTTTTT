const menuToggle = document.querySelector(".menu-toggle")
const menuIcon = document.querySelector(".menu-icon")
const navLinks = document.querySelector(".nav-links")

if (menuToggle && menuIcon && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open")
    menuToggle.setAttribute("aria-expanded", String(isOpen))
    menuIcon.textContent = isOpen ? "✕" : "☰"
  })
}
