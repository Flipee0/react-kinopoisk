import React, {useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const usePagination = (initialPage: number, initialLimit: number, isUseSearchParams: boolean = false) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const paramsPage = searchParams.get("page")
    const paramsLimit = searchParams.get("limit")

    const [page, setPage] = useState(paramsPage ? Number.parseInt(paramsPage, 10) : initialPage)
    const [limit, setLimit] = useState(paramsLimit ? Number.parseInt(paramsLimit, 10) : initialLimit)

    const updateSearchParams = (newPage?: number, newLimit?: number) => {
        if (isUseSearchParams) {
            searchParams.set("page", newPage?.toString() ?? page.toString())
            searchParams.set("limit", newLimit?.toString() ?? limit.toString())
            setSearchParams(searchParams)
        }
    }

    useEffect(() => {
        updateSearchParams()
    }, [])

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
        updateSearchParams(newPage)
    }

    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        setLimit(event.target.value as number)
        updateSearchParams(undefined, event.target.value as number)
    }

    return {page, limit, handlePageChange, handleLimitChange}
}

export default usePagination
