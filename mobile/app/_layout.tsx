import '@/lib/polyfill';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '@/lib/auth';
import { isCloud } from '@/lib/supabase';
import { Feedback } from '@/components/ui';

export { ErrorBoundary } from 'expo-router';
export const unstable_settings = { anchor: '(tabs)' };
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);
  if (!loaded) return null;
  return <AuthProvider><Nav /></AuthProvider>;
}

function Nav() {
  const scheme = useColorScheme(); const { session, profile, loading } = useAuth(); const segments = useSegments(); const router = useRouter();
  // Send signed-out users to sign-in (live mode only).
  useEffect(() => {
    if (!isCloud || loading) return;
    const inAuth = segments[0] === 'sign-in' || segments[0] === 'onboarding';
    if (!session && !inAuth) router.replace('/sign-in');
    else if (session && !profile && segments[0] !== 'onboarding') router.replace('/onboarding');
    else if (session && profile && inAuth) router.replace('/');
  }, [session, profile, loading, segments, router]);
  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="class/[id]" options={{ title: '' , headerTransparent: true }} />
          <Stack.Screen name="quiz/[id]" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
          <Stack.Screen name="chat/[id]" options={{ title: 'Group' }} />
          <Stack.Screen name="tutor" options={{ title: 'Lumino AI', presentation: 'modal' }} />
          <Stack.Screen name="cards" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        </Stack>
        <Feedback />
      </View>
    </ThemeProvider>
  );
}
