import React from "react";
import Chat from "../containers/chat.container";
import PlayerContainer from "../containers/player.container";
const Home = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Chat />
      <PlayerContainer />
    </div>
  );
};

export default Home;
