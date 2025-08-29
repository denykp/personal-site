export default function () {
  const getListStack = () => {
    return useFetch<StackData[]>(`/api/public/stacks`);
  };

  const getListPortfolio = () => {
    return useFetch<PortfolioData[]>(`/api/public/portfolios`);
  };

  return {
    getListStack,
    getListPortfolio,
  };
}
