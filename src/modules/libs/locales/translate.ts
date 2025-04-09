export const translate = {
  en: {},
  ru: {
    deactivate: {
      title: {
        caption: 'Деактивация аккаунта',
      },
      email: 'Электронная почта',
      password: 'Пароль',
      submit: 'Подтвердить',
      notify: {
        loginOrPasswordIncorrect: 'Неверный логин или пароль',
        pinRequired: 'Введите ПИН-код из письма',
        tokenNotFound: 'Неверный ПИН-код',
        tokenExpires: 'Время жизни ПИН-кода истекло',
      },
    },
    otp: {
      title: {
        enableOTP: 'Активация OTP',
        caption: 'Сканируйте QR-код для добвления OTP',
      },
      notify: {
        incorrectPin: 'Неверный пин-код',
        totpEnable: 'Включена двухфакторная аутентификация',
        successDisableTotp: 'Двухфакторная аутентификация выключена',
      },
      secretCode: 'Секретный код: {{value}}',
      deactivate: {
        caption: 'Деактивация OTP',
        text: 'Вы уверены, что хотите отключить аутентификацию через OTP',
        confirm: 'Да, уверен',
        cancel: 'Отмена',
      },
    },
    sidebar: {
      clients: 'Клиенты',
      users: 'Пользователи',
      settings: 'Настройки',
      collapseRoutes: 'Свернуть',
      expandRoutes: 'Развернуть',
      account: 'Профиль',
      logout: 'Выход',
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
          otpDesc:
            'Введите 6-значный код, предоставленный вашим приложением для аутентификации',
          otpDescEmail: 'Введите 6-значный код из письма',
          invalidUUID: 'Не валидный UUID токен',
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
          pinLength: 'ПИН-код должен быть длинною 6 символов',
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
        close: 'Закрыть',
        changeEmail: 'Сменить почту',
        changePassword: 'Сменить пароль',
        confirmText: 'Подтвердить',

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
    login: {
      form: {
        title: 'Вход в аккаунт',
        firstText: 'Ещё нет аккаунта?',
        secondText: 'Создать аккаунт',
        submitText: 'Войти',
        login: 'Электорнная почта или имя пользователя',
        password: 'Пароль',
        resendEmail: {
          caption: 'Ошибка при авторизации',
          button: 'Отправить письмо повторно',
        },
      },
      notify: {
        userWithEmailNotFound: 'Пользователь с таким логином не найден',
        emailHasAlreadyConfirmed: 'Почта уже подтверждена',
        userNotFoundInSession: 'Пользователь не обнаружен в сессии',
        userNotFound: 'Пользователь не найден',
        tokenNotFound: 'Токен не найден',
        loginOrPasswordIncorrect: 'Неверный логин или пароль',
        currentSessionCantRemove: 'Текущую сессию удалить нельзя',
        accountIsNotConfirmed:
          'Аккаунт не верефицирован. Пожалуйста, провертье свою почту и перейдите по ссылке для подтверждения аккаунта',
        incorrectPin: 'Не верный ПИН-код',
      },
      otp: {
        enterPinCaption: 'Введите пин-код из генератора паролей',
        submitText: 'Отправить',
      },
    },
    verify: {
      text: 'Нажмите на кнопку подтвердить почту, чтобы верефицировать аккаунт',
      button: 'Подтвердить почту',
      notify: {
        tokenNotFound: 'Токен не найден',
        tokenHasExpired: 'Срок жизни токена истек',
        login: 'Электорнная почта или имя пользователя',
        resendEmailVerify:
          'Если вы не получали письмо на почту или время жизни токена истекло, то вы можете отправить письмо повтороно на указанную почту, поиск почты будет осуществляться по имени пользователя или почте',
        button: 'Отправить письмо повторно',
        toLoginButton: 'Перейти на страницу входа',
      },
    },
    resetPassword: {
      title: 'Сброс пароля',
      description:
        'Введите электронную почту для того, чтобы отправить письмо с ссылкой для установки нового пароля',
      form: {
        login: 'Электронная почта',
        button: 'Сбросить пароль',
      },
      notify: {
        emailSendSuccess: 'Почта успешно отправлена, провертье уведомления',
        userNotFound: 'Пользователь с такой почтой не найден',
      },
    },
    newPassword: {
      form: {
        title: 'Новый пароль',
        password: 'Пароль',
        repeatPassword: 'Повторите пароль',
        submitText: 'Сохранить новый пароль',
      },
      notify: {
        tokenHasExpired: 'Время жизни токена истекло',
      },
    },

    account: {
      notifications: {
        description: 'Укажите откуда и какие уведомления вы хотите получать',
        site: {
          title: 'Уведомления на сайте',
          description:
            'Включив уведомления на сайте вы будете в режиме реального времени получать уведомления',
        },
        telegram: {
          title: 'Уведомления в Telegram',
          description:
            'Включив уведомления в Telegram вы сможете получить возможность управлять аккаунтом через мессенджер, а также получать коды двухфактороной аутентификации',
        },
      },
      account: {
        deactivate: {
          title: 'Деактивация аккаунта',
          description:
            'Деактивировав аккаунт вы автоматически выйдите из системы, через 7 дней аккаунт и вся связанная с ним информация будет полностью удалена',
        },
        totp: {
          enabled: 'Выключить',
          disabled: 'Включить',
          title: 'Аутентификация с помощью TOTP',
          description:
            'Метод двухфакторной аутентификации, который генерирует одноразовые коды на вашем устройстве для повышения безопасности вашей учетной записи',
        },
        changePasswordTitle: 'Смена пароля',
        changeEmailTitle: 'Смена электронной почты',
        forms: {
          labels: {
            email: 'Электронная почта',
            currentPassword: 'Текущий пароль',
            newPassword: 'Новый пароль',
          },
          helpers: {
            email: 'Ваш новый адрес электронной почты',
            currentPassword:
              'Введите свой старый пароль для подтверждения личности',
            newPassword: 'Ведите ваш новый пароль',
          },
        },
      },
      notify: {
        incorrectCurrentPassword: 'Неверный текущий пароль',
      },
      title: {
        edit: 'Просмотр профиля <strong>{{value}}</strong>',
      },
      tabs: {
        profile: 'Профиль',
        images: 'Изображения',
        account: 'Аккаунт',
        notification: 'Уведомления',
        sessions: 'Сессии',
      },
      profile: {
        image: {
          change: 'Изменить изображение профиля',
          description:
            'Поддерживаемые форматы: JPG, JPEG, PNG, WEBP и GIF, макс. размер 10МБ',
        },
        forms: {
          labels: {
            username: 'Имя пользователя',
            displayName: 'Отображаемое имя',
            description: 'Описание',
          },
          helpers: {
            username: 'Ваше уникальное имя',
            displayName: 'Отображаемое имя',
            description: 'Информация о себе',
          },
        },
      },
    },
  },
}
