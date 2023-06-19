import React, { useEffect, useRef, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Chat from "./components/Chat";
import InputChat from "./components/Input";
import Header from "./components/Header";
import database from "./components/database";

function App() {
  const [chats, setChats] = useState<any[]>([]);
  const [mode, setMode] = useState<string>("Online");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [chatsLoaded, setChatsLoaded] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  let date: string, newdate: string;

  async function getChats() {
    try {
      const data = await database.getData(`https://qa.corider.in/assignment/chat?page=${pageNumber}`)
      const newChats = data.chats;
      setMode("Online");
      setChats((prevChats) => {
        const result = { chats: [...newChats, ...prevChats] };
        localStorage.setItem("chats", JSON.stringify({ result }))
        return [...newChats, ...prevChats]
      });
    } catch (err) {
      let localChats: any = localStorage.getItem("chats");
      localChats = JSON.parse(localChats!);
      localChats.result.chats==null ? setChats([]) : setChats(localChats.result.chats);
      setMode("Offline");
    }
  }

  function isContainerScrolledToTop(): boolean {
    const container = chatRef.current as HTMLDivElement;
    return container.scrollTop === 0;
  }

  function handleScroll(): void {
    if (isContainerScrolledToTop()) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }

  useEffect(() => {
    const container = chatRef.current as HTMLDivElement;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    getChats();
    setTimeout(() => {
      setChatsLoaded(true);
    }, 2000);
  }, [pageNumber]);

  useEffect(() => {
    if (chatsLoaded) {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  }, [chatsLoaded]);

  return (
    <div className="App">
      <Grid templateRows="2fr 8fr 1.5fr" height="100vh" gap="10px">
        <GridItem
        >
          <Header />
          {mode == "Offline" && <p style={{ "color": "red", "textAlign": "center", "backgroundColor": "#ffd400", "padding": "6px", "margin": "-10px -20px" }}>You are offline!! Go online to view new chats.</p>}
        </GridItem>
        <GridItem
          className="chatBox"
          ref={chatRef}
        >
          <div className="chatDiv">
            {
              [...chats].reverse().map((chat, index) => {
                let dateChange = false;
                if (index == 0) {
                  newdate = chat.time.slice(0, 10);
                  date = newdate;
                }
                date = newdate;
                if (date != chat.time.slice(0, 10)) {
                  dateChange = true;
                  newdate = chat.time.slice(0, 10);
                }

                return (
                  <Chat key={chat.id} showDateLine={dateChange} date={date} isLast={index == (chats.length-1) ? true : false} user={index == 0 ? true : false} content={chat.message} profile={chat.sender.image} />
                )
              })
            }
          </div>
        </GridItem>
        <GridItem
        >
          <InputChat />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
