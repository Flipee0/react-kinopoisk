import React, {useState} from 'react';
import BaseFilter from "../models/BaseFilter";
import {observer} from "mobx-react-lite";
import {Accordion, AccordionDetails, AccordionSummary, Backdrop, CircularProgress} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Error from "shared/ui/Error/Error";

type Props = {
    header: string
    filter: BaseFilter
    children: React.ReactNode | React.ReactNode[]
}

const FilterInputWrapper = observer(({header, filter, children}: Props) => {
    const [opened, setOpened] = useState(filter.enabled)

    const handleAccordionExpand = () => {
        setOpened(prev => !prev)
    }

    return (
        <Accordion expanded={opened} onChange={handleAccordionExpand}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                {header}
            </AccordionSummary>
            <AccordionDetails sx={{position: "relative"}}>
                <Backdrop
                    sx={{ position: "absolute", color: '#fff', zIndex: 200 }}
                    open={filter.isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {filter.isError ? <Error retryFn={filter.updateOptions.bind(filter)}/> : children}
            </AccordionDetails>
        </Accordion>
    );
});

export default FilterInputWrapper;
