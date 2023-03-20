import { DialogType } from '@enums';

export interface DialogData<T> {
  title?: string;
  comment?: string;
  dialogType: DialogType;
  data?: T;
}
