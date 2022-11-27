export default function login_validate(values) {
	const errors = {};

	if (!values.email) {
		errors.email = 'Email Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'Password Required';
	} else if (values.password.length < 8 || values.password.length > 20) {
		errors.password = 'Must be greater than or equal to 8  and less then 20 characters long';
	} else if (values.password.includes(' ')) {
		errors.password = 'Invalid password';
	}

	return errors;
}

export function register_validate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = 'name Required';
	} else if (values.name.includes(' ')) {
		errors.name = 'Invalid name...!';
	}

	if (!values.email) {
		errors.email = 'Email Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'Password Required';
	} else if (values.password.length < 8 || values.password.length > 20) {
		errors.password = 'Must be greater than or equal to 8  and less then 20 characters long';
	} else if (values.password.includes(' ')) {
		errors.password = 'Invalid password';
	}

	if (!values.cpassword) {
		errors.cpassword = 'Confirm Password Required';
	} else if (values.password !== values.cpassword) {
		errors.cpassword = 'Password Not Match...!';
	} else if (values.cpassword.includes(' ')) {
		errors.cpassword = 'Invalid Confirm Password';
	}

	return errors;
}
