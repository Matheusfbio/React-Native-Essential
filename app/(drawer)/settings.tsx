import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  sectionTitleDark: {
    color: "#e5e5e5",
  },
  option: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionDark: {
    backgroundColor: "#2d2d2d",
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: "#4f46e5",
  },
  optionSelectedDark: {
    borderColor: "#8b5cf6",
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  optionLabelDark: {
    color: "#e5e5e5",
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
  },
  optionDescriptionDark: {
    color: "#a3a3a3",
  },
  checkmark: {
    fontSize: 18,
    color: "#4f46e5",
    fontWeight: "bold",
  },
});
