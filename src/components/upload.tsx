import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SelfieForm from "./emote-mode-form";
import { useAudioPlayerStore, useChatStore } from "../store";
import { axiosInstance } from "../lib/axios-instance";
import { Camera } from "lucide-react";
import FileUpload from "./ui/file-upload";

type Props = {
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
};

const Upload = ({ isGenerating, setIsGenerating }: Props) => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMessages, selfieForm } = useChatStore();
  const { setCurrentSong } = useAudioPlayerStore();

  const handleSelfieMode = async () => {
    if (!uploadedImage) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("uploaded-img", uploadedImage, "selfie");
    formData.append("mood", selfieForm.mood);
    formData.append("tempo", selfieForm.tempo);
    formData.append("genre", selfieForm.genre);
    setImageUrl(null);
    setUploadedImage(null);
    setIsModalOpen(false);
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post(
        "api/data/detect_emotion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const song = {
        ...response.data,
        creator: "Sangeet",
      };
      setCurrentSong(song);
      setMessages("Vibe Composed", "assistant", "music", song);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages("Sorry vibe check failed 😔", "assistant", "text");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen(!isModalOpen)}
    >
      <DialogTrigger
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
        disabled={true}
        className="p-2 rounded-md text-slate-500"
      >
        <Camera />
      </DialogTrigger>
      <DialogContent className="h-auto border-none bg-[#270057] text-white font-space">
        <DialogHeader>
          <DialogTitle>Emote Mode</DialogTitle>
          <DialogDescription className="text-sm font-sans text-slate-300">
            Upload a selfie to create a vibe based on your expression ✨
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-center md:justify-between items-center gap-4 py-4">
          {uploadedImage ? (
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <img
                src={imageUrl}
                className="rounded-md object-cover border-[5px] h-[200px] w-[200px] border-indigo-400"
                alt="Selfie"
              />
              <SelfieForm />
            </div>
          ) : (
            <FileUpload
              setImageUrl={setImageUrl}
              setUploadedImage={setUploadedImage}
            />
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button
            onClick={() => {
              setIsModalOpen(false);
              setImageUrl(null);
              setUploadedImage(null);
            }}
            className="bg-indigo-600 font-normal"
          >
            Cancel
          </Button>
          {uploadedImage && <Button
            onClick={handleSelfieMode}
            className="bg-indigo-600 w-full font-normal"
          >
            Generate
          </Button>}

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Upload;
