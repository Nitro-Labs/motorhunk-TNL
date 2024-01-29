(() => {
  // app/scripts/common/section/slideshow.js
  var SlideShow = {
    onLoad: function() {
      let { container } = this;
      let sliderContainer = container.querySelector(".js-slider-container");
      let configElement = sliderContainer.querySelector("[data-tns-config]");
      if (!configElement) {
        return;
      }
      let config = JSON.parse(configElement.innerHTML);
      config.onInit = () => {
        sliderContainer.addClass("slider-initialized");
      };
      this.slider = tns(config);
    }
  };

  // app/scripts/common/section/logo-list.js
  var LogoList = {
    onLoad: function() {
      let { container } = this;
      try {
        AT.detectVisible({
          element: container,
          callback: () => {
            let sliderContainer = container.querySelector(".js-slider-container");
            let config = JSON.parse(sliderContainer.querySelector("[data-tns-config]").innerHTML);
            config.onInit = () => {
              sliderContainer.addClass("slider-initialized");
            };
            this.slider = tns(config);
          },
          rootMargin: "0px"
        });
      } catch (error) {
        console.warn("Section LogoList has an error: ", error);
        console.log(container);
      }
    },
    onBlockSelect({ detail: { blockId } }) {
      let index = [...this.slider.getInfo().slideItems].findIndex((item) => item.dataset.blockId === blockId);
      this.slider.pause();
      this.slider.goTo(index);
    },
    onBlockDeselect() {
      this.slider.goTo(0);
      this.slider.play();
    }
  };

  // app/scripts/common/section/blog-section.js
  var BlogSection = {
    onLoad: function() {
      let { container } = this;
      try {
        AT.detectVisible({
          element: container,
          callback: () => {
            let sliderContainer = container.querySelector(".js-slider-container");
            let config = JSON.parse(sliderContainer.querySelector("[data-tns-config]").innerHTML);
            config.onInit = () => {
              sliderContainer.addClass("slider-initialized");
            };
            tns(config);
            let articlesLazy = container.getElementsByClassName("lazy-article");
            articlesLazy.forEach((element) => {
              let { url } = element.dataset;
              fetch(url, { dataType: "text" }).then((content) => element.innerHTML = content);
            });
          },
          rootMargin: "0px"
        });
      } catch (error) {
        console.log("Has an error from: ", error);
        console.log(container);
      }
    }
  };

  // app/scripts/common/section/product-tab.js
  var ProductTab = {
    onLoad: function() {
      let { container } = this;
      AT.detectVisible({
        element: container,
        rootMargin: "100px 0px",
        callback: () => {
          let slidersContainer = container.getElementsByClassName("js-slider-container");
          AT.initTabPanel(container);
          slidersContainer.forEach((item) => {
            let config = JSON.parse(item.querySelector("[data-tns-config]").innerHTML);
            config.onInit = () => {
              item.addClass("slider-initialized");
            };
            tns(config);
          });
          let lazyProductCards = container.getElementsByClassName("lazy-product-card");
          Promise.all([...lazyProductCards].map((element) => element.dataset.handle).filter((item, index, seft) => seft.indexOf(item) === index).map((handle) => {
            return fetch(`${theme.routes.searchUrl}?view=product-card&q=${handle}`, { dataType: "text" }).then((content) => {
              container.querySelectorAll(`.lazy-product-card[data-handle='${handle}']`).forEach((element) => {
                element.innerHTML = content;
                ProductCard.initEvent(element);
                element.removeClass("lazy-product-card");
              });
            });
          })).then(() => {
            if (typeof window.SPR !== "undefined") {
              window.SPR.initDomEls();
              window.SPR.loadBadges();
              window.SPR.loadProducts();
            }
          });
        }
      });
    }
  };

  // app/scripts/common/section/slideshow-2.js
  var SlideShow2 = {
    onLoad: function() {
      let { container } = this;
      try {
        AT.detectVisible({
          element: container,
          callback: () => {
            let config = JSON.parse(container.querySelector("[data-tns-config]").innerHTML);
            this.slider = tns(config);
            this.initCoundDown();
          },
          rootMargin: "0px"
        });
      } catch (error) {
      }
    },
    onBlockSelect: function() {
      console.log(object);
    },
    initCoundDown: function() {
      let countDownElements = this.container.getElementsByClassName("js-countdown");
      countDownElements.forEach(AT.initCountDown);
    }
  };

  // app/scripts/common/section/testimonial.js
  var Testimonial = {
    onLoad: function() {
      let { container } = this;
      try {
        this.sliderContainer = container.querySelector(".js-slider-container");
        let config = JSON.parse(this.sliderContainer.querySelector("[data-tns-config]").innerHTML);
        config.onInit = () => {
          this.sliderContainer.addClass("slider-initialized");
        };
        this.slider = tns(config);
      } catch (error) {
        console.warn("Testimonial Section has an error:", error);
        console.log(container);
      }
    },
    onBlockSelect: function({ detail: { blockId } }) {
      let index = [...this.slider.getInfo().slideItems].findIndex((item) => item.dataset.blockId === blockId);
      this.slider.pause();
      this.slider.goTo(index);
    },
    onBlockDeselect: function() {
      this.slider.goTo(0);
      this.slider.play();
    }
  };

  // app/scripts/common/section/featured-collections.js
  var FeaturedCollections = {
    onLoad: function() {
      let { container } = this;
      let sliderContainer = container.querySelector(".js-slider-container");
      if (!sliderContainer) {
        return;
      }
      let config = JSON.parse(sliderContainer.querySelector("[data-tns-config]").innerHTML);
      config.onInit = () => {
        sliderContainer.addClass("slider-initialized");
      };
      tns(config);
    }
  };

  // app/scripts/common/section/slideshow-menu.js
  var SlideshowMenu = {
    onLoad: function() {
      let { container } = this;
      try {
        let buttonsCollapse = container.getElementsByClassName("js-btn-collapse");
        let sliderContainer = container.querySelector(".js-slider-container");
        let configElement = sliderContainer.querySelector("[data-tns-config]");
        if (!!configElement) {
          let config = JSON.parse(configElement.innerHTML);
          config.onInit = () => {
            sliderContainer.addClass("slider-initialized");
          };
          tns(config);
        }
        buttonsCollapse.forEach((button) => {
          let target = button.nextElementSibling;
          let height = target.firstElementChild.offsetHeight;
          button.addEvent("click", () => {
            if (target.hasClass("is-open")) {
              button.removeClass("active");
              target.removeClass("is-open");
              target.style.height = "";
            } else {
              target.style.height = height + "px";
              button.addClass("active");
              target.addClass("is-open");
            }
          });
        });
      } catch (error) {
        console.log("Has an error from Slideshow Menu:", container);
        console.log(error);
      }
    }
  };

  // app/scripts/common/section/slideshow-banner.js
  var SlideshowBanner = {
    onLoad: function() {
      let { container } = this;
      let sliderContainer = container.querySelector(".js-slider-container");
      let config = JSON.parse(sliderContainer.querySelector("[data-tns-config]").innerHTML);
      config.onInit = () => {
        sliderContainer.addClass("slider-initialized");
      };
      tns(config);
    }
  };

  // app/scripts/common/section/banner-filter.js
  var BannerFilter = {
    onLoad: function() {
      if (typeof Filter === "undefined") {
        AT.loadCollectionFilter().then(() => {
          new Filter(this.container.querySelector(".chosen-wrapper"));
        });
      } else {
        new Filter(this.container.querySelector(".chosen-wrapper"));
      }
    }
  };

  // app/scripts/common/section/left-column.js
  var LeftColumn = {
    onLoad: function() {
      let collapseButtons = this.container.getElementsByClassName("js-btn-collapse");
      let sliderContainers = this.container.getElementsByClassName("js-slider-container");
      collapseButtons.forEach((button) => {
        let target = button.nextElementSibling;
        button.addEvent("click", function() {
          if (this.hasClass("is-open")) {
            this.removeClass("is-open");
            target.firstElementChild.removeClass("is-open");
            target.style.height = "";
            if (target.hasClass("grandchild-menu")) {
              let parent = target.closest(".child-menu");
              parent && (target.closest(".child-menu").style.height = parent.firstElementChild.offsetHeight - target.firstElementChild.offsetHeight + "px");
            }
          } else {
            this.addClass("is-open");
            target.firstElementChild.addClass("is-open");
            target.style.height = target.firstElementChild.offsetHeight + "px";
            if (target.hasClass("grandchild-menu")) {
              let parent = target.closest(".child-menu");
              parent && (target.closest(".child-menu").style.height = parent.firstElementChild.offsetHeight + target.firstElementChild.offsetHeight + "px");
            }
          }
        });
      });
      sliderContainers.forEach((sliderContainer) => {
        let config = JSON.parse(sliderContainer.querySelector("[data-tns-config]").innerHTML);
        config.onInit = () => {
          sliderContainer.addClass("slider-initialized");
        };
        tns(config);
      });
    }
  };

  // app/scripts/home.js
  (function() {
    theme.sectionRegister.forEach(registerSection);
    load("*");
    if (Shopify.designMode) {
      document.addEventListener("shopify:section:load", function({ detail: { sectionId } }) {
        try {
          let element = document.getElementById("section-" + sectionId);
          if (!element) {
            return;
          }
          let { sectionType } = element.dataset;
          if (element && !Shopify.theme.sections.instances.find((item) => item.container === element)) {
            if (theme.sectionRegister.includes(sectionType)) {
              load(element.dataset.sectionType);
            } else {
              registerSection(sectionType);
              load(sectionType);
            }
          }
        } catch (error) {
          console.log(error);
          console.warn(sectionId);
        }
      });
    }
    function registerSection(type) {
      switch (type) {
        case "left-column":
          register(type, LeftColumn);
          break;
        case "banner-filter":
          register(type, BannerFilter);
          break;
        case "slideshow":
          register(type, SlideShow);
          break;
        case "logo-list":
          register(type, LogoList);
          break;
        case "featured-blog":
          register(type, BlogSection);
          break;
        case "product-tab":
          register(type, ProductTab);
          break;
        case "slideshow-v2":
          register(type, SlideShow2);
          break;
        case "testimonials":
          register(type, Testimonial);
          break;
        case "featured-collections":
          register(type, FeaturedCollections);
          break;
        case "slideshow-menu":
          register(type, SlideshowMenu);
          break;
        case "slideshow-banner":
          register(type, SlideshowBanner);
          break;
        case "annoucement-bar":
          register(type, {
            onLoad: function() {
              let currencyVsLanguage = this.container.querySelector(".js-currency-with-language");
              if (!!currencyVsLanguage) {
                let modal = document.getElementById("modal_currency_vs_language");
                currencyVsLanguage.addEventListener("click", function() {
                  modal.classList.add("is-open");
                });
              }
            }
          });
          break;
      }
    }
    console.log("home.js loaded");
  })();
})();
