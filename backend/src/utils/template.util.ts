/**
 * Replace {{placeholder}} tokens in a template string with actual values.
 */
export function renderTemplate(
  template: string,
  variables: Record<string, string>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
}
