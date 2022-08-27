import type { Config } from './@typings';

export const getConfig = async (html: string): Promise<Config | undefined> => {
  if (typeof html !== 'string') throw new TypeError("'html' isn't string");
  const regex = new RegExp(/ilovepdfconfig\s+=\s+(.*)/, 'i');
  try {
    return JSON.parse(
      regex.exec(html)?.at(1)?.replace(/;/g, '') as string,
    ) as Config;
  } catch {
    return undefined;
  }
};
