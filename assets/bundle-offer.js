function handleVariantSelectOptions() {
  // Function to handle variant option to pick and diable
  var selectInitialValue = document.getElementById('custom-size').value;
  var addToCartButton = document.querySelector('.product-form__submit');
  var buyButton = document.querySelector('.shopify-payment-button__button');
  // Checking the option and making sure if Unselected is the value
  if (selectInitialValue === "Unselected") {
    addToCartButton.style.pointerEvents = "none";
    addToCartButton.style.opacity = "0.6";
    buyButton.style.pointerEvents = "none";
    buyButton.style.opacity = "0.6";
  } else {
    addToCartButton.style.pointerEvents = "auto"; // Enable interactions
    addToCartButton.style.opacity = "1"; // Restore opacity
    buyButton.style.pointerEvents = "auto"; // Enable interactions for the payment button
    buyButton.style.opacity = "1"; // Restore opacity for the payment button
  }
}

// Attach the function to DOM ready event
document.addEventListener('DOMContentLoaded', function () {
  var selectElementOnLoad = document.getElementById('custom-size');
  selectElementOnLoad.value = 'Unselected';
  // Call the function on DOM ready
  handleVariantSelectOptions();

  // Add a change event listener to the select element
  var selectedOption = document.getElementById('custom-size');
  selectedOption.addEventListener("change", handleVariantSelectOptions);

  // Add setTimeout to call the function after 1 second
  setTimeout(handleVariantSelectOptions, 1000);
});

// adding function to add one more hidden product when variant Tan and middle is selected and added to cart
document.addEventListener('DOMContentLoaded', function () {
  const TARGET_VARIANT_ID = '40631392993366'; // Variant id of Tan & Medium
  const SOFT_WINTER_JACKET = '40621519306838'; // Variant ID of the "Soft Winter Jacket"

  // Add event listener for change event
  customSizeSelect.addEventListener('change', function () {
    // Get the selected value
    var customSizeValue = customSizeSelect.value;

    if (customSizeValue === "Medium") {
      // Attach event listener to buttons
      document.querySelectorAll('.product-form__submit').forEach(button => {
        button.addEventListener('click', function (event) {
          // Check cart contents before adding the additional product
          fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
              const isBeingAdded = this.closest('form').querySelector('[name="id"]').value === TARGET_VARIANT_ID;

              // If the target product variant is the one being added, add the jacket
              if (isBeingAdded) {
                let formData = {
                  'items': [{
                    'id': SOFT_WINTER_JACKET,
                    'quantity': 1
                  }]
                };

                fetch('/cart/add.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
                })
                  .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json(); // Parse the JSON of the response.
                  })
                  .then(data => {
                    console.log('Jacket added to cart:', data);
                  })
                  .catch(error => {
                    console.error('Error adding jacket to cart:', error);
                  });
              }
            });
        });
      });
    }
  });
});

// Removing product if the main product variant is removed from cart
function removeFromCart(variantIdToRemove, callback) {
  fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      id: variantIdToRemove,
      quantity: 0 // Setting the quantity to 0 will remove the item
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('Product removed', data);
      // Check if callback is provided and execute it, useful for chaining removals
      if (typeof callback === 'function') {
        callback();
      } else {
        // Optionally, refresh the page or update the cart UI to reflect the removal
        location.reload(); // Simple way to refresh the cart page and show the updated cart
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
    // Adjust the selector based on your specific button's attributes
    var clickedElement = event.target;
    var removeButton = clickedElement.closest('a[aria-label="Remove Hand Bag - Tan / Medium"]');

    if (removeButton) {
      event.preventDefault(); // Prevent the default anchor action

      // Define the variant IDs
      var tanVariantId = '40631392993366'; // Variant ID of the product directly associated with the button
      var jacketVariantId = '40621519306838'; // Variant ID of the product to also remove

      // Remove the primary product and then the secondary
      removeFromCart(tanVariantId, function () {
        removeFromCart(jacketVariantId);
      });
    }
  });
});