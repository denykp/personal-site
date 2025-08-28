export default function () {
  const getListStack = () => {
    return useFetch<StackData[]>(`/api/public/stacks`, {
      watch: false,
    });
  };

  const getListPortfolio = () => {
    return useFetch<PortfolioData[]>(`/api/public/portfolios`, {
      watch: false,
    });
  };

  return {
    getListStack,
    getListPortfolio,
  };
}
