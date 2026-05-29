import type { StackData, PortfolioData } from "~~/shared/types";

export default function () {
  const getListStack = () => {
    return useAsyncData('stacks', async () => {
      const docs = await queryContent('/stacks').find();
      const mapped = docs.map(doc => {
        const d = doc as any;
        return {
          id: doc._path?.split('/').pop() || d.name || '',
          name: d.name || '',
          url: d.url || '',
          logo: d.logo || '',
          color: d.color || '',
          highlight: !!d.highlight,
        } as StackData;
      });
      const highlighted = mapped
        .filter((s) => s.highlight)
        .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? -1 : 1));
      const nonHighlighted = mapped.filter((s) => !s.highlight);
      return [...highlighted, ...nonHighlighted];
    });
  };

  const getListPortfolio = () => {
    return useAsyncData('portfolios', async () => {
      const docs = await queryContent('/portfolios').find();
      const mapped = docs.map(doc => {
        const d = doc as any;
        return {
          id: doc._path?.split('/').pop() || d.title || d.name || '',
          name: d.name || d.title || '',
          description: d.description || '',
          url: d.url || '',
          images: Array.isArray(d.images) ? d.images : [],
          stacks: Array.isArray(d.stacks) ? d.stacks.map((s: any) => ({
            id: s.id || '',
            name: s.name || '',
            url: s.url || '',
            logo: s.logo || '',
            color: s.color || '',
            highlight: !!s.highlight,
          })) : [],
          project_type: d.project_type || '',
          role: d.role || '',
          highlight: !!d.highlight,
        } as PortfolioData;
      });
      return mapped.sort((a, b) => a.highlight === b.highlight ? 0 : a.highlight ? -1 : 1);
    });
  };

  return {
    getListStack,
    getListPortfolio,
  };
}

