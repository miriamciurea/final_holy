import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]

  connect() {
    this.isOpen = false
    document.addEventListener("click", this.closeOnClickOutside.bind(this))
  }

  disconnect() {
    document.removeEventListener("click", this.closeOnClickOutside.bind(this))
  }

  toggle() {
    this.isOpen = !this.isOpen
    this.menuTarget.classList.toggle("dropdown-open", this.isOpen)
    this.menuTarget.classList.toggle("dropdown-close", !this.isOpen)
  }

  closeOnClickOutside(event) {
    if (this.isOpen && !this.element.contains(event.target)) {
      this.isOpen = false
      this.menuTarget.classList.remove("dropdown-open")
      this.menuTarget.classList.add("dropdown-close")
    }
  }
}
