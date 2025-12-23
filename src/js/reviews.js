import Swiper from 'swiper';
import 'swiper/css/bundle';

const reviewsLeftArrow = document.getElementById('reviewsLeftArrow');
const reviewsRightArrow = document.getElementById('reviewsRightArrow');
const reviewsDots = document.querySelectorAll('.reviews-dot');

let reviewsSwiper;

reviewsSwiper = new Swiper('.reviews-swiper-container', {
  direction: 'horizontal',
  loop: false,
  centeredSlides: false,
  slidesPerView: 1,
  slidesPerGroup: 1,
  initialSlide: 1,
  spaceBetween: -100,
  speed: 500,
  allowTouchMove: true,
  grabCursor: true,
  breakpoints: {
    1440: {
      initialSlide: 1,
    },
  },

  on: {
    init(swiper) {
      document.querySelector('.reviews-swiper-container').classList.add('show');
      updateReviewsArrows(swiper);
      updateReviewsDots(swiper.activeIndex);
      updateZIndex(swiper);
    },
    slideChange(swiper) {
      updateReviewsArrows(swiper);
      updateReviewsDots(swiper.activeIndex);
      updateZIndex(swiper);
    },
  },
});

updateReviewsArrows(reviewsSwiper);

function updateReviewsArrows(swiper) {
  reviewsLeftArrow.disabled = swiper.isBeginning;
  reviewsRightArrow.disabled = swiper.isEnd;
}

reviewsLeftArrow.addEventListener('click', () => {
  reviewsSwiper.slidePrev();
});

reviewsRightArrow.addEventListener('click', () => {
  reviewsSwiper.slideNext();
});

function updateReviewsDots(index) {
  reviewsDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

reviewsDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    reviewsSwiper.slideTo(index);
  });
});

function updateZIndex(swiper) {
  const totalSlides = swiper.slides.length;
  const activeIndex = swiper.activeIndex;

  swiper.slides.forEach((slide, index) => {
    const distance = Math.abs(activeIndex - index);

    const zIndex = totalSlides - distance;

    slide.style.zIndex = zIndex;

    slide.classList.toggle('is-active', index === activeIndex);
  });
}
