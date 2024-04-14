import React from 'react';
import {FormControlLabel, Switch} from "@mui/material";
import BaseFilter from "../models/BaseFilter";
import {observer} from "mobx-react-lite";

type Props = {
    filter: BaseFilter
}

const EnabledSwitch = observer(({filter}: Props) => {
    const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        filter.enabled = event.target.checked
    }

    return (
        <FormControlLabel control={
            <Switch checked={filter.enabled} onChange={handleEnabledChange}/>
        } label="Включить" />
    );
});

export default EnabledSwitch;
