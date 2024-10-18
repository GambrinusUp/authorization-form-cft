import { useEffect, useState } from 'react';

import styles from './CountdownTimer.module.scss';

interface CountdownTimerProps {
  initialDelay: number;
  onRetry: () => void;
}

const CountdownTimer = ({ initialDelay, onRetry }: CountdownTimerProps) => {
  const [countdown, setCountdown] = useState(initialDelay / 1000);

  useEffect(() => {
    if (initialDelay > 0) {
      setCountdown(initialDelay / 1000);
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
  }, [initialDelay]);

  return (
    <div className={styles.retryContainer}>
      {countdown ? (
        <span>Повторная отправка кода через {countdown} секунд</span>
      ) : (
        <span onClick={onRetry} className={styles.retryLink}>
          Отправить код снова
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
