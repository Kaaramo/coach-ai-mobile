import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { CoachLogo } from '@/components/coach-logo';
import { GoogleG } from '@/components/google-g';
import { ScreenFrame } from '@/components/screen-frame';
import { Btn } from '@/components/btn';
import { Toast } from '@/components/toast';
import { colors, fonts, type } from '@/constants/theme';
import { useAuth } from '@/lib/auth-context';

export default function Login() {
  const { user, signInWithGoogle, signingIn, authReady, lastError } = useAuth();

  useEffect(() => {
    if (user) router.replace('/permissions');
  }, [user]);

  return (
    <ScreenFrame>
      {lastError === 'failed' && <Toast message="Connexion impossible. Réessaie." />}
      <View style={{ height: 8 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
        <Pressable
          onPress={() => router.replace('/home')}
          accessibilityLabel="Aller directement au dashboard (dev)"
          hitSlop={8}
          style={({ pressed }) => ({
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 9999,
            borderWidth: 1,
            borderColor: colors.bgBorder,
            backgroundColor: pressed ? colors.bgSurface : 'transparent',
          })}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.sansSemiBold,
              color: colors.primary,
              letterSpacing: 0.6,
            }}
          >
            DEV → Dashboard
          </Text>
        </Pressable>
      </View>
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
        onPress={signInWithGoogle}
        disabled={!authReady || signingIn}
        loading={signingIn}
        leading={signingIn ? null : <GoogleG size={22} />}
      >
        {signingIn ? 'Connexion…' : 'Continuer avec Google'}
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
