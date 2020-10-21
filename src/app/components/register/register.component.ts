import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../../services/firebase/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  })

  constructor(
    private registerService: RegisterService
  ) { }

  ngOnInit() {
  }

  register() {
    console.log('try register', this.registerForm.value);
    this.registerService.registerByUserEmail(this.registerForm.value.email, this.registerForm.value.pass).then(resp => {
      console.log('register ok? -->', resp);
    }).catch(error => {
      console.log(error);
    })
  }

}
