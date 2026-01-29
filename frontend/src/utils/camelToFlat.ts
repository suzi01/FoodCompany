export const camelToFlat = (camel: string) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, '$1 $2');
  return camelCase;
};
