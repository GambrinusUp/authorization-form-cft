import { USER_FIELDS } from '../../utils/constants';
import { User } from '../../utils/types';
import styles from './UserData.module.scss';

interface UserDataProps {
  userData: User;
}

function UserData({ userData }: UserDataProps) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Данные пользователя</span>
      {USER_FIELDS.map((field, index) => (
        <div className={styles.twoLine} key={index}>
          <span className={styles.secondary}>{field.label}</span>
          <span className={styles.primary}>
            {userData[field.key] === ''
              ? 'Данных пока нет'
              : userData[field.key]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default UserData;
