import React, {useEffect, useState} from 'react';
import getMovies from "../api/getMovies";
import {MoviesList} from "entities/Movie";
import {Button, ButtonGroup, CircularProgress, Grid, Typography} from "@mui/material";
import usePagination from "shared/hooks/usePagination";
import PaginationWithLimit from "shared/ui/PaginationWithLimit/PaginationWithLimit";
import {MoviesFilter} from "features/MoviesFilter";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import filtersStore from "features/MoviesFilter/models/FiltersStore";
import {useSearchParams} from 'react-router-dom';
import {Search} from "features/Search";
import {useQuery} from "@tanstack/react-query";
import autocompletesStore from "features/Search/models/AutocompletesStore";
import Error from "shared/ui/Error/Error";

export const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pagination = usePagination(1, 10, true)
    const [isFiltersSettingsOpen, setIsFiltersSettingsOpen] = useState(false)
    const [isSearching, setIsSearching] = useState(searchParams.has("query"))
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["movies", searchParams.toString(), isSearching],
        queryFn: () => getMovies(searchParams.toString(), isSearching)
    })

    useEffect(() => {
        filtersStore.updateFromQuery(searchParams)
    }, [])

    const handleFiltersSettingsOpen = () => {
        setIsFiltersSettingsOpen(true)
    }

    const handleFiltersSettingsClose = () => {
        filtersStore.setParams(searchParams, setSearchParams)
        setIsFiltersSettingsOpen(false)
    }

    const handleFiltersClear = () => {
        setSearchParams(`page=${pagination.page}&limit=${pagination.limit}`)
        filtersStore.updateFromQuery(new URLSearchParams(""))
    }

    const search = (value: string) => {
        if (value === "") {
            searchParams.delete("query")
        }
        else {
            searchParams.set("query", value)
        }
        setSearchParams(searchParams)
    }

    return (
        <Grid container spacing={2} sx={{
            padding: "2em",
        }}>
            <Grid item xs={12} sx={{
                display: "flex",
                gap: "2em",
                justifyContent: "center"
            }}>
                {!filtersStore.filtersEnabled &&
                    <Search
                        initial={searchParams.get("query") ?? undefined}
                        searchFn={search}
                        setIsSearching={setIsSearching}
                        autocomplete={autocompletesStore.movies}
                    />
                }
                {!isSearching &&
                    <ButtonGroup variant={"outlined"} sx={{
                        marginLeft: "auto"
                    }}>
                        {filtersStore.filtersEnabled &&
                            <Button onClick={handleFiltersClear}>
                                Очистить
                            </Button>
                        }
                        <Button onClick={handleFiltersSettingsOpen}>
                            <FilterAltIcon/>Фильтры
                        </Button>
                    </ButtonGroup>
                }
                <MoviesFilter open={isFiltersSettingsOpen} onClose={handleFiltersSettingsClose}/>
            </Grid>
            <Grid item xs={12} sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
            }}>
                {isLoading && <CircularProgress/>}
                {isError && <Error retryFn={refetch}/>}
                {data !== undefined && data.docs !== undefined && !isError && !isLoading &&
                    <>
                        {data.docs.length === 0 ?
                            <Typography>Нет результатов</Typography>
                            :
                            <>
                                <MoviesList data={data.docs}/>
                                <PaginationWithLimit
                                    count={data.pages}
                                    limitVariants={[10, 15, 30]}
                                    {...pagination}
                                />
                            </>
                        }
                    </>
                }
            </Grid>
        </Grid>
    )
};
