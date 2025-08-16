import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common'; // Important for Angular directives
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-login-screen',
  standalone: true, // Assuming a standalone component based on your imports
  imports: [FormsModule, InputTextModule, ButtonModule, CommonModule, InputMaskModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css',
})
export class LoginScreen {
  phoneNumber: string = '';

  onInput(event: any): void {

    let input = event.target.value;

    if (Number.isNaN(Number(input[input.length - 1]))) {
      this.phoneNumber = input.substring(0, input.length -2)
    }

    if(input.length >= 1 && input.substring(0, 5) != "+55 (") {
      input = "+55 (" + input;
    }

    if (input.length >= 8 && input.substring(7,9) != ") ") {
      input = input.substring(0,7) + ") " + input.substring(7)
    }

    if (input.length >= 14 && input[13] != "-") {
      input = input.substring(0,13) + "-" + input.substring(14)
    }

    this.phoneNumber = input;
  }
}
