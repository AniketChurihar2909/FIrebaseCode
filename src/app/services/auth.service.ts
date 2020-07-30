import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import { auth } from 'firebase';
import { observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { AngularFireList , AngularFireDatabase} from '@angular/fire/database';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  contactDetails: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase,public notificationService :
    NotificationService,private afu: AngularFireAuth, private router: Router) {
    this.afu.authState.subscribe((auth =>{
      this.authState = auth;
    }))
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    company: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    city: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    address2: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    postalCode: new FormControl('',Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      company: '',
      firstName: '',
      lastName: '',
      city: '',
      address: '',
      address2: '',
      state: '',
      postalCode: ''
    });
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  async registerWithEmail(email: string, password: string) {
    const result =  this.afu.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
      // (await this.afu.currentUser).sendEmailVerification();
  }

  async signInWithGoogle(){
  return this.afu.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async signInWithFaceBook(){
   return this.afu.signInWithPopup(new auth.FacebookAuthProvider());
  }



  loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  singout(): void
  {
    this.afu.signOut();
    this.router.navigate(['/login']);
    this.notificationService.success(':: log out successfully');
  }

  insertContactDetails(contact) {
this.contactDetails =this.firebase.list('contacts');
    this.contactDetails.push({
      company: contact.company,
      firstName: contact.firstName,
      lastName: contact.lastName,
      city: contact.city,
      address: contact.address,
      address2: contact.address2,
      //hireDate: contact.hireDate == "" ? "" : this.datePipe.transform(contact.hireDate, 'yyyy-MM-dd'),
      state: contact.state,
      postalCode: contact.postalCode
    });
  }

  getContacts() {
    this.contactDetails = this.firebase.list('contacts');
    return this.contactDetails.snapshotChanges();
  }

  populateForm(contact) {
    debugger;
    this.form.setValue(_.omit(contact,'departmentName'));
  //this.form.setValue(contact);
  }

  updateContact(contact) {
    this.contactDetails.update(contact.$key,
      {
        company: contact.company,
        firstName: contact.firstName,
        lastName: contact.lastName,
        city: contact.city,
        address: contact.address,
        address2: contact.address2,
        //hireDate: contact.hireDate == "" ? "" : this.datePipe.transform(contact.hireDate, 'yyyy-MM-dd'),
        state: contact.state,
        postalCode: contact.postalCode
      });
  }

  deleteContact($key: string) {
    this.contactDetails.remove($key);
  }




}
