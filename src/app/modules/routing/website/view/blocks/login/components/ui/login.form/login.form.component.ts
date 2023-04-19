import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login.form.component.html',
  styleUrls: ['./login.form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output()
  loggingIn = new EventEmitter();
  @Input() formError!: string | null;
  @Input() disabled!: boolean | null;
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onFormChange() {
    this.formError = '';
  }
  submit() {
    this.loggingIn.emit(this.form.value);
    console.log(this.form.value);
  }
}
