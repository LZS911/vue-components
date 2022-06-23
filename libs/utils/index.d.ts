import { App } from 'vue';


export type SFCWithInstall<T> = T & { install(app: App): void };
export type RefElement = Nullable<HTMLElement>;
export interface ITableColumn {
  width: number | string;
  label: string;
  prop: string;
  hide?: boolean;
  slot?: string;
}
export type ComponentSize = 'large' | 'medium' | 'small' | 'mini';

export interface IStyle {
  width: string;
  height: string;
  top?: string;
  left?: string;
}
export interface ITable {
  [key: string]: string | number;
}

