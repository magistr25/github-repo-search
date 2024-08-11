import React, { useState } from 'react';
import { useAppSelector } from './redux/store';
import Header from './components/Header';
import WelcomeSection from './components/innerMainContent/WelcomeSection';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Box, Container } from "@mui/material";
import { Repo } from './redux/reposSlice';

/**
 * Главный компонент приложения.
 */
const App: React.FC = () => {
    /**
     * Состояние, которое определяет, была ли выполнена поисковая операция.
     */
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    /**
     * Селектор для получения выбранного репозитория из состояния.
     */
    const selectedRepo: Repo | null = useAppSelector((state): Repo | null => state.repos.selectedRepo);

    /**
     * Обработчик события поиска. Устанавливает флаг, что поиск был выполнен.
     */
    const handleSearch = (): void => {
        setHasSearched(true);
    };

    return (
        <Box
            sx={{
                backgroundColor: 'black',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                overflow: 'hidden',
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    width: 'auto',
                    maxWidth: '1440px',
                    padding: 0,
                    backgroundColor: 'rgba(242, 242, 242, 1)',
                    margin: 0,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    '::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {/* Компонент шапки приложения, включает в себя поле для поиска */}
                <Header onSearch={handleSearch} />

                {/* Условный рендеринг: отображается либо приветственный раздел, либо основное содержание в зависимости от состояния hasSearched */}
                {!hasSearched ? (
                    <WelcomeSection />
                ) : (
                    <MainContent selectedRepo={selectedRepo} />
                )}

                {/* Компонент подвала приложения */}
                <Footer />
            </Container>
        </Box>
    );
};

export default App;
