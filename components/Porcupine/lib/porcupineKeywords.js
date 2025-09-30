/* eslint-disable unicorn/no-typeof-undefined */
const porcupineKeywords = [];

(function () {
  if (typeof module !== "undefined" && typeof module.exports !== "undefined")
    module.exports = porcupineKeywords;
})();
