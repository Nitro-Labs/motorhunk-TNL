(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/easytimer.js/dist/easytimer.js
  var require_easytimer = __commonJS({
    "node_modules/easytimer.js/dist/easytimer.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.easytimer = {}));
      })(exports, function(exports2) {
        "use strict";
        function _typeof(obj) {
          "@babel/helpers - typeof";
          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj2) {
              return typeof obj2;
            };
          } else {
            _typeof = function(obj2) {
              return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            };
          }
          return _typeof(obj);
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function ownKeys(object2, enumerableOnly) {
          var keys = Object.keys(object2);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object2);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread2(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function leftPadding(string, padLength, character) {
          var i;
          var characters = "";
          string = typeof string === "number" ? String(string) : string;
          if (string.length > padLength) {
            return string;
          }
          for (i = 0; i < padLength; i = i + 1) {
            characters += String(character);
          }
          return (characters + string).slice(-characters.length);
        }
        function TimeCounter() {
          this.reset();
        }
        TimeCounter.prototype.toString = function() {
          var units = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["hours", "minutes", "seconds"];
          var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ":";
          var leftZeroPadding = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 2;
          units = units || ["hours", "minutes", "seconds"];
          separator = separator || ":";
          leftZeroPadding = leftZeroPadding || 2;
          var arrayTime = [];
          var i;
          for (i = 0; i < units.length; i = i + 1) {
            if (this[units[i]] !== void 0) {
              if (units[i] === "secondTenths") {
                arrayTime.push(this[units[i]]);
              } else {
                arrayTime.push(leftPadding(this[units[i]], leftZeroPadding, "0"));
              }
            }
          }
          return arrayTime.join(separator);
        };
        TimeCounter.prototype.reset = function() {
          this.secondTenths = 0;
          this.seconds = 0;
          this.minutes = 0;
          this.hours = 0;
          this.days = 0;
        };
        function EventEmitter() {
          this.events = {};
        }
        EventEmitter.prototype.on = function(event, listener) {
          var _this = this;
          if (!Array.isArray(this.events[event])) {
            this.events[event] = [];
          }
          this.events[event].push(listener);
          return function() {
            return _this.removeListener(event, listener);
          };
        };
        EventEmitter.prototype.removeListener = function(event, listener) {
          if (Array.isArray(this.events[event])) {
            var eventIndex = this.events[event].indexOf(listener);
            if (eventIndex > -1) {
              this.events[event].splice(eventIndex, 1);
            }
          }
        };
        EventEmitter.prototype.emit = function(event) {
          var _this2 = this;
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (Array.isArray(this.events[event])) {
            this.events[event].forEach(function(listener) {
              return listener.apply(_this2, args);
            });
          }
        };
        var SECOND_TENTHS_PER_SECOND = 10;
        var SECONDS_PER_MINUTE = 60;
        var MINUTES_PER_HOUR = 60;
        var HOURS_PER_DAY = 24;
        var SECOND_TENTHS_POSITION = 0;
        var SECONDS_POSITION = 1;
        var MINUTES_POSITION = 2;
        var HOURS_POSITION = 3;
        var DAYS_POSITION = 4;
        var SECOND_TENTHS = "secondTenths";
        var SECONDS = "seconds";
        var MINUTES = "minutes";
        var HOURS = "hours";
        var DAYS = "days";
        var VALID_INPUT_VALUES = [SECOND_TENTHS, SECONDS, MINUTES, HOURS, DAYS];
        var unitsInMilliseconds = {
          secondTenths: 100,
          seconds: 1e3,
          minutes: 6e4,
          hours: 36e5,
          days: 864e5
        };
        var groupedUnits = {
          secondTenths: SECOND_TENTHS_PER_SECOND,
          seconds: SECONDS_PER_MINUTE,
          minutes: MINUTES_PER_HOUR,
          hours: HOURS_PER_DAY
        };
        function mod(number, module2) {
          return (number % module2 + module2) % module2;
        }
        function Timer3() {
          var defaultParams = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var counters = new TimeCounter();
          var totalCounters = new TimeCounter();
          var intervalId;
          var eventEmitter = new EventEmitter();
          var running = false;
          var paused = false;
          var precision;
          var timerTypeFactor;
          var customCallback;
          var timerConfig = {};
          var currentParams;
          var targetValues;
          var startValues;
          var countdown;
          var startingDate;
          var targetDate;
          var eventData = {
            detail: {
              timer: this
            }
          };
          setParams(defaultParams);
          function updateCounters(precision2, roundedValue) {
            var unitsPerGroup = groupedUnits[precision2];
            totalCounters[precision2] = roundedValue;
            if (precision2 === DAYS) {
              counters[precision2] = Math.abs(roundedValue);
            } else if (roundedValue >= 0) {
              counters[precision2] = mod(roundedValue, unitsPerGroup);
            } else {
              counters[precision2] = mod(unitsPerGroup - mod(roundedValue, unitsPerGroup), unitsPerGroup);
            }
          }
          function updateDays(value) {
            return updateUnitByPrecision(value, DAYS);
          }
          function updateHours(value) {
            return updateUnitByPrecision(value, HOURS);
          }
          function updateMinutes(value) {
            return updateUnitByPrecision(value, MINUTES);
          }
          function updateSeconds(value) {
            return updateUnitByPrecision(value, SECONDS);
          }
          function updateSecondTenths(value) {
            return updateUnitByPrecision(value, SECOND_TENTHS);
          }
          function updateUnitByPrecision(value, precision2) {
            var previousValue = totalCounters[precision2];
            updateCounters(precision2, calculateIntegerUnitQuotient(value, unitsInMilliseconds[precision2]));
            return totalCounters[precision2] !== previousValue;
          }
          function stopTimerAndResetCounters() {
            stopTimer();
            resetCounters();
          }
          function stopTimer() {
            clearInterval(intervalId);
            intervalId = void 0;
            running = false;
            paused = false;
          }
          function setParamsAndStartTimer(params) {
            if (!isPaused()) {
              setParams(params);
            } else {
              startingDate = calculateStartingDate();
              targetValues = setTarget(currentParams.target);
            }
            startTimer();
          }
          function startTimer() {
            var interval = unitsInMilliseconds[precision];
            if (isTargetAchieved(roundTimestamp(Date.now()))) {
              return;
            }
            intervalId = setInterval(updateTimerAndDispatchEvents, interval);
            running = true;
            paused = false;
          }
          function calculateStartingDate() {
            return roundTimestamp(Date.now()) - totalCounters.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;
          }
          function updateTimerAndDispatchEvents() {
            var currentTime = roundTimestamp(Date.now());
            var valuesUpdated = updateTimer();
            dispatchEvents(valuesUpdated);
            customCallback(eventData.detail.timer);
            if (isTargetAchieved(currentTime)) {
              stop();
              dispatchEvent("targetAchieved", eventData);
            }
          }
          function updateTimer() {
            var currentTime = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : roundTimestamp(Date.now());
            var elapsedTime = timerTypeFactor > 0 ? currentTime - startingDate : startingDate - currentTime;
            var valuesUpdated = {};
            valuesUpdated[SECOND_TENTHS] = updateSecondTenths(elapsedTime);
            valuesUpdated[SECONDS] = updateSeconds(elapsedTime);
            valuesUpdated[MINUTES] = updateMinutes(elapsedTime);
            valuesUpdated[HOURS] = updateHours(elapsedTime);
            valuesUpdated[DAYS] = updateDays(elapsedTime);
            return valuesUpdated;
          }
          function roundTimestamp(timestamp) {
            return Math.floor(timestamp / unitsInMilliseconds[precision]) * unitsInMilliseconds[precision];
          }
          function dispatchEvents(valuesUpdated) {
            if (valuesUpdated[SECOND_TENTHS]) {
              dispatchEvent("secondTenthsUpdated", eventData);
            }
            if (valuesUpdated[SECONDS]) {
              dispatchEvent("secondsUpdated", eventData);
            }
            if (valuesUpdated[MINUTES]) {
              dispatchEvent("minutesUpdated", eventData);
            }
            if (valuesUpdated[HOURS]) {
              dispatchEvent("hoursUpdated", eventData);
            }
            if (valuesUpdated[DAYS]) {
              dispatchEvent("daysUpdated", eventData);
            }
          }
          function isTargetAchieved(currentDate) {
            return targetValues instanceof Array && currentDate >= targetDate;
          }
          function resetCounters() {
            counters.reset();
            totalCounters.reset();
          }
          function setParams(params) {
            params = params || {};
            precision = checkPrecision(params.precision);
            customCallback = typeof params.callback === "function" ? params.callback : function() {
            };
            countdown = params.countdown === true;
            timerTypeFactor = countdown === true ? -1 : 1;
            if (_typeof(params.startValues) === "object") {
              setStartValues(params.startValues);
            } else {
              startValues = null;
            }
            startingDate = calculateStartingDate();
            updateTimer();
            if (_typeof(params.target) === "object") {
              targetValues = setTarget(params.target);
            } else if (countdown) {
              params.target = {
                seconds: 0
              };
              targetValues = setTarget(params.target);
            } else {
              targetValues = null;
            }
            timerConfig = {
              precision,
              callback: customCallback,
              countdown: _typeof(params) === "object" && params.countdown === true,
              target: targetValues,
              startValues
            };
            currentParams = params;
          }
          function checkPrecision(precision2) {
            precision2 = typeof precision2 === "string" ? precision2 : SECONDS;
            if (!isValidInputValue(precision2)) {
              throw new Error("Error in precision parameter: ".concat(precision2, " is not a valid value"));
            }
            return precision2;
          }
          function isValidInputValue(value) {
            return VALID_INPUT_VALUES.indexOf(value) >= 0;
          }
          function configInputValues(inputValues) {
            var values;
            if (_typeof(inputValues) === "object") {
              if (inputValues instanceof Array) {
                if (inputValues.length !== 5) {
                  throw new Error("Array size not valid");
                }
                values = inputValues;
              } else {
                for (var value in inputValues) {
                  if (VALID_INPUT_VALUES.indexOf(value) < 0) {
                    throw new Error("Error in startValues or target parameter: ".concat(value, " is not a valid input value"));
                  }
                }
                values = [inputValues.secondTenths || 0, inputValues.seconds || 0, inputValues.minutes || 0, inputValues.hours || 0, inputValues.days || 0];
              }
            }
            var secondTenths = values[SECOND_TENTHS_POSITION];
            var seconds = values[SECONDS_POSITION] + calculateIntegerUnitQuotient(secondTenths, SECOND_TENTHS_PER_SECOND);
            var minutes = values[MINUTES_POSITION] + calculateIntegerUnitQuotient(seconds, SECONDS_PER_MINUTE);
            var hours = values[HOURS_POSITION] + calculateIntegerUnitQuotient(minutes, MINUTES_PER_HOUR);
            var days = values[DAYS_POSITION] + calculateIntegerUnitQuotient(hours, HOURS_PER_DAY);
            values[SECOND_TENTHS_POSITION] = secondTenths % SECOND_TENTHS_PER_SECOND;
            values[SECONDS_POSITION] = seconds % SECONDS_PER_MINUTE;
            values[MINUTES_POSITION] = minutes % MINUTES_PER_HOUR;
            values[HOURS_POSITION] = hours % HOURS_PER_DAY;
            values[DAYS_POSITION] = days;
            return values;
          }
          function calculateIntegerUnitQuotient(unit, divisor) {
            var quotient = unit / divisor;
            return quotient < 0 ? Math.ceil(quotient) : Math.floor(quotient);
          }
          function setTarget(inputTarget) {
            if (!inputTarget) {
              return;
            }
            targetValues = configInputValues(inputTarget);
            var targetCounter = calculateTotalCounterFromValues(targetValues);
            targetDate = startingDate + targetCounter.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;
            return targetValues;
          }
          function setStartValues(inputStartValues) {
            startValues = configInputValues(inputStartValues);
            counters.secondTenths = startValues[SECOND_TENTHS_POSITION];
            counters.seconds = startValues[SECONDS_POSITION];
            counters.minutes = startValues[MINUTES_POSITION];
            counters.hours = startValues[HOURS_POSITION];
            counters.days = startValues[DAYS_POSITION];
            totalCounters = calculateTotalCounterFromValues(startValues, totalCounters);
          }
          function calculateTotalCounterFromValues(values, outputCounter) {
            var total = outputCounter || {};
            total.days = values[DAYS_POSITION];
            total.hours = total.days * HOURS_PER_DAY + values[HOURS_POSITION];
            total.minutes = total.hours * MINUTES_PER_HOUR + values[MINUTES_POSITION];
            total.seconds = total.minutes * SECONDS_PER_MINUTE + values[SECONDS_POSITION];
            total.secondTenths = total.seconds * SECOND_TENTHS_PER_SECOND + values[[SECOND_TENTHS_POSITION]];
            return total;
          }
          function stop() {
            stopTimerAndResetCounters();
            dispatchEvent("stopped", eventData);
          }
          function reset() {
            stopTimerAndResetCounters();
            setParamsAndStartTimer(currentParams);
            dispatchEvent("reset", eventData);
          }
          function start() {
            var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            params = _objectSpread2(_objectSpread2({}, defaultParams), params);
            if (isRunning()) {
              return;
            }
            setParamsAndStartTimer(params);
            dispatchEvent("started", eventData);
          }
          function pause() {
            stopTimer();
            paused = true;
            dispatchEvent("paused", eventData);
          }
          function addEventListener(eventType, listener) {
            eventEmitter.on(eventType, listener);
          }
          function removeEventListener(eventType, listener) {
            eventEmitter.removeListener(eventType, listener);
          }
          function dispatchEvent(eventType, data) {
            eventEmitter.emit(eventType, data);
          }
          function isRunning() {
            return running;
          }
          function isPaused() {
            return paused;
          }
          function getTimeValues() {
            return counters;
          }
          function getTotalTimeValues() {
            return totalCounters;
          }
          function getConfig() {
            return timerConfig;
          }
          if (typeof this !== "undefined") {
            this.start = start;
            this.pause = pause;
            this.stop = stop;
            this.reset = reset;
            this.isRunning = isRunning;
            this.isPaused = isPaused;
            this.getTimeValues = getTimeValues;
            this.getTotalTimeValues = getTotalTimeValues;
            this.getConfig = getConfig;
            this.addEventListener = addEventListener;
            this.on = addEventListener;
            this.removeEventListener = removeEventListener;
            this.off = removeEventListener;
          }
        }
        exports2.Timer = Timer3;
        exports2.default = Timer3;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // app/scripts/common/define.js
  Object.assign(NodeList.prototype, {
    removeClass: function() {
      for (const item of this) {
        item.classList.remove(...arguments);
      }
    },
    addClass: function() {
      for (const item of this) {
        item.classList.add(...arguments);
      }
    },
    addEvents: function(...args) {
      for (const item of this) {
        item.addEvent(...args);
      }
    },
    removeEvents: function(...args) {
      for (const item of this) {
        item.removeEvent(...args);
      }
    }
  });
  Object.assign(HTMLCollection.prototype, {
    removeClass: function() {
      for (const item of this) {
        item.classList.remove(...arguments);
      }
    },
    addClass: function() {
      for (const item of this) {
        item.classList.add(...arguments);
      }
    },
    addEvents: function(...args) {
      for (const item of this) {
        item.addEventListener(...args);
      }
    },
    removeEvents: function(...args) {
      for (const item of this) {
        item.removeEventListener(...args);
      }
    },
    forEach: Array.prototype.forEach
  });
  Object.assign(HTMLElement.prototype, {
    removeClass: function(...args) {
      this.classList.remove(...args);
    },
    addClass: function(...args) {
      this.classList.add(...args);
    },
    hasClass: function(className) {
      return this.classList.contains(className);
    }
  });
  Object.assign(Number.prototype, {
    toCurrency: moneyFormat
  });
  Object.assign(String.prototype, {
    toCurrency: moneyFormat,
    convertToSlug: function() {
      let str = this;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
      str = str.replace(/\u02C6|\u0306|\u031B/g, "");
      return str.toLowerCase().replace(/-/g, " ").trim().replace(/[\(\)\[\]'"]/g, "").replace(/[^\w]+/g, "-");
    }
  });
  var moneyFormatString = theme.currency.format;
  function moneyFormat(format) {
    let cents = this;
    if (typeof cents === "string") {
      cents = cents.replace(".", "");
    }
    var value = "";
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormatString;
    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ",";
      decimal = decimal || ".";
      if (isNaN(number) || number === null) {
        return 0;
      }
      number = (number / 100).toFixed(precision);
      var parts = number.split(".");
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands);
      var centsAmount = parts[1] ? decimal + parts[1] : "";
      return dollarsAmount + centsAmount;
    }
    switch (formatString.match(placeholderRegex)[1]) {
      case "amount":
        value = formatWithDelimiters(cents, 2);
        break;
      case "amount_no_decimals":
        value = formatWithDelimiters(cents, 0);
        break;
      case "amount_with_comma_separator":
        value = formatWithDelimiters(cents, 2, ".", ",");
        break;
      case "amount_no_decimals_with_comma_separator":
        value = formatWithDelimiters(cents, 0, ".", ",");
        break;
      case "amount_no_decimals_with_space_separator":
        value = formatWithDelimiters(cents, 0, " ");
        break;
      case "amount_with_apostrophe_separator":
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }
    return formatString.replace(placeholderRegex, value);
  }
  (function() {
    let nativeFetch = window.fetch;
    window.fetch = function(...agrs) {
      let dataType = !!agrs[1] ? agrs[1].dataType : "";
      return nativeFetch(...agrs).then(async (res) => {
        if (!res.ok && res.type === "basic") {
          throw await res.json();
        }
        switch (dataType) {
          case "json": {
            return res.json();
          }
          case "text": {
            return res.text();
          }
          default:
            return res;
        }
      });
    };
  })();

  // node_modules/@shopify/theme-images/images.js
  function getSizedImageUrl2(src, size) {
    if (size === null) {
      return src;
    }
    if (size === "master") {
      return removeProtocol(src);
    }
    const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    if (match) {
      const prefix = src.split(match[0]);
      const suffix = match[0];
      return removeProtocol(`${prefix[0]}_${size}${suffix}`);
    } else {
      return null;
    }
  }
  function removeProtocol(path) {
    return path.replace(/http(s)?:/, "");
  }

  // node_modules/@shopify/theme-sections/section.js
  var SECTION_ID_ATTR = "data-section-id";
  function Section(container, properties) {
    this.container = validateContainerElement(container);
    this.id = container.getAttribute(SECTION_ID_ATTR);
    this.extensions = [];
    Object.assign(this, validatePropertiesObject(properties));
    this.onLoad();
  }
  Section.prototype = {
    onLoad: Function.prototype,
    onUnload: Function.prototype,
    onSelect: Function.prototype,
    onDeselect: Function.prototype,
    onBlockSelect: Function.prototype,
    onBlockDeselect: Function.prototype,
    extend: function extend(extension) {
      this.extensions.push(extension);
      var extensionClone = Object.assign({}, extension);
      delete extensionClone.init;
      Object.assign(this, extensionClone);
      if (typeof extension.init === "function") {
        extension.init.apply(this);
      }
    }
  };
  function validateContainerElement(container) {
    if (!(container instanceof Element)) {
      throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");
    }
    if (container.getAttribute(SECTION_ID_ATTR) === null) {
      throw new Error("Theme Sections: The section container provided does not have an id assigned to the " + SECTION_ID_ATTR + " attribute.");
    }
    return container;
  }
  function validatePropertiesObject(value) {
    if (typeof value !== "undefined" && typeof value !== "object" || value === null) {
      throw new TypeError("Theme Sections: The properties object provided is not a valid");
    }
    return value;
  }
  if (typeof Object.assign != "function") {
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        "use strict";
        if (target == null) {
          throw new TypeError("Cannot convert undefined or null to object");
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
          if (nextSource != null) {
            for (var nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  // node_modules/@shopify/theme-sections/theme-sections.js
  var SECTION_TYPE_ATTR = "data-section-type";
  var SECTION_ID_ATTR2 = "data-section-id";
  window.Shopify = window.Shopify || {};
  window.Shopify.theme = window.Shopify.theme || {};
  window.Shopify.theme.sections = window.Shopify.theme.sections || {};
  var registered = window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {};
  var instances = window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || [];
  function register(type, properties) {
    if (typeof type !== "string") {
      throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");
    }
    if (typeof registered[type] !== "undefined") {
      throw new Error('Theme Sections: A section of type "' + type + '" has already been registered. You cannot register the same section type twice');
    }
    function TypedSection(container) {
      Section.call(this, container, properties);
    }
    TypedSection.constructor = Section;
    TypedSection.prototype = Object.create(Section.prototype);
    TypedSection.prototype.type = type;
    return registered[type] = TypedSection;
  }
  function load(types, containers) {
    types = normalizeType(types);
    if (typeof containers === "undefined") {
      containers = document.querySelectorAll("[" + SECTION_TYPE_ATTR + "]");
    }
    containers = normalizeContainers(containers);
    types.forEach(function(type) {
      var TypedSection = registered[type];
      if (typeof TypedSection === "undefined") {
        return;
      }
      containers = containers.filter(function(container) {
        if (isInstance(container)) {
          return false;
        }
        if (container.getAttribute(SECTION_TYPE_ATTR) === null) {
          return false;
        }
        if (container.getAttribute(SECTION_TYPE_ATTR) !== type) {
          return true;
        }
        instances.push(new TypedSection(container));
        return false;
      });
    });
  }
  function unload(selector) {
    var instancesToUnload = getInstances(selector);
    instancesToUnload.forEach(function(instance) {
      var index = instances.map(function(e) {
        return e.id;
      }).indexOf(instance.id);
      instances.splice(index, 1);
      instance.onUnload();
    });
  }
  function getInstances(selector) {
    var filteredInstances = [];
    if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {
      var firstElement = selector[0];
    }
    if (selector instanceof Element || firstElement instanceof Element) {
      var containers = normalizeContainers(selector);
      containers.forEach(function(container) {
        filteredInstances = filteredInstances.concat(instances.filter(function(instance) {
          return instance.container === container;
        }));
      });
    } else if (typeof selector === "string" || typeof firstElement === "string") {
      var types = normalizeType(selector);
      types.forEach(function(type) {
        filteredInstances = filteredInstances.concat(instances.filter(function(instance) {
          return instance.type === type;
        }));
      });
    }
    return filteredInstances;
  }
  function getInstanceById(id) {
    var instance;
    for (var i = 0; i < instances.length; i++) {
      if (instances[i].id === id) {
        instance = instances[i];
        break;
      }
    }
    return instance;
  }
  function isInstance(selector) {
    return getInstances(selector).length > 0;
  }
  function normalizeType(types) {
    if (types === "*") {
      types = Object.keys(registered);
    } else if (typeof types === "string") {
      types = [types];
    } else if (types.constructor === Section) {
      types = [types.prototype.type];
    } else if (Array.isArray(types) && types[0].constructor === Section) {
      types = types.map(function(TypedSection) {
        return TypedSection.prototype.type;
      });
    }
    types = types.map(function(type) {
      return type.toLowerCase();
    });
    return types;
  }
  function normalizeContainers(containers) {
    if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {
      containers = Array.prototype.slice.call(containers);
    } else if (NodeList.prototype.isPrototypeOf(containers) && containers.length === 0) {
      containers = [];
    } else if (containers === null) {
      containers = [];
    } else if (!Array.isArray(containers) && containers instanceof Element) {
      containers = [containers];
    }
    return containers;
  }
  if (window.Shopify.designMode) {
    document.addEventListener("shopify:section:load", function(event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector("[" + SECTION_ID_ATTR2 + '="' + id + '"]');
      if (container !== null) {
        load(container.getAttribute(SECTION_TYPE_ATTR), container);
      }
    });
    document.addEventListener("shopify:section:unload", function(event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector("[" + SECTION_ID_ATTR2 + '="' + id + '"]');
      var instance = getInstances(container)[0];
      if (typeof instance === "object") {
        unload(container);
      }
    });
    document.addEventListener("shopify:section:select", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onSelect(event);
      }
    });
    document.addEventListener("shopify:section:deselect", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onDeselect(event);
      }
    });
    document.addEventListener("shopify:block:select", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onBlockSelect(event);
      }
    });
    document.addEventListener("shopify:block:deselect", function(event) {
      var instance = getInstanceById(event.detail.sectionId);
      if (typeof instance === "object") {
        instance.onBlockDeselect(event);
      }
    });
  }

  // app/scripts/common.js
  var import_easytimer = __toModule(require_easytimer());

  // app/scripts/common/function/debounce.js
  var debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // app/scripts/common/function/backToTop.js
  var backToTop = function() {
    let target = document.getElementById("back-to-top");
    target.addEvent("click", () => {
      AT.scrollTo(0);
    });
    if (window.pageYOffset > window.innerHeight * 1.5) {
      target.addClass("show");
    }
    window.addEvent("scroll", () => {
      if (window.pageYOffset > window.innerHeight * 1.5) {
        target.addClass("show");
      } else {
        target.hasClass("show") && target.removeClass("show");
      }
    });
  };

  // app/scripts/common/function/enableScroll.js
  function enableScroll() {
    document.documentElement.style.paddingRight = "";
    document.documentElement.removeClass("overflow-hidden");
  }

  // app/scripts/common/function/disableScroll.js
  function disableScroll() {
    let paddingRight = window.innerWidth - document.documentElement.offsetWidth + "px";
    document.documentElement.style.paddingRight = paddingRight;
    document.documentElement.addClass("overflow-hidden");
  }

  // app/scripts/common/function/loadCartNotify.js
  var loadCartNotify = () => {
    return new Promise((resolve, reject) => {
      AT.loadScript(theme.assets.cartNotify, () => {
        document.dispatchEvent(new CustomEvent("cart-notify-initialized"));
      });
      document.addEvent("cart-notify-initialized", function() {
        resolve(1);
      });
    });
  };

  // app/scripts/common/function/loadScript.js
  var loadScript = (url, cb) => {
    let script = document.createElement("script");
    script.src = url;
    !!cb && (script.onload = cb);
    script.onError = () => {
      console.warn("Has an error when loading script:", url);
    };
    document.body.append(script);
  };

  // app/scripts/common/function/initTabPanel.js
  var initTabPanel = (container) => {
    if (!container) {
      return;
    }
    try {
      let tabControls = container.querySelector(".js-tab-controls");
      let tabContents = container.querySelector(".js-tab-contents");
      if (!tabControls || !tabContents) {
        return;
      }
      [...tabControls.children].forEach((item) => {
        let target = tabContents.querySelector(item.dataset.target);
        item.addEvent("click", () => {
          if (item.hasClass("active")) {
            return;
          }
          tabControls.children.removeClass("active");
          tabContents.children.removeClass("active");
          item.addClass("active");
          target.addClass("active");
        });
      });
    } catch (error) {
      console.warn("Has an error from Tab Panel function:", error);
      console.log(container);
    }
  };

  // app/scripts/common/function/inputQuantity.js
  var initInputQuantity = (container) => {
    if (!container) {
      return;
    }
    let btnPlus = container.querySelector(".js-qty-plus");
    let btnMinus = container.querySelector(".js-qty-minus");
    let input = container.querySelector("input");
    btnPlus.addEvent("click", () => {
      input.dispatchEvent(new CustomEvent("change", { detail: "plus" }));
    });
    btnMinus.addEvent("click", () => {
      input.dispatchEvent(new CustomEvent("change", { detail: "minus" }));
    });
    input.addEvent("change", function(e) {
      let min = !!this.min ? +this.min : void 0;
      let max = !!this.max ? +this.max : void 0;
      let value = +this.value;
      switch (e.detail) {
        case "plus":
          ++value;
          if (value > max) {
            this.value = max;
            e.limitReached = true;
          } else {
            this.value = value;
          }
          break;
        case "minus":
          --value;
          this.value = min > value ? min : value;
          break;
      }
    });
  };

  // app/scripts/common/function/scrollTo.js
  var scrollTo = (position) => {
    let pageYoffset = window.pageYOffset;
    let boolean = position - pageYoffset > 0 ? true : false;
    let distance = Math.abs((pageYoffset - position) / 10);
    requestAnimationFrame(step);
    function step() {
      if (boolean) {
        if (pageYoffset < position) {
          window.scrollTo(0, (pageYoffset += distance) > position ? position : pageYoffset);
          requestAnimationFrame(step);
        }
      } else {
        if (pageYoffset > position) {
          window.scrollTo(0, pageYoffset >= distance ? pageYoffset -= distance : (pageYoffset = position - 1, position));
          requestAnimationFrame(step);
        }
      }
    }
  };

  // app/scripts/common/function/formAddToCart.js
  var initFormAddToCart = (form) => {
    if (!form) {
      return;
    }
    let btnAddToCart = form.querySelector(".btn-add-to-cart");
    form.addEvent("submit", (e) => {
      e.preventDefault();
      btnAddToCart.addClass("pending");
      Cart.add(form).finally(() => {
        btnAddToCart.removeClass("pending");
      });
    });
  };

  // app/scripts/common/function/cookie.js
  var cookie = {
    get: function(key) {
      var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
      return keyValue ? JSON.parse(keyValue[2]) : null;
    },
    set: function(key, value, expiry) {
      var expires = new Date();
      expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1e3);
      document.cookie = key + "=" + JSON.stringify(value) + ";expires=" + expires.toUTCString() + ";path=/";
    },
    delete: function(key) {
      var keyValue = this.get(key);
      this.set(key, keyValue, "-1");
    }
  };

  // app/scripts/common/function/initCountDown.js
  var initCountDown = (element) => {
    let daysElm = element.querySelector(".js-countdown-days");
    let hoursElm = element.querySelector(".js-countdown-hours");
    let minutesElm = element.querySelector(".js-countdown-minutes");
    let secondsElm = element.querySelector(".js-countdown-seconds");
    let date = new Date(element.dataset.countdown).getTime() - new Date().getTime();
    let timer = new Timer();
    timer.start({ countdown: true, startValues: { seconds: date / 1e3 } });
    timer.addEventListener("secondsUpdated", function(e) {
      let days = timer.getTimeValues().days;
      let hours = timer.getTimeValues().hours;
      let minutes = timer.getTimeValues().minutes;
      let seconds = timer.getTimeValues().seconds;
      daysElm.innerHTML = days > 9 ? days : `0${days}`;
      hoursElm.innerHTML = hours > 9 ? hours : `0${hours}`;
      minutesElm.innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      secondsElm.innerHTML = seconds > 9 ? seconds : `0${seconds}`;
    });
  };

  // app/scripts/common/function/loadSearch.js
  var loadSearch = () => {
    return new Promise((resolve, reject) => {
      AT.loadScript(theme.assets.search, () => {
        resolve(1);
      });
    });
  };

  // app/scripts/common/function/searchDrawer.js
  var searchDrawer = {
    loaded: false,
    load: function() {
      let template = document.getElementById("drawer-search-template");
      return new Promise((resolve, reject) => {
        let drawerContainer = template.content.firstElementChild;
        template.insertAdjacentElement("beforebegin", drawerContainer);
        template.remove();
        this.container = drawerContainer;
        this.loaded = true;
        let closeButtons = drawerContainer.querySelectorAll(".js-drawer-close");
        closeButtons.addEvents("click", () => {
          this.close();
        });
        if (!theme.settings.search.disable) {
          typeof Search !== "undefined" ? new Search(this.container) : AT.loadSearch().then(() => new Search(this.container));
        }
        resolve(1);
      });
    },
    open: function() {
      this.container.addClass("is-open");
      AT.disableScroll();
    },
    close: function() {
      this.container.removeClass("is-open");
      AT.debounce(() => {
        AT.enableScroll();
      }, 100)();
    }
  };

  // app/scripts/common/function/initEventMobileBar.js
  var initEventMobileBar = () => {
    if (Shopify.designMode) {
      init();
    } else {
      document.addEvent("lazyincluded", init);
    }
    function init(e) {
      let container = e ? e.target : document.getElementById("mobile-bar");
      if (container.dataset.type === "mobile-bar") {
        let buttonWishlist = container.querySelector(".show-wishlist");
        let searchButton = container.querySelector(".js-mobile-bar-open");
        !!buttonWishlist && buttonWishlist.addEvent("click", () => {
          document.dispatchEvent(new CustomEvent("show-layout"));
        });
        !!searchButton && searchButton.addEvent("click", () => {
          if (theme.settings.search.disable) {
            let mobileSearch = document.getElementById("mobile-search");
            let input = mobileSearch.querySelector("input[name='q']");
            input.dispatchEvent(new Event(theme.settings.search.useApp == "globo" ? "focus" : "touchstart"));
          } else {
            AT.searchDrawer.loaded ? AT.searchDrawer.open() : AT.searchDrawer.load().then(AT.debounce(() => AT.searchDrawer.open(), 100));
          }
        });
      }
    }
  };

  // app/scripts/common/function/loadCollectionFilter.js
  var loadCollectionFilter = () => {
    return new Promise((resolve, reject) => {
      AT.loadScript(theme.assets.collectionFilter, () => resolve(1));
    });
  };

  // app/scripts/common/function/loadCurrencies.js
  var loadCurrencies = () => {
    return new Promise((resolve, reject) => {
      AT.loadScript(theme.assets.currenciesRateUrl, () => {
        AT.loadScript(theme.assets.currenciesUrl, () => {
          resolve(1);
        });
      });
    });
  };

  // app/scripts/common/function/detectVisible.js
  var detectVisible = ({ element, rootMargin, callback, threshold = 0 }) => {
    let observer = new IntersectionObserver((entries, observer2) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer2.unobserve(element);
        }
      });
    }, { rootMargin });
    observer.observe(element);
  };

  // app/scripts/common/function/getParameterByName.js
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // app/scripts/common/function/removeParam.js
  function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0], param, params_arr = [], queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
      params_arr = queryString.split("&");
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
        param = params_arr[i].split("=")[0];
        if (param === key) {
          params_arr.splice(i, 1);
        }
      }
      if (params_arr.length)
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
  }

  // app/scripts/common/model/cart.js
  var Cart2 = class {
    constructor() {
      this.cartNotifyLoaded = false;
      this.dropdownLoaded = false;
      this.drawerLoaded = false;
      this.elms = {
        cartTotalItemElements: document.getElementsByClassName("js-cart-items-count"),
        cartIconTotalMoney: document.getElementsByClassName("js-cart-icon-total-money")
      };
      this.settings = { ...theme.settings.cart };
      this.get().then(() => {
        if (theme.template != "cart") {
          switch (this.settings.type) {
            case "dropdown": {
              if (window.innerWidth > 992) {
                this.initEventDropdown();
                document.addEvent("mobile-lazyloaded", () => this.initEventDrawer());
              } else {
                this.initEventDrawer();
                document.addEvent("desktop-lazyloaded", () => this.initEventDropdown());
              }
              break;
            }
            case "drawer": {
              this.initEventDrawer();
              break;
            }
          }
          if (window.innerWidth > 992) {
            document.querySelector(".header-desktop .js-cart-items-count").innerHTML = this.value.item_count;
            document.addEvent("mobile-lazyloaded", () => {
              document.querySelector(".header-mobile .js-cart-items-count").innerHTML = this.value.item_count;
            });
          } else {
            document.querySelector(".header-mobile .js-cart-items-count").innerHTML = this.value.item_count;
            document.addEvent("desktop-lazyloaded", () => {
              document.querySelector(".header-desktop .js-cart-items-count").innerHTML = this.value.item_count;
            });
          }
        }
      });
      if (theme.template == "cart") {
        this.initEventListenerCartPage();
      }
    }
    add(form) {
      return fetch(theme.routes.cartAdd, {
        method: "post",
        headers: new Headers({ "X-Requested-With": "XMLHttpRequest" }),
        body: new FormData(form),
        dataType: "json"
      }).then((product) => {
        if (window.location.pathname.includes("/cart")) {
          window.location.reload();
          return;
        }
        this.updateLayout("add", product);
        this.get();
        if (!!this.cartNotifyLoaded) {
          this.notify.show(product);
        } else {
          AT.loadCartNotify().then(() => {
            this.notify.show(product);
            this.cartNotifyLoaded = true;
          });
        }
        document.dispatchEvent(new CustomEvent("product-added", { detail: product }));
        return product;
      }).catch(({ status, description }) => {
        if (status == 422) {
          SendMessage.open(description);
        }
      });
    }
    get() {
      return fetch(theme.routes.cartGet, { dataType: "json" }).then((data) => {
        this.value = data;
        return data;
      });
    }
    clear() {
      fetch(theme.routes.cartClear, { dataType: "json" }).then((data) => {
        this.value = data;
        this.updateLayout();
        return data;
      });
    }
    change(key, quantity) {
      return fetch(theme.routes.cartChange, {
        method: "post",
        body: JSON.stringify({ id: key, quantity }),
        headers: { "Content-Type": "application/json" },
        dataType: "json"
      }).then((data) => {
        this.value = data;
        this.updateLayout();
        return data;
      });
    }
    remove(key) {
      return fetch(theme.routes.cartChange, {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        dataType: "json",
        body: JSON.stringify({ id: key, quantity: 0 })
      }).then((data) => {
        this.value = data;
        this.updateLayout("remove", data);
        return data;
      });
    }
    updateLayout(action, data) {
      if (theme.template === "cart") {
        return;
      }
      let { cartTotalItemElements, cartIconTotalMoney } = this.elms;
      switch (action) {
        case "add":
          cartTotalItemElements.forEach((item) => {
            item.innerHTML = this.value.items.reduce((accu, nextValue) => {
              return nextValue.key != data.key ? accu += nextValue.quantity : accu;
            }, 0) + data.quantity;
          });
          let totalMoney = this.value.items.reduce((accu, nextValue) => {
            return nextValue.key != data.key ? accu += nextValue.final_line_price : accu;
          }, 0) + data.final_line_price;
          if (typeof Currencies === "undefined") {
            cartIconTotalMoney.forEach((item) => {
              item.innerHTML = totalMoney.toCurrency();
            });
          } else {
            cartIconTotalMoney.forEach((item) => item.setAttribute("data-money", totalMoney));
          }
          break;
        case "remove": {
          cartTotalItemElements.forEach((item) => {
            item.innerHTML = this.value.item_count;
          });
          if (typeof Currencies === "undefined") {
            cartIconTotalMoney.forEach((item) => {
              item.innerHTML = this.value.total_price.toCurrency();
            });
          } else {
            cartIconTotalMoney.forEach((item) => {
              item.setAttribute("data-money", this.value.total_price);
            });
          }
          break;
        }
      }
      switch (this.settings.type) {
        case "dropdown":
          if (this.dropdownLoaded && this.drawerLoaded) {
            this.updateDropdown(action, data);
            this.updateDrawer(action, data);
            return;
          }
          if (this.dropdownLoaded) {
            this.updateDropdown(action, data);
          } else if (window.innerWidth > 992) {
            this.updateDropdown(action, data);
          }
          if (this.drawerLoaded) {
            this.updateDrawer(action, data);
          } else if (window.innerWidth <= 992) {
            this.updateDrawer(action, data);
          }
          break;
        case "drawer":
          this.updateDrawer(action, data);
          break;
      }
    }
    loadDropdown() {
      let { cartDropdownContainer } = this.elms;
      return fetch(`${theme.routes.searchUrl}/?view=cart-dropdown`, { dataType: "text" }).then((text) => {
        let cartDropdownElement = cartDropdownContainer.querySelector(".js-cart-dropdown");
        cartDropdownElement.innerHTML = text;
        this.dropdownLoaded = true;
        if (typeof Currencies !== "undefined") {
          cartDropdownElement.getElementsByClassName("js-money").forEach(Currencies.registerObserve.bind(Currencies));
        }
        Object.assign(this.elms, {
          cartMoneyTotalElement: cartDropdownContainer.querySelector(".js-cart-total-money"),
          cartDropdownElement,
          dropdownCartItemList: cartDropdownContainer.querySelector(".js-cart-list")
        });
        let cartItemElements = cartDropdownContainer.querySelectorAll(".js-cart-item:not(.template)");
        cartItemElements.forEach(this.initEventCartItemDropdown.bind(this));
      });
    }
    updateDropdown(action, data) {
      let { cartMoneyTotalElement, dropdownCartItemList, cartDropdownContainer } = this.elms;
      if (!this.dropdownLoaded) {
        cartDropdownContainer.setAttribute("data-items", data.quantity || data.item_count);
        this.loadDropdown();
        return;
      }
      let cartItem;
      switch (action) {
        case "add":
          if (cartItem = dropdownCartItemList.querySelector(`.js-cart-item[data-key='${data.key}']`)) {
            cartItem.querySelector(".js-quantity").innerHTML = data.quantity;
          } else {
            cartItem = dropdownCartItemList.querySelector(".js-cart-item.template").cloneNode(true);
            cartItem.querySelector(".js-name").innerHTML = data.product_title;
            cartItem.querySelectorAll(".js-url").forEach((item) => item.href = data.url);
            cartItem.querySelector(".js-img").src = AT.getSizedImageUrl(data.featured_image ? data.featured_image.url ? theme.assets.defaultImage : theme.assets.defaultImage : theme.assets.defaultImage, "120x");
            cartItem.querySelector(".js-quantity").innerHTML = data.quantity;
            cartItem.setAttribute("data-key", data.key);
            cartItem.querySelector(".js-price").innerHTML = data.final_price.toCurrency();
            if (typeof Currencies !== "undefined") {
              Currencies.registerObserve(cartItem.querySelector(".js-price"));
            }
            this.initEventCartItemDropdown(cartItem);
            cartItem.removeClass("template", "d-none");
            dropdownCartItemList.prepend(cartItem);
          }
          this.updatePrice(cartMoneyTotalElement, this.value.items.reduce((accu, nextValue) => {
            return data.key != nextValue.key ? accu += nextValue.final_line_price : accu;
          }, 0) + data.final_line_price);
          cartDropdownContainer.setAttribute("data-items", this.value.items.reduce((accu, nextValue) => {
            return data.key != nextValue.key ? accu += nextValue.quantity : accu;
          }, 0) + data.quantity);
          break;
        case "remove":
          cartDropdownContainer.querySelectorAll(".js-cart-item:not(.template)").forEach((element) => {
            if (!this.value.items.find((item) => element.dataset.key)) {
              element.remove();
            }
          });
          this.updatePrice(cartMoneyTotalElement, this.value.total_price);
          cartDropdownContainer.setAttribute("data-items", this.value.item_count);
      }
    }
    initEventCartItemDropdown(element) {
      let key = element.dataset.key;
      let removeButton = element.querySelector(".js-btn-remove");
      removeButton.addEvent("click", () => {
        removeButton.addClass("pending");
        this.remove(key).then(() => {
          removeButton.removeClass("pending");
          element.remove();
        });
      });
    }
    initEventDropdown() {
      let cartDropdownContainer = document.querySelector(".js-cart-icon-container");
      let cartItemsCount = cartDropdownContainer.querySelector(".js-cart-items-count");
      Object.assign(this.elms, {
        cartDropdownContainer
      });
      cartItemsCount.innerHTML = this.value.item_count;
      cartDropdownContainer.addEvent("mouseover", () => {
        if (!this.dropdownLoaded && cartDropdownContainer.dataset.items != "0") {
          this.loadDropdown();
        }
      }, { once: true });
    }
    initEventDrawer() {
      let container = document.getElementById("cart-drawer-container");
      let lazyContainer = container.querySelector(".lazy-drawer-cart");
      this.drawer = {
        container,
        open: function() {
          AT.disableScroll();
          this.container.addClass("is-open");
        },
        load: () => {
          return fetch(`${theme.routes.searchUrl}?view=cart-drawer`, { dataType: "text" }).then((content) => {
            container.setAttribute("data-items", this.value.item_count);
            this.drawerLoaded = true;
            lazyContainer.innerHTML = content;
            let cartItemList = lazyContainer.querySelectorAll(".js-cart-item:not(.template)");
            let removeButtons = container.querySelectorAll(".js-drawer-close");
            removeButtons.addEvents("click", () => {
              container.removeClass("is-open");
              AT.debounce(AT.enableScroll, 100)();
            });
            if (typeof Currencies !== "undefined") {
              lazyContainer.querySelectorAll(".js-money").forEach(Currencies.registerObserve.bind(Currencies));
            }
            Object.assign(this.elms, {
              cartDrawerContainer: container,
              cartDrawerItemsContainer: lazyContainer.querySelector(".js-cart-list"),
              cartDrawerItemTemplate: lazyContainer.querySelector(".js-cart-item.template"),
              cartDrawerTotalMoney: lazyContainer.querySelector(".js-cart-total-money")
            });
            cartItemList.forEach(this.initEventCartItemDrawer.bind(this));
          });
        }
      };
      document.addEvent("open-cart-drawer", () => {
        if (!this.drawerLoaded) {
          this.drawer.load();
        }
        this.drawer.open();
      });
    }
    updateDrawer(action, data) {
      if (!this.drawerLoaded) {
        this.drawer.load();
        return;
      }
      let { cartDrawerItemsContainer, cartDrawerItemTemplate, cartDrawerContainer, cartDrawerTotalMoney } = this.elms;
      let cartItem, totalMoney;
      switch (action) {
        case "add": {
          if (cartItem = cartDrawerItemsContainer.querySelector(`.js-cart-item[data-key='${data.key}']`)) {
            cartItem.querySelector(".js-qty").value = data.quantity;
          } else {
            cartItem = cartDrawerItemTemplate.cloneNode(true);
            let priceElement = cartItem.querySelector(".js-price");
            if (theme.settings.currencies.enable) {
              priceElement.addClass("js-money");
            }
            priceElement.innerHTML = data.final_price.toCurrency();
            if (typeof Currencies !== "undefined") {
              Currencies.registerObserve(priceElement);
            }
            cartItem.querySelector(".js-img").src = AT.getSizedImageUrl(data.featured_image ? data.featured_image.url ? theme.assets.defaultImage : theme.assets.defaultImage : theme.assets.defaultImage, "200x");
            cartItem.querySelectorAll(".js-url").forEach((item) => item.href = data.url);
            cartItem.querySelector(".js-name").innerHTML = data.product_title;
            cartItem.querySelector(".js-qty").value = data.quantity;
            cartItem.querySelector(".js-option").innerHTML = data.options_with_values.map((item) => item.value).join("/");
            cartItem.removeClass("d-none", "template");
            cartItem.setAttribute("data-key", data.key);
            this.initEventCartItemDrawer(cartItem);
            cartDrawerItemTemplate.insertAdjacentElement("afterend", cartItem);
          }
          cartDrawerContainer.setAttribute("data-items", this.value.items.reduce((accu, nextValue) => {
            return nextValue.key !== data.key ? accu += data.quantity : accu;
          }, 0) + data.quantity);
          totalMoney = this.value.items.reduce((accu, nextValue) => {
            return nextValue.key !== data.key ? accu += nextValue.final_line_price : accu;
          }, 0) + data.final_line_price;
          break;
        }
        case "remove": {
          cartDrawerContainer.querySelectorAll(".js-cart-item:not(.template").forEach((element) => {
            let { key } = element.dataset;
            if (!this.value.items.find((item) => item.key === key)) {
              element.remove();
            }
          });
          cartDrawerContainer.setAttribute("data-items", this.value.item_count);
          totalMoney = this.value.total_price;
          break;
        }
      }
      if (typeof Currencies === "undefined") {
        cartDrawerTotalMoney.innerHTML = totalMoney.toCurrency();
      } else {
        cartDrawerTotalMoney.setAttribute("data-money", totalMoney);
      }
    }
    initEventCartItemDrawer(element) {
      let key = element.dataset.key;
      let removeButton = element.querySelector(".js-btn-remove");
      removeButton.addEvent("click", () => {
        removeButton.addClass("pending");
        this.remove(key).then(() => {
          removeButton.removeClass("pending");
          element.remove();
        });
      });
    }
    initEventListenerCartPage() {
      document.addEvent("cart-change", () => {
        this.updateTotalItemsLayout();
        this.updateTotalMoneyLayout();
      });
    }
    updatePrice(element, price) {
      if (typeof Currencies === "undefined") {
        element.innerHTML = price.toCurrency();
      } else {
        element.setAttribute("data-money", price);
      }
    }
    updateTotalItemsLayout() {
      this.elms.cartTotalItemElements.forEach((element) => element.innerHTML = this.value.item_count);
    }
    updateTotalMoneyLayout() {
      let { cartIconTotalMoney } = this.elms;
      cartIconTotalMoney.forEach((element) => {
        if (typeof Currencies === "undefined") {
          element.innerHTML = this.value.total_price.toCurrency();
        } else {
          element.setAttribute("data-money", this.value.total_price);
        }
      });
    }
  };

  // app/scripts/common/model/productCard.js
  var ProductCard2 = class {
    constructor() {
      let productList = document.getElementsByClassName("js-product-card");
      productList.forEach((element) => {
        try {
          this.initEvent(element);
          element.addClass("product-initialized");
        } catch (error) {
          console.warn("Has an error on Product Card:", error);
          console.log(element);
        }
      });
    }
    initEvent(element) {
      let form = element.querySelector("form[action*='/cart/add']");
      let countdownElement = element.querySelector(".js-countdown");
      AT.initFormAddToCart(form);
      !!countdownElement && AT.initCountDown(countdownElement);
      if (typeof Currencies !== "undefined") {
        element.getElementsByClassName("js-money").forEach(Currencies.registerObserve.bind(Currencies));
      }
    }
  };

  // app/scripts/common/model/sendMessage.js
  var SendMessage2 = class {
    constructor() {
      let container = this.container = document.getElementById("modal-message");
      this.elms = {
        messageElm: container.querySelector(".js-message")
      };
      this.modal = new Popup(container);
    }
    open(message) {
      this.elms.messageElm.innerHTML = message;
      this.modal.open();
    }
  };

  // app/scripts/common/model/popup.js
  var Popup2 = class {
    constructor(container) {
      this.container = container;
      this.container.getElementsByClassName("js-modal-close").addEvents("click", this.close.bind(this));
    }
    close() {
      this.container.removeClass("is-open");
      AT.enableScroll();
    }
    open() {
      this.container.addClass("is-open");
      AT.disableScroll();
    }
  };

  // app/scripts/common/section/header.js
  var Header = {
    onLoad: function() {
      let { container } = this;
      theme.settings.header.sticky && this.initSticky();
      this.elms = {
        mainMegaMenuLazyContainer: document.getElementById("main-mega-menu"),
        subMegaMenuLazyContainer: document.getElementById("sub-mega-menu"),
        mainSublinksLazyContainer: document.getElementById("header-menu-sublinks"),
        searchDrawerOpenButton: container.querySelector(".js-open-search-drawer")
      };
      this.initEventDesktop();
      this.initEventMobile();
      this.initEventButtonSearch();
    },
    initEventButtonSearch: function() {
      let { searchDrawerOpenButton } = this.elms;
      if (!!searchDrawerOpenButton && !theme.settings.search.disable) {
        searchDrawerOpenButton.addEvent("click", () => {
          if (!AT.searchDrawer.loaded) {
            AT.searchDrawer.load().then(AT.debounce(() => AT.searchDrawer.open(), 100));
          } else {
            AT.searchDrawer.open();
          }
        });
      }
    },
    initSticky: function() {
      let headerContainer = document.getElementById("header");
      let headerHeight = headerContainer.clientHeight;
      window.addEventListener("scroll", function() {
        if (window.pageYOffset >= headerHeight) {
          headerContainer.style.height = headerHeight + "px";
          headerContainer.classList.add("header-sticky");
        } else {
          headerContainer.style.height = "";
          headerContainer.classList.remove("header-sticky");
        }
      });
      if (window.pageYOffset >= headerHeight) {
        headerContainer.style.height = headerHeight + "px";
        headerContainer.classList.add("header-sticky");
      }
    },
    initEventDesktop: function() {
      let { mainMegaMenuLazyContainer, mainSublinksLazyContainer, subMegaMenuLazyContainer } = this.elms;
      let mainDeskMegaMenu = !!mainMegaMenuLazyContainer ? !!mainMegaMenuLazyContainer.content ? mainMegaMenuLazyContainer.content.firstElementChild : mainMegaMenuLazyContainer : "";
      let mainDeskSublinksMenu = !!mainSublinksLazyContainer ? !!mainSublinksLazyContainer.content ? mainSublinksLazyContainer.content.firstElementChild : mainSublinksLazyContainer : "";
      let subDeskMegaMenu = !!subMegaMenuLazyContainer ? !!subMegaMenuLazyContainer.content ? subMegaMenuLazyContainer.content.firstElementChild : subMegaMenuLazyContainer : "";
      if (window.innerWidth > 992) {
        init();
        this.initSearch();
      } else {
        document.addEvent("desktop-lazyloaded", () => {
          init();
          this.initSearch();
        });
      }
      function init() {
        let deskMainLazy = document.getElementById("header_main_menu").querySelectorAll(".desk-lazy-menu");
        let deskSubLazy = document.getElementById("header-second-nav");
        [...deskMainLazy].forEach((element) => {
          element.addEvent("mouseover", addLazyload.bind(element, mainDeskMegaMenu, mainDeskSublinksMenu), {
            once: true
          });
        });
        !!deskSubLazy && [...deskSubLazy.querySelectorAll(".desk-lazy-menu")].forEach((element) => {
          element.addEvent("mouseover", addLazyload.bind(element, subDeskMegaMenu, mainDeskSublinksMenu), {
            once: true
          });
        });
        function addLazyload(megaMenu, menuSublinks) {
          let lazyElement = this.querySelector(".js-lazy-menu");
          let targetID = lazyElement.dataset.targetId;
          let lazyResource = lazyElement.dataset.lazyResource;
          switch (lazyResource) {
            case "mega-menu": {
              let lazyTarget = megaMenu.querySelector(`[data-id="${targetID}"]`);
              lazyElement.innerHTML = lazyTarget.innerHTML;
              break;
            }
            case "menu-sublinks": {
              let lazyTarget = menuSublinks.querySelector(`[data-id="${targetID}"]`);
              lazyElement.innerHTML = lazyTarget.innerHTML;
              break;
            }
          }
          if (typeof Currencies !== "undefined") {
            lazyElement.querySelectorAll(".js-money").forEach(Currencies.registerObserve.bind(Currencies));
          }
        }
      }
    },
    initEventMobile: function() {
      let { container } = this;
      let mobileDrawerLoaded = false;
      let { mainMegaMenuLazyContainer, subMegaMenuLazyContainer, mainSublinksLazyContainer } = this.elms;
      let mainMobileLazy = !!mainMegaMenuLazyContainer ? !!mainMegaMenuLazyContainer.content ? mainMegaMenuLazyContainer.content.lastElementChild : mainMegaMenuLazyContainer : "";
      let subMobileLazy = !!subMegaMenuLazyContainer ? !!subMegaMenuLazyContainer.content ? subMegaMenuLazyContainer.content.lastElementChild : subMegaMenuLazyContainer : "";
      let menuSublinksLazy = !!mainSublinksLazyContainer ? !!mainSublinksLazyContainer.content ? mainSublinksLazyContainer.content.lastElementChild : mainSublinksLazyContainer : "";
      const init = () => {
        let headerContainer = container.querySelector("#header-mobile-container");
        let toggleMainDrawerButton = headerContainer.querySelector(".js-main-drawer-open-button");
        let toggleSubDrawerButton = headerContainer.querySelector(".js-sub-drawer-open-button");
        let mainDrawerContainer = container.querySelector("#mobile-drawer-main");
        if (!!mainDrawerContainer) {
          let mainDrawerTemplate = mainDrawerContainer.firstElementChild;
          !!toggleMainDrawerButton && toggleMainDrawerButton.addEvent("click", loadMenuLazy.bind(toggleMainDrawerButton, mainDrawerContainer, mainDrawerTemplate, mainMobileLazy, menuSublinksLazy));
        }
        let subDrawerContainer = container.querySelector("#mobile-drawer-sub");
        if (!!subDrawerContainer) {
          let subDrawerTemplate = subDrawerContainer.firstElementChild;
          !!toggleSubDrawerButton && toggleSubDrawerButton.addEvent("click", loadMenuLazy.bind(toggleSubDrawerButton, subDrawerContainer, subDrawerTemplate, subMobileLazy, menuSublinksLazy));
        }
        function loadMenuLazy(drawerContainer, drawerTemplate, megaMenuLazyContainer, menuSublinksContainer) {
          if (!drawerContainer.hasClass("menu-lazy-loaded")) {
            drawerContainer.innerHTML = drawerTemplate.content.firstElementChild.outerHTML;
            drawerContainer.addClass("menu-lazy-loaded");
            initBtnClose(drawerContainer, drawerContainer);
            initBtnToggle(drawerContainer, drawerContainer);
            drawerContainer.querySelectorAll(".js-toggle-menu").forEach((button) => {
              let target = drawerContainer.querySelector(`#${button.dataset.target}`);
              button.addEvent("click", function() {
                let id = target.dataset.targetId;
                let lazyResource = target.dataset.lazyResource;
                switch (lazyResource) {
                  case "mega-menu":
                    target.innerHTML = megaMenuLazyContainer.querySelector(`[data-id='${id}']`).innerHTML;
                    break;
                  case "menu-sublinks":
                    target.innerHTML = menuSublinksContainer.querySelector(`[data-id='${id}']`).innerHTML;
                    break;
                }
                if (typeof Currencies !== "undefined") {
                  target.querySelectorAll(".js-money").forEach(Currencies.registerObserve.bind(Currencies));
                }
                initBtnClose(target, drawerContainer);
                initBtnToggle(target, drawerContainer);
                target.addEvent("reInit-event", initBtnToggle.bind(null, target, drawerContainer));
              }, { once: true });
            });
          }
          drawerContainer.addClass("is-open");
          AT.disableScroll();
          function initBtnToggle(container2, drawerContainer2) {
            let btnToggler = container2.getElementsByClassName("js-toggle-menu");
            btnToggler.forEach((button) => {
              let { role, target } = button.dataset;
              let targetElement = drawerContainer2.querySelector(`#${target}`);
              button.addEvent("click", () => {
                switch (role) {
                  case "next":
                    targetElement.addClass("is-open");
                    break;
                  case "previous":
                    targetElement.removeClass("is-open");
                    break;
                }
              });
            });
          }
        }
        function initBtnClose(container2, drawerContainer) {
          let buttonsClose = container2.getElementsByClassName("js-btn-close");
          buttonsClose.addEvents("click", () => {
            drawerContainer.removeClass("is-open");
            AT.enableScroll();
          });
        }
        return;
      };
      if (window.innerWidth < 992) {
        init();
      } else {
        document.addEvent("mobile-lazyloaded", init);
      }
    },
    initSearch: function() {
      let searchFormContainer = this.container.querySelector(".js-header-search");
      if (!searchFormContainer || theme.settings.search.disable) {
        return;
      }
      if (typeof Search !== "undefined") {
        new Search(searchFormContainer);
      } else {
        AT.loadSearch().then(() => {
          new Search(searchFormContainer);
        });
      }
    }
  };

  // app/scripts/common/section/footer.js
  var Footer = {
    onLoad() {
      let { container } = this;
      try {
        if (Shopify.designMode) {
          this.initEvent();
        } else {
          AT.detectVisible({
            element: container,
            rootMargin: "1000px 0px 2000px 0px",
            callback: () => {
              let { url } = container.dataset;
              fetch(url, { dataType: "json" }).then((content) => {
                container.innerHTML = Object.keys(content).map((key) => content[key]).join("");
                this.initEvent();
              });
            }
          });
        }
      } catch (error) {
        console.warn(error);
        console.log(container);
      }
    },
    initEvent() {
      this.container.getElementsByClassName("js-btn-collapse").forEach((button) => {
        let targetElement = document.getElementById(button.dataset.target);
        button.addEvent("click", function() {
          if (this.hasClass("active")) {
            this.removeClass("active");
            targetElement.removeClass("is-open");
          } else {
            this.addClass("active");
            targetElement.addClass("is-open");
          }
        });
      });
      let form = this.container.querySelector("form.form-subscribe");
      if (!form) {
        return;
      }
      let { type, ajax } = form.dataset;
      type == "shopify" && this.handleShopify(form);
      if (ajax == "false") {
        return;
      }
      switch (type) {
        case "klaviyo":
          this.handleKlaviyo(form);
          break;
        case "mailchimp":
          this.handleMailChimp(form);
          break;
      }
    },
    handleKlaviyo(form) {
      window.addEvent("load", () => {
        AT.loadScript("//www.klaviyo.com/media/js/public/klaviyo_subscribe.js", () => {
          KlaviyoSubscribe.attachToForms(form, {
            custom_success_message: true,
            success: () => {
              AT.debounce(() => SendMessage.open(theme.strings.klaviyoSuccess), 200)();
            }
          });
        });
      });
    },
    handleMailChimp(form) {
      window.footerMailChimpCallBack = ({ result, msg }) => {
        AT.debounce(() => SendMessage.open(msg), 200)();
      };
      let action = form.getAttribute("action") + "&c=footerMailChimpCallBack";
      form.addEvent("submit", (e) => {
        e.preventDefault();
        AT.loadScript(action + `&EMAIL=${encodeURIComponent(form.querySelector("input[name=EMAIL]").value)}`);
      });
    },
    handleShopify(form) {
      let formSuccessParams = AT.getParameterByName("customer_posted");
      if (formSuccessParams) {
        window.location.hash.includes("footer_form") && (form.nextElementSibling.removeClass("d-none"), window.history.pushState({}, "", location.pathname));
      }
    }
  };

  // app/scripts/common/section/newsletter.js
  var Newsletter = {
    onLoad() {
      this.showed = false;
      let { container } = this;
      let { url } = container.dataset;
      if (Shopify.designMode) {
        this.initEvent();
      } else {
        this.loadTemplate(url).then(this.initEvent.bind(this));
      }
    },
    initEvent() {
      let form = this.container.querySelector("form");
      let { type, ajax } = form.dataset;
      let settings = JSON.parse(this.container.querySelector("script[data-settings]").innerHTML);
      type == "shopify" && this.handleShopify(form);
      if (AT.cookie.get("arn-newsletter") && !Shopify.designMode) {
        return;
      }
      this.modal = new Popup(this.container.querySelector("#modal_newsletter"));
      if (!Shopify.designMode) {
        switch (settings.style) {
          case "delay": {
            AT.debounce(() => {
              if (!this.showed) {
                this.showPopup(settings);
              }
            }, settings.delayTime)();
            break;
          }
          case "exit-intent": {
            document.addEvent("mouseout", (evt) => {
              if (evt.toElement == null && evt.relatedTarget == null && !this.showed) {
                this.showPopup(settings);
              }
            }, { once: true });
            break;
          }
          case "scroll": {
            window.addEvent("scroll", () => {
              if (window.pageYOffset > settings.scrollPosition && !this.showed) {
                this.showPopup(settings);
              }
            });
            break;
          }
        }
      }
      if (ajax == "false" || !form) {
        return;
      }
      switch (type) {
        case "klaviyo":
          this.handleKlaviyo(form);
          break;
        case "mailchimp":
          this.handleMailChimp(form);
          break;
      }
    },
    showPopup(settings) {
      this.modal.open();
      AT.cookie.set("arn-newsletter", "true", settings.expires);
      this.showed = true;
    },
    handleKlaviyo(form) {
      window.addEvent("load", () => {
        AT.loadScript("//www.klaviyo.com/media/js/public/klaviyo_subscribe.js", () => {
          KlaviyoSubscribe.attachToForms(form, {
            custom_success_message: true,
            success: () => {
              this.modal.close();
              AT.debounce(() => SendMessage.open(theme.strings.klaviyoSuccess), 200)();
            }
          });
        });
      });
    },
    handleMailChimp(form) {
      window.mailChimpCallBack = ({ result, msg }) => {
        this.modal.close();
        AT.debounce(() => SendMessage.open(msg), 200)();
      };
      let action = form.getAttribute("action") + "&c=mailChimpCallBack";
      form.addEvent("submit", (e) => {
        e.preventDefault();
        AT.loadScript(action + `&EMAIL=${encodeURIComponent(form.querySelector("input[name=EMAIL]").value)}`);
      });
    },
    handleShopify(form) {
      let formSuccessParams = AT.getParameterByName("customer_posted");
      if (formSuccessParams) {
        window.location.hash.includes("newsletter_form") && (SendMessage.open(form.dataset.successfulMessage || theme.strings.message.newsletterSuccess), window.history.pushState({}, "", location.pathname));
      }
    },
    loadTemplate(url) {
      return fetch(url, { dataType: "text" }).then((content) => {
        this.container.innerHTML = content;
      });
    },
    onSelect() {
      this.modal.open();
    },
    onDeselect() {
      this.modal.close();
    }
  };

  // app/scripts/common.js
  (() => {
    window.AT = {
      debounce,
      backToTop,
      scrollTo,
      disableScroll,
      enableScroll,
      loadCartNotify,
      loadScript,
      getSizedImageUrl: getSizedImageUrl2,
      initTabPanel,
      initInputQuantity,
      initFormAddToCart,
      cookie,
      initCountDown,
      reviewBadgeSaved: {},
      loadSearch,
      searchDrawer,
      loadCollectionFilter,
      loadCurrencies,
      detectVisible,
      getParameterByName,
      removeParam
    };
    window.Popup = Popup2;
    register("header-container", Header);
    register("newsletter", Newsletter);
    register("footer", Footer);
    load("*");
    window.register = register;
    window.load = load;
    window.Cart = new Cart2();
    window.Timer = import_easytimer.Timer;
    window.ProductCard = new ProductCard2();
    window.SendMessage = new SendMessage2();
    initEventMobileBar();
    document.addEvent("lazyincluded", (e) => {
      let type = e.target.dataset.type;
      switch (type) {
        case "footer": {
          let container = e.target;
          container.getElementsByClassName("js-btn-collapse").forEach((button) => {
            let targetElement = document.getElementById(button.dataset.target);
            button.addEvent("click", function() {
              if (this.hasClass("active")) {
                this.removeClass("active");
                targetElement.removeClass("is-open");
              } else {
                this.addClass("active");
                targetElement.addClass("is-open");
              }
            });
          });
        }
      }
    });
    window.AT.backToTop();
    let modalCurrenciesLanguages = document.getElementById("modal-currency-vs-language");
    if (!!modalCurrenciesLanguages) {
      document.addEvent("open-modal-currencies-languages", () => {
        modalCurrenciesLanguages.addClass("is-open");
      });
      document.addEvent("open-modal-currencies-languages", () => {
        if (typeof Currencies === "undefined" && theme.currency.type != "shopify") {
          AT.loadCurrencies().then(() => console.log("Currencies Finished")).catch((error) => {
            alert("Has an error on process loading Currencies function.");
            console.log(error);
          });
        }
      }, { once: true });
    }
    if (theme.settings.currencies.enable) {
      let currenciesSaved = AT.cookie.get("arn-currency");
      let selectElement = modalCurrenciesLanguages.querySelector("#currencies-select");
      if (!!currenciesSaved && [...selectElement.options].some((option) => {
        if (option.value === currenciesSaved) {
          selectElement.value = currenciesSaved;
          return true;
        }
        return false;
      })) {
        AT.loadCurrencies().then(() => {
          Currencies.switchCurrency(currenciesSaved);
        });
      } else {
        AT.cookie.delete("arn-currency");
      }
      selectElement.addEvent("change", function() {
        Currencies.switchCurrency(this.value);
        modalCurrenciesLanguages.removeClass("is-open");
      });
    }
    if (theme.settings.language.enable) {
      let selectElement = modalCurrenciesLanguages.querySelector("#languages-select");
      let originUrl = selectElement.dataset.originUrl;
      selectElement.addEvent("change", function() {
        window.location.href = location.origin + this.value + originUrl;
      });
    }
    console.log("common.js loaded");
    document.dispatchEvent(new CustomEvent("common.js loaded"));
  })();
})();
