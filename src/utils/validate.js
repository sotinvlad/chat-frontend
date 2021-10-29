const validate = ({ isAuth, errors, values }) => {
    const rules = {
        email: (errors, value) => {
            if (!value) {
                errors.email = 'Ведите E-mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = 'Неверный формат';
            }
        },

        password: (errors, value) => {
            if (!value) {
                errors.password = 'Введите пароль';
            } else if (!/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(value)) {
                errors.password = isAuth ? 'Неверный пароль' : 'Пароль должен содержать букву и цифру'
            }
        },

        passwordRepeat: (errors, value, values) => {
            if (!value) {
                errors.passwordRepeat = 'Введите пароль';
            } else if (values.password !== value) {
                errors.passwordRepeat = 'Пароли не совпадают'
            }
        }
    };

    Object.keys(values).forEach(
        key => rules[key] && rules[key](errors, values[key], values)
    );
}



export default validate;