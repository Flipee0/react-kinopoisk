import React, {useEffect, useRef, useState} from 'react';
import {MoviePreview} from "entities/Movie";
import {redirectMovieDataStore} from "entities/Movie";
import {useQuery} from "@tanstack/react-query";
import {useParams, useSearchParams} from "react-router-dom";
import getMovieData from "../api/getMovieData";
import {IMovieShortData} from "entities/Movie";
import { motion } from 'framer-motion';
import InfoBlock from "shared/ui/InfoBlock/InfoBlock";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    CircularProgress,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MoviePrimaryInfo from "./MoviePrimaryInfo";
import MoviePersons from "./MoviePersons";
import MovieReviews from "./MovieReviews";
import MoviePosters from "./MoviePosters";
import MovieSeries from "./MovieSeries";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NoDecorationLink from "shared/ui/NoDecorationLink/NoDecorationLink";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Error from "shared/ui/Error/Error";

export const MovieInfo = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [previewData, setPreviewData] = useState(redirectMovieDataStore.getData())
    const from = useRef(redirectMovieDataStore.queryParams)
    const [activeTab, setActiveTab] = useState(searchParams.get("section") ?? "primary")
    const {id} = useParams();
    const theme = useTheme()
    const smDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["movie", id],
        queryFn: () => getMovieData(id)
    })

    useEffect(() => {
        searchParams.set("section", activeTab)
        setSearchParams(searchParams)
    }, [activeTab])

    useEffect(() => {
        if (!isLoading && !isError) {
            setPreviewData(data as IMovieShortData | undefined)
        }
    }, [isLoading])

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{padding: "2em", marginBottom: (smDevice ? 4 : 0)}}>
            {from.current &&
                <NoDecorationLink to={`/?${from.current}`}>
                    <InfoBlock sx={{width: "fit-content", marginBottom: 2}}>
                        <Stack spacing={1} direction={"row"} alignItems={"center"}>
                            <KeyboardArrowLeftIcon/>
                            <Typography>Назад к каталогу</Typography>
                        </Stack>
                    </InfoBlock>
                </NoDecorationLink>
            }
            {previewData !== undefined &&
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 100, y: 0}}
                >
                    <InfoBlock>
                        <MoviePreview key={1} data={previewData}/>
                    </InfoBlock>
                </motion.div>
            }
            {isLoading && <CircularProgress/>}
            {isError && <Error retryFn={refetch}/>}
            {data &&
                <Stack direction={smDevice ? "column" : "row"} spacing={2} marginTop={"2em"}>
                    {smDevice ?
                        <Paper sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 900
                        }} elevation={3}>
                            <BottomNavigation
                                showLabels
                                value={activeTab}
                                onChange={handleTabChange}
                            >
                                <BottomNavigationAction label="Главная" value={"primary"} icon={<HomeIcon/>}/>
                                <BottomNavigationAction label="Люди" value={"persons"} icon={<PeopleIcon/>}/>
                                <BottomNavigationAction label="Отзывы" value={"reviews"} icon={<ReviewsIcon/>}/>
                                <BottomNavigationAction label="Постеры" value={"posters"} icon={<ImageIcon/>}/>
                                <BottomNavigationAction label="Серии" value={"series"} icon={<VideoLibraryIcon/>}/>
                            </BottomNavigation>
                        </Paper>
                        :
                        <InfoBlock sx={{
                            width: "fit-content",
                            height: "fit-content",
                            position: "sticky",
                            top: 80,
                            zIndex: 900,
                        }}>
                            <Tabs
                                orientation={"vertical"}
                                value={activeTab}
                                onChange={handleTabChange}
                                centered
                            >
                                <Tab label={"Главная"} value={"primary"}/>
                                <Tab label={"Люди"} value={"persons"}/>
                                <Tab label={"Отзывы"} value={"reviews"}/>
                                <Tab label={"Постеры"} value={"posters"}/>
                                <Tab label={"Серии"} value={"series"}/>
                            </Tabs>
                        </InfoBlock>
                    }
                    <Box minWidth={0}>
                        {activeTab === "primary" &&
                            <MoviePrimaryInfo data={data}/>
                        }
                        {activeTab === "persons" &&
                            <MoviePersons persons={data.persons}/>
                        }
                        {activeTab === "reviews" &&
                            <MovieReviews movieId={data.id}/>
                        }
                        {activeTab === "posters" &&
                            <MoviePosters movieId={data.id}/>
                        }
                        {activeTab === "series" &&
                            <MovieSeries movieId={data.id}/>
                        }
                    </Box>
                </Stack>
            }
        </Box>
    );
};
