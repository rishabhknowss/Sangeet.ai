import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MOOD_INTENSITIES = ["low", "moderate", "high"];
export const TEMPOS = ["slow", "moderate", "fast"];
export const GENRES = [
  "rock",
  "pop",
  "classical",
  "jazz",
  "ambient",
  "electronic",
  "hip-hop",
];

export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

export async function downloadFile(url: string, fileName: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${response.statusText}`);
    }
    const fileBlob = await response.blob();
    const fileUrl = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `${fileName}.mp3`;
    a.click();
    URL.revokeObjectURL(fileUrl);
  } catch (error) {
    console.error(`Error downloading the file: ${error}`);
  }
}

