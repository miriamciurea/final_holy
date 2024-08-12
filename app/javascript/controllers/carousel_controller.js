// import { Controller } from "@hotwired/stimulus"

// // Connects to data-controller="carousel"
// export default class extends Controller {
//   static targets = ["image"]

//   connect() {
//     console.log("Carousel controller connected!");
//     this.imagesLoaded = 0;

//     this.imageTargets.forEach(image => {
//       image.addEventListener('load', () => this.handleImageLoad());
//     });

//     // Handle images that may be cached
//     this.handleImageLoad();
//   }

//   handleImageLoad() {
//     this.imagesLoaded++;
//     if (this.imagesLoaded === this.imageTargets.length) {
//       this.element.classList.add('rotate');
//       console.log("Carousel rotation started");
//     }
//   }
// }
