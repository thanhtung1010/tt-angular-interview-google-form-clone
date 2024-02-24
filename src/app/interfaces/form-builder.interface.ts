import { FormArray, FormControl } from "@angular/forms";
import { QUESTION_TYPE } from "@app/enums/form-builder.enum";

export interface IQuestionAndAnswer extends IQuestion, IAnswer {
  valid: boolean;
  showCustomAnswer?: boolean;
}

export interface IQuestion {
  required: boolean;
  questionType: QUESTION_TYPE;
  question: string;
  answerOption?: ICheckboxGroup[];
  allowUserCustomAnswer?: boolean;
}

export interface IAnswer {
  answer: string | string[];
  customAnswer?: string;
}

export interface IFormControlQuestionItem {
  required: FormControl<boolean | null>;
  question: FormControl<string | null>;
  questionType: FormControl<QUESTION_TYPE | null>;
  allowUserCustomAnswer?: FormControl<boolean | null>;
  answerOption?: FormArray<FormControl<string | null>>;
}

export interface IFormControlAnswerItem {
  answer: FormControl<string | ICheckboxGroup[] | null>;
  customAnswer?: FormControl<string | null>;
}

export interface ICheckboxGroup {
  label: string;
  value: string;
  checked: boolean;
}
