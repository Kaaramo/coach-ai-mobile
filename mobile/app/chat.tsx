import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import {
  CONVERSATIONS,
  type ConvId,
  MESSAGES_BY_CONV,
  type Message,
} from '@/constants/chat-mock';
import type { TabId } from '@/constants/dashboard-mock';
import { dispatchTab } from '@/lib/tab-nav';
import { Toast } from '@/components/toast';
import { TabBar } from '@/components/dashboard/tab-bar';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatBanner } from '@/components/chat/banner';
import { ChatSkeleton } from '@/components/chat/skeleton';
import { Welcome } from '@/components/chat/welcome';
import { AssistantBubble, UserBubble } from '@/components/chat/bubble';
import { Composer } from '@/components/chat/composer';
import { ConversationDrawer } from '@/components/chat/drawer';

type State =
  | 'default'
  | 'new'
  | 'loading'
  | 'rag-error'
  | 'offline'
  | 'rate-limit';

const STATE_TEST: State = 'default';
const STREAMING_TEST = false;

export default function Chat() {
  const insets = useSafeAreaInsets();
  const [activeConvId, setActiveConvId] = useState<ConvId>('c_001');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [forceNew, setForceNew] = useState<boolean>(STATE_TEST === 'new');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2400);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const state: State = forceNew ? 'new' : STATE_TEST;
  const isNew = state === 'new';
  const isLoading = state === 'loading';
  const composerDisabled = state === 'rag-error' || state === 'offline' || state === 'rate-limit';

  const conv = CONVERSATIONS.find(c => c.id === activeConvId) ?? CONVERSATIONS[0];

  const messages: Message[] = useMemo(() => {
    if (isNew || isLoading) return [];
    const base = MESSAGES_BY_CONV[activeConvId] ?? [];
    if (!STREAMING_TEST) return base;
    return [
      ...base,
      {
        id: 'user-pending',
        role: 'user',
        text: "Et qu'est-ce que je peux améliorer demain ?",
        time: '',
      },
      {
        id: 'stream',
        role: 'assistant',
        text: "D'après ton historique, deux ajustements simples auraient le plus d'impact : commencer par 30 min de code avant ta première",
        time: '',
        streaming: true,
      },
    ];
  }, [activeConvId, isNew, isLoading]);

  useEffect(() => {
    const id = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 50);
    return () => clearTimeout(id);
  }, [activeConvId, isNew, isLoading]);

  const handleTabPress = (t: TabId) => dispatchTab(t, 'chat', showToast);
  const onNewConv = () => {
    setForceNew(true);
    setActiveConvId('c_new');
  };
  const onSelectConv = (id: ConvId) => {
    setActiveConvId(id);
    setForceNew(false);
    setDrawerOpen(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
      {state === 'rate-limit' && (
        <Toast
          kind="warn"
          message="Tu as atteint la limite de questions. Réessaie dans 5 minutes."
        />
      )}
      {toastMsg && <Toast kind="warn" message={toastMsg} />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ChatHeader
          title={isNew ? 'Nouvelle conversation' : conv.title}
          onMenu={() => setDrawerOpen(true)}
          onPlus={onNewConv}
        />
        {state === 'rag-error' && <ChatBanner variant="rag-error" />}
        {state === 'offline' && <ChatBanner variant="offline" />}
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
            gap: 4,
          }}
        >
          {isLoading && <ChatSkeleton />}
          {isNew && !isLoading && (
            <Welcome onPick={() => showToast('Bientôt disponible')} />
          )}
          {!isLoading &&
            !isNew &&
            messages.map((m, i) => {
              if (m.role === 'user') {
                return <UserBubble key={m.id} text={m.text} time={m.time} />;
              }
              const prev = messages[i - 1];
              const showLabel = !prev || prev.role !== 'assistant';
              return (
                <AssistantBubble
                  key={m.id}
                  text={m.text}
                  time={m.time}
                  streaming={m.streaming}
                  sources={m.sources}
                  showLabel={showLabel}
                  onSourcesPress={() => showToast('Bientôt disponible')}
                />
              );
            })}
        </ScrollView>
        <Composer
          disabled={composerDisabled}
          streaming={STREAMING_TEST}
          onSend={() => showToast('Bientôt disponible')}
        />
      </KeyboardAvoidingView>
      <TabBar active="chat" onTabPress={handleTabPress} />
      {drawerOpen && (
        <ConversationDrawer
          activeId={activeConvId}
          onClose={() => setDrawerOpen(false)}
          onSelect={onSelectConv}
          onNew={() => {
            onNewConv();
            setDrawerOpen(false);
          }}
        />
      )}
    </View>
  );
}
