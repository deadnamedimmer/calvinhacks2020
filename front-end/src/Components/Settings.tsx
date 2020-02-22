import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import React, { Fragment } from "react";
import { categories } from "../Data/data";
import "../Styles/styles.css";

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

interface SettingsProps {
  handleSelect: Function;
  userChecks: boolean[];
}

const Settings: React.FunctionComponent<SettingsProps> = ({
  handleSelect,
  userChecks
}) => {
  return (
    <Fragment>
      <List className="jDark">
        {categories.map((item: string, i: number) => {
          const labelId = `checkbox-list-label-${item}`;

          return (
            <ListItem
              key={item}
              button
              onClick={() => {
                handleSelect(i);
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={userChecks[i]}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
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
};

export default Settings;
