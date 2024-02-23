import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '@app/shared-components';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QUESTION_TYPE, questionTypes } from '@app/enums';
import { IsRequiredDirective } from '@app/directives';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-form-builder',
  templateUrl: './form-builder.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IsRequiredDirective,
    PageLayoutComponent,

    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzCheckboxModule,
    NzButtonModule,
  ]
})
export class FormBuilderComponent implements OnInit {
  newQuestionForm!: FormGroup<{
    required: FormControl<boolean | null>;
    question: FormControl<string | null>;
    questionType: FormControl<QUESTION_TYPE | null>;
    allowUserCustomAnswer?: FormControl<boolean | null>;
    answerOption?: FormArray<FormControl<string | null>>;
  }>;
  questionTypes = questionTypes;
  isAddingCheckBox: boolean = false;
  visibleAddNewQuestionModal: boolean = false;
  defaultQuestionType: QUESTION_TYPE = 'PARAGRAPH';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newQuestionForm?.valueChanges.subscribe(resp => {
      console.log(resp);
      if (resp['questionType'] && resp['questionType'] === 'CHECK_BOX') {
        this.addCheckBoxControl();
      } else {
        this.removeCheckBoxControl();
      }
    });
  }

  toogleAddNewQuestionModal(visible: boolean) {
    if (visible) {
      if (!this.newQuestionForm) {
        this.initForm();
      }
    } else {
      this.newQuestionForm.reset();
    }
    this.visibleAddNewQuestionModal = visible;
  }

  initForm() {
    this.newQuestionForm = this.fb.group({
      required: [false, []],
      question: ['', [Validators.required]],
      questionType: [this.defaultQuestionType, [Validators.required]]
    });
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
    console.log(this.newQuestionForm.value)
  }

}
