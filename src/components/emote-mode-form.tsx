import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GENRES, MOOD_INTENSITIES, TEMPOS } from "../lib/utils";
import { useChatStore } from "../store";

const SelfieForm = () => {
  const { setSelfieForm } = useChatStore();

  return (
    <div className="flex w-full flex-col justify-between gap-3">
      <div className="flex flex-col w-full justify-between gap-2">
        <label htmlFor="moodIntensity">Intensity</label>
        <select
          id="moodIntensity"
          className="flex-1 bg-black w-full p-2 text-white"
          onChange={(e) => setSelfieForm("mood", e.target.value)}
          defaultValue="Intensity"
        >
          {MOOD_INTENSITIES.map((mood, i) => (
            <option key={i} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full justify-between gap-2">
        <label htmlFor="Tempo">Tempo</label>
        <select
          id="Tempo"
          className="bg-black w-full p-2 text-white"
          onChange={(e) => setSelfieForm("tempo", e.target.value)}
          defaultValue="Tempo"
        >
          {TEMPOS.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col flex-1 justify-between gap-2">
        <label htmlFor="Genre">Genre</label>
        <select
          id="Genre"
          className="bg-black text-white p-2"
          onChange={(e) => setSelfieForm("genre", e.target.value)}
          defaultValue="Genre"
        >
          {GENRES.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelfieForm;
