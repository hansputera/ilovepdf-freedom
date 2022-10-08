export type Tool =
  | 'merge'
  | 'split'
  | 'compress'
  | 'pdfjpg'
  | 'imagepdf'
  | 'unlock'
  | 'pagenumber'
  | 'watermark'
  | 'officepdf'
  | 'repair'
  | 'rotate'
  | 'protect'
  | 'pdfa'
  | 'htmlpdf';

export interface IDownloadProcessed {
  download_filename: string;
  filesize: number;
  output_filesize: number;
  output_filenumber: number;
  output_extensions: string;
  timer: string;
  status: string;
}

// ref: https://developer.ilovepdf.com/docs/api-reference#errors
export interface IError {
  type: string;
  message?: string;
  param?: IParamError;
  code?: number;
}
export type IParamError = Record<string, string | string[]>;

export * from './config';
