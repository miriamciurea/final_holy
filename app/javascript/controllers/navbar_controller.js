import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="navbar"
export default class extends Controller {
  static targets = ["navbar", "icon", "details"]

  connect() {
    console.log("Controller connected");
    this.initialOffsetTop = this.navbarTarget.offsetTop;
    this.scrolled = false;

    console.log("Initial offset top:", this.initialOffsetTop);
    console.log("Icon target:", this.iconTarget);
    console.log("Details target:", this.detailsTarget);

    // Initial check
    this.updateNavbarVisibility();

    // Update visibility on resize
    window.addEventListener('resize', this.updateNavbarVisibility.bind(this));

    // Scroll event listener
    window.addEventListener('scroll', this.scroll.bind(this));
    // window.addEventListener('scroll', this.scroll.bind(this), { passive: true });

  }

  disconnect() {
    window.removeEventListener('scroll', this.scroll.bind(this));
    window.removeEventListener('resize', this.updateNavbarVisibility.bind(this));
  }

  scroll() {
    console.log("Scroll event triggered");
    const shouldBeScrolled = window.scrollY > this.initialOffsetTop;
    if (shouldBeScrolled !== this.scrolled) {
      this.scrolled = shouldBeScrolled;
      if (this.scrolled) {
        this.navbarTarget.classList.add('scrolled');
      } else {
        this.navbarTarget.classList.remove('scrolled');
      }
    }
  }

  updateNavbarVisibility() {
    console.log("Updating navbar visibility");
    if (window.innerWidth <= 700) {
      this.iconTarget.classList.remove('hidden');
      this.detailsTarget.classList.add('hidden');
    } else {
      this.iconTarget.classList.add('hidden');
      this.detailsTarget.classList.remove('hidden');
    }
  }
}

// 700
