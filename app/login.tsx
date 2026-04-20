import { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { Text } from '@/components/Themed';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTheme } from '@/components/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
  const { colorScheme } = useTheme();
  const loginAccent = '#4f46e5';
  const dark = colorScheme === 'dark';
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    authenticate();
  }, []);

  const pulse = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const authenticate = async () => {
    setStatus('loading');

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      // sem biometria cadastrada, entra direto
      router.replace('./(drawer)/feed/feed');
      return;
    }

    pulse();

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirme sua identidade',
      fallbackLabel: 'Usar senha',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: false,
    });

    if (result.success) {
      router.replace('/(drawer)/feed/feed');
    } else {
      setStatus('error');
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: dark ? '#1a1a1a' : '#f5f5f5' },
      ]}
    >
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={[styles.title, { color: dark ? '#e5e5e5' : '#1a1a1a' }]}>
          Bem-vindo de volta
        </Text>
        <Text style={[styles.subtitle, { color: dark ? '#999' : '#666' }]}>
          Autentique-se para continuar
        </Text>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[styles.biometricButton, { backgroundColor: loginAccent }]}
            onPress={authenticate}
            disabled={status === 'loading'}
          >
            <Text style={styles.biometricIcon}>
              {Platform.OS === 'ios' ? '󰏃' : '🔒'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {status === 'error' && (
          <Text style={styles.errorText}>
            Autenticação falhou. Tente novamente.
          </Text>
        )}

        <TouchableOpacity onPress={authenticate} style={styles.retryButton}>
          <Text style={[styles.retryText]}>
            {status === 'loading' ? 'Aguardando...' : 'Usar biometria'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 32,
  },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 32 },
  biometricButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  biometricIcon: { fontSize: 40 },
  errorText: { color: '#ef4444', fontSize: 14, textAlign: 'center' },
  retryButton: { marginTop: 8, padding: 12 },
  retryText: { fontSize: 16, fontWeight: '600', color: '#4f46e5' },
});
