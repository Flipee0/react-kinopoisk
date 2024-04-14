import React, {useState} from 'react';
import {ISeriesData} from "../models/ISeriesData";
import InfoBlock from "shared/ui/InfoBlock/InfoBlock";
import {Grid, IconButton, Stack, Typography} from "@mui/material";
import Image from "shared/ui/Image/Image";
import getFormattedDuration from "../helpers/getFormattedDuration";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Episode from "./Episode";
import {motion} from 'framer-motion';

type Props = {
    data: ISeriesData[]
}

export const SeriesList = ({data}: Props) => {
    const [expandedSeasons, setExpandedSeasons] = useState(new Set())

    const handleExpandClick = (number: number) => {
        if (expandedSeasons.has(number)) {
            expandedSeasons.delete(number)
        }
        else {
            expandedSeasons.add(number)
        }
        setExpandedSeasons(new Set(expandedSeasons))
    }

    return (
        <Stack spacing={2}>
            {data.map(series => (
                <Stack key={series.number} spacing={2}>
                    <InfoBlock>
                        <Grid container spacing={2}>
                            {series.poster && series.poster.url &&
                                <Grid item xs={12} lg={1} md={2} sm={3} sx={{
                                    width: "100%"
                                }}>
                                    <Image
                                        src={series.poster?.url}
                                        alt={`Постер сезона ${series.name}`}
                                        sx={{
                                            height: "auto",
                                            width: "100%",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </Grid>
                            }
                            <Grid item xs={12} lg={10} sm={9}>
                                <Typography
                                    variant={"h5"}
                                    sx={theme => ({
                                        [theme.breakpoints.down("sm")]: {
                                            textAlign: "center"
                                        }
                                    })}
                                >
                                    {series.name}
                                </Typography>
                                <Typography sx={{
                                    opacity: "50%"
                                }}>
                                    {[
                                        series.duration ?
                                            getFormattedDuration(series.duration) :
                                            null,
                                        series.airDate ?
                                            series.airDate.toLocaleString("ru", {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }) :
                                            null,
                                        series.episodesCount ?
                                            series.episodesCount + " эпизодов" :
                                            series.episodes.length !== 0 ? series.episodes.length + " эпизодов" : null
                                    ].filter(info => info !== null).join(" • ")}
                                </Typography>
                                {series.description &&
                                    <Typography
                                        sx={{
                                            marginY: "0.5em"
                                        }}
                                    >
                                        {series.description}
                                    </Typography>
                                }
                            </Grid>
                            <Grid item xs={12} md={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <IconButton
                                    onClick={() => handleExpandClick(series.number)}
                                >
                                    {expandedSeasons.has(series.number) ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </InfoBlock>
                    {expandedSeasons.has(series.number) &&
                        <motion.div
                            initial={{height: 0}}
                            animate={{height: "100%"}}
                            exit={{height: 0}}
                            transition={{
                                duration: 0.05 * series.episodes.length
                            }}
                        >
                            <Stack spacing={1}>
                                {series.episodes.map(episode => (
                                    <Episode data={episode}/>
                                ))}
                            </Stack>
                        </motion.div>
                    }
                </Stack>
            ))}
        </Stack>
    );
};
