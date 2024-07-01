import * as yup from 'yup';

const loginValidation = yup.object().shape({

    email: yup.string().email("Please enter valid email address").required("Email is required").trim(),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
        .required("Password is required").trim(),
});

const signUpValidation = yup.object().shape({
    email: yup.string()
        .email("Please enter a valid email address")
        .required("Email is required")
        .trim(),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        )
        .required("Password is required")
        .trim(),
    confirmPassword: yup.string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password"), null], "Password doesn't match, please fill in the correct password")
        .trim(),
    name: yup.string()
        .trim()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(12, "Name must not exceed 12 characters"),
    age: yup.number()
        .required("Age is required")
        .min(18, "You must be at least 18 years old to sign up")
});
const taskValidation = yup.object().shape({
    title: yup.string()
        .trim()
        .required('Title is required'),
    description: yup.string()
        .trim()
        .required('Description is required'),
    file: yup.mixed()
        .required('File upload is required')
    // .test('fileSize', 'File size is too large', (value) => {
    //     return value && value[0] && value[0].size <= 10 * 10 * 5;
    // })
});


export { loginValidation, signUpValidation, taskValidation }