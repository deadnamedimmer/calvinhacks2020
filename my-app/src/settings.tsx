import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import './results.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListItem, ListItemText, List, ListItemIcon, Divider, Card, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { toxins, addedSugars, gluten, nuts, vegan, vegitarian, categories } from './data.js';

const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

interface SettingsProps {
    handleSelect: Function;
    userChecks: boolean[];
}


const Settings: React.FunctionComponent<SettingsProps> = ({ handleSelect, userChecks }) => {
    return (
        <Fragment>
            <List className="jDark">
                {categories.map((item: string, i: number) => {
                    const labelId = `checkbox-list-label-${item}`;

                    return (
                        <ListItem key={item} button onClick={() => { handleSelect(i) }}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={userChecks[i]}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    className="secondaryButton"
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item} />
                        </ListItem>
                    );
                })}
            </List>
        </Fragment>
    );
}

export default Settings;
