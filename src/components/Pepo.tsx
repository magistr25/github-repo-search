import React from 'react';
import { Box, Typography } from '@mui/material';

const Repo= () => {
    return (
        <Box
            sx={{
                width: '347px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // измените на нужный цвет фона
                border: '1px solid #ddd', // добавьте границу, если нужно
                padding: '0 8px', // внутренние отступы, если нужно
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 400,
                    fontSize: '32px',
                    lineHeight: '40px',
                }}
            >
                Название репозитария
            </Typography>
        </Box>
    );
};

export default Repo;
