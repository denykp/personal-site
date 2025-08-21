export default function () {
  const getList = () => {
    return useFetch<PortfolioData[]>(`/api/v1/portfolios`, {
      watch: false,
    });
  };

  const submitData = async (id: string | undefined, payload: Portfolio) => {
    try {
      const formData = builderFormData(payload);

      const response = await $fetch(
        id ? `/api/v1/portfolios/${id}` : `/api/v1/portfolios`,
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
      const response = await $fetch(`/api/v1/portfolios/${id}`, {
        method: "delete",
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
