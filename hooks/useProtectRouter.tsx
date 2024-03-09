import { useEffect, useState } from 'react';

import { router, useRootNavigation, useSegments } from 'expo-router';
import { useEndPointStore } from '@/util/store/filterStore';
import { api } from '@/util/axios/axios';

export function useProtectedRouter(token: string | undefined) {
  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();
  const { endpoint } = useEndPointStore();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () => {
      setNavigationReady(true);
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady) return;
    const inAuthGroup = segments[0] == '(auth)';
    if (endpoint) {
      api.defaults.baseURL = endpoint;
    }
    if (!token && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (token && inAuthGroup) {
      router.replace('/(private)');
    }
  }, [isNavigationReady, token]);
}
