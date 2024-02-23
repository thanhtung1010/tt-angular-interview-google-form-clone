import { QUESTION_TYPE } from "@app/enums/form-builder.enum";

export interface IFormBuilderItem {
  required: boolean;
  question: string;
  questionType: QUESTION_TYPE;
  answerOption?: IFormBuilderOptionItem[];
  allowUserCustomAnswer?: boolean;
  customAnswer?: string;
}

export interface IFormBuilderOptionItem {
  checked: boolean;
  label: string;
}
