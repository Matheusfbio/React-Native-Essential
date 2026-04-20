import { Drawer } from 'expo-router/drawer';
import { useNavigation, router, usePathname } from 'expo-router';
import { useTheme } from '@/components/ThemeContext';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useState } from 'react';

function DrawerHeaderLeft() {
  const navigation = useNavigation();
  const { colorScheme } = useTheme();
  const iconColor = colorScheme === 'dark' ? '#e5e5e5' : '#333';

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        paddingRight: 12,
      }}
    >
      <Ionicons name="menu" size={24} color={iconColor} />
    </TouchableOpacity>
  );
}

type NavItemProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  active: boolean;
  dark: boolean;
  accentColor: string;
};

function NavItem({
  label,
  icon,
  route,
  active,
  dark,
  accentColor,
}: NavItemProps) {
  const labelColor = dark ? '#e5e5e5' : '#333';
  const activeBg = dark ? `${accentColor}22` : `${accentColor}18`;

  return (
    <TouchableOpacity
      onPress={() => router.push(route as any)}
      style={[styles.navItem, active && { backgroundColor: activeBg }]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={active ? accentColor : labelColor}
      />
      <Text
        style={[styles.navLabel, { color: active ? accentColor : labelColor }]}
      >
        {label}
      </Text>
      {active && (
        <View style={[styles.activeBar, { backgroundColor: accentColor }]} />
      )}
    </TouchableOpacity>
  );
}

function CustomDrawerContent(props: any) {
  const { colorScheme, accentColor } = useTheme();
  const pathname = usePathname();
  const [conteudosOpen, setConteudosOpen] = useState(false);

  const dark = colorScheme === 'dark';
  const labelColor = dark ? '#e5e5e5' : '#333';
  const subBg = dark ? '#ffffff0f' : '#00000008';
  const borderColor = dark ? '#ffffff15' : '#00000010';
  const activeBg = dark ? `${accentColor}22` : `${accentColor}18`;
  const isConteudosActive = pathname.includes('/rn/content');

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={[styles.appName, { color: labelColor }]}>
          RN Essential
        </Text>
        <Text style={[styles.appVersion, { color: dark ? '#666' : '#999' }]}>
          {process.env.EXPO_PUBLIC_VERSION}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: borderColor }]} />

      <View style={styles.section}>
        <NavItem
          label="Feed"
          icon="newspaper-outline"
          route="/(drawer)/feed/feed"
          active={pathname.includes('/feed')}
          dark={dark}
          accentColor={accentColor}
        />

        {/* Accordion Conteúdos */}
        <TouchableOpacity
          onPress={() => setConteudosOpen(prev => !prev)}
          style={[
            styles.navItem,
            isConteudosActive && { backgroundColor: activeBg },
          ]}
        >
          <Ionicons
            name="book-outline"
            size={20}
            color={isConteudosActive ? accentColor : labelColor}
          />
          <Text
            style={[
              styles.navLabel,
              { color: isConteudosActive ? accentColor : labelColor, flex: 1 },
            ]}
          >
            Conteúdos
          </Text>
          <Ionicons
            name={conteudosOpen ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={isConteudosActive ? accentColor : labelColor}
          />
        </TouchableOpacity>

        {conteudosOpen && (
          <View
            style={[styles.subMenu, { backgroundColor: subBg, borderColor }]}
          >
            <NavItem
              label="Core RN"
              icon="code-slash-outline"
              route="/(drawer)/rn/content/coreRn"
              active={pathname.includes('/coreRn')}
              dark={dark}
              accentColor={accentColor}
            />
            <NavItem
              label="Fundamentos"
              icon="layers-outline"
              route="/(drawer)/rn/content/fundament"
              active={pathname.includes('/fundament')}
              dark={dark}
              accentColor={accentColor}
            />
          </View>
        )}
        <NavItem
          label="Sugestão"
          icon="chatbubble-outline"
          route="/(drawer)/suggestions"
          active={pathname.includes('/suggestions')}
          dark={dark}
          accentColor={accentColor}
        />
        <NavItem
          label="Favoritos"
          icon={pathname.includes('/favorite') ? 'heart' : 'heart-outline'}
          route="/(drawer)/favorite"
          active={pathname.includes('/favorite')}
          dark={dark}
          accentColor={accentColor}
        />
      </View>

      <View style={[styles.divider, { backgroundColor: borderColor }]} />

      <View style={styles.section}>
        <NavItem
          label="Configurações"
          icon="settings-outline"
          route="/(drawer)/settings"
          active={pathname.includes('/settings')}
          dark={dark}
          accentColor={accentColor}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  appName: { fontSize: 18, fontWeight: '700' },
  appVersion: { fontSize: 12, marginTop: 2 },
  divider: { height: 1, marginHorizontal: 16, marginVertical: 8 },
  section: { paddingHorizontal: 12, gap: 2 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 12,
    overflow: 'hidden',
  },
  navLabel: { fontSize: 14, fontWeight: '500' },
  activeBar: {
    position: 'absolute',
    right: 0,
    top: '20%',
    width: 3,
    height: '60%',
    borderRadius: 2,
  },
  subMenu: {
    marginLeft: 12,
    marginBottom: 4,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default function Layout() {
  const { colorScheme } = useTheme();

  return (
    <Drawer
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerLeft: () => <DrawerHeaderLeft />,
        drawerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
        },
        drawerLabelStyle: {
          color: colorScheme === 'dark' ? '#e5e5e5' : '#333',
          height: 15,
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
          height: 80,
        },
        headerTintColor: colorScheme === 'dark' ? '#e5e5e5' : '#333',
      }}
    >
      <Drawer.Screen
        name="feed/feed"
        options={{
          drawerLabel: 'Feed',
          title: 'Noticias',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="rn/content/index"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Conteúdos',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="suggestions"
        options={{
          drawerLabel: 'Sugestão',
          title: 'Formulario de sugestão',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="favorite"
        options={{
          drawerLabel: 'Favoritos',
          title: 'Favoritos',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="rn/content/coreRn"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Core RN',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="rn/content/fundament"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Fundamentos',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: '⚙️ Configurações',
          title: 'Configurações',
          headerTitleAlign: 'center',
          drawerItemStyle: { marginTop: '180%' },
        }}
      />
    </Drawer>
  );
}
