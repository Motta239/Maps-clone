import { createClient, User, Session, AuthApiError, AuthError } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MMKVStorage from './MMKVStorage'; // Import the MMKV storage adapter

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: MMKVStorage, // Use MMKV storage adapter
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  console.log(state);
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

interface AuthResponse {
  user?: User | null;
  session?: Session | null;
  error?: AuthError | null;
}

// Sign in function
export async function signInWithEmail(email: string, password: string): Promise<AuthResponse> {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { user, session, error };
}

export async function signInWithProvider(provider: 'google' | 'github' | 'facebook') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider, // use the provider parameter instead of hardcoding it
  });

  if (error) {
    return { error };
  }
  return { data }; // return data which could contain user information
}

// Sign up function
export async function signUpWithEmail(email: string, password: string): Promise<AuthResponse> {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  return { user, session, error };
}

// Logout function
export async function logout(): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export const sendPasswordResetEmail = async (email: string) => {
  console.warn(email);
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return { error };
};

export const signInWithOAuth = async (provider: 'google' | 'github' | 'apple') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });
  return { data, error };
};
// OTP Sign in function
export async function signInWithOTP(
  phone: string,
  otp: string
): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.verifyOtp({
    phone: phone,
    token: otp,
    type: 'sms', // or 'magiclink' if using email
  });
  return { user, session, error };
}

// Send OTP function
export async function sendOTP(phone: string): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });
  return { error };
}

export async function getUserInfo(userId: string): Promise<Partial<User> | null> {
  const { data, error } = await supabase
    .from('chats')
    .select('name,id,avatar')
    .eq('id', userId)
    .single();
  if (error) {
    console.error(`Error retrieving user info for user ${userId}:`, error);
    return null;
  }
  return data;
}

// export const useLiveChatUpdates = (userId: string) => {
//   const [Chats, setChats] = useState<ChatProps[]>([]);

//   useEffect(() => {
//     const channel = supabase
//       .channel(`public:chats:id=eq.${userId}`)
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, (payload) => {
//         if (payload.eventType === 'UPDATE') {
//           setChats(payload.new.messages);
//         }
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [userId]);

//   return Chats;
// };

// Function to update user metadata
export const updateUserMetadata = async (userId: string, updates: { [key: string]: string }) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ user_metadata: updates })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error updating user metadata:', error.message);
    return null;
  }
};
