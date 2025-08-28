export default function () {
  const getList = () => {
    return useFetch<StackData[]>(`/api/public/stacks`, {
      watch: false,
    });
  };

  return {
    getList,
  };
}
