import { useCallback, useEffect, useRef, useState } from 'react';
import { ActionSheetIOS, Alert, FlatList, KeyboardAvoidingView, Pressable, Share, TextInput, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';
import { listMessages, sendMessage, subscribeMessages, reportMessage, blockUser, type Msg } from '@/lib/api';

export default function Chat() {
  const { id, name, code } = useLocalSearchParams<{ id: string; name: string; code: string }>(); const t = useTheme(); const ins = useSafeAreaInsets(); const { profile } = useAuth();
  const [msgs, setMsgs] = useState<Msg[]>([]); const [text, setText] = useState(''); const [blocked, setBlocked] = useState<string[]>([]); const list = useRef<FlatList<Msg>>(null);
  const load = useCallback(() => { listMessages(String(id)).then(setMsgs).catch(() => {}); }, [id]);
  useEffect(() => { load(); return subscribeMessages(String(id), load); }, [id, load]);
  const mine = (m: Msg) => m.user_id === profile?.id || m.user_id === 'me';
  const send = async () => { const v = text.trim(); if (!v) return; setText(''); try { await sendMessage(String(id), v); load(); } catch (e) { setText(v); Alert.alert('Not sent', (e as Error).message); } };
  const options = (m: Msg) => ActionSheetIOS.showActionSheetWithOptions(
    { options: ['Report message', `Block ${m.username}`, 'Cancel'], destructiveButtonIndex: [0, 1], cancelButtonIndex: 2, title: m.username, message: m.text },
    async i => {
      if (i === 0) ActionSheetIOS.showActionSheetWithOptions({ options: ['Harassment', 'Bullying', 'Inappropriate', 'I feel unsafe', 'Cheating', 'Spam', 'Cancel'], cancelButtonIndex: 6, title: 'Why are you reporting this?' },
        async r => { if (r === 6) return; await reportMessage(m, String(id), ['harassment', 'bullying', 'inappropriate', 'safety', 'cheating', 'spam'][r]).catch(() => {}); Alert.alert('Thanks for reporting', 'A moderator will review it. If you are in danger, tell a trusted adult or call 911.'); });
      if (i === 1) { await blockUser(m.user_id).catch(() => {}); setBlocked(b => [...b, m.user_id]); }
    });
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: t.bg }} behavior="padding" keyboardVerticalOffset={90}>
      <Stack.Screen options={{ title: String(name ?? 'Group'), headerRight: () => <Pressable onPress={() => Share.share({ message: `Join my Lumino study group "${name}" with code ${code}` })} hitSlop={10}><T color={t.accent} weight="700">Invite</T></Pressable> }} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, padding: 8 }}><T size={12} color={t.muted}>🔒 Only group members can see this · messages auto-delete</T></View>
      <FlatList ref={list} data={msgs.filter(m => !blocked.includes(m.user_id))} keyExtractor={m => m.id} contentContainerStyle={{ padding: 14, gap: 8 }} onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
        renderItem={({ item: m }) => (
          <Pressable onLongPress={() => !mine(m) && options(m)} style={{ alignSelf: mine(m) ? 'flex-end' : 'flex-start', maxWidth: '82%' }}>
            {!mine(m) && <T size={12} color={t.muted} style={{ marginLeft: 8, marginBottom: 2 }}>{m.username}</T>}
            <View style={{ backgroundColor: mine(m) ? t.accent : t.card, borderRadius: 20, borderBottomRightRadius: mine(m) ? 6 : 20, borderBottomLeftRadius: mine(m) ? 20 : 6, paddingHorizontal: 14, paddingVertical: 10, borderWidth: mine(m) ? 0 : 1, borderColor: t.line }}>
              <T color={mine(m) ? t.onAccent : t.text}>{m.text}</T>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={<T color={t.muted} style={{ textAlign: 'center', marginTop: 40 }}>Say hi 👋{'\n'}Long-press a message to report or block.</T>} />
      <View style={{ flexDirection: 'row', gap: 8, padding: 10, paddingBottom: ins.bottom + 8, borderTopWidth: 1, borderColor: t.line, backgroundColor: t.card }}>
        <TextInput placeholder="Message" placeholderTextColor={t.muted} value={text} onChangeText={setText} onSubmitEditing={send} returnKeyType="send" maxLength={2000}
          style={{ flex: 1, backgroundColor: t.bg, color: t.text, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16 }} />
        <Pressable onPress={send} accessibilityLabel="Send" style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.accent, alignItems: 'center', justifyContent: 'center' }}><T color={t.onAccent} weight="900" size={18}>↑</T></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
