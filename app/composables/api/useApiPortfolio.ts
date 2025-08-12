export default function () {
  const getList = () => {
    return useFetch<PortfolioData[]>(`/api/portfolios`, {
      watch: false,
    });
  };

  const submitData = async (id: string | undefined, payload: Portfolio) => {
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await $fetch(
        id ? `/api/portfolios/${id}` : `/api/portfolios`,
        {
          method: id ? "put" : "post",
          body: formData,
          onResponseError: ({ response }) => {
            useToast().add({
              title: "Error",
              description: response._data.message,
              color: "error",
            });
          },
        }
      );

      if (response) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };
  const deleteData = async (id: string) => {
    try {
      const response = await $fetch(`/api/portfolios/${id}`, {
        // method: "delete",
        onResponseError: ({ response }) => {
          useToast().add({
            title: "Error",
            description: response._data.message,
            color: "error",
          });
        },
      });

      if (response) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  return {
    getList,
    submitData,
    deleteData,
  };
}
