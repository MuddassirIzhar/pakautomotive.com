import { FeatureAndSpecification } from "next-auth";

export const formatPriceHelper = (price: number) => {
    if (price >= 10000000) {
        // For Crores: Remove trailing zeros after the decimal
        return `PKR ${(price / 10000000).toFixed(3).replace(/\.?0+$/, '')} Crore`;
    } else if (price >= 100000) {
        // For Lacs: Remove trailing zeros after the decimal
        return `PKR ${(price / 100000).toFixed(2).replace(/\.?0+$/, '')} Lacs`;
    } else {
        // For Thousands: Remove trailing zeros after the decimal
        return `PKR ${(price)}`;
    }
};
// export const groupedFeatureAndSpecificationHelper = (data: FeatureAndSpecification[]) => {
    
//     const dataForSorting = data;
//     const sortedSpecs = dataForSorting.sort((a, b) => {
//         if (a.category !== b.category) {
//             return a.category.localeCompare(b.category);
//         }
    
//         const fieldOrder = { text: 0, number: 1, boolean: 2 };
//         return fieldOrder[a.field] - fieldOrder[b.field];
//     });
    
//     const groupedByCategoryAndField = sortedSpecs.reduce((acc, item) => {
//         if (!acc[item.category]) {
//             acc[item.category] = { text: [], number: [], boolean: [] };
//         }
//         acc[item.category][item.field].push(item);
//         return acc;
//     }, {} as Record<string, { text: FeatureAndSpecification[]; number: FeatureAndSpecification[]; boolean: FeatureAndSpecification[] }>);

//     return groupedByCategoryAndField;
// };

export const groupedFeatureAndSpecificationHelper = (
    data: FeatureAndSpecification[]
  ) => {
    const fieldOrder = { text: 0, number: 1, boolean: 2 };
  
    const sortedSpecs = [...data].sort((a, b) => {
      if (a.type !== b.type) return a.type.localeCompare(b.type);
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return fieldOrder[a.field] - fieldOrder[b.field];
    });
  
    const grouped = sortedSpecs.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = {};
      }
      if (!acc[item.type][item.category]) {
        acc[item.type][item.category] = { text: [], number: [], boolean: [] };
      }
      acc[item.type][item.category][item.field].push(item);
      return acc;
    }, {} as Record<string, Record<string, { text: FeatureAndSpecification[]; number: FeatureAndSpecification[]; boolean: FeatureAndSpecification[] }>>);
  
    return grouped;
  };
  