import { galleryItems } from './gallery-items.js';
// Change code below this line
// console.log(galleryItems);

// Створюю розмітку підключення необхідного для роботи з basicLightbox скрипту:
// https://www.jsdelivr.com/package/npm/basiclightbox?path=dist
const basicLightboxScriptJS = document.createElement("script") 
basicLightboxScriptJS.src = "https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js";
basicLightboxScriptJS.integrity = "sha256-nMn34BfOxpKD0GwV5nZMwdS4e8SI8Ekz+G7dLeGE4XY=";
basicLightboxScriptJS.crossOrigin = "anonymous";
// Додаю посилання на JS-скрипт basicLightbox:
document.body.appendChild(basicLightboxScriptJS); 

// Створюю розмітку підключення необхідних для роботи з basicLightbox стилів:
const basicLightboxLinkCSS = document.createElement("link") 
basicLightboxLinkCSS.rel = "stylesheet";
basicLightboxLinkCSS.href = "https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.css";
basicLightboxLinkCSS.integrity = "sha256-r7Neol40GubQBzMKAJovEaXbl9FClnADCrIMPljlx3E=";
basicLightboxLinkCSS.crossOrigin = "anonymous";
// Додаю посилання на CSS-файл basicLightbox в голову:
document.head.appendChild(basicLightboxLinkCSS); 

// Селектор галереї
const mainGallery = document.querySelector(".gallery");

// Слухач кліку галереї
mainGallery.addEventListener('click', onGalleryImageClick);

// Змінна для роботи з basicLightbox має бути ініційована у глобальній області видимості через те, що:
// 1) має бути доступна в різних функціях (open, close)
// 2) її значення не відоме заздалегідь (залежить від значень у event.target.dataset.source і event.target.alt)
let modalWindow; 

// Функція створення розмітки галереї:
function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, description, original }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
          data-source="${original}"
        />
      </a>
    </div>
    `;
    }).join("");
};

// Створення розмітки галереї:
const cardMarkup = createGalleryMarkup(galleryItems);
// Додавання галереї у розмітку:
mainGallery.insertAdjacentHTML("beforeend", cardMarkup);

// Функція, що виконується при кліці на зображенні галереї:
function onGalleryImageClick(e) {
  e.preventDefault(); // Відміняє дію за замовчуванням (завантаження світлини)
  
  // Перевіряю що клік був на зображенні галереї, а не на іншому її елементі:
  const isGalleryEl = e.target.classList.contains("gallery__image");
  if (!isGalleryEl) {
    return;
  };

  openModal(e); // Запускає модальне вікно  
}

// Запуск модального вікна:
function openModal(e) {
  window.addEventListener("keydown", onEcsKeyPress); // Слухає клавішу ESC  

  // Створюю необхідну структуру модального вікна і бекдропу за допомогою basicLightbox
  // Бекдроп, модальне вікно, їх стилі, а також закриття по кліку на бекдропі basicLightbox створює автоматично, я лише додаю <img> з необхідними значеннями
  // ? Чи обов'язково огортати <img> в <a> ???
  modalWindow = basicLightbox.create(`
					<img
          src="${e.target.dataset.source}"
          alt="${e.target.alt}"
          style = "border-radius: 20px; max-width: 800px;"
          />
  `
  );

  modalWindow.show(); // показує створене модальне вікно
};

// Згортання модального вікна
function closeModal() {
  // Вимикаю прослуховування клавіші ESC:
  window.removeEventListener("keydown", onEcsKeyPress); //Знімаю слухача клавіші ESC
  modalWindow.close() // Згортання за допомогою basicLightbox
}

// Згортання через ESC
function onEcsKeyPress(event) { 
  const ESC_KEY_CODE = "Escape";
  if (event.code === ESC_KEY_CODE) {
    closeModal();
  }
}

