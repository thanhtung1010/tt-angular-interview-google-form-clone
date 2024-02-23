import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[tt-required]',
  standalone: true,
})
export class IsRequiredDirective implements OnInit, OnChanges {
  @Input() frmCtrl: FormControl | AbstractControl | null = null;
  @Input() validators: ValidatorFn | null | undefined = null;

  constructor(private ele: ElementRef) {}

  ngOnInit(): void {
    this.checkTheRequired()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['frmCtrl'] || changes['validators']){
      this.checkTheRequired()
    }
  }

  checkTheRequired() {
    let _required = false;
    if (this.frmCtrl && this.frmCtrl.validator) {
      const _validator = this.frmCtrl.validator({} as AbstractControl);
      if (_validator && _validator['required']) {
        _required = true;
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
