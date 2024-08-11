import React from 'react';
import { Box } from "@mui/material";
import SearchBar from './SearchBar';

const Header: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
    return (
        <Box sx={{ height: '80px', backgroundColor: 'rgba(79, 79, 79, 1)', padding: 0, marginLeft: '-25px', width: '100%' }}>
            <SearchBar onSearch={onSearch} />
        </Box>
    );
};

export default Header;
