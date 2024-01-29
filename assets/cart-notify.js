(() => {
  // app/scripts/cart-notify.js
  (() => {
    let template = document.getElementById("template-cart-notify");
    let container = template.content.firstElementChild;
    template.insertAdjacentElement("beforebegin", container);
    template.remove();
    let btnClose = container.getElementsByClassName("js-modal-close");
    let imageElm = container.querySelector(".js-image");
    let qtyElm = container.querySelector(".js-qty");
    let itemTotalMoneyElm = container.querySelector(".js-item-total-money");
    let cartTotalMoneyElm = container.querySelector(".js-cart-total-money");
    if (typeof Currencies !== "undefined") {
      Currencies.registerObserve(itemTotalMoneyElm);
      Currencies.registerObserve(cartTotalMoneyElm);
    }
    let cartTotalNumberElm = container.querySelector(".js-cart-number");
    let nameElement = container.querySelector(".js-name");
    Cart.notify = {
      show: (product) => {
        let cartTotal = Cart.value.items.reduce((accu, value) => {
          value.id !== product.id && (accu += value.final_line_price);
          return accu;
        }, 0) + product.final_line_price;
        let cartNumberTotal = Cart.value.items.reduce((accu, value) => {
          value.id !== product.id && (accu += value.quantity);
          return accu;
        }, 0) + product.quantity;
        imageElm.src = AT.getSizedImageUrl(product.featured_image ? product.featured_image.url ? product.featured_image.url : theme.assets.defaultImage : theme.assets.defaultImage, "200x");
        imageElm.alt = product.product_title;
        nameElement.innerHTML = product.product_title;
        qtyElm.innerHTML = product.quantity;
        if (typeof Currencies !== "undefined") {
          itemTotalMoneyElm.setAttribute("data-money", product.final_line_price);
          cartTotalMoneyElm.setAttribute("data-money", cartTotal);
        } else {
          itemTotalMoneyElm.innerHTML = product.final_line_price.toCurrency();
          cartTotalMoneyElm.innerHTML = cartTotal.toCurrency();
        }
        cartTotalNumberElm.innerHTML = cartNumberTotal > 1 ? theme.strings.cartNumbers.replace("{{count}}", cartNumberTotal) : theme.strings.cartNumber.replace("{{count}}", cartNumberTotal);
        AT.disableScroll();
        container.addClass("is-open");
      },
      close: () => {
        AT.enableScroll();
        container.removeClass("is-open");
        AT.debounce(() => {
          imageElm.src = "";
        }, 200)();
      }
    };
    btnClose.addEvents("click", Cart.notify.close);
  })();
})();
