import { useCallback, useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Card, T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { listGroups, createGroup, joinGroup, type Group } from '@/lib/api';

export default function Friends() {
  const t = useTheme(); const [groups, setGroups] = useState<Group[]>([]); const [name, setName] = useState(''); const [code, setCode] = useState('');
  const load = useCallback(() => { listGroups().then(setGroups).catch(e => Alert.alert('Error', e.message)); }, []);
  useFocusEffect(load);
  const input = { flex: 1, backgroundColor: t.card, color: t.text, borderRadius: 14, padding: 14, fontSize: 16, borderWidth: 1, borderColor: t.line } as const;
  return (
    <Screen>
      <T size={30} weight="900">Friends</T>
      <T color={t.muted}>Study groups with live chat, calls, and shared tests.</T>
      {groups.map(g => (
        <Card key={g.id} onPress={() => router.push({ pathname: '/chat/[id]', params: { id: g.id, name: g.name, code: g.invite_code } })} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: t.accent, alignItems: 'center', justifyContent: 'center' }}><T size={20} weight="900" color={t.onAccent}>{g.name.slice(0, 1).toUpperCase()}</T></View>
          <View style={{ flex: 1 }}><T weight="800" size={17}>{g.name}</T><T size={13} color={t.muted}>Code {g.invite_code}</T></View>
          <T size={20}>💬</T>
        </Card>
      ))}
      <Card style={{ gap: 10 }}>
        <T weight="800">Start a group</T>
        <View style={{ flexDirection: 'row', gap: 8 }}><TextInput placeholder="Group name" placeholderTextColor={t.muted} value={name} onChangeText={setName} style={input} />
          <Button title="Create" onPress={async () => { if (!name.trim()) return; try { await createGroup(name.trim()); setName(''); load(); } catch (e) { Alert.alert('Error', (e as Error).message); } }} /></View>
        <T weight="800">Join with a code</T>
        <View style={{ flexDirection: 'row', gap: 8 }}><TextInput placeholder="Invite code" autoCapitalize="characters" placeholderTextColor={t.muted} value={code} onChangeText={setCode} style={input} />
          <Button title="Join" kind="ghost" onPress={async () => { if (!code.trim()) return; try { await joinGroup(code); setCode(''); load(); } catch (e) { Alert.alert('Could not join', (e as Error).message); } }} /></View>
      </Card>
    </Screen>
  );
}
