import React, { Fragment } from "react";
import Webcam from "react-webcam";
import NoBarcodeBox from "./NoBarcodeBox";
const Quagga = require("quagga"); // Need this as there are no type defs...

declare interface WebcamCaptureProps {
  handleOpenResults: () => void;
  width: number;
  height: number;
}

const WebcamCapture: React.FunctionComponent<WebcamCaptureProps> = ({
  handleOpenResults,
  width,
  height
}) => {
  const webcamRef = React.useRef<Webcam & HTMLVideoElement>(null);
  const [noBarcodeBoxOpen, setNoBarcodeBoxOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");

  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      Quagga.decodeSingle(
        {
          src: imageSrc,
          numOfWorkers: 0, // Needs to be 0 when used within node
          inputStream: {},
          decoder: {
            readers: ["upc_reader"] // List of active readers
          }
        },
        function(result: any) {
          if (result && result.codeResult) {
            console.log("result", result.codeResult.code);
            handleOpenResults();
          } else {
            if (imageSrc) {
              setNoBarcodeBoxOpen(true);
              setImageSrc(imageSrc);
            }
          }
        }
      );
    }
  }, [webcamRef, handleOpenResults]);

  const handleCloseNoBarcode = () => {
    setNoBarcodeBoxOpen(false);
  };

  return (
    <Fragment>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        mirrored={false}
        onClick={capture}
        width={width}
        height={height - 5}
      />
      <NoBarcodeBox
        open={noBarcodeBoxOpen}
        handleClose={handleCloseNoBarcode}
        imageSrc={imageSrc}
      />
    </Fragment>
  );
};

export default WebcamCapture;
