import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from './button';

interface CameraComponentProps {
  onCapture: (imageSrc: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam | null>(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc || '');
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Webcam height={720} width={1280} className='rounded-md border-[5px] border-slate-900'  audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <Button onClick={capture} className="bg-indigo-600 font-normal">Capture</Button>
    </div>
  );
};

export default CameraComponent;
