document.addEventListener('DOMContentLoaded', function() {
    const pinForm = document.getElementById('pin-form');
    const otherPurposeInput = document.getElementById('other-purpose');
    const purposeSelect = document.getElementById('purpose');
    const thankYouDiv = document.getElementById('thank-you');

    // Event listener for purpose select dropdown
    purposeSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherPurposeInput.style.display = 'block';
        } else {
            otherPurposeInput.style.display = 'none';
        }
    });

    // Event listener for form submission
    pinForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Simulate form submission and show thank you message
        // Hide form
        pinForm.style.display = 'none';
        // Show thank you message
        thankYouDiv.style.display = 'block';
    });

    // Event listener for "Submit Another Pin" link
    document.getElementById('submit-another-pin').addEventListener('click', function(event) {
        event.preventDefault();
        // Reset form
        pinForm.reset();
        // Show form
        pinForm.style.display = 'block';
        // Hide thank you message
        thankYouDiv.style.display = 'none';
    });

    // Home button (Doesn't do anything for now)
    document.getElementById('home').addEventListener('click', function(event) {
        event.preventDefault();
        // Do something to navigate to home page
    });

    // Initially hide the "Please specify" input field
    otherPurposeInput.style.display = 'none';
});
