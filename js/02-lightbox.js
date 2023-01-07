import { galleryItems } from './gallery-items.js';
// Change code below this line
// console.log(galleryItems);

// Селектор галереї
const mainGallery = document.querySelector(".gallery");

// Функція створення розмітки галереї:
function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, description, original }) => {
      return `
      <li>
        <a class="gallery__item" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </li>
    `;
    }).join("");
};
const cardMarkup = createGalleryMarkup(galleryItems);
mainGallery.insertAdjacentHTML("beforeend", cardMarkup);

new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
