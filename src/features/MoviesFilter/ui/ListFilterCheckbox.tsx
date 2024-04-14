import {
    Checkbox,
    FormControlLabel,
    FormGroup,
} from '@mui/material';
import React from 'react';
import {ListFilter, ListFilterItem, ListFilterItemState} from "../models/ListFilter";
import {observer} from "mobx-react-lite";
import FilterInputWrapper from './FilterInputWrapper';

type Props = {
    header: string
    filter: ListFilter
}

const ListFilterCheckbox = observer(({header, filter}: Props) => {
    const handleItemStateChange = (item: ListFilterItem) => {
        if (item.state === ListFilterItemState.DISABLED) {
            item.state = ListFilterItemState.INCLUDE
        } else if (item.state === ListFilterItemState.INCLUDE) {
            item.state = ListFilterItemState.EXCLUDE
        } else {
            item.state = ListFilterItemState.DISABLED
        }
    }

    return (
        <FilterInputWrapper header={header} filter={filter}>
            <FormGroup>
                {filter.items.map(item => (
                    <FormControlLabel key={item.value} control={
                        <Checkbox
                            checked={item.state === ListFilterItemState.INCLUDE}
                            indeterminate={item.state === ListFilterItemState.EXCLUDE}
                            onClick={() => handleItemStateChange(item)}
                        />
                    } label={item.label} />
                ))}
            </FormGroup>
        </FilterInputWrapper>
    );
});

export default ListFilterCheckbox;
