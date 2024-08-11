import React from 'react';
import { Box } from "@mui/material";
import SearchBar from './SearchBar';

/**
 * Интерфейс для пропсов компонента Header.
 *
 * @property {() => void} onSearch - Функция, вызываемая при поиске.
 */
interface HeaderProps {
    onSearch: () => void;
}

/**
 * Компонент Header отображает верхнюю часть страницы, включая панель поиска.
 *
 * @param {HeaderProps} props - Пропсы, содержащие функцию onSearch для обработки события поиска.
 * @returns {JSX.Element} - Возвращает JSX элемент Header.
 */
const Header: React.FC<HeaderProps> = ({ onSearch }) => {
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

