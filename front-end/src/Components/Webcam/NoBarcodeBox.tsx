import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React, { Fragment } from "react";
import { getImageData } from "../../Scripts/vision";

declare interface NoBarcodeBoxProps {
  open: boolean;
  handleClose: () => void;
  imageSrc: string;
}

const NoBarcodeBox: React.FunctionComponent<NoBarcodeBoxProps> = ({
  open,
  handleClose,
  imageSrc
}) => {
  const [processing, setProcessing] = React.useState(false);

  const handleProcessing = (imageSrc: string) => {
    setProcessing(true);
    // Google Vision API call for text analysis
    getImageData(imageSrc)
      .then(results => {
        if (results) {
          console.log(results);
        } else {
          console.log("Unable to get Image Data");
        }
        setProcessing(false);
        handleClose();
      })
      .catch(error => {
        console.log(error);
        setProcessing(false);
        handleClose();
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="no-barcode-dialog-title"
      aria-describedby="no-barcode-description"
    >
      <DialogTitle id="no-barcode-title">No Barcode Found!</DialogTitle>
      {!processing && (
        <Fragment>
          <DialogContent>
            <DialogContentText id="no-barcode-description">
              1. Either try again with the barcode larger, or
              <br />
              2. Use your picture for text extraction
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Try Again
            </Button>
            <Button
              onClick={() => {
                handleProcessing(imageSrc);
              }}
              color="primary"
              variant="contained"
            >
              Extract Text
            </Button>
          </DialogActions>
        </Fragment>
      )}
      {processing && (
        <Fragment>
          <DialogContent>
            <CircularProgress />
            <DialogContentText id="processing-description">
              Summoning flying monkeys to process your image...
            </DialogContentText>
          </DialogContent>
        </Fragment>
      )}
    </Dialog>
  );
};

export default NoBarcodeBox;
