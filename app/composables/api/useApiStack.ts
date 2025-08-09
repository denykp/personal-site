export default function () {
  const getList = () => {
    return useFetch<StackData[]>(`/api/stacks`, {
      watch: false,
    });
  };

  const submitData = async (id: string | undefined, payload: Stack) => {
    try {
      await $fetch(id ? `/api/stacks/${id}` : `/api/stacks`, {
        method: id ? "put" : "post",
        body: payload,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getList,
    submitData,
  };
}
