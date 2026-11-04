import { Tabs } from 'expo-router';
import { useTheme } from '@/lib/theme';
import UIcon, { type UIName } from '@/components/UIcon';

const TABS: { name: string; title: string; icon: UIName }[] = [
  { name: 'index', title: 'Today', icon: 'nav-home' }, { name: 'classes', title: 'Classes', icon: 'nav-classes' },
  { name: 'practice', title: 'Practice', icon: 'nav-study' }, { name: 'friends', title: 'Friends', icon: 'nav-friends' },
  { name: 'me', title: 'Me', icon: 'nav-settings' },
];

export default function TabLayout() {
  const t = useTheme();
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: t.accent, tabBarInactiveTintColor: t.muted, tabBarStyle: { backgroundColor: t.card, borderTopColor: t.line, height: 88, paddingTop: 6 }, tabBarLabelStyle: { fontWeight: '700' } }}>
      {TABS.map(tab => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title,
        // Home is the board's two-tone icon (dimmed when not selected); the rest are tinted line icons
        tabBarIcon: ({ focused, color }) => tab.icon === 'nav-home'
          ? <UIcon name="nav-home" size={28} style={{ opacity: focused ? 1 : 0.55 }} />
          : <UIcon name={tab.icon} size={26} color={String(color)} /> }} />)}
    </Tabs>
  );
}
