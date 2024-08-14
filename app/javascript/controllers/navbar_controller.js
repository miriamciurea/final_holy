import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="navbar"
export default class extends Controller {
  static targets = ["navbar", "icon", "details", "sidebar", "dropdown", "dropdownMenu"]

  connect() {
    console.log("Navbar controller connected");
    this.initialOffsetTop = this.navbarTarget.offsetTop;
    this.scrolled = false;

    // console.log("Initial offset top:", this.initialOffsetTop);
    // console.log("Icon target:", this.iconTarget);
    // console.log("Details target:", this.detailsTarget);
    // console.log("Sidebar target:", this.sidebarTarget);

    // Initial check
    this.updateNavbarVisibility();

    // Update visibility on resize
    window.addEventListener('resize', this.updateNavbarVisibility.bind(this));

    // Scroll event listener
    window.addEventListener('scroll', this.scroll.bind(this));

    // Update visibility on load
    this.updateNavbarVisibility();

    this.hideDropdown();
  }

  disconnect() {
    window.removeEventListener('scroll', this.scroll.bind(this));
    window.removeEventListener('resize', this.updateNavbarVisibility.bind(this));
  }

  scroll() {
    // console.log("Scroll event triggered");
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
    // console.log("Updating navbar visibility");
    if (window.innerWidth <= 730) {
      this.iconTarget.classList.remove('hidden');
      this.detailsTarget.classList.add('hidden');
      this.sidebarTarget.classList.add('hidden');
    } else {
      this.iconTarget.classList.add('hidden');
      this.detailsTarget.classList.remove('hidden');
      this.sidebarTarget.classList.add('hidden');
    }
  }

  toggleSidebar() {
    this.sidebarTarget.classList.toggle('open');
    this.sidebarTarget.classList.remove('hidden');
  }

  closeSidebar() {
    // this.sidebarTarget.classList.remove('open');
    this.toggleSidebar();
  }

  toggleDropdown(event) {
    event.stopPropagation();
    const dropdownMenu = this.dropdownMenuTarget;

    if (dropdownMenu.classList.contains("show")) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  }

  showDropdown() {
    this.dropdownMenuTarget.classList.add("show");
    this.dropdownMenuTarget.classList.remove("hide");
    document.addEventListener("click", this.hideDropdownOnClickOutside.bind(this));
  }

  hideDropdown() {
    this.dropdownMenuTarget.classList.add("hide");
    this.dropdownMenuTarget.classList.remove("show");
    document.removeEventListener("click", this.hideDropdownOnClickOutside.bind(this));
  }

  hideDropdownOnClickOutside(event) {
    if (!this.dropdownMenuTarget.contains(event.target) && !this.dropdownTarget.contains(event.target)) {
      this.hideDropdown();
    }
  }
}


// 700
