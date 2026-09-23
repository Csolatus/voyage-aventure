// Filtrage des destinations par continent
const filterButtons = document.querySelectorAll('[data-filter]');
const destinations = document.querySelectorAll('[data-continent]');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            const isActive = btn === button;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        destinations.forEach((destination) => {
            const isVisible = filter === 'all' || destination.dataset.continent === filter;
            destination.classList.toggle('d-none', !isVisible);
        });
    });
});

// Remplissage du modal unique à partir de la carte cliquée
const destinationModal = document.getElementById('destinationModal');

destinationModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const card = button.closest('.card');
    const fill = (name, text) => {
        destinationModal.querySelector(`[data-modal="${name}"]`).textContent = text;
    };

    fill('emoji', card.querySelector('.destination-emoji').textContent);
    fill('title', card.querySelector('.card-title').textContent);
    fill('description', card.querySelector('.card-text').textContent);
    fill('duration', card.querySelector('.destination-duration').textContent);
    fill('price', card.querySelector('.destination-price').textContent);
    fill('program', button.dataset.program);

    const continent = button.closest('[data-continent]').dataset.continent;
    destinationModal.querySelector('[data-modal="quote"]').href = `contact.html?destination=${encodeURIComponent(continent)}`;

    const includedItems = button.dataset.included.split('|').map((item) => {
        const li = document.createElement('li');
        li.textContent = `✓ ${item}`;
        return li;
    });
    destinationModal.querySelector('[data-modal="included"]').replaceChildren(...includedItems);
});
