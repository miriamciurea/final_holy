import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["quantityInput", "cartCount"]

  connect() {
    console.log("Quantity Selector controller connected");

    this.cartCountValue = 0;
  }

  decrease() {
    let currentQuantity = parseInt(this.quantityInputTarget.value);
    if (currentQuantity > 1) {
      this.quantityInputTarget.value = currentQuantity - 1;
    }
  }

  increase() {
    let currentQuantity = parseInt(this.quantityInputTarget.value);
    this.quantityInputTarget.value = currentQuantity + 1;
  }

  addToCart() {
    let quantityToAdd = parseInt(this.quantityInputTarget.value);
    this.cartCountValue += quantityToAdd;
    this.cartCountTarget.textContent = this.cartCountValue;
  }

  quantityInput(event) {
    if (this.quantityInputTarget.value < 1 || isNaN(this.quantityInputTarget.value)) {
      this.quantityInputTarget.value = 1;
    }
  }

  get cartCountValue() {
    return parseInt(this.cartCountTarget.textContent);
  }

  set cartCountValue(value) {
    this.cartCountTarget.textContent = value;
  }
}
