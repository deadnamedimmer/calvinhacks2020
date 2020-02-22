import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import React, { Fragment } from "react";
import {
  addedSugars,
  gluten,
  labels,
  nuts,
  toxins,
  vegan,
  vegitarian,
  oils
} from "../Data/data";
import "../Styles/styles.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//let ingredients = "INGREDIENTS: INGREDIENTS: WHOLE CORN, SUNFLOWER AND/OR CANOLA OIL, WHOLE WHEAT, BROWN RICE FLOUR, WHOLE OAT FLOUR, SUGAR, TOMATO POWDER, SALT, NATURAL FLAVORS, MALTODEXTRIN (MADE FROM CORN), CHEDDAR CHEESE (MILK, CHEESE CULTURES, SALT, ENZYMES), DEXTROSE, BUTTERMILK, ONION POWDER, WHEY, YEAST EXTRACT, ROMANO CHEESE (PART-SKIM COW'S MILK, CHEESE CULTURES, SALT, ENZYMES), WHEY PROTEIN CONCENTRATE, CORN OIL, SPICES (INCLUDING JALAPEÑO PEPPER), CITRIC ACID, PAPRIKA EXTRACTS, AND LACTIC ACID. CONTAINS WHEAT AND MILK INGREDIENTS.";

interface ResultsProps {
  userChecks: boolean[];

  ingredients: string;

  itemName: string;
  upcCode: string;
}

const Results: React.FunctionComponent<ResultsProps> = ({
  userChecks,
  ingredients,
  itemName,
  upcCode
}) => {
  const capitalize = (s: String) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  function checkToxinPositives() {
    const toxinPositives: string[] = [];
    for (const val of toxins) {
      if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        toxinPositives.push(val);
      }
    }
    return toxinPositives;
  }

  function checkAddedSugarsPositives() {
    let addedSugarsPositives: string[] = [];
    for (const val of addedSugars) {
      if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        addedSugarsPositives.push(val);
      }
    }
    return addedSugarsPositives;
  }

  function checkGlutenPositives() {
    let addedGlutenPositives: string[] = [];
    for (const val of gluten) {
      if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        addedGlutenPositives.push(val);
      }
    }
    return addedGlutenPositives;
  }

  function checkNutsPositives() {
    let addedNutsPositives: string[] = [];
    for (const val of nuts) {
      if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        addedNutsPositives.push(val);
      }
    }
    return addedNutsPositives;
  }

  function checkVeganPositives() {
    let addedVeganPositives: string[] = [];
    for (const val of vegan) {
      if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        addedVeganPositives.push(val);
      }
    }
    return addedVeganPositives;
  }

  function checkVegitarianPositives() {
    let addedVegitarianPositives: string[] = [];
    for (const val of vegitarian) {
      if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        addedVegitarianPositives.push(val);
      }
    }
    return addedVegitarianPositives;
  }

  function checkOilPositives() {
    let addedOilPositives: string[] = [];
    for (const val of oils) {
      if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        addedOilPositives.push(val);
      }
    }
    return addedOilPositives;
  }

  let functions = [
    checkToxinPositives,
    checkAddedSugarsPositives,
    checkGlutenPositives,
    checkNutsPositives,
    checkVeganPositives,
    checkVegitarianPositives,
    checkOilPositives
  ];

  function findAllPositives() {
    let returnable = [];

    for (let i = 0; i < userChecks.length; i++) {
      if (userChecks[i]) {
        returnable[i] = functions[i]();
      } else {
        returnable[i] = [];
      }
    }

    return returnable;
  }

  let allPositives = findAllPositives();

  const icons = [
    "skull.png",
    "sugar.png",
    "wheat.png",
    "nuts.png",
    "vegan.png",
    "veg.png",
    "oil.png"
  ];

  return (
    <Fragment>
      <Typography variant="h4" className="margin">
        .
      </Typography>
      <div className="results">
        <Typography variant="h4" className="results">
          {itemName}
        </Typography>
        <Typography variant="subtitle1" className="margin">
          {upcCode}
        </Typography>
        <Grid container spacing={3} direction="column" className="maxHeight">
          {allPositives.map((item: any, i: number) => {
            let displayed = false;

            console.log(item);
            return (
              <Fragment>
                {userChecks[i] && (
                  <Grid item xs={12}>
                    <div className="margin">
                      <ExpansionPanel className="dark">
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className="dark"
                        >
                          <img
                            src={"/Icons/" + icons[i]}
                            height="25px"
                            style={{ paddingRight: "5px" }}
                          ></img>
                          <Typography className="smallMargin" variant="h6">
                            {labels[i] + " " + item.length}
                          </Typography>
                        </ExpansionPanelSummary>
                        <Divider />
                        <ExpansionPanelDetails className="smallPadding">
                          <List>
                            {item.map((item: string, i: number) => {
                              displayed = true;
                              return (
                                <ListItem
                                  className="smallPadding"
                                  key={capitalize(item)}
                                >
                                  <ListItemText
                                    className="smallPadding"
                                    primary={capitalize(item)}
                                  />
                                </ListItem>
                              );
                            })}
                            {!displayed && (
                              <div>
                                <ListItem className="smallPadding">
                                  <ListItemText
                                    className="smallPadding"
                                    primary="None"
                                  />
                                </ListItem>
                              </div>
                            )}
                          </List>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                  </Grid>
                )}
              </Fragment>
            );
          })}
        </Grid>
      </div>
    </Fragment>
  );
};

export default Results;
