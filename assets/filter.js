(() => {
  // app/scripts/filter.js
  var Filter = class {
    constructor(container) {
      let dataUrls = container.dataset.urls;
      this.collectionPosition = +container.dataset.collectionPosition;
      this.elms = {
        container,
        field1: container.querySelector(".chosen-container[data-field-index='1']"),
        field2: container.querySelector(".chosen-container[data-field-index='2']"),
        field3: container.querySelector(".chosen-container[data-field-index='3']"),
        buttonSubmit: container.querySelector(".js-btn-submit"),
        buttonReset: container.querySelector(".js-btn-reset")
      };
      this.getData(dataUrls).then((data) => {
        data = data.flat(2);
        let lastSelect = AT.cookie.get("arn-filter");
        if (!!lastSelect && lastSelect instanceof Array) {
          let [field1Value, field2Value, field3Value] = lastSelect;
          if (!field1Value || !field2Value || !field3Value) {
            AT.cookie.delete("arn-filter");
            this.initField(this.elms.field1, data);
            return;
          }
          let temporaryVariable = data.find((item) => String(item.name).toLowerCase() == field1Value.toLowerCase());
          if (!temporaryVariable) {
            AT.cookie.delete("arn-filter");
            this.initField(this.elms.field1, data);
            return;
          }
          let data2 = temporaryVariable["field_2"];
          temporaryVariable = data2.find((item) => String(item.name).toLowerCase() == field2Value.toLowerCase());
          if (!temporaryVariable) {
            AT.cookie.delete("arn-filter");
            this.initField(this.elms.field1, data);
            return;
          }
          let data3 = temporaryVariable["field_3"];
          if (!!data2 && !!data3 && data3.some((a) => String(a).toLowerCase() == field3Value.toLowerCase())) {
            this.setField(this.elms.field1, field1Value, data);
            this.setField(this.elms.field2, field2Value, data2);
            this.setField(this.elms.field3, field3Value, data3, true);
          } else {
            this.initField(this.elms.field1, data);
            AT.cookie.delete("arn-filter");
          }
        } else {
          this.initField(this.elms.field1, data);
        }
        this.initEventFieldTitle();
        this.initEventButtonReset();
        this.initEventButtonSubmit();
      });
    }
    initField(element, data, lastField) {
      let newData = lastField ? data : data.map((item) => item.name);
      let index = element.dataset.fieldIndex;
      let titleElement = element.querySelector(".js-title");
      let chosenResults = element.querySelector(".chosen-results");
      let chosenDrop = element.querySelector(".chosen-drop");
      chosenResults.innerHTML = "";
      newData.forEach((item) => {
        let li = document.createElement("li");
        li.addClass("active-result");
        li.innerHTML = String(item).toUpperCase();
        li.setAttribute("data-value", item);
        chosenResults.append(li);
      });
      chosenResults.children.addEvents("click", (e) => {
        e.stopPropagation();
        let { target } = e;
        let value = target.dataset.value;
        titleElement.innerHTML = value;
        element.setAttribute("data-value", value);
        chosenDrop.removeClass("active");
        this.change(index, data, value);
      });
    }
    setField(element, value, data, lastField) {
      this.initField(element, data, lastField);
      element.setAttribute("data-value", value);
      element.querySelector(".js-title").innerHTML = value.toUpperCase();
      element.addClass("active");
    }
    change(index, data, value) {
      let { field2, field3, buttonSubmit } = this.elms;
      switch (index) {
        case "1": {
          let newData = data.find((item) => String(item.name).toLowerCase() == value.toLowerCase())["field_2"];
          this.resetField(field2);
          this.resetField(field3);
          this.initField(field2, newData);
          field2.addClass("active");
          field2.querySelector(".chosen-drop").addClass("active");
          break;
        }
        case "2": {
          let newData = data.find((item) => String(item.name).toLowerCase() == value.toLowerCase())["field_3"];
          this.resetField(field3);
          this.initField(field3, newData, true);
          field3.addClass("active");
          field3.querySelector(".chosen-single").click();
          break;
        }
        case "3":
          break;
      }
    }
    resetField(element) {
      let title = element.querySelector(".js-title");
      element.removeClass("active");
      title.innerHTML = title.dataset.placeholder;
      element.setAttribute("data-value", "");
      element.querySelector(".chosen-results").innerHTMl = "";
    }
    initEventFieldTitle() {
      let { container } = this.elms;
      container.querySelectorAll(".chosen-container").forEach((fieldContainer) => {
        let filterTitle = fieldContainer.querySelector(".chosen-single");
        let inputSearch = fieldContainer.querySelector("input[name='search']");
        let fieldResults = fieldContainer.querySelector(".chosen-results");
        let target = filterTitle.nextElementSibling;
        filterTitle.addEvent("click", () => {
          if (target.hasClass("active")) {
            target.removeClass("active");
          } else {
            target.addClass("active");
          }
        });
        document.addEvent("click", (e) => {
          if (!filterTitle.parentElement.contains(e.target)) {
            target.removeClass("active");
          }
        });
        inputSearch.addEvent("input", () => {
          let value = inputSearch.value.toLowerCase();
          fieldResults.children.forEach((item) => {
            if (item.innerHTML.toLowerCase().includes(value)) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        });
      });
    }
    getData(urls) {
      return Promise.all(urls.split(",").map((url) => fetch(url, { dataType: "json" })));
    }
    initEventButtonReset() {
      let { field1, field2, field3, buttonReset } = this.elms;
      buttonReset.addEvent("click", () => {
        this.resetField(field1);
        field1.addClass("active");
        this.resetField(field2);
        this.resetField(field3);
        AT.cookie.delete("arn-filter");
      });
    }
    initEventButtonSubmit() {
      let { buttonSubmit, field1, field2, field3 } = this.elms;
      buttonSubmit.addEvent("click", (e) => {
        let optionValues = this.getOptionValues();
        if (optionValues.filter(Boolean).length < 3) {
          switch (optionValues.filter(Boolean).length) {
            case 0:
              field1.querySelector(".chosen-drop").addClass("active");
              break;
            case 1:
              field2.querySelector(".chosen-drop").addClass("active");
              break;
            case 2:
              field3.querySelector(".chosen-drop").addClass("active");
              break;
          }
          e.stopPropagation();
          return;
        }
        let url = this.getFilterUrl(optionValues, buttonSubmit.dataset.filterType);
        AT.cookie.set("arn-filter", optionValues, 7);
        window.location.href = url;
      });
    }
    getFilterUrl(optionValues, type = "tag") {
      if (type == "tag")
        return `${theme.routes.collectionsUrl}/${optionValues[this.collectionPosition].convertToSlug()}/${optionValues.map((i) => i.convertToSlug()).filter((i, index) => this.collectionPosition != index).join("+")}`;
      let { container } = this.elms;
      const config = JSON.parse(container.querySelector('[name="filterAttribute"]').innerHTML);
      let url = [theme.routes.collectionsUrl];
      Object.values(config).forEach((attr, i) => {
        const value = attr == "collections" ? optionValues[i].convertToSlug() : `${attr}=${optionValues[i]}`;
        url.push(value);
      });
      return url.join("&").replace("&", "/").replace("&", "?");
    }
    getOptionValues() {
      let { field1, field2, field3 } = this.elms;
      return [`${field1.dataset.value}`, `${field2.dataset.value}`, `${field3.dataset.value}`];
    }
  };
  window.Filter = Filter;
  console.log("filter.js loaded");
})();


