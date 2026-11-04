import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';
import { useTheme } from '@/lib/theme';

const TABS = [
  { name: 'index', title: 'Today', ios: 'sun.max.fill', web: 'home' },
  { name: 'classes', title: 'Classes', ios: 'square.stack.3d.up.fill', web: 'layers' },
  { name: 'practice', title: 'Practice', ios: 'bolt.fill', web: 'bolt' },
  { name: 'friends', title: 'Friends', ios: 'person.2.fill', web: 'group' },
  { name: 'me', title: 'Me', ios: 'person.crop.circle.fill', web: 'person' },
] as const;

export default function TabLayout() {
  const t = useTheme();
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: t.accent, tabBarInactiveTintColor: t.muted, tabBarStyle: { backgroundColor: t.card, borderTopColor: t.line }, tabBarLabelStyle: { fontWeight: '600' } }}>
      {TABS.map(tab => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title,
        tabBarIcon: ({ color }) => <SymbolView name={{ ios: tab.ios, android: tab.web, web: tab.web } as never} tintColor={color} size={26} /> }} />)}
    </Tabs>
  );
}
