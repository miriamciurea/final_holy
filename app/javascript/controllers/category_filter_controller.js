import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="category-filter"
export default class extends Controller {
  static targets = ["productsContainer"]

  connect() {
    console.log("heei");
    console.log(this.productsContainerTarget.innerHTML);


    this.categoryOptions = this.element.querySelectorAll(".category-option")
    this.categoryOptions.forEach(option => {
      option.addEventListener("click", this.filterByCategory.bind(this))
    })
  }

  filterByCategory(event) {
    const category = event.currentTarget.getAttribute("data-category")

    fetch(`/products/filter_by_category?category=${category}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(response => response.text())
      .then(html => {
        this.productsContainerTarget.innerHTML = html
      })
      .catch(error => {
        console.error("Error fetching products:", error)
      })
  }

}
