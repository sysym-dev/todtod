import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRequest } from 'src/core/request/request';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const { request: getLoadMe } = useRequest('/me');

    const isLoggedIn = ref(false);
    const accessToken = ref(null);
    const refreshToken = ref(null);
    const me = ref(null);

    async function login(data) {
      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;
      me.value = data.me;

      isLoggedIn.value = true;
    }

    async function logout() {
      accessToken.value = null;
      me.value = null;

      isLoggedIn.value = false;
    }

    async function loadMe() {
      const [data, error] = await getLoadMe();

      if (error) {
        return [null, error];
      }

      me.value = { ...data };

      return [data, error];
    }

    function setAccessToken(token) {
      accessToken.value = token;
    }

    return {
      accessToken,
      refreshToken,
      me,
      isLoggedIn,
      login,
      logout,
      loadMe,
      setAccessToken,
    };
  },
  { persist: true },
);
