import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './App.module.scss';
import Button from './components/Button/Button';
import FormField from './components/FormField/FormField';

const retryDelay = 120000;

interface FormData {
  phone: string;
  code: string;
}

function App() {
  const methods = useForm<FormData>();
  const { handleSubmit, setError, clearErrors, watch } = methods;
  //const phoneValue = watch('phone');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [countdown, setCountdown] = useState(retryDelay / 1000);

  useEffect(() => {
    if (retryDelay > 0) {
      setShowCodeInput(true);
      setCountdown(retryDelay / 1000);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleContinue = (data: FormData) => {
    const { phone } = data;
    console.log(phone);
    clearErrors('phone');
    console.log(phone);
  };

  const handleLogin = (data: FormData) => {
    console.log({ phone: data.phone, code: Number(data.code) });
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Вход</span>
      <span className={styles.info}>
        Введите номер телефона для входа в личный кабинет
      </span>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(!showCodeInput ? handleLogin : handleContinue)}
          className={styles.form_container}
        >
          <FormField
            name="phone"
            label="Телефон"
            placeholder="+7 (999) 999-99-99"
            mask="+7 (999) 999-99-99"
            validation={{
              required: 'Поле является обязательным',
              pattern: {
                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: 'Введите корректный номер телефона',
              },
            }}
          />
          {!showCodeInput && (
            <FormField
              name="code"
              label="Проверочный код"
              placeholder="Проверочный код"
              validation={{
                required: 'Код должен содержать 6 цифр',
              }}
            />
          )}
          <Button
            type="submit"
            text={!showCodeInput ? 'Войти' : 'Продолжить'}
          />
          {!showCodeInput && (
            <div className={styles.retryContainer}>
              {countdown ? (
                <span>Повторная отправка кода через {countdown} секунд</span>
              ) : (
                <span className={styles.retryLink}>Отправить код снова</span>
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
