export interface Messages {
  [key: string]: any;
}

export interface ComponentMessages {
  [key: string]: string | ComponentMessages | string[];
}