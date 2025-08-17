import { Component } from '@angular/core';
import { Login } from '../../../core/login';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.css'],
  imports: [
    FormsModule,
    ButtonModule
  ],
  standalone: true
})
export class LoginScreen {
  typed: string[] = [];
  digits: string = '';
  loading = false;

  constructor(private loginService: Login) { }

  buttonDisabled() {
    return this.typed.length != 11 || this.isLoading();
  }

  isLoading(){
    return this.loading;
  }

  sendCode() {
    this.loading = true;
    const phone = '55' + this.typed.join('');

    this.loginService.sendCode(phone)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (success) => {
          if (success) {
            console.log('Code sent!');
          } else {
            console.error('Failed to send code.');
          }
        }
      });
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const lastChar = input.value.replace(/\D/g, '').slice(-1);

    if (/\d/.test(lastChar)) {
      if (this.typed.length < 11) {
        this.typed.push(lastChar);
        this.render();
      }
    }

    input.value = this.digits;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.typed.pop();
      this.render();
      event.preventDefault();
    }
  }

  render() {
    const raw = this.typed.join('');

    let formatted = '+55 ';

    if (raw.length > 0) {
      formatted += '(' + raw.substring(0, 2);
    }
    if (raw.length >= 3) {
      formatted += ') ' + raw.substring(2, raw.length >= 7 ? 7 : raw.length);
    }
    if (raw.length >= 7) {
      formatted += '-' + raw.substring(7);
    }

    this.digits = formatted;
  }
}
