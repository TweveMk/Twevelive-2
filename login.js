document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const errorMessage = document.getElementById('errorMessage');

  // Validate phone number format (07xxxxxxxx or +255xxxxxxxxx)
  const validatePhoneNumber = (phone) => {
    const cleaned = phone.replace(/[^0-9+]/g, '');
    const regex = /^(07[0-9]{8}|\+255[0-9]{9})$/;
    return regex.test(cleaned);
  };

  // Normalize phone number to +255xxxxxxxxx format
  const normalizePhoneNumber = (phone) => {
    let cleaned = phone.replace(/[^0-9+]/g, '');
    if (cleaned.startsWith('07')) {
      cleaned = '+255' + cleaned.slice(1);
    }
    return cleaned;
  };

  // Format phone number as user types
  phoneNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9+]/g, '');
    if (value.startsWith('+255')) {
      if (value.length > 13) value = value.slice(0, 13); // Limit to +255xxxxxxxxx
    } else {
      if (value.length > 10) value = value.slice(0, 10); // Limit to 07xxxxxxxx
    }
    e.target.value = value;
  });

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
      showError('Tafadhali ingiza namba ya simu sahihi (mf. 07xxxxxxxx au +255xxxxxxxxx)');
      return;
    }
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    localStorage.setItem('user', JSON.stringify({ phoneNumber: normalizedPhone, loggedIn: true }));
    window.location.href = 'index.html';
  });
});