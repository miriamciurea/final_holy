import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "suggestions"];

  connect() {
    this.inputTarget.addEventListener("input", this.fetchSuggestions.bind(this));
  }

  fetchSuggestions() {
    const query = this.inputTarget.value + ", Bucharest, Romania";
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => this.showSuggestions(data))
      .catch(error => console.error('Error fetching suggestions:', error));
  }

  showSuggestions(data) {
    this.clearSuggestions();

    data.forEach(item => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = item.display_name;
      suggestionItem.classList.add("suggestion-item");

      suggestionItem.addEventListener("click", () => {
        this.inputTarget.value = item.display_name;
        this.clearSuggestions();
      });

      this.suggestionsTarget.appendChild(suggestionItem);
    });
  }

  clearSuggestions() {
    this.suggestionsTarget.innerHTML = "";
  }
}
