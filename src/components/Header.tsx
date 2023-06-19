import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Grid, GridItem } from "@chakra-ui/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EditIcon } from "@chakra-ui/icons";

function Header() {
    return (
        <div className="header">
            <Grid templateColumns="16fr 1fr">
                <GridItem>
                    <h1 className="heading"><ArrowBackIcon /> Trip 1</h1>
                </GridItem>
                <GridItem
                    justifySelf="right"
                    alignSelf="end"
                >
                    <EditIcon className="headingIcon" boxSize={25}/>
                </GridItem>
            </Grid>
            <Grid templateColumns="1fr 12fr 1fr" gap="0.5rem">
                <GridItem
                    justifySelf="left"
                    alignSelf="center"
                    className="avatar"
                >
                    <Avatar src="https://fastly.picsum.photos/id/1072/160/160.jpg?hmac=IDpbpA5neYzFjtkdFmBDKXwgr-907ewXLa9lLk9JuA8" />
                </GridItem>
                <GridItem
                    fontSize="1.2rem"
                    paddingLeft=".75rem"
                >
                    <p>From <span>IGI Airport, T3</span> <br />
                        To <span>Sector 28</span> </p>
                </GridItem>
                <GridItem
                    justifySelf="right"
                    alignSelf="center"
                >
                    <MoreVertIcon fontSize="medium" />
                </GridItem>
            </Grid>
            <hr />
        </div>
    )
}

export default Header;