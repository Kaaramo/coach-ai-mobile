import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { CoachLogo } from '@/components/coach-logo';
import { GoogleG } from '@/components/google-g';
import { ScreenFrame } from '@/components/screen-frame';
import { Btn } from '@/components/btn';
import { Toast } from '@/components/toast';
import { colors, type } from '@/constants/theme';

export default function Login() {
  const [state, setState] = useState<'default' | 'loading' | 'error'>('default');

  const handleGoogle = () => {
    setState('loading');
    setTimeout(() => router.push('/permissions'), 1400);
  };

  return (
    <ScreenFrame>
      {state === 'error' && <Toast message="Connexion impossible. Réessaie." />}
      <View style={{ height: 8 }} />
      <Pressable
        onPress={() => router.back()}
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        }}
      >
        <ChevronLeft size={22} color={colors.text} strokeWidth={1.5} />
      </Pressable>
      <View style={{ height: 40 }} />
      <CoachLogo size={56} />
      <View style={{ height: 40 }} />
      <Text style={{ ...type.h1, color: colors.text }}>Connecte-toi</Text>
      <View style={{ height: 12 }} />
      <Text style={{ ...type.bodyLarge, fontSize: 16, color: colors.textSecondary }}>
        Un seul compte Google suffit. Tes données restent privées et chiffrées.
      </Text>
      <View style={{ height: 40 }} />
      <Btn
        variant="google"
        onPress={handleGoogle}
        loading={state === 'loading'}
        leading={state === 'loading' ? null : <GoogleG size={22} />}
      >
        {state === 'loading' ? 'Connexion…' : 'Continuer avec Google'}
      </Btn>
      <View style={{ flex: 1, minHeight: 16 }} />
      <Text
        style={{
          ...type.caption,
          fontSize: 11,
          color: colors.textTertiary,
          textAlign: 'center',
          textTransform: 'none',
          letterSpacing: 0,
        }}
      >
        {'En continuant, tu acceptes nos '}
        <Text style={{ color: colors.primary }}>{"Conditions d'utilisation"}</Text>
        {'\net notre '}
        <Text style={{ color: colors.primary }}>Politique de confidentialité</Text>
        .
      </Text>
    </ScreenFrame>
  );
}
