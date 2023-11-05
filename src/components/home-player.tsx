import { Download, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MusicRecord, useAudioPlayerStore } from "../store/playerStore";
import { downloadFile, truncateText } from "../lib/utils";
import Waveform from "./ui/waveform";
import WaveSurfer from "wavesurfer.js";

type WaveformProps = {
  song: MusicRecord;
};

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#00008b",
  progressColor: "#00008b",
  cursorColor: "#853BE3",
  barWidth: 5,
  barRadius: 5,
  responsive: true,
  height: 80,
  normalize: true,
  partialRender: true,
});

export default function HomePlayer({ song }: WaveformProps) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const { isAutoPlay } = useAudioPlayerStore();

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer!.current = WaveSurfer.create(options);

    wavesurfer.current.load(song.songUrl);

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on("finish", function () {
      if (wavesurfer.current) {
        wavesurfer.current.stop();
        setPlay(false);
      }
    });

    return () => wavesurfer.current!.destroy();
  }, [song.songUrl]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current!.playPause();
  };

  const onVolumeChange = (e: any) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current!.setVolume(newVolume || 1);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      <div className="justify-center flex flex-col items-center gap-3">
        <h1 className="text-sm md:text-xl">
          {song.title.length > 0 ? truncateText(song.title, 50) : ""}
        </h1>
        <small className="text-xs md:text-md">Sangeet</small>
      </div>
      <Waveform waveformRef={waveformRef} />
      <div className="controls flex justify-between w-full">
        <div className="flex text-white gap-2">
          <button>
            <Volume2 />
          </button>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0.01"
            className="w-1/2"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />{" "}
        </div>

        <button
          onClick={handlePlayPause}
          className="rounded-full text-white hover:bg-blue-500/50 p-3"
        >
          {!playing ? <Play /> : <Pause />}
        </button>
        <button
          className="rounded-full text-white hover:bg-blue-500/50 p-3"
          onClick={() => downloadFile(song.songUrl, song.title)}
        >
          <Download />
        </button>
      </div>
    </div>
  );
}
