import type {Config, Tool} from './@typings';

export const getConfig = async (html: string): Promise<Config | undefined> => {
  if (typeof html !== 'string') throw new TypeError('html isnt string');
  const regex = new RegExp(/ilovepdfconfig\s+=\s+(.*)/, 'i');
  try {
    return JSON.parse(
      regex.exec(html)?.at(1)?.replace(/;/g, '') as string,
    ) as Config;
  } catch {
    return undefined;
  }
};

export const getTools = (): Tool[] => [
  'merge',
  'split',
  'compress',
  'pdfjpg',
  'imagepdf',
  'unlock',
  'pagenumber',
  'watermark',
  'officepdf',
  'repair',
  'rotate',
  'protect',
  'pdfa',
  'htmlpdf',
];
