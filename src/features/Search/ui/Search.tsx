import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import useDebounce from "shared/hooks/useDebounce";
import AutocompleteType from "../models/Autocomplete";

type Props = {
    initial?: string
    searchFn: (value: string) => void
    setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>
    autocomplete?: AutocompleteType
}

export const Search = ({searchFn, setIsSearching, autocomplete, initial = ""}: Props) => {
    const [search, setSearch] = useState(initial)

    const debouncedSearch = useDebounce((value: string) => {
        if (autocomplete && value !== "") {
            autocomplete.addValue(value)
        }
        searchFn(value)
    }, 1000)

    const handleTyping = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        debouncedSearch(event.target.value)
    }

    const handleChoose = (event: SyntheticEvent<Element, Event>, value: string | null) => {
        setSearch(value ?? "")
        debouncedSearch(value ?? "")
    }

    useEffect(() => {
        if (setIsSearching) {
            setIsSearching(search !== "")
        }
    }, [search])

    return (
        <Autocomplete
            freeSolo
            fullWidth
            value={search}
            onChange={handleChoose}
            options={autocomplete?.getValues() ?? []}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={handleTyping}
                    label="Поиск"
                />
            )}
        />
    );
};
