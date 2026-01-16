import { Stack } from "expo-router";

export default function ContentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { paddingTop: 0 },
      }}
    />
  );
}
