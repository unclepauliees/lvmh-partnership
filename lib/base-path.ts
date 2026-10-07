const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string;
export function withBasePath(path: string | undefined): string | undefined;
export function withBasePath(path: string | undefined): string | undefined {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path}`;
}
