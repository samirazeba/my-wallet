const axios = require('axios');
const dns = require('dns').promises;
const validator = require('validator');
const crypto = require('crypto');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

async function validateRegistrationInput({ first_name, last_name, email, password, phone_number }, existingUsers) {
    const errors = {};

    // Validate first name
    if (!first_name || typeof first_name !== 'string' || first_name.trim() === '' || first_name.length < 2) {
        errors.first_name = 'First name is required and must be a non-empty string of at least 2 characters.';
    }

    // Validate last name
    if (!last_name || typeof last_name !== 'string' || last_name.trim() === '' || last_name.length < 2) {
        errors.last_name = 'Last name is required and must be a non-empty string of at least 2 characters.';
    }

    // Validate password
    if (!password || password.length < 8) {
        errors.password = 'Password is required and must be at least 8 characters long.';
    } else {
        try {
            const sha1Hash = crypto.createHash('sha1').update(password).digest('hex');
            const response = await axios.get("https://api.pwnedpasswords.com/range/" + sha1Hash.slice(0, 5));
            const hashes = response.data.split('\n');
            const hashSuffix = sha1Hash.slice(5).toUpperCase();
            const found = hashes.some(line => line.startsWith(hashSuffix));
            if (found) {
                errors.password = 'Password has been compromised in a data breach. Please choose a different password.';
            }
        } catch (error) {
            console.error('Error checking password:', error);
            errors.password = 'Error checking password. Please try again later.';
        }
    }

    // Validate email
    if (!validator.isEmail(email)) {
        errors.email = 'Invalid email address.';
    } else {
        const domain = email.split('@')[1];
        try {
            const tdl = await axios.get("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
            const tldsList = tdl.data.split("\n").slice(1).map(tld => tld.trim().toLowerCase());

            const domainParts = domain.split('.');
            const tld = domainParts[domainParts.length - 1].toLowerCase();
            if (!tldsList.includes(tld)) {
                errors.email = 'Invalid email domain.';
            } else {
                const addresses = await dns.resolveMx(domain);
                if (addresses.length === 0) {
                    errors.email = 'Email domain does not have valid MX records.';
                }
            }
        } catch (error) {
            console.error('Error validating email domain:', error);
            errors.email = 'Error validating email domain. Please try again later.';
        }

        if (existingUsers.find(user => user.email === email)) {
            errors.email = 'Email already used.';
        }
    }

// Validate phone number
const phone = parsePhoneNumberFromString(phone_number, "BA"); // Specify the country code
if (!phone || !phone.isValid()) {
    errors.phone_number = 'Invalid phone number. Please provide a valid mobile number.';
} else if (existingUsers.find(user => user.phone_number === phone.formatInternational())) {
    errors.phone_number = 'Phone number already used.';
}
    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}

module.exports = validateRegistrationInput;