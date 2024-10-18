import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './App.module.scss';
import Button from './components/Button/Button';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import FormField from './components/FormField/FormField';
import UserData from './components/UserData/UserData';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { createOTP, signIn } from './store/auth/AuthActionCreators';

interface FormData {
  phone: string;
  code: string;
}

function App() {
  const methods = useForm<FormData>();
  const { handleSubmit, setError, clearErrors, watch } = methods;
  const { user, isLoggedIn, retryDelay, error } = useAppSelector(
    (state) => state.authStore
  );
  const dispatch = useAppDispatch();
  const phoneValue = watch('phone');
  const [showCodeInput, setShowCodeInput] = useState(false);

  useEffect(() => {
    if (retryDelay > 0) {
      setShowCodeInput(true);
    }
  }, [retryDelay]);

  const handleContinue = (data: FormData) => {
    const { phone } = data;
    clearErrors('phone');
    dispatch(createOTP({ phone: phone.replace(/\D/g, '') }));
  };

  const handleLogin = (data: FormData) => {
    dispatch(
      signIn({ phone: data.phone.replace(/\D/g, ''), code: Number(data.code) })
    );
  };

  useEffect(() => {
    if (error) {
      setError('code', { type: 'manual', message: error });
    }
  }, [error, setError]);

  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <span className={styles.title}>Вы успешно вошли</span>
        <UserData userData={user} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>Вход</span>
      <span className={styles.info}>
        Введите номер телефона для входа в личный кабинет
      </span>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(showCodeInput ? handleLogin : handleContinue)}
          className={styles.form_container}
        >
          <FormField
            name="phone"
            label="Телефон"
            placeholder="8 (999) 999-99-99"
            mask="9 (999) 999-99-99"
            validation={{
              required: 'Поле является обязательным',
              pattern: {
                value: /^\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: 'Введите корректный номер телефона',
              },
            }}
          />
          {showCodeInput && (
            <FormField
              name="code"
              label="Проверочный код"
              placeholder="Проверочный код"
              mask="999999"
              validation={{
                required: 'Код должен содержать 6 цифр',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Код должен содержать 6 цифр',
                },
              }}
            />
          )}
          <Button type="submit" text={showCodeInput ? 'Войти' : 'Продолжить'} />
          {showCodeInput && (
            <CountdownTimer
              initialDelay={retryDelay}
              onRetry={() =>
                dispatch(createOTP({ phone: phoneValue.replace(/\D/g, '') }))
              }
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
