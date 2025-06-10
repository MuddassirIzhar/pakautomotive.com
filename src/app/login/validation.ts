
import * as yup from 'yup';


export const loginSchema = yup
    .object({
        email: yup.string().required().email(),
        password: yup.string().required()
    })
    .required();

enum StatusEnum {
    pending = 'Pending',
    approved = 'Approved',
    rejected = 'Rejected',
}
const DATE_REGEX = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;
const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phone = /^([+]|[00]{2})([0-9]|[ -])*/;
const passOneUpperCaseCharacter = /(?=.*?[A-Z])/;
const passOneLowerCaseCharacter = /(?=.*?[a-z])/;
const passOneDigitCharacter = /(?=.*?[0-9])/;
const passOneSpecialCharacter = /(?=.*?[#?!@$%^&*-])/;

export const registerSchema = yup
    // .object({
    //     // address: yup.string().required().trim(),
    //     // phoneNumber: yup.string().required().matches(DATE_REGEX, 'Phone number is not valid'),
    //     phone: yup.string().required().matches(phone, 'Phone number format (+1 (012) 456 7890)'),
    //     email: yup.string().required().email(),
    //     firstName: yup.string().required().trim().min(2).max(50),
    //     lastName: yup.string().required().trim().min(2).max(50),
    //     name: yup.string().required().trim().min(2).max(50),
    //     // city: yup.string().required().trim(),
    //     // state: yup.string().required().trim(),
    //     // country: yup.string().required().trim(),
    //     password: yup.string().required().min(8)
    //     .matches(passOneUpperCaseCharacter, 'password must contain at least one upper case character')
    //     .matches(passOneLowerCaseCharacter, 'password must contain at least one lower case character')
    //     .matches(passOneDigitCharacter, 'password must contain at least one one number')
    //     .matches(passOneSpecialCharacter, 'password must contain at least one special character'),
    //     // password: yup.string().required().matches(pass, 'password must contain only letters and numbers with a minimum of 8 characters'),
    //     confirmPassword: yup.string().required('Confirm Password is a required field')
    //  .oneOf([yup.ref('password'), ""], 'Passwords must match')
    // })
    // .required();
    .object({
        // name: yup.string().required('Username is a required field').trim().min(2).max(50),
        // phone: yup.string().required('Phone is a required field').matches(phone, 'Phone number format (+1 (012) 456 7890)'),
        firstName: yup.string().required('First Name is a required field'),
        lastName: yup.string().required('Last Name is a required field'),
        email: yup.string().required('Email is a required field').email(),
        // role: yup.number().required('Role is a required field').transform((value) => (isNaN(value) ? undefined : value)),
        password: yup.string().required('Password is a required field').min(8)
            .matches(passOneUpperCaseCharacter, 'password must contain at least one upper case character')
            .matches(passOneLowerCaseCharacter, 'password must contain at least one lower case character')
            .matches(passOneDigitCharacter, 'password must contain at least one one number')
            .matches(passOneSpecialCharacter, 'password must contain at least one special character'),
        passwordConfirmation: yup.string().required('Confirm Password is a required field')
            .oneOf([yup.ref('password'), ""], 'Passwords must match')
    })
    .required();