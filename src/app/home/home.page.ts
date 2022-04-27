import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user = {
    email: 'demo@demo.com',
    password: '123456',
  };

  userList = [];

  constructor(private database: DatabaseService) {}

  ngOnInit() {
    this.database.getAll('users').then((firebaseResponse) => {
      firebaseResponse.subscribe((userListRef) => {
        this.userList = userListRef.map((userRef) => {
          let user = userRef.payload.doc.data();
          user['id'] = userRef.payload.doc.id;
          return user;
        });
      });
    });
  }

  createUser() {
    this.database
      .create('users', this.user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('error en alta: ', err);
      });
  }

  delete(id) {
    this.database
      .delete('users', id)
      .then((res) => {
        alert('Se eliminó con éxito');
      })
      .catch((err) => {
        console.log('error al eliminar ', err);
      });
  }

  update() {
    const id = '08op5fBEWSk2rcu5C9x0';
    this.database
      .update('users', id, this.user)
      .then((res) => {
        alert('Se modificó el usuario');
      })
      .catch((err) => {
        console.log('error al modificar: ', err);
      });
  }

  getById(id) {
    this.database
      .getById('users', id)
      .then((res) => {
        res.subscribe((docRef) => {
          let user = docRef.data();
          user['id'] = docRef.id;
        });
      })
      .catch((err) => {
        console.log('error al obtener elemento: ', err);
      });
  }
}
