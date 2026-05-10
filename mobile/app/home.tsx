import { Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { ScreenFrame } from '@/components/screen-frame';
import { colors, type } from '@/constants/theme';

export default function Home() {
  return (
    <ScreenFrame style={{ paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 88,
          height: 88,
          borderRadius: 44,
          backgroundColor: 'rgba(65,255,49,0.18)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Check size={56} color={colors.accent} strokeWidth={2} />
      </View>
      <View style={{ height: 18 }} />
      <Text
        style={{
          ...type.h1,
          fontSize: 24,
          color: colors.text,
          textAlign: 'center',
          letterSpacing: -0.48,
        }}
      >
        Tu es prêt.
      </Text>
      <View style={{ height: 12 }} />
      <Text
        style={{
          ...type.bodyLarge,
          fontSize: 15,
          color: '#B7B7BD',
          textAlign: 'center',
          maxWidth: 280,
        }}
      >
        Ton coach observe en arrière-plan. Tu seras notifié quand quelque chose mérite ton attention.
      </Text>
      <View style={{ height: 24 }} />
      <Text style={{ ...type.caption, fontSize: 12, color: colors.textTertiary }}>
        Bloc 2 — App principale
      </Text>
    </ScreenFrame>
  );
}
