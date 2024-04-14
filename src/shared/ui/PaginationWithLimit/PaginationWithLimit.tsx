import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";

type Props = {
    count: number
    limitVariants: number[]
    page: number
    limit: number
    handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void
    handleLimitChange: (event: SelectChangeEvent<number>) => void
}

const PaginationWithLimit = ({count, limitVariants, page, limit, handlePageChange, handleLimitChange}: Props) => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1em",
            width: "100%"
        }}>
            <Pagination count={count} page={page} onChange={handlePageChange}/>
            <FormControl variant={"standard"} size={"small"}>
                <InputLabel>Кол-во</InputLabel>
                <Select
                    value={limit}
                    onChange={handleLimitChange}
                    autoWidth
                    disableUnderline
                >
                    {limitVariants.map(limitVariant =>
                        <MenuItem key={limitVariant} value={limitVariant}>{limitVariant}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
};

export default PaginationWithLimit;
