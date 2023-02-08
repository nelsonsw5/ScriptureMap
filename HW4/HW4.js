function validateForm() {
    let form = document.getElementById("contact-form");
    let messages = [];
    validator.reset()

    if (form.name.value === "") {
        messages.push("Name is required.");
    }

    if (validator.isValidEmail(form.email.value) === false) {
        messages.push("Not valid email");
    }

    if (form.email.value === "") {
        messages.push("Email is required.");
    }

    if (form.phone.value === "") {
        messages.push("Phone number is required.");
    }
    console.log(form.phone.value)
    console.log(validator.isNumeric(form.phone.value))
    if (validator.isNumeric(form.phone.value)=== false ) {
        messages.push("Phone number has invalid character");
    }

    if (messages.length > 0) {
        let messageDiv = document.getElementById("validation-messages");
        messageDiv.innerHTML = messages.join("<br>");
        return false;
    }
    return true;
}

const validator = (function () {
    let isValid = false;

    function invalid() {
        return isValid = false
    }
    return {
    isNumeric: function (text) {return Number.isNaN(Number(text)) ? invalid() : true;},
    isInteger: function (text) {return Number.isInteger(Number(text)) ? true : invalid();},
    isNegativeInteger: function (text) {let value = Number(text);return value < 0 && Number.isInteger(value) ? true : invalid();},
    isPositiveInteger: function (text) {let value = Number(text);return value > 0 && Number.isInteger(value) ? true : invalid();},
    isNonNegativeInteger: function (text) {let value = Number(text);return value >= 0 && Number.isInteger(value) ? true : invalid();},
    isInRange: function (text, m, n) {let value = Number(text);return value >= m && value <= n ? true : invalid();},
    isValidEmail: function (text) {return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text);},
    isNonEmpty: function (text) {text.length >0 ? true : invalid();},
    matchesRegex: function (text, regex) {return typeof text === "string" && text.match(regex) ? true : invalid();},
    lengthIsInRange: function (text, m, n) {let value = Number(text);return value >= m && Number.isInteger(value) && value <= n ? true : invalid();},
    isValid: function () {return isValid},
    reset: function () {isValid = true;},
    };
   }());
