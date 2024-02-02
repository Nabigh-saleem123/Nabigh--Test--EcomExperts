function handleVariantSelectOptions(){
    // Function to handle variant option to pick and diable
    var selectInitialValue = document.getElementById('Option-template--15157697052758__main-1').value;
    var addToCartButton = document.querySelector('.product-form__submit');
    var buyButton = document.querySelector('.shopify-payment-button__button');
    console.log(selectInitialValue)
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
    // Call the function on DOM ready
    handleOptionChange();
  
    // Add a change event listener to the select element
    var selectedOption = document.getElementById('Option-template--22058985128211__main-1');
    selectedOption.addEventListener("change", handleOptionChange);
    
    // Add setTimeout to call the function after 1 second
    setTimeout(handleOptionChange, 1000);
  });
  console.log("testing")