import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Fab
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { Fragment } from "react";
import { checks } from "../Data/data";
import Results from "./Results";
import Settings from "./Settings";
import "../Styles/styles.css";
import WebcamCapture from "./Webcam/Webcam";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { getIngredientsUPC } from "../Scripts/upc";

const Main: React.FunctionComponent = () => {
  const [userChecks, setChecks] = React.useState<boolean[]>(checks);
  const [drawer, setDrawer] = React.useState({ left: false });
  const [resultsOpen, setResultsOpen] = React.useState(false);
  const [screenSize, setScreenSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [upcData, setUpcData] = React.useState<UPCData | null>(null);

  const handleSelect = (i: number) => {
    const newChecks: boolean[] = userChecks.slice();
    newChecks[i] = !newChecks[i];
    setChecks(newChecks);
  };

  type DrawerSide = "top" | "left" | "bottom" | "right";

  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    console.log("Open sidebar");
    setDrawer({ ...drawer, [side]: open });
  };

  const handleCloseResults = () => {
    setResultsOpen(false);
  };

  const onWindowResize = () => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  };

  window.addEventListener("resize", onWindowResize);

  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <SettingsIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Food Sleuth
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer.left} onClose={toggleDrawer("left", false)}>
        <Settings handleSelect={handleSelect} userChecks={userChecks} />
      </Drawer>
      {!resultsOpen && (
        <WebcamCapture
          width={screenSize.width}
          height={screenSize.height}
          setResultsOpen={setResultsOpen}
          setUpcData={setUpcData}
        />
      )}
      {resultsOpen && (
        <Fragment>
          <Container className="app">
            <Results
              userChecks={userChecks}
              ingredients={upcData ? upcData.ingredients : ""}
              itemName={upcData ? upcData.item : ""}
              upcCode={upcData ? upcData.upc : ""}
            />
          </Container>
          <Fab
            color="primary"
            aria-label="New scan"
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
            onClick={() => {
              handleCloseResults();
            }}
          >
            <CameraAltIcon />
          </Fab>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Main;
