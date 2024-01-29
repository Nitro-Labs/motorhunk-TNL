(() => {
  // app/scripts/common/section/section-cart-page.js
  var CartPage = {
    onLoad: function() {
      let { container } = this;
      this.elms = {
        cartTotalMoney: container.querySelector(".js-cart-total-money"),
        cartTotalItem: container.querySelector(".js-cart-total-item"),
        cartItemTemplate: container.querySelector(".js-cart-item.template"),
        cartListContainer: container.querySelector(".js-cart-list"),
        cartForm: container.querySelector(".js-cart-form")
      };
      this.initUpsellSlider();
      this.initEventCartItemList();
      document.addEvent("product-added", ({ detail: product }) => this.updateLayout(product, "add"));
      this.initShoppingCalculator();
    },
    initEventCartItemList: function() {
      let { container } = this;
      let cartItemList = container.getElementsByClassName("js-cart-item");
      cartItemList.forEach((cartItem) => this.initEventCartItem(cartItem));
    },
    initUpsellSlider: function() {
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
    },
    initEventCartItem: function(cartItem) {
      let { key } = cartItem.dataset;
      let btnRemove = cartItem.querySelector(".js-btn-remove");
      let inputContainer = cartItem.querySelector(".js-quantity-container");
      let input = inputContainer.querySelector("input");
      let cartItemTotalMoney = cartItem.querySelector(".js-line-item-total-money");
      AT.initInputQuantity(inputContainer);
      btnRemove.addEvent("click", (e) => {
        e.preventDefault();
        btnRemove.addClass("pending");
        Cart.remove(key).then((data) => {
          cartItem.remove();
          this.updateLayout(data, "remove");
        });
      });
      input.addEvent("change", AT.debounce((e) => {
        if (e.limitReached && input.dataset.itemAdded == input.max) {
          SendMessage.open(theme.strings.cart.lineItemMax);
          return;
        }
        Cart.change(key, input.value).then((data) => {
          let dataItem = data.items.find((item) => item.key === key);
          this.updateItemTotalMoney(cartItemTotalMoney, dataItem.final_line_price);
          input.setAttribute("data-item-added", dataItem.quantity);
          this.updateLayout(data, "change");
        });
      }, 300));
    },
    updateLayout: function(data, action) {
      let { cartTotalItem, cartItemTemplate, cartListContainer } = this.elms;
      let cartItem;
      document.dispatchEvent(new CustomEvent("cart-change"));
      switch (action) {
        case "remove":
          if (data.item_count === 0) {
            this.container.addClass("empty");
          }
          this.updateTotalMoney(data.total_price);
          cartTotalItem.innerHTML = data.item_count;
          break;
        case "change":
          this.updateTotalMoney(data.total_price);
          cartTotalItem.innerHTML = data.item_count;
          break;
        case "add":
          if (!(cartItem = [...cartListContainer.children].find((item) => item.dataset.key === data.key))) {
            cartItem = cartItemTemplate.cloneNode(true);
            cartItem.setAttribute("key", data.key);
            cartItem.querySelector(".js-name").innerHTML = `<strong>${data.product_title}</strong>`;
            cartItem.querySelectorAll(".js-url").forEach((item) => item.href = data.url);
            cartItem.querySelector(".js-img").src = data.image;
            cartItem.querySelector(".js-price").innerHTML = data.final_price.toCurrency();
            cartItem.querySelector(".js-options").innerHTML = data.options_with_values.reduce((accu, option) => {
              accu += `<p class="option">${option.name}: ${option.value}</p>`;
              return accu;
            }, "");
            this.initEventCartItem(cartItem);
            cartItem.removeClass("template", "d-none");
            cartListContainer.prepend(cartItem);
          }
          cartItem.querySelector(".js-input-quantity").value = data.quantity;
          this.updateItemTotalMoney(cartItem.querySelector(".js-line-item-total-money"), data.final_line_price);
          break;
        default:
          break;
      }
    },
    initShoppingCalculator() {
      let container = document.getElementById("shipping-calculator");
      if (!container) {
        return;
      }
      let shippingForm = container.querySelector(".shipping-calculator_form");
      let btnSubmit = container.querySelector(".js-btn-submit-shipping");
      let countryField = container.querySelector("[name='address[country]']");
      let provinceField = container.querySelector("[name='address[province]']");
      let zipField = container.querySelector("[name='address[zip]']");
      let shippingResults = container.querySelector(".js-shipping-calculator-results");
      let shippingResultsTitle = shippingResults.querySelector(".title");
      let shippingResultsList = shippingResults.querySelector("ul");
      let hasProvince = false;
      const handleCountriesChange = (e) => {
        let value = e.target.value;
        if (Countries[value].provinces) {
          provinceField.innerHTML = Countries[value].provinces.map((province) => {
            return `<option value="${province}">${province}</option>`;
          }).join("");
          hasProvince = true;
          provinceField.removeClass("d-none");
        } else {
          provinceField.addClass("d-none");
          hasProvince = false;
        }
      };
      countryField.addEvent("change", handleCountriesChange);
      document.addEvent("Countries loaded", () => countryField.dispatchEvent(new Event("change")));
      btnSubmit.addEvent("click", () => {
        if (countryField.value === "---") {
          SendMessage.open(theme.strings.shipping.missingCountry);
          return;
        }
        if (hasProvince && provinceField.value === "placeholder-province") {
          SendMessage.open(theme.strings.shipping.missingProvince);
          return;
        }
        if (!zipField.value) {
          SendMessage.open(theme.strings.shipping.missingZip);
          return;
        }
        shippingResults.style.height = "";
        fetch(`/cart/shipping_rates.json?${[
          "shipping_address[country]=" + countryField.value,
          hasProvince && "shipping_address[province]=" + provinceField.value,
          "shipping_address[zip]=" + zipField.value
        ].filter(Boolean).join("&")}`, { dataType: "json" }).then((data) => {
          let { length } = data.shipping_rates;
          shippingResultsTitle.innerHTML = "";
          if (length === 0) {
            shippingResultsTitle.innerHTML = theme.strings.shipping.notResult;
          } else if (length === 1) {
            shippingResultsTitle.innerHTML = theme.strings.shipping.oneResult.replace("{{address}}", [zipField.value, provinceField.value, countryField.value].filter(Boolean).join(", "));
          } else {
            shippingResultsTitle.innerHTML = theme.strings.shipping.manyResults.replace("{{address}}", [zipField.value, provinceField.value, countryField.value].filter(Boolean).join(", ")).replace("{{results_total}}", data.shipping_rates.length).replace("{{rate_first}}", `<span class="js-money">${(data.shipping_rates[0].price * 100).toCurrency()}</span>`);
          }
          shippingResultsList.innerHTML = "";
          if (length != 0) {
            shippingResultsList.innerHTML = data.shipping_rates.map((item) => {
              let li = document.createElement("li");
              li.innerHTML = theme.strings.shipping.resultItem.replace("{{name}}", item.name).replace("{{price}}", `<span class="js-money">${(item.price * 100).toCurrency()}</span>`);
              return li.outerHTML;
            }).join("");
          }
          if (typeof Currencies !== "undefined") {
            shippingResultsList.getElementsByClassName("js-money").forEach(Currencies.registerObserve.bind(Currencies));
          }
          shippingResults.style.height = shippingResults.firstElementChild.offsetHeight + "px";
        }).catch((data) => {
          console.log(data);
          shippingResultsTitle.innerHTML = "";
          shippingResultsList.innerHTML = Object.keys(data).map((key) => {
            return `<li>${key}: ${data[key]}</li>`;
          });
          shippingResults.style.height = shippingResults.firstElementChild.offsetHeight + "px";
        });
      });
    },
    updateItemTotalMoney(element, totalPrice) {
      if (typeof Currencies === "undefined") {
        element.innerHTML = totalPrice.toCurrency();
      } else {
        element.setAttribute("data-money", totalPrice);
      }
    },
    updateTotalMoney(totalPrice) {
      let { cartTotalMoney } = this.elms;
      if (typeof Currencies === "undefined") {
        cartTotalMoney.innerHTML = totalPrice.toCurrency();
      } else {
        cartTotalMoney.setAttribute("data-money", totalPrice);
      }
    }
  };

  // app/scripts/cart-page.js
  (() => {
    register("cart-page", CartPage);
    load("*");
  })();
})();
