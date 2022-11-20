import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// // const instance = basicLightbox.create(`
// // <div class="gallery__item">
// //   <a class="gallery__link" href="large-image.jpg">
// //     <img
// //       class="gallery__image"
// //       src="small-image.jpg"
// //       data-source="large-image.jpg"
// //       alt="Image description"
// //     />
// //   </a>
// // </div>`)

// const galleryEl = document.querySelector('.gallery')

// const makeGalleryItems = (items) => {
//     return items
//         .map(({ preview, original, description }) => {
//             return `<div class="gallery__item">
//   <a class="gallery__link" href="${original}">
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </div>`;
//         }).join("");
// }
// galleryEl.insertAdjacentHTML("beforeend", makeGalleryItems(galleryItems));

// const createModalWindow = (imageAdress) => {
//   window.instance = basicLightbox.create(`<img src="${imageAdress}">`,
//     {
//       onShow: () =>
//         window.addEventListener("keydown", closeModalWindowByEscPressing),
//       onClose: () => {
//         window.removeEventListener("keydown", closeModalWindowByEscPressing);
//         refs.body.classList.remove("disable-scroll");
//       },
//     }
//   );
//   return instance;
// };
// // const onClickOpenModal = (e) => {
// //     e.preventDefault();
// //     if (!e.target.classList.contains("gallery__image")) {
// //         return;
// //     }
// //     const originalImageRef = event.target.dataset.source;
// //   createModalWindow(originalImageRef).show();
// // }


// // galleryEl.addEventListener('click', onClickOpenModal);
// galleryEl.addEventListener("click", onClickOpenModal);

// function onClickOpenModal(event) {
//   event.preventDefault();
//   if (!event.target.classList.contains("gallery__image")) {
//     return;
//   }
//   const originalImageRef = event.target.dataset.source;
//   createModalWindow(originalImageRef).show();
//   refs.body.classList.add("disable-scroll");
// }
const refs = {
  imageContainer: document.querySelector(".gallery"),
  body: document.body,
};

function makegalleryItems(items) {
  return items
    .map(({ preview, description, original }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img loading="lazy" width="354" height="240"
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

const cardgalleryMarkup = makegalleryItems(galleryItems);
refs.imageContainer.insertAdjacentHTML("beforeend", cardgalleryMarkup);

const createModalWindow = (imageAdress) => {
  window.instance = basicLightbox.create(`<img src="${imageAdress}">`,
    {
      onShow: () =>
        window.addEventListener("keydown", closeModalWindowByEscPressing),
      onClose: () => {
        window.removeEventListener("keydown", closeModalWindowByEscPressing);
        refs.body.classList.remove("disable-scroll");
      },
    }
  );
  return instance;
};

refs.imageContainer.addEventListener("click", onClickOpenModal);

function onClickOpenModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const originalImageRef = event.target.dataset.source;
  createModalWindow(originalImageRef).show();
  refs.body.classList.add("disable-scroll");
}

function closeModalWindowByEscPressing(event) {
  const ESC_KEY_CODE = "Escape";
  if (event.code === ESC_KEY_CODE && instance.visible()) {
    instance.close();
    refs.body.classList.remove("disable-scroll");
  }
}

const lazyImages = refs.imageContainer.querySelectorAll(".gallery__image");

lazyImages.forEach((image) =>
  image.addEventListener("load", onImageLoaded, { once: true })
);

function onImageLoaded(event) {
  event.target.classList.add("appear");
}

lazyImages.forEach((image) =>
  image.addEventListener("mouseenter", onMouseEnter)
);

function onMouseEnter(event) {
  event.target.style.transitionDelay = "100ms";
  event.target.style.transitionDuration = "500ms";
}