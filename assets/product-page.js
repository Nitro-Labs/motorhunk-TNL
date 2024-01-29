(() => {
  // app/scripts/common/function/linkOptions.js
  var linkOptions = (container, product, cb) => {
    let optionsMap = {};
    if (!container) {
      return;
    }
    let statusWhenVariantSoldOut = container.dataset.status;
    let optionElements = container.getElementsByClassName("js-option-item");
    if (product.variants.length <= 1) {
      return;
    }
    optionElements.addEvents("change", function() {
      container.dispatchEvent(new CustomEvent("swatch-change", { detail: +this.dataset.optionPosition }));
    });
    container.addEvent("swatch-change", function({ detail: position }) {
      switch (position) {
        case 1:
          if (product.options.length > 1) {
            updateOptionsInSelector(2);
          } else {
            cb(findVariantFromOption(getValueOptions()));
          }
          break;
        case 2:
          if (product.options.length === 3) {
            product.options.length === 3 && updateOptionsInSelector(3);
          } else {
            cb(findVariantFromOption(getValueOptions()));
          }
          break;
        case 3:
          cb(findVariantFromOption(getValueOptions()));
          break;
      }
    });
    product.variants.forEach((variant) => {
      if (variant.available) {
        optionsMap["root"] = optionsMap["root"] || [];
        optionsMap["root"].push(variant.option1);
        optionsMap["root"] = optionsMap["root"].reduce((accu, currentvalue) => {
          if (!accu.includes(currentvalue)) {
            accu.push(currentvalue);
          }
          return accu;
        }, []);
        if (product.options.length > 1) {
          var key = variant.option1;
          optionsMap[key] = optionsMap[key] || [];
          optionsMap[key].push(variant.option2);
          optionsMap[key] = optionsMap[key].reduce((accu, currentvalue) => {
            if (!accu.includes(currentvalue)) {
              accu.push(currentvalue);
            }
            return accu;
          }, []);
        }
        if (product.options.length === 3) {
          var key = variant.option1 + " / " + variant.option2;
          optionsMap[key] = optionsMap[key] || [];
          optionsMap[key].push(variant.option3);
          optionsMap[key] = optionsMap[key].reduce((accu, currentvalue) => {
            if (!accu.includes(currentvalue)) {
              accu.push(currentvalue);
            }
            return accu;
          }, []);
        }
      }
    });
    updateOptionsInSelector(1);
    function updateOptionsInSelector(index) {
      let setValue = false;
      let optionValues = getValueOptions();
      let key, selector, old_value;
      switch (index) {
        case 1:
          key = "root";
          selector = container.querySelector(".js-swatch-item[data-position='1']");
          break;
        case 2:
          key = optionValues.option1;
          selector = container.querySelector(".js-swatch-item[data-position='2']");
          break;
        case 3:
          key = optionValues.option1 + " / " + optionValues.option2;
          selector = container.querySelector(".js-swatch-item[data-position='3']");
          break;
      }
      switch (selector.dataset.style) {
        case "select": {
          let selectElement = selector.getElementsByClassName("js-option-item")[0];
          let oldValue2 = selectElement.value;
          switch (statusWhenVariantSoldOut) {
            case "hide": {
              selectElement.innerHTML = optionsMap[key].map((optionValue) => `<option value="${optionValue}">${optionValue}</option>`).join("");
              if (optionsMap[key].includes(oldValue2)) {
                selectElement.value = oldValue2;
              }
              break;
            }
            case "disable": {
              [...selectElement.options].forEach((option) => {
                if (optionsMap[key].includes(option.value)) {
                  option.disabled = false;
                } else {
                  option.disabled = true;
                  option.value === oldValue2 && (option.selected = false);
                }
              });
              break;
            }
          }
          break;
        }
        case "color":
        case "button":
          let inputsElement = selector.getElementsByClassName("js-option-item");
          let oldValue = [...inputsElement].find((input) => input.checked).value;
          switch (statusWhenVariantSoldOut) {
            case "hide":
              inputsElement.forEach((input) => {
                if (optionsMap[key].includes(input.value)) {
                  input.parentElement.removeClass("d-none");
                } else {
                  input.parentElement.addClass("d-none");
                  oldValue === input.value && (input.checked = false, inputsElement[0].checked = true);
                }
              });
              break;
            case "disable": {
              inputsElement.forEach((input) => {
                if (optionsMap[key].includes(input.value)) {
                  input.disabled = false;
                } else {
                  input.disabled = true;
                  oldValue === input.value && (input.checked = false, inputsElement[0].checked = true);
                }
              });
              break;
            }
          }
          break;
      }
      container.dispatchEvent(new CustomEvent("swatch-change", { detail: index }));
    }
    function getValueOptions() {
      return [...container.getElementsByClassName("js-swatch-item")].reduce((accu, element) => {
        switch (element.dataset.style) {
          case "select":
            let select = element.querySelector("select.single-option-selector");
            accu[select.name] = select.value;
            break;
          case "color":
          case "image":
          case "button":
            let inputsElements = element.querySelectorAll("input[data-single-option-selector]");
            accu[inputsElements[0].name] = [...inputsElements].find((input) => input.checked).value;
            break;
        }
        return accu;
      }, {});
    }
    function findVariantFromOption(options) {
      return product.variants.find((variant) => {
        return Object.keys(options).every((optionKey) => variant[optionKey] === options[optionKey]);
      });
    }
  };

  // app/scripts/common/function/saveProductToCookie.js
  var saveProductToCookie = () => {
    let currentProductHandle = theme.product.handle;
    let productHandleArray = AT.cookie.get("recently-viewed-products") || [];
    if (productHandleArray.length) {
      !productHandleArray.includes(currentProductHandle) && productHandleArray.unshift(currentProductHandle);
      productHandleArray.length = 10;
    } else {
      productHandleArray.unshift(currentProductHandle);
    }
    AT.cookie.set("recently-viewed-products", productHandleArray.filter(Boolean), 7);
  };

  // app/scripts/common/snippet/product/product-zoom.js
  function initPhotoSwipeFromDOM(galleryElement) {
    var parseThumbnailElements = (el) => {
      let items = [], item;
      el.querySelectorAll(".media-item").forEach((element) => {
        let img = element.querySelector("img");
        if (!img) {
          return;
        }
        item = {
          src: element.dataset.imgUrl,
          w: +img.getAttribute("width"),
          h: +img.getAttribute("height"),
          el: img
        };
        item.o = {
          src: item.src,
          w: +img.getAttribute("width"),
          h: +img.getAttribute("height")
        };
        items.push(item);
      });
      return items;
    };
    var closest = (el, fn) => {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = (e) => {
      e.preventDefault();
      var eTarget = e.target || e.srcElement;
      var clickedListItem = closest(eTarget, (el) => {
        return el.hasClass("media-item");
      });
      if (!clickedListItem) {
        return;
      }
      openPhotoSwipe(clickedListItem.dataset.position - 1);
      return false;
    };
    var openPhotoSwipe = (index, disableAnimation, fromURL) => {
      var pswpElement = document.getElementById("modal-image-zoom"), gallery, options, items;
      items = parseThumbnailElements(galleryElement);
      options = {
        galleryUID: galleryElement.getAttribute("data-pswp-uid"),
        getThumbBoundsFn: function(index2) {
          var thumbnail = items[index2].el, pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      };
      if (fromURL) {
        if (options.galleryPIDs) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }
      if (isNaN(options.index)) {
        return;
      }
      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      var realViewportWidth, useLargeImages = false, firstResize = true, imageSrcWillChange;
      gallery.listen("beforeResize", function() {
        var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
        dpiRatio = Math.min(dpiRatio, 2.5);
        realViewportWidth = gallery.viewportSize.x * dpiRatio;
        if (realViewportWidth >= 1200 || !gallery.likelyTouchDevice && realViewportWidth > 800 || screen.width > 1200) {
          if (!useLargeImages) {
            useLargeImages = true;
            imageSrcWillChange = true;
          }
        } else {
          if (useLargeImages) {
            useLargeImages = false;
            imageSrcWillChange = true;
          }
        }
        if (imageSrcWillChange && !firstResize) {
          gallery.invalidateCurrItems();
        }
        if (firstResize) {
          firstResize = false;
        }
        imageSrcWillChange = false;
      });
      gallery.listen("afterChange", () => {
        if (!!this.mainSlider && typeof this.mainSlider.goTo === "function") {
          this.mainSlider.goTo(gallery.getCurrentIndex());
        }
      });
      gallery.listen("gettingData", function(index2, item) {
        item.src = item.o.src;
        item.w = item.o.w;
        item.h = item.o.h;
      });
      gallery.init();
    };
    galleryElement.querySelectorAll("img").forEach((item) => {
      let isMoving = false;
      let startEvent = false;
      item.addEvent("mousedown", () => {
        startEvent = true;
      });
      item.addEvent("mouseup", (e) => {
        if (!isMoving) {
          onThumbnailsClick(e);
        }
        startEvent = false;
        isMoving = false;
      });
      item.addEvent("mousemove", (e) => {
        if (startEvent) {
          isMoving = true;
        }
      });
    });
    galleryElement.setAttribute("data-pswp-uid", 1);
  }

  // app/scripts/common/section/product-default.js
  var ProductDefaultTemplate = {
    onLoad: function() {
      let container = this.container;
      this.product = theme.product;
      this.elms = {
        priceCompareElement: container.querySelector(".js-compare-at-price"),
        priceElement: container.querySelector(".js-product-price"),
        variantAvailableStatus: container.querySelector(".js-product-status"),
        skuElement: container.querySelector(".js-product-sku"),
        mainMediaContainer: document.querySelector(".js-slider-main"),
        thumbnailsMediaContainer: document.querySelector(".js-slider-thumbnails"),
        tabPanelElement: container.querySelector(".js-tab-panel"),
        selectMaster: container.querySelector("#selected_variant"),
        inputQuantityContainer: container.querySelector(".js-input-quantity-container"),
        formElm: container.querySelector(".js-form-add-to-card"),
        buttonAddToCart: document.querySelector(".btn-add-to-cart"),
        swatchFormContainer: container.querySelector(".js-swatch-form"),
        openSbBtn: document.getElementById("js_open_sidebar"),
        closeSbBtn: document.getElementById("js_close_sidebar"),
        sbContainer: document.getElementById("sidebarDrawer"),
        recentlyViewContainer: document.getElementById("product_sb_recently_view")
      };
      this.initSlideMedia();
      AT.initInputQuantity(this.elms.inputQuantityContainer);
      AT.initTabPanel(this.elms.tabPanelElement);
      !!this.elms.formElm && AT.initFormAddToCart(this.elms.formElm);
      linkOptions(this.elms.swatchFormContainer, this.product, this.handleVariantChange.bind(this));
      !!this.elms.mainMediaContainer && initPhotoSwipeFromDOM.call(this, this.elms.mainMediaContainer);
    },
    initSlideMedia: function() {
      let { mainMediaContainer, thumbnailsMediaContainer } = this.elms;
      (() => {
        if (!mainMediaContainer) {
          return;
        }
        let configElement = mainMediaContainer.querySelector("[data-tns-config]");
        if (!configElement) {
          return;
        }
        let config = JSON.parse(configElement.innerHTML);
        this.mainSlider = tns(config);
        this.mainSlider.events.on("indexChanged", (info) => {
          info.slideItems.forEach((item) => {
            if (item.querySelector("video")) {
              item.querySelector("video").pause();
            }
          });
          if (info.slideItems[info.index].querySelector("video")) {
            info.slideItems[info.index].querySelector("video").play();
          }
        });
      })();
      (() => {
        if (!thumbnailsMediaContainer) {
          return;
        }
        let config = JSON.parse(thumbnailsMediaContainer.querySelector("[data-tns-config]").innerHTML);
        tns(config);
      })();
    },
    handleVariantChange: function(variant) {
      let { priceCompareElement, priceElement, variantAvailableStatus, skuElement, buttonAddToCart, selectMaster } = this.elms;
      if (!variant) {
        buttonAddToCart.disabled = true;
        variantAvailableStatus.setAttribute("data-status", "0");
        return;
      }
      if (typeof Currencies !== "undefined") {
        if (!!variant.compare_at_price) {
          priceCompareElement.setAttribute("data-money", variant.compare_at_price);
          priceCompareElement.removeClass("d-none");
        } else {
          priceCompareElement.addClass("d-none");
        }
        priceElement.setAttribute("data-money", variant.price);
      } else {
        if (!!variant.compare_at_price) {
          priceCompareElement.innerHTML = variant.compare_at_price.toCurrency();
          priceCompareElement.removeClass("d-none");
        } else {
          priceCompareElement.addClass("d-none");
        }
        priceElement.innerHTML = variant.price.toCurrency();
      }
      if (variant.available) {
        buttonAddToCart.disabled = false;
        variantAvailableStatus.setAttribute("data-status", "1");
      } else {
        buttonAddToCart.disabled = true;
        variantAvailableStatus.setAttribute("data-status", "0");
      }
      variantAvailableStatus.setAttribute("data-status", variant.available ? 1 : 0);
      if (!!skuElement) {
        !!variant.sku ? (skuElement.innerHTML = variant.sku, skuElement.parentElement.removeClass("d-none")) : skuElement.parentElement.addClass("d-none");
      }
      if (!!variant.featured_image && !!this.mainSlider) {
        this.mainSlider.goTo(variant.featured_image.position - 1);
      }
      selectMaster.value = variant.id;
    }
  };

  // app/scripts/common/section/related-product.js
  var RelatedProduct = {
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

  // app/scripts/common/section/recently-viewed.js
  var RecentlyViewed = {
    onLoad() {
      AT.cookie.get("recently-viewed-products");
      if (AT.cookie.get("recently-viewed-products")) {
        this.getListProducts(AT.cookie.get("recently-viewed-products"));
      }
    },
    getListProducts(arrListProducts) {
      let arrFiltered = arrListProducts.filter((item) => item != theme.product.handle);
      Promise.all(arrFiltered.map((handle) => {
        return fetch(`${theme.routes.searchUrl}?view=product-card&q=${handle}`, { dataType: "text" }).then((res) => {
          let div = document.createElement("div");
          div.addClass("slider-item");
          div.innerHTML = res;
          ProductCard.initEvent(div);
          return div;
        });
      })).then((arrListProductsHTML) => {
        let newArr = arrListProductsHTML.filter(Boolean);
        if (newArr.length) {
          newArr.forEach((item) => {
            this.container.querySelector(".slider-list").append(item);
          });
          this.container.removeClass("d-none");
          this.initSlider();
        }
      });
    },
    initSlider() {
      let config = JSON.parse(this.container.querySelector("[data-tns-config]").innerHTML);
      let sliderContainer = this.container.querySelector(".js-slider-container");
      config.onInit = () => {
        sliderContainer.addClass("slider-initialized");
      };
      tns(config);
    }
  };

  // app/scripts/product-page.js
  (() => {
    theme.sectionRegister.forEach((item) => {
      switch (item) {
        case "product-template":
          register(item, ProductDefaultTemplate);
          break;
        case "related-product":
          register(item, RelatedProduct);
          break;
        case "recently-viewed":
          register(item, RecentlyViewed);
          break;
      }
    });
    saveProductToCookie();
    load("*");
  })();
})();
