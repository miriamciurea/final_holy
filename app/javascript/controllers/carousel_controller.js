import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="carousel"
export default class extends Controller {
  static values = {
    speed: String,
    direction: String
  }

  connect() {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.addAnimation();
      this.addBlurEffect();
    }
  }

  addAnimation() {
    const carouselInner = this.element.querySelector(".carousel-inner");

    // Calculate the width of the carousel-inner for animation purposes
    const totalWidth = carouselInner.scrollWidth;
    carouselInner.style.width = `${totalWidth}px`;

    this.element.style.setProperty('--_animation-duration', this.speedValue || '40s');
    this.element.style.setProperty('--_animation-direction', this.directionValue || 'left');
  }

  addBlurEffect() {
    // Add the 'loaded' class after a short delay to trigger the blur-up animation
    setTimeout(() => {
      this.element.classList.add('loaded');
    }, 200); // Adjust the timeout as needed
  }
}
