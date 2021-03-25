'use strict';

class SliderCarousel {
    constructor({main, wrap, next, prev, infinity = false, position = 0, slidesToShow = 3}) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = this.wrap.children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.slides.length - this.slidesToShow
        };
    }

    init() {
        this.addGloClass();
        this.addStyle();
        if (!this.next || !this.prev) {
            this.addArrow();
        }
        this.controlSlider();
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for ( const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyle() {
        const style = document.createElement('style');
        style.id = 'sliderCarousel-style';
        style.textContent = `
            .glo-slider {
                overflow: hidden;
            }
            .glo-slider__wrap {
                display: flex;
                transition: transform 0.5s;
                will-chahge: transform;
            }
            .glo-slider__item {
                flex: 0 0 ${this.options.widthSlide}%;
                margin: auto 0;
            }
        `;

        document.head.appendChild(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    renderSlider() {
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }

    prevSlider() {
        if (this.options.position === 0 && !this.options.infinity) {
            return;
        }
        --this.options.position;

        if (this.options.position < 0) {
            this.options.position = this.options.maxPosition;
        }
        this.renderSlider();
    }

    nextSlider() {

        if (this.options.position === this.options.maxPosition && !this.options.infinity) {
            return;
        }

        ++this.options.position;

        if (this.options.position > this.options.maxPosition) {
            this.options.position = 0;
        }
        this.renderSlider();
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        const style = document.createElement('style');
        style.textContent = `
            .glo-slider__prev,
            .glo-slider__next {
                margin: 10px 10px;
                border: 20px solid transparent;
                background: transparent;
                cursor: pointer;
            }
            .glo-slider__next {
                border-left-color: #19b5fe;
            }
            .glo-slider__prev {
                border-right-color: #19b5fe;
            }
            .glo-slider__prev:hover,
            .glo-slider__next:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:focus {
                background: transparent;
                outline: transparent
            }
        `;

        document.head.appendChild(style);

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);
    }




}