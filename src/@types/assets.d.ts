export type IFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type AssetProps = (file: IFile, heroData?: { [key: string]: string }, key?: string) => void;
