export default function () {
  const userData = useState<UserData>("user", () => ({
    username: "",
    name: "",
  }));

  const login = async (payload: LoginData) => {
    try {
      const response = await $fetch<UserData>(`/api/auth/login`, {
        method: "post",
        body: payload,
        onResponseError: ({ response }) => {
          useToast().add({
            title: "Error",
            description: response._data.message,
            color: "error",
          });
        },
      });

      if (response) {
        userData.value = response;
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await $fetch(`/api/auth/logout`, {
        onResponseError: ({ response }) => {
          useToast().add({
            title: "Error",
            description: response._data.message,
            color: "error",
          });
        },
      });
      if (response) {
        clearNuxtState("user");
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getMe = () => {
    return useFetch<UserData>(`/api/auth/session`, {
      onResponse: ({ response: { _data: data } }) => {
        if (data.username) {
          userData.value = data;
          return true;
        }
        return false;
      },
    });
  };

  return { userData, login, logout, getMe };
}
