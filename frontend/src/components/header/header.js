import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <a href='/'>ETSALS</a>
      </div>
    </header>
  );
};

export default Header;
