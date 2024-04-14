import React from 'react';
import FilterInputWrapper from "./FilterInputWrapper";
import {ListFilter, ListFilterItem, ListFilterItemState} from "../models/ListFilter";
import {Autocomplete, TextField} from '@mui/material';
import {observer} from "mobx-react-lite";

type Props = {
    header: string
    filter: ListFilter
}

const ListFilterSelect = observer(({header, filter}: Props) => {
    const handleIncludedChange = (event: React.SyntheticEvent, value: ListFilterItem[]) => {
        filter.items.forEach(
            item => value.includes(item) ?
                item.state = ListFilterItemState.INCLUDE :
                item.state === ListFilterItemState.INCLUDE ? item.state = ListFilterItemState.DISABLED : null
        )
    }

    const handleExcludedChange = (event: React.SyntheticEvent, value: ListFilterItem[]) => {
        filter.items.forEach(
            item => value.includes(item) ?
                item.state = ListFilterItemState.EXCLUDE :
                item.state === ListFilterItemState.EXCLUDE ? item.state = ListFilterItemState.DISABLED : null
        )
    }

    return (
        <FilterInputWrapper header={header} filter={filter}>
            <Autocomplete
                multiple
                options={filter.items.filter(item => item.state !== ListFilterItemState.EXCLUDE)}
                getOptionLabel={option => option.label}
                filterSelectedOptions
                value={filter.items.filter(item => item.state === ListFilterItemState.INCLUDE)}
                onChange={handleIncludedChange}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Включить"
                    />
                )}
                sx={{
                    marginBottom: "1em"
                }}
            />
            <Autocomplete
                multiple
                options={[...filter.items].filter(item => item.state !== ListFilterItemState.INCLUDE)}
                getOptionLabel={option => option.label}
                filterSelectedOptions
                value={filter.items.filter(item => item.state === ListFilterItemState.EXCLUDE)}
                onChange={handleExcludedChange}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={"Исключить"}
                    />
                )}
            />
        </FilterInputWrapper>
    );
});

export default ListFilterSelect;
