// JSON Data
const orderData = {
  "checkout_id": "c456d2e7-45b3-492a-bdd3-8d8d234a670e",
  "created_at": "2024-08-13T12:34:56Z",
  "customer": {
    "customer_id": "123456",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "shipping_address": {
      "address_id": "654321",
      "first_name": "John",
      "last_name": "Doe",
      "company": "Example Corp",
      "address_line1": "123 Main St",
      "address_line2": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA"
    },
    "billing_address": {
      "address_id": "654322",
      "first_name": "John",
      "last_name": "Doe",
      "company": "Example Corp",
      "address_line1": "123 Main St",
      "address_line2": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA"
    }
  },
  "cart": {
    "items": [
      {
        "item_id": "prod_001",
        "image":"Headphone.jpg",
        "product_name": "Wireless Headphones",
        "quantity": 2,
        "price": 99.99,
        "discount": {
          "type": "percentage",
          "value": 10,
          "applied_value": 19.998
        },
        "tax": {
          "type": "percentage",
          "value": 8.875,
          "applied_value": 14.135
        },
        "total_price": 194.122
      },
      {
        "item_id": "prod_002",
        "image":"speakers.png",
        "product_name": "Bluetooth Speaker",
        "quantity": 1,
        "price": 149.99,
        "discount": {
          "type": "fixed",
          "value": 20.00,
          "applied_value": 20.00
        },
        "tax": {
          "type": "percentage",
          "value": 8.875,
          "applied_value": 11.496
        },
        "total_price": 141.486
      }
    ],
    "sub_total": 294.991,
    "total_discount": 39.998,
    "total_tax": 25.631,
    "shipping_cost": 15.00,
    "grand_total": 295.624
  },
  "shipping_method": {
    "method_id": "ship_001",
    "method_name": "Standard Shipping",
    "cost": 15.00,
    "estimated_delivery": "2024-08-20T12:00:00Z"
  },
  "payment_method": {
    "method_id": "pay_001",
    "method_name": "Credit Card",
    "transaction_id": "txn_789012",
    "payment_status": "Authorized",
    "amount": 295.624,
    "currency": "USD"
  },
  "discounts_applied": [
    {
      "discount_id": "disc_001",
      "type": "percentage",
      "description": "Summer Sale - 10% off on Wireless Headphones",
      "value": 10,
      "applied_value": 19.998
    },
    {
      "discount_id": "disc_002",
      "type": "fixed",
      "description": "Loyalty Discount - $20 off on Bluetooth Speaker",
      "value": 20.00,
      "applied_value": 20.00
    }
  ],
  "tax_details": [
    {
      "tax_id": "tax_001",
      "type": "sales_tax",
      "description": "State Sales Tax",
      "rate": 8.875,
      "applied_value": 25.631
    }
  ],
  "order_notes": "Please leave the package at the front door.",
  "status": "Pending",
  "updated_at": "2024-08-13T12:45:00Z"
};

