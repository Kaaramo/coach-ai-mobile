import { useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import { ArrowUp, Plus, Square } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '@/constants/theme';

type Props = {
  disabled?: boolean;
  streaming?: boolean;
  onSend: (text: string) => void;
};

export function Composer({ disabled, streaming, onSend }: Props) {
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const isEmpty = value.trim().length === 0;
  const showCounter = value.length > 1800;
  const sendDisabled = isEmpty && !streaming;

  const submit = () => {
    if (sendDisabled) return;
    if (streaming) {
      onSend('__stop__');
      return;
    }
    onSend(value.trim());
    setValue('');
  };

  return (
    <View
      style={{
        backgroundColor: colors.bg,
        borderTopWidth: 1,
        borderTopColor: colors.bgBorder,
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 12 + insets.bottom,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        opacity: disabled ? 0.4 : 1,
      }}
      pointerEvents={disabled ? 'none' : 'auto'}
    >
      <Pressable
        disabled
        accessibilityLabel="Pièce jointe"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.bgSurface,
          borderWidth: 1,
          borderColor: colors.bgBorder,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.4,
        }}
      >
        <Plus size={20} color={colors.textSecondary} strokeWidth={1.75} />
      </Pressable>
      <View
        style={{
          flex: 1,
          minHeight: 48,
          backgroundColor: colors.bgSurface,
          borderWidth: focused ? 1.5 : 1,
          borderColor: focused ? colors.primary : colors.bgBorder,
          borderRadius: 24,
          paddingVertical: focused ? 11.5 : 12,
          paddingHorizontal: focused ? 15.5 : 16,
          justifyContent: 'center',
        }}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Pose ta question"
          placeholderTextColor={colors.textTertiary}
          multiline
          maxLength={2000}
          style={{
            fontSize: 15,
            fontFamily: fonts.sans,
            color: colors.text,
            lineHeight: 22,
            maxHeight: 96,
            padding: 0,
            margin: 0,
          }}
        />
        {showCounter && (
          <Text
            style={{
              position: 'absolute',
              bottom: 4,
              right: 12,
              fontFamily: fonts.mono,
              fontSize: 10,
              color: colors.textTertiary,
              fontVariant: ['tabular-nums'],
            }}
          >
            {value.length} / 2000
          </Text>
        )}
      </View>
      <Pressable
        onPress={submit}
        disabled={sendDisabled}
        accessibilityLabel={streaming ? 'Stop' : 'Envoyer'}
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: sendDisabled ? 0.4 : 1,
          transform: [{ scale: sendDisabled ? 0.95 : pressed ? 0.92 : 1 }],
        })}
      >
        {streaming ? (
          <Square size={16} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" />
        ) : (
          <ArrowUp size={20} color="#FFFFFF" strokeWidth={2.5} />
        )}
      </Pressable>
    </View>
  );
}
