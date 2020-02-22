import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Fragment } from 'react';
import { addedSugars, gluten, nuts, toxins, vegan, vegitarian, labels } from "../Data/data";
import '../Styles/styles.css';

//let ingredients = "INGREDIENTS: INGREDIENTS: WHOLE CORN, SUNFLOWER AND/OR CANOLA OIL, WHOLE WHEAT, BROWN RICE FLOUR, WHOLE OAT FLOUR, SUGAR, TOMATO POWDER, SALT, NATURAL FLAVORS, MALTODEXTRIN (MADE FROM CORN), CHEDDAR CHEESE (MILK, CHEESE CULTURES, SALT, ENZYMES), DEXTROSE, BUTTERMILK, ONION POWDER, WHEY, YEAST EXTRACT, ROMANO CHEESE (PART-SKIM COW'S MILK, CHEESE CULTURES, SALT, ENZYMES), WHEY PROTEIN CONCENTRATE, CORN OIL, SPICES (INCLUDING JALAPEÑO PEPPER), CITRIC ACID, PAPRIKA EXTRACTS, AND LACTIC ACID. CONTAINS WHEAT AND MILK INGREDIENTS.";

interface ResultsProps {
    userChecks: boolean[];

    ingredients: string;

    itemName: string;
}

const Results: React.FunctionComponent<ResultsProps> = ({ userChecks, ingredients, itemName }) => {

    const capitalize = (s: String) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    function checkToxinPositives() {
        const toxinPositives: string[] = [];
        for (const val of toxins) {
            if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                toxinPositives.push(val);
            }
        }
        return toxinPositives
    }

    function checkAddedSugarsPositives() {
        let addedSugarsPositives: string[] = [];
        for (const val of addedSugars) {
            if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                addedSugarsPositives.push(val);
            }
        }
        return addedSugarsPositives
    }

    function checkGlutenPositives() {
        let addedGlutenPositives: string[] = [];
        for (const val of gluten) {
            if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                addedGlutenPositives.push(val);
            }
        }
        return addedGlutenPositives
    }

    function checkNutsPositives() {
        let addedNutsPositives: string[] = [];
        for (const val of nuts) {
            if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                addedNutsPositives.push(val)
            }
        }
        return addedNutsPositives
    }

    function checkVeganPositives() {
        let addedVeganPositives: string[] = [];
        for (const val of vegan) {
            if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                addedVeganPositives.push(val)
            }
        }
        return addedVeganPositives
    }

    function checkVegitarianPositives() {
        let addedVegitarianPositives: string[] = [];
        for (const val of vegitarian) {
            if (ingredients.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                addedVegitarianPositives.push(val);
            }
        }
        return addedVegitarianPositives
    }

    let functions = [checkToxinPositives, checkAddedSugarsPositives, checkGlutenPositives, checkNutsPositives, checkVeganPositives, checkVegitarianPositives]

    function findAllPositives() {
        let returnable = []

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


    return (
        <Fragment>
            <div className="results">
                <Typography variant="h4" className="margin">{itemName}</Typography>
                <Grid container spacing={3} direction="column" className="maxHeight">
                    {allPositives.map((item: any, i: number) => {
                        let displayed = false;

                        console.log(item)
                        return (
                            <Fragment>
                                {userChecks[i] && <Grid item xs={12}>
                                    <div className="margin">
                                        <ExpansionPanel className="dark">
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                className="dark"
                                            >
                                                <Typography className="smallMargin" variant="h6" >{labels[i] + " " + item.length}</Typography>
                                            </ExpansionPanelSummary>
                                            <Divider />
                                            <ExpansionPanelDetails className="smallPadding">
                                                <List>
                                                    {item.map((item: string, i: number) => {
                                                        displayed = true
                                                        return (
                                                            <ListItem className="smallPadding">
                                                                <ListItemText className="smallPadding" primary={capitalize(item)} />
                                                            </ListItem>
                                                        )
                                                    })}
                                                    {!displayed && <div><ListItem className="smallPadding"><ListItemText className="smallPadding" primary="None" /></ListItem></div>}
                                                </List>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </Grid>}
                            </Fragment>
                        )
                    })}
                </Grid>
            </div>
        </Fragment >
    );
}

export default Results;
