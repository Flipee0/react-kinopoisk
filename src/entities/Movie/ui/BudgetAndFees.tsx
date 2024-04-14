import React from 'react';
import IMoneyData from "../models/InfoParts/IMoneyData";
import IFeesData from "../models/InfoParts/IFeesData";
import {Grid, Typography} from "@mui/material";
import convertToTriades from "shared/helpers/convertToTriades";

type Props = {
    budget?: IMoneyData,
    fees?: IFeesData
}

export const BudgetAndFees = ({budget, fees}: Props) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                Бюджет: {budget && budget.value ? `${convertToTriades(budget.value)} ${budget.currency}` : "нет информации"}
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h5"} sx={{textAlign: "center"}}>
                    Сборы
                </Typography>
            </Grid>
            {fees && (Object.values(fees).every(fee => fee && fee.value)) ?
                <>
                    {fees.world && fees.world.value &&
                        <>
                            <Grid item xs={4}>
                                Мир
                            </Grid>
                            <Grid item xs={8}>
                                {`${convertToTriades(fees.world.value)} ${fees.world.currency}`}
                            </Grid>
                        </>
                    }
                    {fees.russia && fees.russia.value &&
                        <>
                            <Grid item xs={4}>
                                Россия
                            </Grid>
                            <Grid item xs={8}>
                                {`${convertToTriades(fees.russia.value)} ${fees.russia.currency}`}
                            </Grid>
                        </>
                    }
                    {fees.usa && fees.usa.value &&
                        <>
                            <Grid item xs={4}>
                                США
                            </Grid>
                            <Grid item xs={8}>
                                {`${convertToTriades(fees.usa.value)} ${fees.usa.currency}`}
                            </Grid>
                        </>
                    }
                </>
                :
                <Grid item xs={12}>
                    Нет информации
                </Grid>
            }
        </Grid>
    );
};
