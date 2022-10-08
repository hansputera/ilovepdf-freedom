import type {Config, Tool} from './@typings';

export const getConfig = async (html: string): Promise<Config | undefined> => {
  if (typeof html !== 'string') throw new TypeError('html isnt string');
  const matchs = new RegExp(/ilovepdfconfig\s+=\s+(.*)/, 'gi').exec(html);

  if (!matchs || matchs.length < 2) return undefined;
  try {
    return JSON.parse(matchs[1].replace(/;/g, '') as string) as Config;
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

export const throwIfTypeIsNot = <T>(
  data: T,
  expectedType:
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function',
  message: string,
) => {
  if (typeof data !== expectedType.toLowerCase()) {
    throw new Error(message);
  } else return undefined;
};
