import React from "react";

type Props = {
  waveformRef: any;
};

const Waveform = ({ waveformRef }: Props) => {
  return <div id="waveform" className="w-full" ref={waveformRef} />;
};

export default Waveform;
