import { ComponentSize, ITable, ITableColumn } from '@libs/utils';

export type EmitType = 'focus' | 'blur' | 'onChange' | 'update:modelValue' | 'visible-change' | 'update:modelValue';
export interface ILyDropTableProps {
  modelValue: any;
  valueKey: string;
  labelKey: string;
  inputWidth: number | string;
  tableWidth?: number | string;
  size: ComponentSize;
  tableList: ITable[];
  columnList: ITableColumn[];
  disabled?: boolean;
  transitionName?: string;
  arrowIcon?: string;
  clearIcon?: string;
  headerCellStyle?: Object;
  clearable?: boolean;
  filterable?: boolean;
  filterMethod?: (query: string | number) => any[];
  defaultFirstRow?: boolean;
  placeholder?: string;
  tableClass?: string;
  multiple?: boolean;
  appendToBody?: boolean;
}
