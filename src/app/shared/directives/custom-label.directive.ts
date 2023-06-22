import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color = 'red';
  private _errors?: ValidationErrors | null | undefined;


  @Input() set
  color(value: string){
    this._color = value;
    this.setStyle();
  }

  @Input() set
  errors(value: ValidationErrors | null | undefined){
    this._errors = value;
    //console.log(value);
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle():void {
    if( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void{
    if( !this.htmlElement ) return;
    if( !this._errors ){
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }
    const errors = Object.keys(this._errors);
    const first:string = errors[0];
    let message: string = '';

    switch(first){
      case ('required'):
        message = 'El campo es requerido';
        break;
      case ('minlength'):
        const min = this._errors!['minlength']['requiredLength'];
        const current = this._errors!['minlength']['actualLength'];
        message =  `Mínimo ${current} / ${min} caracteres`;
        break;
      case ('email'):
        message = `Formato de Email incorrecto`;
        break;
    }
    this.htmlElement.nativeElement.innerText = message;
  }

}
