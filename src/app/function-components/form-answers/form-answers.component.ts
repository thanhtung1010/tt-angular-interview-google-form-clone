import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestionAndAnswer } from '@app/interfaces';
import { QNAService } from '@app/services/QNA.service';
import { PageLayoutComponent } from '@app/shared-components';
import { isArray } from 'lodash';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'tt-form-answers',
  templateUrl: './form-answers.component.html',
  standalone: true,
  imports: [
    PageLayoutComponent,
    CommonModule,
    NzButtonModule,
  ],
})
export class FormAnswersComponent implements OnInit {
  qnaService = inject(QNAService);
  rawQNAList = this.qnaService.qnaList();
  qnaList: IQuestionAndAnswer[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.cookingData();
  }

  cookingData() {
    this.qnaList = this.rawQNAList.map(elm => {
      return {
        ...elm,
        answerOption: (elm.answerOption || []).filter(elm => elm.checked),
      };
    });
  }

  backToBuilder() {
    this.router.navigate(['builder']);
  }

}
