document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const errorMessage = document.getElementById('errorMessage');

  // Validate phone number format (e.g., +255 followed by 9 digits)
  const validatePhoneNumber = (phone) => {
    const regex = /^\255[67]\d{8}$/;
    return regex.test(phone);
  };

  // Show error message
  const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  };

  // Clear error message
  const clearError = () => {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  };

  // Handle form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneNumber = phoneNumberInput.value.trim();
    clearError();

    if (!validatePhoneNumber(phoneNumber)) {
      showError('Tafadhali ingiza namba ya simu sahihi (mf. +255712345678)');
      return;
    }

    // Save login details
    localStorage.setItem('user', JSON.stringify({ phoneNumber, loggedIn: true }));
    window.location.href = 'index.html';
  });
});