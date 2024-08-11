import React from 'react';
import { Box, Typography } from "@mui/material";

/**
 * Компонент WelcomeSection отображает приветственный раздел с текстом "Добро пожаловать".
 *
 * Возвращает JSX элемент раздела с приветствием.
 */
const WelcomeSection: React.FC = () => {
    return (
        <Box
            sx={{
                height: '912px',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    marginTop: 'calc(100vh/2 - 33px)',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '46px',
                    lineHeight: '65.78px',
                    letterSpacing: '0.17px',
                    color: 'rgba(79, 79, 79, 1)',
                    textAlign: 'center',
                }}
            >
                Добро пожаловать
            </Typography>
        </Box>
    );
};

export default WelcomeSection;

