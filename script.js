// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
const publishableKey = 'pk_test_51Nyh2eKfyWdl2USbqNDqb35WgiI2yfMCDMxkkY8VR1mgzSXgp9Pb6KAo3wASiQBYIPsnzrHygTXD3NoOmLLJr3Cf00lKpEb7go'
const stripe = Stripe(publishableKey);

let clientSecretFromBE = 'pi_3O6hWvKfyWdl2USb0R6RO0FZ_secret_niygSXqqa7tATu3alyxaWYs67'

const options = {
  clientSecret: clientSecretFromBE,
  // Fully customizable with appearance API.
 // appearance: {/*...*/},
};

// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
const elements = stripe.elements(options);

// Create and mount the Payment Element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {error} = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: "http://127.0.0.1:5500/status.html",
    }
  });

  if (error) {
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
  } else {
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }
});