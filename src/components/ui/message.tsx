import React from "react";
import { useAudioPlayerStore } from "../../store";
import { truncateText } from "../../lib/utils";

type MessageProps = {
  message: Record<any, any>;
};

const Message = ({ message }: MessageProps) => {
  return (
    <React.Fragment>
      {message.type === "music" ? (
        <MusicMessage message={message} />
      ) : (
        <TextMessage message={message} />
      )}
    </React.Fragment>
  );
};

const TextMessage = ({ message }: MessageProps) => {
  return (
    <div
      className={`mx-auto bg-blue-300/40 items-center rounded-lg flex p-4`}
    >
      <p>{message.text}</p>
    </div>
  );
};

const MusicMessage = ({ message }: MessageProps) => {
  const { setCurrentSong } = useAudioPlayerStore();

  console.log(message)
  return (
    <div
      className="hover:border-slate-100/50 hover:border hover:shadow-md bg-indigo-300/50 items-center cursor-pointer gap-5 rounded-md flex p-4 transition-all duration-300 ease-in-out h-full w-full"
      onClick={() => setCurrentSong(message.song)}
    >
      <div className="flex flex-col gap-2 items-start text-white w-full">
      <h1 className="text-xl w-full">{message.song.title.length > 0 ? truncateText(message.song.title, 50) : ""}</h1>
        <small>{message.song.creator}</small>
      </div>
    </div>
  );
};
export default Message;
