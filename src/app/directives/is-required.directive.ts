import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { isString } from 'lodash';

@Directive({
  selector: '[tt-required]',
  standalone: true,
})
export class IsRequiredDirective implements OnInit, OnChanges {
  @Input({
    required: true,
  }) frmCtrl!: FormControl | AbstractControl | undefined;
  @Input({
    required: true
  }) validationField: string | string[] = '';

  constructor(private ele: ElementRef) {}

  ngOnInit(): void {
    this.checkTheRequired()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['frmCtrl']){
      this.checkTheRequired()
    }
  }

  checkTheRequired() {
    let _required = false;
    if (this.frmCtrl && this.frmCtrl.validator) {
      const _validator = this.frmCtrl.validator({} as AbstractControl);
      if (_validator) {
        if (isString(this.validationField)) {
          _required = !!_validator[this.validationField];
        } else {
          _required = this.validationField.some(field => !!_validator[field]);
        }
      }
    }
    this.setRequired(_required)
  }

  setRequired(isRequired = true) {
    if (this.ele.nativeElement) {
      if (isRequired) {
        this.ele.nativeElement.classList.add('tt-required')
      } else {
        setTimeout(() => {
          this.ele.nativeElement.classList.remove('tt-required')
        }, 100)
      }
    }
  }
}
