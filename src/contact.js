export const handleContactForm = () => {
  const firstNameInput = document.getElementById('ime');
  const lastNameInput = document.getElementById('prezime');
  const emailInput = document.getElementById('email1');
  const messageInput = document.getElementById('message');

  if (firstNameInput && lastNameInput && emailInput && messageInput) {
    firstNameInput.addEventListener('input', function () {
      validateInput(this, 25, 'fname-error', 'First name cannot exceed 25 characters');
    });

    lastNameInput.addEventListener('input', function () {
      validateInput(this, 40, 'lname-error', 'Last name cannot exceed 40 characters');
    });

    emailInput.addEventListener('input', function () {
      const isValidEmailValue = isValidEmail(this.value.trim());
      validateErrorMessage(isValidEmailValue, 'email-error', 'Please enter a valid email (example@domain.com)');
    });

    messageInput.addEventListener('input', function () {
      validateErrorMessage(this.innerText.trim(), 'message-error', 'Please enter your message');
    });
  }

  const submitButton = document.getElementById('submitForm');
  if (submitButton) {
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();

      // Get form input values
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.innerHTML.trim();

      // Validation
      let isValid = true;

      isValid = validateErrorMessage(firstName, 'fname-error', 'Please enter your first name') && isValid;
      isValid = validateErrorMessage(lastName, 'lname-error', 'Please enter your last name') && isValid;
      isValid = validateErrorMessage(isValidEmail(email), 'email-error', 'Please enter a valid email (example@domain.com)') && isValid;
      isValid = validateErrorMessage(message, 'message-error', 'Please enter your message') && isValid;

      // If all data is valid, send the data to the server
      if (isValid) {
        const formData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          message: message
        };
        // Send the form data to the server using fetch or another method
        sendDataToServer(formData);
        alert('Your message is successed send');
      }
    });
  }

  // Function to validate email address
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate input length and show error message
  function validateInput(input, maxLength, errorId, errorMessage) {
    const inputValue = input.value.trim();
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    if (inputValue.length > maxLength) {
      errElement.textContent = errorMessage;
      errElement.style.color = 'red';
    }
  }

  // Function to show or hide error message based on condition
  function validateErrorMessage(value, errorId, errorMessage) {
    const errElement = document.getElementById(errorId);
    errElement.textContent = '';

    if (!value) {
      errElement.textContent = errorMessage;
      errElement.style.color = 'red';
      return false;
    }

    return true;
  }

  // Function to send form data to the server (you need to implement this)
  function sendDataToServer(formData) {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // If the server returns JSON, you can parse it here
      })
      .then(data => {
        // Handle successful response from the server
        console.log('Data sent successfully:', data);
        // Redirect the user to thank_you.html or perform other actions
      })
      .catch(error => {
        // Handle errors that occur during the fetch request
        console.error('Error sending data:', error);
        // Perform actions (such as displaying an error message) based on the error
      });
  }
};
