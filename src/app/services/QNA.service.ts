import { Injectable, WritableSignal, signal } from "@angular/core";
import { IAnswer, IQuestion, IQuestionAndAnswer } from "@app/interfaces";

@Injectable({
  providedIn:'root'
})

export class QNAService {
  qnaList = signal<IQuestionAndAnswer[]>([]);
  constructor() {}

  addNewQuestion(newQuestion: IQuestion) {
    const _newItem: IQuestionAndAnswer = {
      ...newQuestion,
      answer: '',
      valid: !newQuestion.required,
    }
    this.qnaList.update(curr => {
      curr.push(_newItem);
      return [...curr];
    });
  }

  updateQNA(qnas: IQuestionAndAnswer[]) {
    this.qnaList.update(curr => {
      curr = curr.map((elm, index) => {
        return {
          ...elm,
          ...qnas[index],
        }
      });
      return [...curr];
    });
  }
}
