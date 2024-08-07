import React from 'react';


import SearchBar from './components/SearchBar';
import styles from './styles/App.module.scss';

/**
 * Главный компонент приложения, который объединяет все остальные компоненты.
 */
const App: React.FC = () => {
    return (

            <div className={styles.app}>
                <SearchBar />
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcome}>
                        Добро пожаловать
                    </div>
                </div>
            </div>

    );
};

export default App;

