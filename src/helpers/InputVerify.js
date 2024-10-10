import toast from 'react-hot-toast';

//validation de nom
export function nameVerify(error = {}, values) {
    const validRegex = /^[A-Za-z0-9_]+$/;

    if (!values.username) {
        error.username = toast.error('name is required...!');
    } else if (!validRegex.test(values.username)) {
        toastWarn('Only alphanumeric characters and underscores are allowed in username');
        error.username = toast.error('Invalid Username...!');
    }
    return error;
}

//validation de email
function emailVerify(error = {}, values) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.email) {
        error.email = toast.error('Email is Required...!');
    } else if (values.email.includes(' ') || !emailRegex.test(values.email)) {
        error.email = toast.error('Invalid Email...!');
    }
    return error;
}

//password validation 
function passwordVerify(errors = {}, values, confirm = false) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error('Password is Required...!');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('Password cannot contain white spaces.');
    } else if (values.password.length < 8) {
        errors.password = toast.error('Password must be more than 8 characters long.');
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('Password must have special character.');
    } else if (confirm && values.password !== values.confirm_password) {
        errors.password = toast.error('Password not match...!');
    }

    return errors;
}
//verfication de phone
function phoneNumberVerify(error = {}, values) {
 
    const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?[0-9]{1,3}?[-.\s]?[0-9]{3,4}?[-.\s]?[0-9]{3,4}$/;

    if (!values.phone) {
        error.phone = toast.error('Phone number is required...!');
    } else if (!phoneRegex.test(values.phone)) {
        error.phone = toast.error('Invalid phone number...!');
    }

    return error;
}

//generer tost 
function toastWarn(message) {
    return toast(message, {
        icon: '⚠️',
        duration: 6000,
    });
}
