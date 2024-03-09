import { ReactNode, createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useProtectedRouter } from '@/hooks/useProtectRouter';
import {
  useCredentialStore,
  useFilterStore,
  useTokenStore,
} from '@/util/store/filterStore'
import axios from 'axios';
import { encode } from 'js-base64';
import { api } from '@/util/axios/axios';

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { token, setToken, setDeleteToken } = useTokenStore();
  const { setUser } = useCredentialStore();
  const { setFilter } = useFilterStore();
  useProtectedRouter(token);

  function updateToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setToken(token);
  }

  useEffect(() => {
    updateToken(token!);
  }, [token]);

  async function signIn(user: string, password: string) {
    const login_encoded = encode(
      `${user.toLowerCase()}|${password.toLowerCase()}`
    );
    try {
      const request = await api.get('v3/session/', {
        headers: { iforthsistemas: `iforth ${login_encoded}` },
      });
      updateToken(request.data.TOKEN);
      setToken(request.data.TOKEN);

      const data = {
        userid: request.data.IDUSU,
        username: request.data.NOMEUSU,
      };

      setUser(data);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Alert.alert('', `Usuário ou senha inválidos!`);
      }
      return Alert.alert('', `Usuário ou senha inválidos!`);
    }
  }

  function signOut() {
    setDeleteToken();
    setFilter({ line: null, unit: null });
    setUser({ userid: null, username: null });
  }

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        signOut();
      }
      return error;
    }
  );

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
