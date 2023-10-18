const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".carousel__btn");

let isDragStart = false, isDraggin = false, prevPageX, prevScrollLeft, positionDiff;



const showHideIcons = () => {
    // скрывает значки пред и след в соответствии со значением прокрутки карусели
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    })
});

const autoSlide = () => {
    // если не осталось изображений для прокрутки, то возвращаемся
    if(carousel.scrollLeft == ( carousel.scrollWidth - carousel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // если пользоватиль скролить в право
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }// если пользоватиль скролить в лево
    console.log(carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
}

const dragStart = (e) => {
    // значение глобальных переменных при событии нажатия мыши
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // прокрутка изображений карусели
    if(!isDragStart) return;
    e.preventDefault();
    isDraggin = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDraggin) return;
    isDraggin = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);


const quoteContainer = document.querySelector('.quote__container');
const quoteContainerItems = Array.from(quoteContainer.children);
const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const numberList = document.querySelector('.testimonial__number-list');

quoteContainerItems.forEach(function (quote, index) {

    // скрываем все слайды кроме первого
    if(index  !== 0) quote.classList.add('hidden');


        // добавляем индексы
        quote.dataset.index = index;

        // добавляем data атрибут active для первого / активного слайда
        quoteContainerItems[0].setAttribute('data-active', '');

        // клик по слайдам
        quote.addEventListener('click', function () {
        // скрываем текущий слайд
        quote.classList.add('hidden');
        quote.removeAttribute('data-active');
        // расчитываем индекс след слайда
        const nextQuoteIndex = index + 1 === quoteContainerItems.length ? 0 : index + 1;
        // находим след слайд
        const nextQuote = quoteContainer.querySelector(`[data-index="${nextQuoteIndex}"]`);
        // отображаем след слайд
        nextQuote.classList.remove('hidden');
        nextQuote.setAttribute('data-active', '');
    })

});

btnRight.addEventListener('click', function() {

    // скрываем текущий слайд
    const currentQuote = quoteContainer.querySelector('[data-active]');
    const currentQuoteIndex = +currentQuote.dataset.index;
    currentQuote.classList.add('hidden');
    currentQuote.removeAttribute('data-active');

    // показываем следующий слайд
    const nextQuoteIndex = currentQuoteIndex + 1 === quoteContainerItems.length ? 0 : currentQuoteIndex + 1;
    
    const nextQuote = quoteContainer.querySelector(`[data-index="${nextQuoteIndex}"]`);
    nextQuote.classList.remove('hidden');
    nextQuote.setAttribute('data-active', '');

});

btnLeft.addEventListener('click', function() {

    // скрываем текущий слайд
    const currentQuote = quoteContainer.querySelector('[data-active]');
    const currentQuoteIndex = +currentQuote.dataset.index;
    currentQuote.classList.add('hidden');
    currentQuote.removeAttribute('data-active');

    // показываем следующий слайд
    const nextQuoteIndex = currentQuoteIndex === 0 ? quoteContainerItems.length - 1 : currentQuoteIndex -1;
    const nextQuote = quoteContainer.querySelector(`[data-index="${nextQuoteIndex}"]`);
    nextQuote.classList.remove('hidden');
    nextQuote.setAttribute('data-active', '');
});


