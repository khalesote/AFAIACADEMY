declare module 'react-native-xml2js' {
  export interface Options {
    explicitArray?: boolean;
    ignoreAttrs?: boolean;
    mergeAttrs?: boolean;
    normalize?: boolean;
    normalizeTags?: boolean;
    explicitRoot?: boolean;
    emptyTag?: any;
    explicitCharkey?: boolean;
    trim?: boolean;
    normalizeText?: boolean;
    explicitIsValue?: boolean;
  }

  export function parseString(
    xml: string,
    callback: (err: Error | null, result: any) => void
  ): void;

  export function parseString(
    xml: string,
    options: Options,
    callback: (err: Error | null, result: any) => void
  ): void;

  export function parseStringPromise(xml: string, options?: Options): Promise<any>;

  export interface BuilderOptions {
    renderOpts?: {
      pretty?: boolean;
      indent?: string;
      newline?: string;
    };
    xmldec?: {
      version?: string;
      encoding?: string;
      standalone?: boolean;
    };
    doctype?: {
      ext?: string;
    };
  }

  export class Builder {
    constructor(options?: BuilderOptions);
    buildObject(obj: any): string;
  }
}
