import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";

export function ThemeToggleButton() {
  const { theme, setTheme, colorScheme } = useTheme();

  const getNextTheme = () => {
    switch (theme) {
      case "system":
        return "light";
      case "light":
        return "dark";
      case "dark":
        return "system";
      default:
        return "system";
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "system":
        return "🔄 Sistema";
      case "light":
        return "☀️ Claro";
      case "dark":
        return "🌙 Escuro";
      default:
        return "🔄 Sistema";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, colorScheme === "dark" && styles.buttonDark]}
      onPress={() => setTheme(getNextTheme())}
    >
      <Text style={[styles.text, colorScheme === "dark" && styles.textDark]}>
        {getThemeLabel()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonDark: {
    backgroundColor: "#2d2d2d",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  textDark: {
    color: "#e5e5e5",
  },
});
