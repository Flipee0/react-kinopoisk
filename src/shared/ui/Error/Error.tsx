import {Box, Button, Typography} from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

type Props = {
    retryFn?: () => void
}

const Error = ({retryFn}: Props) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "2em",
        }}>
            <ErrorIcon fontSize={"large"}/>
            <Typography>При загрузке данных произошла ошибка</Typography>
            {retryFn !== undefined &&
                <Button onClick={retryFn}>Обновить</Button>
            }
        </Box>
    );
};

export default Error;
