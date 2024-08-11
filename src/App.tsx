import React, { useState } from 'react';
import { useAppSelector } from './redux/store';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Box, Container } from "@mui/material";
import { Repo } from './redux/reposSlice';

const App: React.FC = () => {
    const [hasSearched, setHasSearched] = useState(false);
    const selectedRepo = useAppSelector((state): Repo | null => state.repos.selectedRepo);

    const handleSearch = () => {
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
                <Header onSearch={handleSearch} />

                {!hasSearched ? (
                    <WelcomeSection />
                ) : (
                    <MainContent selectedRepo={selectedRepo} />
                )}

                <Footer />
            </Container>
        </Box>
    );
};

export default App;
