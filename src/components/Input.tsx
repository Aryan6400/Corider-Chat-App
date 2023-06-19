import React, { useState, ChangeEvent } from "react";
import { Grid, GridItem} from "@chakra-ui/react";
import SendIcon from '@mui/icons-material/Send';
import { AttachmentIcon, LinkIcon } from "@chakra-ui/icons";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DuoOutlinedIcon from '@mui/icons-material/DuoOutlined';

function InputChat() {
    const [newChat, setnewChat] = useState<string>("");
    const [visible, setvisibility] = useState<boolean>(false);
    function handleChange(event : ChangeEvent<HTMLInputElement>) {
        setnewChat(event.target.value);
    }
    function showIcons() {
        setvisibility((prevValue) => !prevValue);
    }
    return (
        <Grid templateColumns="auto 55px 55px" className="inputBox">
            <GridItem>
                <input type="text" onChange={handleChange} placeholder="Reply" name="chat" value={newChat} />
            </GridItem>
            <GridItem
                justifySelf="center"
                alignSelf="center"
                padding="15px 14px"
            >
                <AttachmentIcon boxSize={20} onClick={showIcons} />
            </GridItem>
            <GridItem
                justifySelf="center"
                alignSelf="center"
                padding="13px 15px"
            >
                <SendIcon />
            </GridItem>
            {visible &&
                <Grid className="attachmentIcons" templateColumns="1fr 1fr 1fr" >
                    <GridItem
                        justifySelf="center"
                        alignSelf="center"
                    >
                        <LinkIcon />
                    </GridItem>
                    <GridItem
                        justifySelf="center"
                        alignSelf="center"
                    >
                        <CameraAltOutlinedIcon />
                    </GridItem>
                    <GridItem
                        justifySelf="center"
                        alignSelf="center"
                    >
                        <DuoOutlinedIcon />
                    </GridItem>
                </Grid>
            }
            {visible && <div className="dialogueBox"></div>}
        </Grid>
    )
}

export default InputChat;