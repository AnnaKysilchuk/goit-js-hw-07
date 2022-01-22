import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryCard = createGalleryItems(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryCard);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryItems(galleryItems) {
    const galleryCard = galleryItems.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`;
    }).join('');
    return galleryCard;
}

function onGalleryContainerClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }

    const instance = basicLightbox.create(`
        <div class="modal">
            <img src="${event.target.dataset.source}" width="100%">
        </div>
    `)
    instance.show();

    window.addEventListener('keydown', onEscKeyPress);

    const currentImg = document.querySelector('.modal');
    
    currentImg.addEventListener('click', closeModal);

    function closeModal(event) {
        instance.close();
        window.removeEventListener('keydown', onEscKeyPress)
    }

    function onEscKeyPress(event) {
        if (event.code === 'Escape') {
            closeModal();
        }
}
}