(() => {
  // app/scripts/search.js
  var Search = class {
    constructor(container) {
      this.elms = {
        container,
        formContainer: container.querySelector("form[action*='/search']"),
        inputElement: container.querySelector("input[name='q']"),
        resultsContanier: container.querySelector(".search-results")
      };
      this.initInputEvent();
    }
    initInputEvent() {
      let { inputElement, formContainer, container, resultsContanier } = this.elms;
      let buttonSubmit = formContainer.querySelector("button[type='submit']");
      let buttonViewAll = resultsContanier.querySelector(".btn-view-all");
      inputElement.addEvent("blur", () => {
        container.removeClass("active");
      });
      inputElement.addEvent("focus", () => {
        container.addClass("active");
      });
      inputElement.addEvent("input", AT.debounce(() => {
        let value = inputElement.value.trim();
        if (!value) {
          return;
        }
        buttonSubmit.addClass("pending");
        fetch(`${theme.routes.searchUrl}/suggest.json?q=${value}${theme.settings.search.urlParams}`, {
          method: "get",
          dataType: "json",
          headers: new Headers()
        }).then((data) => {
          let { resources } = data;
          let { products, collections = [], pages = [], articles = [] } = resources.results;
          let resultsCount = Object.keys(resources.results).reduce((accu, value2) => {
            return accu + resources.results[value2].length;
          }, 0);
          if (resultsCount) {
            let arrPromise = [];
            products.forEach((product) => arrPromise.push(`<div class="result-item product">
                  <a href="${product.url}" class="result-image">
                    <img src="${AT.getSizedImageUrl(product.featured_image.url || theme.assets.defaultImage, "100x")}" alt="${product.title}"/>
                  </a>
                  <div class="result-info">
                    <a href="${product.url}" class="result-title">${product.title}</a>
                    <div class="result-price js-money">${product.available ? (product.price * 100).toCurrency() : theme.strings.soldOut}</div>
                  </div>
                </div>`));
            collections.forEach((collection) => arrPromise.push(`
            <div class="result-item collection">
              <div class="result-image">
                <img src="${AT.getSizedImageUrl(collection.featured_image.url || theme.assets.defaultImage, "100x")}" alt="${collection.title}"/>
              </div>
              <div class="result-info">
                <a href="${collection.url}" class="result-title">${collection.title}</a>
              </div>
            </div>
            `));
            articles.forEach((article) => arrPromise.push(`
              <div class="result-item article">
                <a href="${article.url}" class="result-title">${article.title}</a>
              </div>
              `));
            pages.forEach((page) => arrPromise.push(`
              <div class="result-item page">
                <a href="${page.url}" class="result-title">${page.title}</a>
              </div>`));
            resultsCount > 10 ? buttonViewAll.removeClass("d-none") : buttonViewAll.addClass("d-none");
            Promise.all(arrPromise).then((data2) => {
              resultsContanier.querySelectorAll(".result-item").forEach((item) => item.remove());
              data2.forEach((element) => {
                let div = document.createElement("div");
                div.innerHTML = element;
                buttonViewAll.insertAdjacentElement("beforebegin", div.firstElementChild);
              });
              if (typeof Currencies !== "undefined") {
                resultsContanier.getElementsByClassName("js-money").forEach(Currencies.registerObserve.bind(Currencies));
              }
              buttonSubmit.removeClass("pending");
              resultsContanier.addClass("has-results");
              resultsContanier.removeClass("no-results");
            });
          } else {
            resultsContanier.removeClass("has-results");
            resultsContanier.addClass("no-results");
            buttonSubmit.removeClass("pending");
          }
        });
      }, 500));
      buttonViewAll.addEvent("click", () => formContainer.submit());
    }
  };
  window.Search = Search;
  console.log("search.js loaded");
})();
