/* eslint-disable no-useless-escape,no-trailing-spaces */
/**
 * Created by viktor on 20/7/17.
 */

// ------------------------------------------------------------------
// Validator file
// ------------------------------------------------------------------

var validate = require('validate.js')
var moment = require('moment')

// ------------------------------------------------------------------
// Core functions
// ------------------------------------------------------------------

// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value, options) {
    return +moment.utc(value)
  },
  // Input is a unix timestamp
  format: function (value, options) {
    var format = options.dateOnly ? 'MM-DD-YYYY' : 'YYYY-MM-DD hh:mm:ss'
    return moment.utc(value).format(format)
  }
})

let phonePattern = /^\( ?([0-9]{3} )\) ?[-. ]?([0-9]{3}) [-. ] ?([0-9]{4})$/

let datePattern = /^(0[1-9]|1[0-2]) \/ (0[1-9]|1\d|2\d|3[01]) \/ (19|20)\d{2}$/

let emailConstraint = {
  emailID: {
    presence: true,
    email: true
  }
}

// ------------------------------------------------------------------
// Validator file
// ------------------------------------------------------------------

export const validateEmail = (emailID) => {
  let v = validate({emailID: emailID}, emailConstraint)
  return v
}

export const validateDate = (dateValue) => {
  if (!dateValue) {
    return 'DOB required'
  }
  let v = validate({dateValue: dateValue}, {dateValue: {format: datePattern}})
  return v
}

export const validatePassword = (password) => {
  if (password && password.length >= 6) {
    return undefined
  } else {
    return 'MINIMUM 6 Char password needed'
  }
}

export const validatePhone = (phone) => {
  if (!phone) {
    return 'Phone Required'
  }
  let v = validate({phoneValue: phone}, {phoneValue: {format: phonePattern}})
  return v
}

export const validateSSN = (ssn) => {
  if (!ssn) {
    return 'SSN REquired'
  }
  let v = validate({ssnValue: ssn}, {ssnValue: {format: /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/}})
  return v
}

export const validatePasswordSchema = (pass) => {
  let characterRule = false
  let lowercaseRule = false
  let uppercaseRule = false
  let numberRule = false

  if (pass) {
    characterRule = pass.length >= 8
    try {
      for (let i = 0; i < pass.length; i++) {
        let c = pass.charAt(i)
        if (!isNaN(parseInt(c))) {
          numberRule = true
        } else if (c === c.toLowerCase()) {
          lowercaseRule = true
        } else if (c === c.toUpperCase()) {
          uppercaseRule = true
        }
      }
    } catch (err) {
      console.log('error in password check :: ', err)
    }
  }

  return {
    characterRule: characterRule,
    lowercaseRule: lowercaseRule,
    uppercaseRule: uppercaseRule,
    numberRule: numberRule
  }
}
