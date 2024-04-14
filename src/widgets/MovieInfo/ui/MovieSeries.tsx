import React from 'react';
import usePagination from "shared/hooks/usePagination";
import {useQuery} from "@tanstack/react-query";
import PaginationWithLimit from "shared/ui/PaginationWithLimit/PaginationWithLimit";
import getSeriesData from "../api/getSeriesData";
import {SeriesList} from "entities/Series";
import {CircularProgress, Typography} from "@mui/material";
import Error from "shared/ui/Error/Error";

type Props = {
    movieId: number
}

const MovieSeries = ({movieId}: Props) => {
    const pagination = usePagination(1, 10, true)

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["series", movieId, pagination.page, pagination.limit],
        queryFn: () => getSeriesData(movieId, pagination.page, pagination.limit)
    })

    return (
        <div>
            {isLoading && <CircularProgress/>}
            {isError && <Error retryFn={refetch}/>}
            {data !== undefined && !isError && !isLoading &&
                <>
                    {data.docs.length === 0 ?
                        <Typography>Нет информации</Typography>
                        :
                        <>
                            <SeriesList data={data.docs}/>
                            <PaginationWithLimit
                                count={data.pages}
                                limitVariants={[10, 15, 30]}
                                {...pagination}
                            />
                        </>
                    }
                </>
            }
        </div>
    );
};

export default MovieSeries;
