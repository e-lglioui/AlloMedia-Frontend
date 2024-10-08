

export const validateLogin = (email, password) => {
    const errors = {};
    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

export const validateOtp = (otp) => {
    const errors = {};
    if (!otp) {
        errors.otp = "OTP is required";
    } else if (otp.length !== 4) {
        errors.otp = "OTP must be 4 digits";
    }

    return errors;
};
