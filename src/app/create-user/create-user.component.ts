import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  registerForm!:FormGroup

  // registerForm = new FormGroup({
  //   firstname: new FormControl(null, [Validators.required]),
  //   lastname: new FormControl(null, [Validators.required]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  //   repassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  //   address: new FormControl(null, [Validators.required]),
  // })

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repassword: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required]]
    }, {
      validators: this.matchingPasswords('password', 'repassword')
    })
  }

  matchingPasswords(Password: string, ConfirmPassword: string) {
    return (controls: AbstractControl) => {
      if (controls) {
        const Password = controls.get('password')!.value;
        const ConfirmPassword = controls.get('repassword')!.value;
        //console.log ("check what is passed to the validator", password, confirmPassword);
        if (Password !== ConfirmPassword) {
          //this is an error set for a specific control which you can use in a mat-error
          controls.get('repassword')?.setErrors({ not_the_same: true });
          //this is the returned error for the form normally used to disable a submit button
          return { mismatchedPassword: true }
        }
      }
      return null;
    }
  }



}
