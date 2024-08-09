import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import styles from './styles/App.module.scss';
import RepoTable from "./components/RepoTable";
import { Box, Paper } from "@mui/material";

const App: React.FC = () => {
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        setHasSearched(true);
    };

    return (
        <div className={styles.app}>
            <SearchBar onSearch={handleSearch} />
            {!hasSearched ? (
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcome}>
                        Добро пожаловать
                    </div>
                </div>
            ) : (
                <div className={styles.mainContent}>
                    <RepoTable />
                    <div className={styles.rightSidebar}>
                        <Paper elevation={0} className={styles.rightSidebarPaper}>
                            <Box className={styles.selectionText}>
                                Выберите репозитарий
                            </Box>
                        </Paper>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
