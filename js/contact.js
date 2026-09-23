const contactForm = document.getElementById('contact-form');
const successAlert = document.getElementById('contact-success');

// Présélection de la destination depuis la page Destinations (contact.html?destination=asie)
const destinationSelect = document.getElementById('destination');
const requestedDestination = new URLSearchParams(window.location.search).get('destination');

if ([...destinationSelect.options].some((option) => option.value === requestedDestination)) {
    destinationSelect.value = requestedDestination;
}

// Validation Bootstrap et message de confirmation (pas d'envoi réel : aucun serveur)
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        successAlert.classList.add('d-none');
        contactForm.querySelector(':invalid').focus();
        return;
    }

    contactForm.reset();
    contactForm.classList.remove('was-validated');
    successAlert.classList.remove('d-none');
    successAlert.focus();
});
