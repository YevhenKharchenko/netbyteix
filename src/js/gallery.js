import Swiper from 'swiper';
import 'swiper/css/bundle';

const galleryLeftArrow = document.getElementById('galleryLeftArrow');
const galleryRightArrow = document.getElementById('galleryRightArrow');
const galleryDots = document.querySelectorAll('.gallery-dot');

let gallerySwiper;

gallerySwiper = new Swiper('.gallery-swiper-container', {
  direction: 'horizontal',
  loop: false,
  centeredSlides: false,
  slidesPerView: 1,
  slidesPerGroup: 1,
  initialSlide: 0,
  spaceBetween: 24,
  speed: 500,
  allowTouchMove: true,
  grabCursor: true,
  breakpoints: {
    1440: {
      initialSlide: 1,
      spaceBetween: 36,
    },
  },

  on: {
    init(swiper) {
      document.querySelector('.gallery-swiper-container').classList.add('show');
      updateGalleryArrows(swiper);
      updateGalleryDots(swiper.activeIndex);
    },
    slideChange(swiper) {
      updateGalleryArrows(swiper);
      updateGalleryDots(swiper.activeIndex);
    },
  },
});

updateGalleryArrows(gallerySwiper);

function updateGalleryArrows(swiper) {
  galleryLeftArrow.disabled = swiper.isBeginning;
  galleryRightArrow.disabled = swiper.isEnd;
}

galleryLeftArrow.addEventListener('click', () => {
  gallerySwiper.slidePrev();
});

galleryRightArrow.addEventListener('click', () => {
  gallerySwiper.slideNext();
});

function updateGalleryDots(index) {
  galleryDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

galleryDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    gallerySwiper.slideTo(index);
  });
});
