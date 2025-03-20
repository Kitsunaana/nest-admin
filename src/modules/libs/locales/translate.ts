export const translate = {
  en: {},
  ru: {
    sidebar: {
      clients: 'Клиенты',
      users: 'Пользователи',
      settings: 'Настройки',
      collapseRoutes: 'Свернуть',
      expandRoutes: 'Развернуть',
    },
    settings: {
      changeLanguage: 'Выбирете язык',
      changeTheme: 'Цветовая тема',
      themes: {
        dark: 'Темная',
        system: 'Системная',
        light: 'Светлая',
      },
      changeIconThickness: 'Толщина иконок',
      changeFillIcons: 'Заполнение иконок',
      iconSettings: 'Настройки иконок',
    },
    global: {
      confirm: {
        title: 'Подтвердите действие',
        description: 'Вы уверены, что хотите продолжить?',
        confirmText: 'Подтвердить',
        closeText: 'Отмена',
      },
      forms: {
        validate: {
          required: 'Поле обязательно для заполнения',
          minLength: 'Минимальное количество символов {{value}}',
          requiredSelect: 'Значение должно быть выбрано',

          invalid: 'Введены недопустимые символы',
          passwordSimple:
            'Пароль слишком простой. Используйте строчные и заглавные буквы, цифры и символы',
          passwordLength:
            'Пароль должен содержать минимум 8 и максимум 255 символов',
          passwordDontMatch: 'Пароль не совпадает',
          nameLength: 'Имя должно содержать максимум 255 символов',
          emailInvalid:
            'Почта имеет неверный формат или содержит недопустимые символы',
          emailLength: 'Почта должна содержать максимум 255 символов',
        },
        clear: 'Очистить',
      },
      listEmpty: 'Список пуст',
      dialog: {
        copy: 'Скопировать данные для переноса',
        paste: 'Загрузить скопированные данные',
        copySettings: 'Настройки вставки скопированных данных',
        fullscreenOpen: 'Развернуть на весь экран',
        fullscreenClose: 'Свернуть окно',
        save: 'Сохранить',
        cancel: 'Отменить',
        clear: 'Очистить форму',

        confirm: {
          close: {
            close: 'Закрыть',
            cancel: 'Отмена',
            descriptionClose: 'Вы уверены, что хотите закрыть диалоговое окно',
          },
          save: {
            save: 'Сохранить',
            cancel: 'Отменить',
            descriptionSave: 'Сохрнаить все заполненные данные?',
          },
        },
      },
    },
    register: {
      form: {
        title: 'Регистрация',
        firstText: 'Уже есть аккаунт?',
        secondText: 'Войти',
        submitText: 'Создать аккаунт',
        name: 'Имя',
        email: 'Электорнная почта',
        password: 'Пароль',
        repeatPassword: 'Повторите пароль',
        success: {
          title: 'Аккаунт успешно создан',
          description:
            'Пожалуйста, провертье почтовый ящик и перейдите по ссылке для подтверждения аккаунта',
          button: 'Закрыть',
        },
      },
      notify: {
        usernameExists: 'Пользователь с таким именем уже существует',
        emailExists: 'Пользователь с такой почтой уже существует',
        unknownError: 'Произошла неизвестная ошибка',
      },
    },
    verify: {
      text: 'Нажмите на кнопку подтвердить почту, чтобы верефицировать аккаунт',
      button: 'Подтвердить почту',
      notify: {},
    },
  },
}
