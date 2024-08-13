// app/javascript/controllers/form_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["button"];

  submit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Handle the form submission
    fetch(this.element.action, {
      method: 'POST',
      body: new FormData(this.element),
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (response.ok) {
        // On success, update button text
        this.buttonTarget.textContent = 'SUBSCRIBED';
        this.buttonTarget.disabled = true; // Optionally disable the button
      } else {
        // Handle error
        console.error('Form submission failed:', data);
      }
    })
    .catch(error => {
      console.error('Form submission failed:', error);
    });
  }
}
