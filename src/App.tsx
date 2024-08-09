import React from 'react';
import SearchBar from './components/SearchBar';
import styles from './styles/App.module.scss';
import RepoTable from "./components/RepoTable";
import {Box, Paper} from "@mui/material";

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <SearchBar />
            {/*<div className={styles.welcomeContainer}>*/}
            {/*    <div className={styles.welcome}>*/}
            {/*        Добро пожаловать*/}
            {/*    </div>*/}
            {/*</div>*/}
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
        </div>
    );
};

export default App;

