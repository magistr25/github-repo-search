import React from 'react';
import { Box } from "@mui/material";
/**
 * Компонент Footer отображает нижний колонтитул страницы.
 *
 * @returns {JSX.Element} - Возвращает JSX элемент футера.
 */
const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                height: '32px',
                backgroundColor: 'rgba(79, 79, 79, 1)',
                padding: 0,
                width: '1441px',
                marginTop: 'auto',
                marginLeft: '-25px',

            }}
        />
    );
};

export default Footer;
