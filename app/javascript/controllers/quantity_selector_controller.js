import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["quantityInput", "cartCount", "sidebar"]

  connect() {
    console.log("Quantity Selector controller connected");
    this.cartCountValue = this.cartCountTarget ? this.cartCountTarget.textContent : '0';
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

  async addToCart() {
    let quantityToAdd = parseInt(this.quantityInputTarget.value);
    let productId = this.element.dataset.productId; // Ensure this is set correctly in your HTML

    try {
      const response = await fetch('/cart_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
          quantity: quantityToAdd,
          product_id: productId
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Update the sidebar with the product details
        if (this.sidebarTarget) {
          this.sidebarTarget.innerHTML = `
            <div class="sidebar-item">
              <p>Product ID: ${data.product.id}</p>
              <p>Quantity: ${data.quantity}</p>
              <p style="display: flex; height: 100%; align-items: end;">Total Items in Cart: ${data.cart_item_count}</p>
            </div>
          `;
          this.sidebarTarget.style.display = 'block'; // Show the sidebar
        }
        if (this.cartCountTarget) {
          this.cartCountTarget.textContent = data.cart_item_count;
        }
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  quantityInput(event) {
    if (this.quantityInputTarget.value < 1 || isNaN(this.quantityInputTarget.value)) {
      this.quantityInputTarget.value = 1;
    }
  }

  get cartCountValue() {
    return parseInt(this.cartCountTarget ? this.cartCountTarget.textContent : '0');
  }

  set cartCountValue(value) {
    if (this.cartCountTarget) {
      this.cartCountTarget.textContent = value;
    }
  }
}
