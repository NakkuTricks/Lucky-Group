import {
    photos
} from "./api/photos";

const list = document.querySelector(".content__list");
const emptyElem = document.querySelector(".empty-elem");

const query = window.location.search;
const params = new URLSearchParams(query);
const perPage = Number(params.get("per-page"));

function pagination(amount = 8) {
    const photoAmount = photos.splice(0, amount);
    if (photoAmount.length) {
        for (let {url,title} of photoAmount) {
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
}

pagination();

const intersectionObserver = new IntersectionObserver(entries => {
    if (entries.some(elem => elem.intersectionRatio > 0)) {
        pagination(perPage);
    }
});
intersectionObserver.observe(emptyElem);