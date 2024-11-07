document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevents the default form submission behavior

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Display success message and reset the form
            document.getElementById('confirmationMessage').textContent = "Thank you for your inquiry. We will contact you soon.";
            form.reset();
        } else {
            // Display error message if submission fails
            return response.json().then(data => {
                if (data.errors) {
                    document.getElementById('confirmationMessage').textContent = data.errors.map(error => error.message).join(", ");
                } else {
                    document.getElementById('confirmationMessage').textContent = "Oops! Something went wrong, please try again.";
                }
            });
        }
    })
    .catch(error => {
        // Handle network or other errors
        document.getElementById('confirmationMessage').textContent = "Oops! Something went wrong, please try again.";
        console.error('Error:', error);
    });
});
