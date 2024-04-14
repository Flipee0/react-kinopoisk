import {IconButton, Typography} from '@mui/material';
import React, {memo} from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoBlock from "../InfoBlock/InfoBlock";

type Props = {
    isPaused: boolean
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
}

const AutoplayControls = memo(({isPaused, setIsPaused}: Props) => {
    const handleIsPausedChange = () => {
        setIsPaused(prev => !prev)
    }

    return (
        <InfoBlock sx={{
            width: "auto",
            padding: 1,
            display: "flex",
            alignItems: "center",
            paddingRight: 2
        }}>
            <IconButton onClick={handleIsPausedChange}>
                {isPaused ? <PauseIcon/> : <PlayArrowIcon/>}
            </IconButton>
            <Typography>Автовоспроизведение</Typography>
        </InfoBlock>
    );
});

export default AutoplayControls;
