import React from 'react';
import { Box } from "@mui/material";
import SearchBar from './SearchBar';

/**
 * Компонент Header отображает верхнюю часть страницы, включая панель поиска.
 */
const Header: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
    return (
        <Box
            sx={{
                height: '80px',
                backgroundColor: 'rgba(79, 79, 79, 1)',
                padding: 0,
                marginLeft: '-25px',
                width: '100%'
            }}
        >
            {/* Компонент панели поиска, который использует переданную функцию onSearch */}
            <SearchBar onSearch={onSearch} />
        </Box>
    );
};

export default Header;
