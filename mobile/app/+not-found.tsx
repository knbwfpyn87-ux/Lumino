import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { T } from '@/components/ui';
import { useTheme } from '@/lib/theme';
export default function NotFound() {
  const t = useTheme();
  return (<><Stack.Screen options={{ title: 'Oops!' }} /><View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: t.bg }}><T size={20} weight="800">This screen doesn't exist.</T><Link href="/"><T color={t.accent}>Go to Today</T></Link></View></>);
}
