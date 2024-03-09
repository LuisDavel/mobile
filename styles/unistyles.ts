import { UnistylesRegistry } from "react-native-unistyles"
import { breakpoints } from "./breakpoint"
import { darkTheme, lightTheme } from "./theme"

type AppBreakpoints = typeof breakpoints

// if you defined themes
type AppThemes = {
  light: typeof lightTheme,
  dark: typeof darkTheme
}

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry
  .addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
    // register other themes with unique names
  })
  .addConfig({
    initialTheme: 'light',
    // you can pass here optional config described below
    adaptiveThemes: true
  })