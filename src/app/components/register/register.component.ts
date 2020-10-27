import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/firebase/register.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get email() {return this.registerForm.get('email')};
  get pass() {return this.registerForm.get('pass')};

  public memberships: any[] = ['basic', 'medium', 'advanced'];

  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl(''),
    memberships: new FormControl(this.memberships[0]),
    newsletter: new FormControl(false)
  })

  constructor(
    private registerService: RegisterService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
  }

  register() {
    console.log('try register', this.registerForm.value);
    this.registerService.registerByUserEmail(this.registerForm.value.email, this.registerForm.value.pass).then(resp => {
      const newRegisterBD: User = {
        email: resp.email,
        emailVerified: resp.emailVerified,
        name: this.registerForm.value.name,
        phoneNumber: resp.phoneNumber,
        uid: resp.uid
      }
      this.firestoreService.createUser(newRegisterBD).then(resp => {
        console.log('id new user -->', resp);
      })
      console.log('register ok? -->', resp);
    }).catch(error => {
      console.log(error);
    })
  }

}
