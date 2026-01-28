import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Animated } from "react-native";

import Colors from "../../../constants/Colors";
import { useTheme } from "../../../components/ThemeContext";
import { useClientOnlyValue } from "../../../components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  focused?: boolean;
}) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: props.focused ? 1.2 : 1,
      useNativeDriver: true,
    }).start();
  }, [props.focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const { colorScheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        },
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        },
        headerTintColor: colorScheme === "dark" ? "#e5e5e5" : "#333",
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "React Native Essentials",
          headerShown: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="code" color={color} focused={focused} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          headerShown: false,
          title: "Formulario de sugestões",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="book" color={color} focused={focused} />
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
    </Tabs>
  );
}
