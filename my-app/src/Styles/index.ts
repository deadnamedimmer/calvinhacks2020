import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(1)
    },
    paper: {
      margin: theme.spacing(1),
      padding: theme.spacing(1)
    },
    margined: {
      margin: theme.spacing(1)
    },
    topMargined: {
      marginTop: theme.spacing(1)
    },
    topMargined2: {
      marginTop: theme.spacing(2)
    },
    loadingContainer: {
      width: "100vw",
      height: "100vh",
      textAlign: "center"
    },
    centerStyle: {
      marginLeft: "25%",
      testAlign: "center",
      marginTop: theme.spacing(1)
    },
    loadingContent: {
      // TODO: Add Style Here to Center it Vertically
    },
    loadingCircle: {
      margin: "40px"
    },
    horizontalCenter: {
      textAlign: "center"
    }
  })
);