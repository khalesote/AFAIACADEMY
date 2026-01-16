/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#9DC3AA"; // Pantone PQ-5595 C approx (primary)
const tintColorDark = "#9DC3AA"; // same for dark
const secondaryColorLight = "#FFC107"; // gold (secondary)
const secondaryColorDark = "#FFC107"; // gold for dark as well

export const Colors = {
  light: {
    text: "#000000",
    background: "#fff",
    tint: tintColorLight,
    secondary: secondaryColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    secondary: secondaryColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
