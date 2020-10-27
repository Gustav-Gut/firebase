import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { LoginService } from '../../services/firebase/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private firestoreService: FirestoreService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.currentUSer().then( resp =>{
      console.log('user logged -->', resp.uid);
    })
    this.firestoreService.getUser('QgxgB9Pk5LS9GsjBTvDXcy7EMo82');
  }

  logout(){
    this.loginService.logout().then(resp => {
      console.log('logout ok -->', resp);
    }).catch(error => {
      console.error('error logout -->', error);
    })
  }

}
