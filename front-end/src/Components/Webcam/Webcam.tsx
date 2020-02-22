import React, { Fragment } from "react";
import Webcam from "react-webcam";
import NoBarcodeBox from "./NoBarcodeBox";
import { Fab } from "@material-ui/core";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import { getIngredientsUPC } from "../../Scripts/upc";
const Quagga = require("quagga"); // Need this as there are no type defs...

declare interface WebcamCaptureProps {
  width: number;
  height: number;
  setUpcData: (data: UPCData | null) => void;
  setResultsOpen: (open: boolean) => void;
}

const WebcamCapture: React.FunctionComponent<WebcamCaptureProps> = ({
  width,
  height,
  setUpcData,
  setResultsOpen
}) => {
  const webcamRef = React.useRef<Webcam & HTMLVideoElement>(null);
  const [noBarcodeBoxOpen, setNoBarcodeBoxOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");
  const [envCamera, setEnvCamera] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  const capture = () => {
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
            handleOpenResults(result.codeResult);
          } else {
            if (imageSrc) {
              setNoBarcodeBoxOpen(true);
              setImageSrc(imageSrc);
            }
          }
        }
      );
    }
  };

  const handleCloseNoBarcode = () => {
    setNoBarcodeBoxOpen(false);
  };

  const handleRotateCamera = () => {
    setEnvCamera(!envCamera);
  };

  const handleOpenResults = (upc: string) => {
    setProcessing(true);
    setNoBarcodeBoxOpen(true);
    getIngredientsUPC(upc)
      .then(value => {
        if (value) {
          setUpcData(value);
          setResultsOpen(true);
        } else {
          // Show Error Message
        }
      })
      .catch(err => {
        // Show Error Message
      });
    setNoBarcodeBoxOpen(false);
    setProcessing(false);
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
        videoConstraints={{
          facingMode: { exact: envCamera ? "environment" : "user" }
        }}
      />
      <NoBarcodeBox
        open={noBarcodeBoxOpen}
        handleClose={handleCloseNoBarcode}
        imageSrc={imageSrc}
        processing={processing}
        setProcessing={setProcessing}
      />
      <Fab
        color="primary"
        aria-label="New scan"
        style={{ position: "absolute", bottom: "20px", right: "20px" }}
        onClick={handleRotateCamera}
      >
        <FlipCameraAndroidIcon />
      </Fab>
    </Fragment>
  );
};

export default WebcamCapture;
