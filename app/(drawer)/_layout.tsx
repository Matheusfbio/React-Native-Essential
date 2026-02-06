import { Drawer } from "expo-router/drawer";
import { useTheme } from "@/components/ThemeContext";

export default function Layout() {
  const { colorScheme } = useTheme();

  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        },
        drawerLabelStyle: {
          color: colorScheme === "dark" ? "#e5e5e5" : "#333",
        },
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
          height: 80,
        },
        headerTintColor: colorScheme === "dark" ? "#e5e5e5" : "#333",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Fundamentos inegociáveis",
          title: "Fundamentos inegociáveis",
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Feed",
          title: "Feed",
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="suggestions"
        options={{
          drawerLabel: "Sugestão",
          title: "Formulario de sugestão",
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="coreRn"
        options={{
          drawerLabel: "Core do React Native",
          title: "Core do React Native",
          headerTitleAlign: "center",
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "⚙️ Configurações",
          title: "Configurações",
          headerTitleAlign: "center",
          drawerItemStyle: {
            marginTop: "180%",
          },
        }}
      />
    </Drawer>
  );
}
