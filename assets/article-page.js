(() => {
  // app/scripts/common/section/article-page.js
  var ArticlePage = {
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

  // app/scripts/article-page.js
  (() => {
    register("article-page", ArticlePage);
    load("*");
  })();
})();
