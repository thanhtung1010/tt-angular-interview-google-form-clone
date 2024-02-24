import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal, untracked } from '@angular/core';
import { IAnswer, ICheckboxGroup, IQuestion, IQuestionAndAnswer } from '@app/interfaces';
import { AddQuestionComponent, PageLayoutComponent } from '@app/shared-components';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { QNAService } from '@app/services/QNA.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'tt-form-builder',
  templateUrl: './form-builder.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    PageLayoutComponent,
    AddQuestionComponent,

    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzCheckboxModule,
    NzIconModule,
  ]
})
export class FormBuilderComponent implements OnInit {
  qnaService = inject(QNAService);
  qnaList: IQuestionAndAnswer[] = this.qnaService.qnaList();
  visibleAddNewQuestionModal$ = signal<boolean>(false);

  submitNewQuestion: number = 0;
  lengthOfQNAList: number = this.qnaList.length;
  disableReviewAnswer: boolean = true;

  constructor(
    private router: Router,
  ) {
    effect(() => {
      const qnaList = this.qnaService.qnaList();
      this.qnaList = qnaList.map((elm, index) => {
        let result = {...elm};

        if (this.qnaList[index]) {
          result = {...result, ...this.qnaList[index]}
        }
        return result;
      });
      this.lengthOfQNAList = this.qnaList.length;
      this.checkValidAllQuestion();
    });
  }

  ngOnInit() { }

  toogleAddNewQuestionModal(visible: boolean) {
    if (!visible) {
      this.submitNewQuestion = 0;
    }
    this.visibleAddNewQuestionModal$.set(visible);
  }

  addNewQuestion(newQuestion: IQuestion) {
    this.qnaService.addNewQuestion(newQuestion);
    this.toogleAddNewQuestionModal(false);
  }

  onSubmitQuestion() {
    this.submitNewQuestion = Date.now();
  }

  onSubmitAnswer() {
    this.qnaService.updateQNA(this.qnaList);
  }

  onChangeAnswerTheQuestion(evt: IAnswer, index: number) {
    this.qnaList[index].answer = evt.answer;
    this.qnaList[index].customAnswer = evt.customAnswer;
  }

  onChangeCheckBoxAnswer(evt: ICheckboxGroup[], index: number) {
    const checkedOtherOption = !!evt.find(elm => elm.value === 'Other' && elm.checked === true);
    this.qnaList[index].showCustomAnswer = checkedOtherOption;
    this.qnaList[index].valid = this.checkValidAnswer(this.qnaList[index]);
    this.checkValidAllQuestion();
  }

  onChangeCheckCustomAnswer(evt: string, index: number) {
    this.qnaList[index].valid = this.checkValidAnswer(this.qnaList[index]);
    this.checkValidAllQuestion();
  }

  onChangeAnswer(evt: string, index: number) {
    this.qnaList[index].valid = this.checkValidAnswer(this.qnaList[index]);
    this.checkValidAllQuestion();
  }

  checkValidAnswer(item: IQuestionAndAnswer): boolean {
    if (!item.required) return true;

    if(item.questionType === 'PARAGRAPH'){
      return !!item.answer;
    } else {
      if (item.showCustomAnswer) {
        return !!item.customAnswer;
      } else {
        return (item.answerOption?.filter(elm => elm.checked).length ?? 0) > 0
      }
    }
  }

  checkValidAllQuestion() {
    this.disableReviewAnswer = this.qnaList.some(elm => elm.required && !elm.valid);
  }

  goToReview() {
    this.onSubmitAnswer();
    this.router.navigate(['answers']);
  }

}