document.addEventListener("DOMContentLoaded", function () {


    const cardRadio = document.getElementById("card");
    const codRadio = document.getElementById("cod");
    const cardDetails = document.getElementById("card-details");
    const payButton = document.getElementById("payButton");
    const paymentForm = document.getElementById("payment-form");
  const paymentSection = document.getElementById("payment-section");
  const summarySection = document.getElementById("summary-section");
    const thankYouSection = document.getElementById("thank-you-section");

    const cardNumberInput = document.getElementById("cardNumber");
    const expirationDateInput = document.getElementById("expirationDate");
    const cvvInput = document.getElementById("cvv");
    const saveCardDetailsInput = document.getElementById("saveCardDetails");

    // Load saved card details from session storage
    if (sessionStorage.getItem("cardNumber")) {
        cardNumberInput.value = sessionStorage.getItem("cardNumber");
        expirationDateInput.value = sessionStorage.getItem("expirationDate");
        cvvInput.value = sessionStorage.getItem("cvv");
    }

    // Toggle between payment methods
    document.getElementById("cod").addEventListener("change", function () {
        cardDetails.style.display = "none";
    });
    document.getElementById("card").addEventListener("change", function () {
        cardDetails.style.display = "block";
    });

    // Payment form submission
    paymentForm.addEventListener("submit", function (event) {


        event.preventDefault();

        if (cardRadio.checked) {
            
        

            // Validate the card number (must be 16 digits)
            const cardNumber = cardNumberInput.value.trim();
            if (!/^\d{16}$/.test(cardNumber)) {
                alert("Card number must be exactly 16 digits.");
                return;
            }

            // Validate the expiration date (must not be in the past)
            const expirationDate = expirationDateInput.value.trim();
            const [month, year] = expirationDate.split("/");
            const expiration = new Date(`20${year}`, month - 1);
            if (expiration < new Date()) {
                alert("Expiration date must not be in the past.");
                return;
            }

            // Validate the CVV (must be 3 digits)
            const cvv = cvvInput.value.trim();
            if (!/^\d{3}$/.test(cvv)) {
                alert("CVV must be exactly 3 digits.");
                return;
            }

            // Save card details to session storage if "Save Card Details" is checked
            if (saveCardDetailsInput.checked) {
                sessionStorage.setItem("cardNumber", cardNumber);
                sessionStorage.setItem("expirationDate", expirationDate);
                sessionStorage.setItem("cvv", cvv);
          }
          


          if (cardRadio.checked) {
            const paym = document.getElementById("paym-method");
            paym.textContent = "Card : ****** - $295.62"
          }
          else if(codRadio.checked){
            const paym = document.getElementById("paym-method");
            paym.textContent = "COD"
            
          }
        }
      // Hide payment section and show thank you section
        summarySection.classList.add("hidden")
        paymentSection.classList.add("hidden");
        thankYouSection.classList.remove("hidden");
    });
  
  
  
  









    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    const customerName = `${orderData.customer.first_name} ${orderData.customer.last_name}`;
    document.getElementById("customer-name").textContent = customerName;

    const orderItemsContainer = document.getElementById("order-items");
    orderData.cart.items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "order-item";
        itemElement.innerHTML = `
            <div class="order-item-details mb-3">
                <div class="flex">
                  <img src="${item.image}"/>
                  <div>
                    <p class="font-semibold">${item.product_name}</p>
                    <p>Quantity: ${item.quantity}</p>
                  </div>
                </div>
                <div>
                  <p class="font-semibold"> Price: $${item.price} </p>
                  <p>Discount: -$${item.discount.applied_value}</p>
                  <p> Tax: +$${item.tax.applied_value})</p>
                  <p class="font-semibold"> Total: $${item.total_price}</p>
                </div>
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });

    document.getElementById("subtotal").textContent = `$${orderData.cart.sub_total.toFixed(2)}`;
    document.getElementById("total-discount").textContent = `-$${orderData.cart.total_discount.toFixed(2)}`;
    document.getElementById("total-tax").textContent = `+$${orderData.cart.total_tax.toFixed(2)}`;
    document.getElementById("shipping-cost").textContent = `$${orderData.cart.shipping_cost.toFixed(2)}`;
    document.getElementById("grand-total").textContent = `$${orderData.cart.grand_total.toFixed(2)}`;

    const shippingAddress = orderData.customer.shipping_address;
    const billingAddress = orderData.customer.billing_address;

    document.getElementById("shipping-address").innerHTML = `
        <p>${shippingAddress.first_name} ${shippingAddress.last_name},<br>
        ${shippingAddress.address_line1} ${shippingAddress.address_line2 ? ", " + shippingAddress.address_line2 : ""},<br>
        ${shippingAddress.city},<br> ${shippingAddress.state},${shippingAddress.postal_code},
        ${shippingAddress.country}</p><p>phone : +1234567890</p>
    `;

    document.getElementById("billing-address").innerHTML = `
        <p>${billingAddress.first_name} ${billingAddress.last_name},<br>
        ${billingAddress.address_line1} ${billingAddress.address_line2 ? ", " + billingAddress.address_line2 : ""},<br>
        ${billingAddress.city}, <br> ${billingAddress.state}, ${billingAddress.postal_code},
        ${billingAddress.country}</p><p>phone : +1234567890</p>
    `;
});

function navigateToPayment() {


  const paymentSection = document.getElementById("payment-section");
  const thankYouSection = document.getElementById("thank-you-section");
  const summarySection = document.getElementById("summary-section");

  paymentSection.classList.remove("hidden");
  summarySection.classList.remove("hidden");
   thankYouSection.classList.add("hidden");
   
}
