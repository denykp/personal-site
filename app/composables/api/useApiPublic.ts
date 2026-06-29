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
      const [portfolioDocs, stackDocs] = await Promise.all([
        queryContent('/portfolios').find(),
        queryContent('/stacks').find(),
      ]);

      // Create a map of stacks for O(1) lookup
      const stackMap = new Map(stackDocs.map(doc => {
        const d = doc as any;
        const id = doc._path?.split('/').pop() || d.name || '';
        return [id, {
          id,
          name: d.name || '',
          url: d.url || '',
          logo: d.logo || '',
          color: d.color || '',
          highlight: !!d.highlight,
        } as StackData];
      }));

      const mapped = portfolioDocs.map(doc => {
        const d = doc as any;
        
        // Resolve stacks by ID supporting both strings and old objects
        const resolvedStacks = Array.isArray(d.stacks) ? d.stacks.map((s: any) => {
          const stackId = typeof s === 'string' ? s : (s.id || '');
          const matchedStack = stackMap.get(stackId);
          if (matchedStack) {
            return matchedStack;
          }
          // If not found, return a minimal fallback object
          return {
            id: stackId,
            name: typeof s === 'string' ? stackId : (s.name || stackId),
            url: typeof s === 'string' ? '' : (s.url || ''),
            logo: typeof s === 'string' ? '' : (s.logo || ''),
            color: typeof s === 'string' ? '' : (s.color || ''),
            highlight: typeof s === 'string' ? false : !!s.highlight,
          } as StackData;
        }) : [];

        return {
          id: doc._path?.split('/').pop() || d.title || d.name || '',
          name: d.name || d.title || '',
          description: d.description || '',
          url: d.url || '',
          images: Array.isArray(d.images) ? d.images : [],
          stacks: resolvedStacks,
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

