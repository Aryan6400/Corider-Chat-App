import React from "react";

import { Avatar, AvatarBadge, Grid, GridItem } from '@chakra-ui/react';
import VerifiedIcon from '@mui/icons-material/Verified';

type chatProps = {
    key: string;
    showDateLine: boolean;
    date: string;
    user: boolean;
    isLast: boolean;
    content: string;
    profile: string;
}

function Chat(props : chatProps) {
    function formatDate(dateString: string): string {
        const [year, month, day] = dateString.split('-');
        const months: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName: string = months[Number(month) - 1];
        return `${day} ${monthName}, ${year}`;
    }

    return (
        <div className="chat">
            {props.isLast && <p><span>{formatDate(props.date)}</span></p>}
            <Grid templateColumns="1fr 14fr" gap="0.5rem" className={props.user ? "myChats" : "chats"}>
                <GridItem
                    justifySelf="left"
                    alignSelf="start"
                    className="avatar"
                >
                    {!props.user && <Avatar src={props.profile} >
                        <AvatarBadge >
                            <VerifiedIcon sx={{ fontSize: 11 }} color="primary" />
                        </AvatarBadge>
                    </Avatar>}
                </GridItem>
                <GridItem
                    fontSize="1.2rem"
                >
                    <div className={props.user ? "myChatText" : "chatText"}>
                        {props.content}
                    </div>
                </GridItem>
            </Grid>
            {props.showDateLine && <p><span>{formatDate(props.date)}</span></p>}
        </div>
    )
}

export default Chat;