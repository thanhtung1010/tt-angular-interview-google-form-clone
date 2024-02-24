import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isArray, isNumber } from 'lodash';
import { QUESTION_TYPE, questionTypes } from '@app/enums';
import { IQuestion, IFormControlQuestionItem } from '@app/interfaces';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'tt-add-question',
  templateUrl: './add-question.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzCheckboxModule,
    NzIconModule,
  ]
})
export class AddQuestionComponent implements OnInit, OnChanges {
  @Input() submit: number = 0;
  @Output() emitNewQuestion = new EventEmitter<IQuestion>();

  newQuestionForm!: FormGroup<IFormControlQuestionItem>;
  questionTypes = questionTypes;
  disable = {
    addNewOption: false,
    allowSpecify: false,
  }
  defaultQuestionType: QUESTION_TYPE = 'PARAGRAPH';
  isAddingCheckBox: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submit'] && changes['submit'].currentValue > 0) {
      this.submitForm();
    }
  }

  initForm() {
    this.newQuestionForm = this.fb.group({
      required: [false, []],
      question: ['', [Validators.required]],
      questionType: [this.defaultQuestionType, [Validators.required]]
    });
  }

  onChangeQuestionType(evt: QUESTION_TYPE) {
    this.isAddingCheckBox = evt === 'CHECKBOX';
    if (this.isAddingCheckBox) {
      this.addCheckBoxControl();
    } else {
      this.removeCheckBoxControl();
    }
    this.disable.addNewOption = false;
    this.disable.allowSpecify = false;
  }

  onChangeCustomAnswer() {
    this.checkDisableAddNewOption();
    this.checkDisableAllowSpecify();
  }

  addNewAnswerOption() {
    this.newQuestionForm.controls['answerOption']?.push(new FormControl('', [Validators.required]));
    this.checkDisableAddNewOption();
    this.checkDisableAllowSpecify();
  }

  removeAnswerOption(index: number) {
    this.newQuestionForm.controls['answerOption']?.removeAt(index);
    this.checkDisableAddNewOption();
    this.checkDisableAllowSpecify();
  }

  checkDisableAddNewOption() {
    const allowUserCustomAnswer = this.newQuestionForm.controls['allowUserCustomAnswer']?.value;
    this.disable.addNewOption = (this.newQuestionForm.controls['answerOption']?.length || 0) >= (allowUserCustomAnswer ? 4 : 5);
  }
  checkDisableAllowSpecify() {
    const answerOptionLength = this.newQuestionForm.controls['answerOption']?.value.length;
    this.disable.allowSpecify = isNumber(answerOptionLength) ? answerOptionLength > 4 : false;
  }

  addCheckBoxControl() {
    this.newQuestionForm.addControl('allowUserCustomAnswer', new FormControl(false, []));
    const formArray: FormArray<FormControl<string | null>> = this.fb.array([] as Array<FormControl<string | null>>);
    this.newQuestionForm.addControl('answerOption', formArray);
  }

  removeCheckBoxControl() {
    this.newQuestionForm.removeControl('allowUserCustomAnswer');
    this.newQuestionForm.removeControl('answerOption');
  }

  submitForm() {
    const controls= this.newQuestionForm?.controls;

    for (let control in controls) {
      if (control === 'answerOption') {
        controls['answerOption']?.controls.forEach((control: FormControl) => {
          control.markAsDirty();
          control.updateValueAndValidity();
        });
      } else {
        (controls as any)[control].markAsDirty();
        (controls as any)[control].updateValueAndValidity();
      }
    }

    if (this.newQuestionForm.valid) {
      const newQuestion = this.parseNewQuestionData();
      this.emitNewQuestion.emit(newQuestion);
    }
  }

  parseNewQuestionData(): IQuestion {
    const formValue = this.newQuestionForm.value;
    let answerOption = isArray(formValue.answerOption) ? formValue.answerOption.filter(val => !!val).map(val => {
      return {
        label: val || '',
        value: val || '',
        checked: false
      }
    }) : undefined;
    if (formValue.allowUserCustomAnswer === true) {
      answerOption = answerOption?.concat({
        label: 'Other',
        value: 'Other',
        checked: false
      })
    }
    const returnValue: IQuestion = {
      required: formValue.required ?? false,
      question: formValue.question ?? '',
      questionType: formValue.questionType ?? this.defaultQuestionType,
      allowUserCustomAnswer: formValue.allowUserCustomAnswer ?? undefined,
      answerOption: answerOption,
    };

    return returnValue;
  }

}
