import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Fundamentos inegociáveis",
          title: "Fundamentos inegociáveis",
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="(tabs)" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Core do React Native",
          title: "Core do React Native",
          headerTitleAlign: "center",
        }}
      />
    </Drawer>
  );
}
