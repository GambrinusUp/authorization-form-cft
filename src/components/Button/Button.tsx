import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

function Button({ text, onClick, type = 'button' }: ButtonProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
