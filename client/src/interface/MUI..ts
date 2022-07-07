import { Theme } from "@material-ui/core/styles";
import { Styles } from "@material-ui/core/styles/withStyles";

export type MUICustomStyles = Styles<
  Theme,
  {},
  "button" | "rippleVisible" | "child" | "@keyframes enter"
>;
