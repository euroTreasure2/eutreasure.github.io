export const handleRegisterForm = () => {
  const fullNameInput = document.getElementById('fullName');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (fullNameInput && usernameInput && passwordInput) {
    fullNameInput.addEventListener('input', function () {
      validateInput(this, 50, 'fullName-error', 'Full name cannot exceed 50 characters');
    });

    usernameInput.addEventListener('input', function () {
      validateInput(this, 20, 'username-error', 'Username cannot exceed 20 characters');
    });

    passwordInput.addEventListener('input', function () {
      validateInput(this, 30, 'password-error', 'Password cannot exceed 30 characters');
    });
  }

  const registerButton = document.getElementById('btn-register');
  if (registerButton) {
    registerButton.addEventListener('click', function (event) {
      event.preventDefault();
      // Get form input values
      const fullName = fullNameInput.value.trim();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      // Validation
      let isValid = true;

      isValid = validateErrorMessage(fullName, 'fullName-error', 'Please enter your full name') && isValid;
      isValid = validateErrorMessage(username, 'username-error', 'Please enter a username') && isValid;
      isValid = validateErrorMessage(password, 'password-error', 'Please enter a password') && isValid;

      // If all data is valid, show success message using alert
      if (isValid) {
        // Display success message
        alert('Registration successful! You will now be redirected to login.');

        // Create an object with registration data
        const formData = { fullName, username, password };

        // Save the registration data to localStorage
        saveDataToLocal(formData);

        // Optionally, redirect the user to the login page after a short delay
        setTimeout(() => {
          window.location.href = 'login.html'; // Change this to your actual login page URL
        }, 1000); // Redirect after 1 second (you can adjust the delay)
      }
    });
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

    // Additional validation for password requirements
    if (errorId === 'password-error') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!passwordRegex.test(value)) {
        errElement.textContent = 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.';
        errElement.style.color = 'red';
        return false;
      }
    }

    return true;
  }

  // Function to send form data to the server (you need to implement this)
  function saveDataToLocal(formData) {
    const serverEndpoint = 'http://softinz20233-001-site1.gtempurl.com/api/users'; // Promenite ovo na svoj novi server endpoint
  
    fetch(serverEndpoint, {
      method: 'POST', // Promenite ovde na 'POST'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server if needed
        console.log('Server response:', data);
        alert('Registration successful! You will now be redirected to login.');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  }

};
