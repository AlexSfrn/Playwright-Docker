// @ts-check
const { test, expect, selectors } = require('@playwright/test');

test.describe('AuthFormTesting_General', () => {

    test.beforeEach(async({ page }) => {
        await selectors.setTestIdAttribute('id');
        await page.goto('http://f0831387.xsph.ru/?page_id=26');
    });

    test('Страница имеет Title "Authorization Form"', async({ page }) => {
        await expect(page).toHaveTitle('Authorization Form');
    });

    test('Форма имеет название "Авторизация пользователя"', async({ page }) => {
        await expect(page.getByTestId('1c11')).toHaveText('Авторизация пользователя');
    });

    test('В форме авторизации имеется поле "Логин"', async({ page }) => {
        await expect(page.getByTestId('1c2c11')).toHaveText('Логин');
        await expect(page.getByTestId('1c2c12')).toBeEmpty();
    });

    test('В форме авторизации имеется поле "Пароль"', async({ page }) => {
        await expect(page.getByTestId('1c2c21')).toHaveText('Пароль');
        await expect(page.getByTestId('1c2c22')).toBeEmpty();
    });

    test('В форме авторизации имеется поле "Электронная почта"', async({ page }) => {
        await expect(page.getByTestId('1c2c31')).toHaveText('Электронная почта');
        await expect(page.getByTestId('1c2c32')).toBeEmpty();
    });

    test('В поле "Логин" имеется плейсхолдер login', async({ page }) => {
        await expect(page.getByPlaceholder('login')).toHaveId('1c2c12');
    });

    test('В поле "Пароль" имеется плейсхолдер password', async({ page }) => {
        await expect(page.getByPlaceholder('password')).toHaveId('1c2c22');
    });

    test('В поле "Электронная почта" имеется плейсхолдер Email', async({ page }) => {
        await expect(page.getByPlaceholder('Email')).toHaveId('1c2c32');
    });

    test('В форме авторизации имеется кнопка "SUBMIT"', async({ page }) => {
        await expect(page.getByRole('button', { name: 'SUBMIT' })).toHaveId('sssss');
    });

    test('Скрипт валидации срабатывает при нажатии на кнопку "SUBMIT"', async({ page }) => {
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByTestId('2c1') || page.getByTestId('2c2')).toBeVisible();
    });

    test('После нажатия на кнопку "SUBMIT" форма очищается', async({ page }) => {
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByTestId('1c2c12') && page.getByTestId('1c2c22') && page.getByTestId('1c2c32')).toBeEmpty();
    });

    test('При вводе валидных данных во все поля и нажатии "SUBMIT" появляется сообщение "Success"', async({ page }) => {
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('При вводе невалидных данных в поле "Логин" и нажатии "SUBMIT" появляется сообщение "Error"', async({ page }) => {
        await page.getByTestId('1c2c12').fill('xx');
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('При вводе невалидных данных в поле "Пароль" и нажатии "SUBMIT" появляется сообщение "Error"', async({ page }) => {
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c22').fill('xx');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('При вводе невалидных данных в поле "Электронная почта" и нажатии "SUBMIT" появляется сообщение "Error"', async({ page }) => {
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByTestId('1c2c32').fill('xx');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('При вводе невалидных данных во все поля формы и нажатии "SUBMIT" появляется сообщение "Error"', async({ page }) => {
        await page.getByTestId('1c2c12').fill('xx');
        await page.getByTestId('1c2c22').fill('xxx');
        await page.getByTestId('1c2c32').fill('xxxx');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Поле "Логин" обязательное', async({ page }) => {
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Поле "Пароль" обязательное', async({ page }) => {
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Поле "Электронная почта" обязательное', async({ page }) => {
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('При наведении на кнопку "SUBMIT" подсказка не появляется', async({ page }) => {
        await expect(page.getByRole('button', { name: 'SUBMIT' })).not.toHaveAttribute('title', /./);
    });

    test('Кнопка "SUBMIT" активна даже со всеми пустыми полями', async({ page }) => {
        await expect(page.getByRole('button', { name: 'SUBMIT' })).toBeEnabled();
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('После обновления страницы форма очищается', async({ page }) => {
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
        await page.reload();
        await expect(page.getByTestId('1c2c12') && page.getByTestId('1c2c22') && page.getByTestId('1c2c32')).toBeEmpty();
    });
});

test.describe('AuthFormTesting_Login-1', () => {

    test.beforeEach(async({ page }) => {
        await selectors.setTestIdAttribute('id');
        await page.goto('http://f0831387.xsph.ru/?page_id=26');
    });

    test('При наведении на поле "Логин" появляется подсказка "от 3 до 30 символов"', async({ page }) => {
        await expect(page.getByPlaceholder('login')).toHaveAttribute('title', 'от 3 до 30 символов');
    });

    test('Плейсхолдер в поле "Логин" пропадает при установке фокуса', async({ page }) => {
        await page.getByTestId('1c2c12').focus();
        await expect(page.getByTestId('1c2c12')).toHaveAttribute('placeholder', '');
    });

    test('При фокусе в поле "Логин" подсказка не всплывает', async({ page }) => {
        await page.getByTestId('1c2c12').focus();
        await expect(page.getByTestId('1c2c12')).not.toHaveAttribute('title', /./);
    });
});

test.describe('AuthFormTesting_Login-2', () => {

    test.beforeEach(async({ page }) => {
        await selectors.setTestIdAttribute('id');
        await page.goto('http://f0831387.xsph.ru/?page_id=26');
        await page.getByTestId('1c2c22').fill('TestPass_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
    });

    test('Ввод в поле "Логин" валидного значения, содержащего латинские буквы в верхнем и нижнем регистре, цифры и "_"', async({ page }) => {
        await page.getByPlaceholder('login').fill('Qwerty_123');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Логин" валидного значения минимальной длины', async({ page }) => {
        await page.getByPlaceholder('login').fill('qwe');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Логин" валидного значения максимальной длины', async({ page }) => {
        await page.getByPlaceholder('login').fill('123456789012345678901234567890');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Логин" валидного значения, состоящего из одинаковых символов', async({ page }) => {
        await page.getByPlaceholder('login').fill('aaaaaaaaaa');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('После ввода в поле "Логин" невалидных данных и нажатия "SUBMIT" рамка поля становится красной', async({ page }) => {
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByTestId('1c2c12')).toHaveCSS('border-color', 'rgb(255, 0, 0)')
    });

    test('Ввод в поле "Логин" значения допустимой длины с пробелом', async({ page }) => {
        await page.getByPlaceholder('login').fill('12345 67890');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Логин" значения короче допустимой длины', async({ page }) => {
        await page.getByPlaceholder('login').fill('12');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Логин" значения длиннее допустимой длины', async({ page }) => {
        await page.getByPlaceholder('login').fill('1234567890123456789012345678901');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Логин" значения допустимой длины, состоящего из кириллицы', async({ page }) => {
        await page.getByPlaceholder('login').fill('Абвгдежзик');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Логин" значения допустимой длины, состоящего из недопустимых спецсимволов', async({ page }) => {
        await page.getByPlaceholder('login').fill('!?;:|"+-/={#%[&*~<\>');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Логин" значения "0"', async({ page }) => {
        await page.getByPlaceholder('login').fill('0');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });
});

test.describe('AuthFormTesting_Password-1', () => {

    test.beforeEach(async({ page }) => {
        await selectors.setTestIdAttribute('id');
        await page.goto('http://f0831387.xsph.ru/?page_id=26');
    });

    test('При наведении на поле "Пароль" появляется подсказка "от 6 до 40 символов"', async({ page }) => {
        await expect(page.getByPlaceholder('password')).toHaveAttribute('title', 'от 6 до 40 символов');
    });

    test('Плейсхолдер в поле "Пароль" пропадает при установке фокуса', async({ page }) => {
        await page.getByTestId('1c2c22').focus();
        await expect(page.getByTestId('1c2c22')).toHaveAttribute('placeholder', '');
    });

    test('При фокусе в поле "Пароль" подсказка не всплывает', async({ page }) => {
        await page.getByTestId('1c2c22').focus();
        await expect(page.getByTestId('1c2c22')).not.toHaveAttribute('title', /./);
    });

    test('В поле "Пароль" вводимые символы закрыты астерисками', async({ page }) => {
        await expect(page.getByPlaceholder('password')).toHaveAttribute('type', 'password');
    });
});

test.describe('AuthFormTesting_Password-2', () => {

    test.beforeEach(async({ page }) => {
        await selectors.setTestIdAttribute('id');
        await page.goto('http://f0831387.xsph.ru/?page_id=26');
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c32').fill('test._1@test_1.com');
    });

    test('Ввод в поле "Пароль" валидного значения, содержащего латинские буквы в верхнем и нижнем регистре, цифры и "_"', async({ page }) => {
        await page.getByPlaceholder('password').fill('Qwerty_12345');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Пароль" валидного значения минимальной длины', async({ page }) => {
        await page.getByPlaceholder('password').fill('qwerty');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Пароль" валидного значения максимальной длины', async({ page }) => {
        await page.getByPlaceholder('password').fill('1234567890123456789012345678901234567890');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Пароль" валидного значения, состоящего из одинаковых символов', async({ page }) => {
        await page.getByPlaceholder('password').fill('aaaaaaaaaa');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('После ввода в поле "Пароль" невалидных данных и нажатия "SUBMIT" рамка поля становится красной', async({ page }) => {
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByTestId('1c2c22')).toHaveCSS('border-color', 'rgb(255, 0, 0)')
    });

    test('Ввод в поле "Пароль" значения допустимой длины с пробелом', async({ page }) => {
        await page.getByPlaceholder('password').fill('12345 67890');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Пароль" значения короче допустимой длины', async({ page }) => {
        await page.getByPlaceholder('password').fill('12345');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Пароль" значения длиннее допустимой длины', async({ page }) => {
        await page.getByPlaceholder('password').fill('12345678901234567890123456789012345678901');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Пароль" значения допустимой длины, состоящего из кириллицы', async({ page }) => {
        await page.getByPlaceholder('password').fill('Абвгдежзик');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Пароль" значения допустимой длины, состоящего из недопустимых спецсимволов', async({ page }) => {
        await page.getByPlaceholder('password').fill('!?;:|"+-/={#%[&*~<\>');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Пароль" значения "0"', async({ page }) => {
        await page.getByPlaceholder('password').fill('0');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });
});

test.describe('AuthFormTesting_Email-1', () => {

    test.beforeEach(async({ page }) => {
        await selectors.setTestIdAttribute('id');
        await page.goto('http://f0831387.xsph.ru/?page_id=26');
    });

    test('При наведении на поле "Электронная почта" появляется подсказка "от 8 до 100 символов"', async({ page }) => {
        await expect(page.getByPlaceholder('Email')).toHaveAttribute('title', 'от 8 до 100 символов');
    });

    test('Плейсхолдер в поле "Электронная почта" пропадает при установке фокуса', async({ page }) => {
        await page.getByTestId('1c2c32').focus();
        await expect(page.getByTestId('1c2c32')).toHaveAttribute('placeholder', '');
    });

    test('При фокусе в поле "Электронная почта" подсказка не всплывает', async({ page }) => {
        await page.getByTestId('1c2c32').focus();
        await expect(page.getByTestId('1c2c32')).not.toHaveAttribute('title', /./);
    });
});

test.describe('AuthFormTesting_Email-2', () => {

    test.beforeEach(async({ page }) => {
        await selectors.setTestIdAttribute('id');
        await page.goto('http://f0831387.xsph.ru/?page_id=26');
        await page.getByTestId('1c2c12').fill('TestName_1');
        await page.getByTestId('1c2c22').fill('TestPass_1');
    });

    test('Ввод в поле "Электронная почта" валидного значения, которое начинается с латинской буквы, содержит латинские буквы в верхнем и нижнем регистрах, цифры, "_" и "." до @, латинские буквы в верхнем или нижнем регистре, цифры и "_" в доменном имени до точки, и латинские буквы в нижнем регистре в доменной зоне после точки', async({ page }) => {
        await page.getByPlaceholder('Email').fill('t_E.st1@tE_st2.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" валидного значения минимальной длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('ab@12.cd');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" валидного значения максимальной длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('qwertyuiop1234567890123456789012345678901234567890123456789012345678901234567890@123456789123456.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины без "@"', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde12345.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины с двумя символами "@"', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@12345@abc.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины с двумя точками подряд до "@"', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde..12345@abc.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины без точки между доменным именем и зоной', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde12345@abcdef');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины с пробелом', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde 12345@abcd.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" валидного значения с доменной зоной минимальной длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@12345.ab');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" валидного значения с доменной зоной максимальной длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@12345.abcd');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('После ввода в поле "Электронная почта" невалидных данных и нажатия "SUBMIT" рамка поля становится красной', async({ page }) => {
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByTestId('1c2c32')).toHaveCSS('border-color', 'rgb(255, 0, 0)')
    });

    test('Ввод в поле "Электронная почта" значения короче допустимой длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('a@bc.de');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения длиннее допустимой длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('qwertyuiop1234567890123456789012345678901234567890123456789012345678901234567890@123456789123456.abcd');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, состоящего из кириллицы до "@"', async({ page }) => {
        await page.getByPlaceholder('Email').fill('Абвгдежзик@abcde.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, содержащего недопустимые спецсимволы до "@"', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abc!?-:de&*~fg@abcde.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, состоящего из кириллицы после "@" в доменном имени', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcdef@Абвгд.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, содержащего недопустимые спецсимволы после "@" в доменном имени', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcdef@a!-b*&c~d.abc');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, с названием доменной зоны короче допустимой длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@abc.d');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, с названием доменной зоны длиннее допустимой длины', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@abc.defgh');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, содержащего латинские буквы в верхнем регистре в названии доменной зоны', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@abc.dEf');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины с названием доменной зоны на кириллице', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@abc.абв');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения допустимой длины, содержащего спецсимволы в названии доменной зоны', async({ page }) => {
        await page.getByPlaceholder('Email').fill('abcde@abc.d-e');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });

    test('Ввод в поле "Электронная почта" значения "0"', async({ page }) => {
        await page.getByPlaceholder('Email').fill('0');
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await expect(page.getByText('Error')).toBeVisible();
    });
});