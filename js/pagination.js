import {
    getPhotos
} from "./api/photos";

const list = document.querySelector(".content__list");
const emptyElem = document.querySelector(".empty-elem");

let currentPage = 1;

const query = window.location.search;
const params = new URLSearchParams(query);
let perPage = Number(params.get("per-page"));

function pagination() {
    if (perPage === 0) perPage = 10;
    getPhotos(currentPage, perPage)
        .then(photos => {
            if (photos.length) {
                for (let {url,title} of photos) {
                    list.insertAdjacentHTML("beforeend", `
                        <li class="content__item">
                            <figure class="content__item-wrapper">
                                <img class="content__item-img" src="${url}" />
                                <figcaption class="content__item-text">"${title}"</figcaption>
                            </figure>
                        </li>
                    `)
                };
                list.appendChild(emptyElem);
            }
        })
}

pagination();

const intersectionObserver = new IntersectionObserver(entries => {
    if (entries.some(elem => elem.intersectionRatio > 0)) {
        pagination();
        currentPage++;
    }
});

intersectionObserver.observe(emptyElem);
