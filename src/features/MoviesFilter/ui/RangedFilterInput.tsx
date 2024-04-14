import {Slider} from '@mui/material';
import React from 'react';
import RangedFilter from '../models/RangedFilter';
import EnabledSwitch from "./EnabledSwitch";
import {observer} from "mobx-react-lite";
import FilterInputWrapper from "./FilterInputWrapper";

type Props = {
    header: string
    filter: RangedFilter,
    minValue: number,
    maxValue: number
}

const RangedFilterInput = observer(({header, filter, minValue, maxValue}: Props) => {
    const handleValueChange = (_: Event, value: number | number[]) => {
        if (Array.isArray(value)) {
            filter.startValue = value[0]
            filter.endValue = value[1]
        }
    }

    return (
        <FilterInputWrapper header={header} filter={filter}>
            <EnabledSwitch filter={filter}/>
            <Slider
                min={minValue}
                max={maxValue}
                value={[filter.startValue, filter.endValue]}
                onChange={handleValueChange}
                valueLabelDisplay="on"
                disabled={!filter.enabled}
                sx={{
                    marginTop: "2em",
                }}
            />
        </FilterInputWrapper>
    );
});

export default RangedFilterInput;
