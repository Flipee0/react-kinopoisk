import React from 'react';
import InfoBlock from "shared/ui/InfoBlock/InfoBlock";
import {IEpisodeData} from "../models/IEpisodeData";
import {Grid, Typography} from "@mui/material";
import Image from "shared/ui/Image/Image";

type Props = {
    data: IEpisodeData
}

const Episode = ({data}: Props) => {
    return (
        <InfoBlock>
            <Grid container spacing={2}>
                {data.still && data.still.url &&
                    <Grid item xs={12} lg={2} md={3} sm={3} sx={{
                        width: "100%"
                    }}>
                        <Image
                            src={data.still.url}
                            alt={`Постер серии ${data.name}`}
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
                        Серия {data.number}: {data.name ? data.name : data.enName}
                    </Typography>
                    {data.airDate &&
                        <Typography sx={{
                            opacity: "50%"
                        }}>
                            {data.airDate.toLocaleString("ru", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Typography>
                    }
                    {(data.description || data.enDescription) &&
                        <Typography
                            sx={{
                                marginY: "0.5em"
                            }}
                        >
                            {data.description ? data.description : data.enDescription}
                        </Typography>
                    }
                </Grid>
            </Grid>
        </InfoBlock>
    );
};

export default Episode;
