import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Fab,
  Button
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { Fragment } from "react";
import { checks } from "../Data/data";
import Results from "./Results";
import Settings from "./Settings";
import "../Styles/styles.css";
import WebcamCapture from "./Webcam/Webcam";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";

const itemName = "Sun Chips Garden Salsa";
const ingredients =
  "INGREDIENTS: INGREDIENTS: WHOLE CORN, SUNFLOWER AND/OR CANOLA OIL, WHOLE WHEAT, BROWN RICE FLOUR, WHOLE OAT FLOUR, SUGAR, TOMATO POWDER, SALT, NATURAL FLAVORS, MALTODEXTRIN (MADE FROM CORN), CHEDDAR CHEESE (MILK, CHEESE CULTURES, SALT, ENZYMES), DEXTROSE, BUTTERMILK, ONION POWDER, WHEY, YEAST EXTRACT, ROMANO CHEESE (PART-SKIM COW'S MILK, CHEESE CULTURES, SALT, ENZYMES), WHEY PROTEIN CONCENTRATE, CORN OIL, SPICES (INCLUDING JALAPEÑO PEPPER), CITRIC ACID, PAPRIKA EXTRACTS, AND LACTIC ACID. CONTAINS WHEAT AND MILK INGREDIENTS.";
const upcCode = "0-00000-00000-0";

const Main: React.FunctionComponent = () => {
  const [userChecks, setChecks] = React.useState<boolean[]>(checks);
  const [drawer, setDrawer] = React.useState({ left: false });
  const [resultsOpen, setResultsOpen] = React.useState(false);
  const [screenSize, setScreenSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

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

  const handleOpenResults = () => {
    setResultsOpen(true);
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
          <IconButton edge="start" color="inherit" aria-label="menu">
            <SettingsIcon onClick={toggleDrawer("left", true)} />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Food Sleuth
          </Typography>
          {resultsOpen ? (
            <Button
              disableRipple={false}
              style={{ color: "#FFFFFF" }}
              onClick={() => {
                handleCloseResults();
              }}
            >
              <CameraAltIcon />
            </Button>
          ) : (
            <Button
              disableRipple={false}
              style={{ color: "#FFFFFF" }}
              onClick={() => {}}
            >
              <FlipCameraAndroidIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={drawer.left} onClose={toggleDrawer("left", false)}>
        <Settings handleSelect={handleSelect} userChecks={userChecks} />
      </Drawer>
      {!resultsOpen && (
        <WebcamCapture
          handleOpenResults={handleOpenResults}
          width={screenSize.width}
          height={screenSize.height}
        />
      )}
      {resultsOpen && (
        <Container className="app">
          <Results
            userChecks={userChecks}
            ingredients={ingredients}
            itemName={itemName}
            upcCode={upcCode}
            handleCloseResults={handleCloseResults}
          />
        </Container>
      )}
    </Fragment>
  );
};

export default Main;
