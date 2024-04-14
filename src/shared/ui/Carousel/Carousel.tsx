import React, {ChangeEvent, memo, useEffect, useRef, useState} from 'react';
import {Box, Pagination, PaginationItem, Stack, useTheme} from "@mui/material";
import {motion, useMotionValue} from "framer-motion";
import InfoBlock from "../InfoBlock/InfoBlock";
import AutoplayControls from "./AutoplayControls";

type Props = {
    children: React.ReactElement[]
    index: number
    onChange: (newValue: number, startOffset: number, endOffset: number) => void
    buffer?: number
    autoplayDelayMs?: number
}

export const Carousel = memo(({children, index, onChange, buffer = 50, autoplayDelayMs}: Props) => {
    const dragX = useMotionValue(0)
    const timeout = useRef<NodeJS.Timeout | undefined>(undefined)
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(autoplayDelayMs === undefined)
    const theme = useTheme()

    const handleItemClick = (idx: number) => {
        if (idx !== index && idx >= 0 && idx < children.length) {
            onChange(idx, idx, children.length - idx - 1)
        }
    }

    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        if (autoplayDelayMs && !isAutoplayPaused) {
            timeout.current = setTimeout(
                () => handleItemClick(index + 1), autoplayDelayMs
            )
        }
    }, [index, isAutoplayPaused])

    const handleDragEnd = () => {
        const x = dragX.get()
        if (x <= -buffer && index < children.length - 1) {
            handleItemClick(index + 1)
        } else if (x >= buffer && index > 0) {
            handleItemClick(index - 1)
        }
    }

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
        handleItemClick(page - 1)
    }

    return (
        <Stack spacing={2} alignItems={"center"} maxWidth={"100%"}>
            {autoplayDelayMs &&
                <AutoplayControls
                    isPaused={isAutoplayPaused}
                    setIsPaused={setIsAutoplayPaused}
                />
            }
            <Box position={"relative"} overflow={"hidden"} width={"100%"}>
                <motion.div
                    style={{
                        x: dragX,
                        width: "100%",
                        maxHeight: "70vh",
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "1em"
                    }}
                    drag={"x"}
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    animate={{
                        translateX: `calc(-${index * 80}% - ${index}em)`,
                    }}
                    transition={{
                        type: "spring",
                        mass: 3,
                        stiffness: 400,
                        damping: 50
                    }}
                    onDragEnd={handleDragEnd}
                >
                    {children.map((child, idx) => (
                        <motion.div
                            key={child.key}
                            style={{
                                flexShrink: 0,
                                marginLeft: idx === 0 ? "10%" : 0,
                                width: "80%",
                                position: "relative"
                            }}
                            animate={{
                                opacity: idx === index ? 1 : 0.5,
                                scale: idx === index ? 1 : 0.9,
                                x: idx === index ? 0 : idx < index ? "5%" : "-5%"
                            }}
                        >
                            <InfoBlock
                                onClick={idx === index ?
                                    undefined :
                                    () => {
                                        handleItemClick(idx)
                                    }
                                }
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "& > *": {
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        pointerEvents: "none",
                                        borderRadius: "20px"
                                    },

                                }}
                            >
                                {child}
                            </InfoBlock>
                        </motion.div>
                    ))}
                </motion.div>
            </Box>
            <Pagination
                count={children.length}
                siblingCount={3}
                size={"small"}
                hidePrevButton
                hideNextButton
                color={"primary"}
                page={index + 1}
                onChange={handlePageChange}
                renderItem={item => (
                    <PaginationItem
                        {...item}
                        page={<div/>}
                        sx={{
                            minWidth: 'auto',
                            height: 'auto',
                            padding: '0.5em',
                            marginX: '0.3em',
                            backgroundColor: theme.palette.grey[400],
                            ':hover': {
                                backgroundColor: theme.palette.grey[600],
                            }
                        }}
                    />
                )}
            />
        </Stack>
    );
});
