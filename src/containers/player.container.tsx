import HomePlayer from "../components/home-player";
import { useAudioPlayerStore } from "../store";
import { fetchSong } from "../lib/fetchers";
import { useQuery } from "react-query";

const PlayerContainer = () => {
  const { currentSong, setCurrentSong } = useAudioPlayerStore();

  useQuery("player_song", fetchSong, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setCurrentSong(data);
    },
  });

  return (
    <div className="flex flex-row  md:flex-col h-auto p-2 w-full md:flex-1 md:h-screen relative">
      <div className="w-full flex-1 gap-2 flex-row md:flex-col rounded-md flex p-2 md:p-5 text-white">
        <div className="flex flex-row md:flex-col gap-5 justify-between md:justify-center w-full h-full">
          <div className="bg-transparent rounded-md flex flex-col justify-center items-center w-full">

          </div>
          {currentSong && <HomePlayer song={currentSong} />}
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
