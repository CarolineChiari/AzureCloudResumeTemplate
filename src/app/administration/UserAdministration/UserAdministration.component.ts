import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BackendAPIService } from 'src/app/services/backendAPI/backendAPI.service';
import { AdminAPIService } from 'src/app/services/adminAPI/adminAPI.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-UserAdministration',
  templateUrl: './UserAdministration.component.html',
  styleUrls: ['./UserAdministration.component.css']
})
export class UserAdministrationComponent implements OnInit {

  userDetailsForm: FormGroup;
  aboutMe: string = '';
  constructor(private backendAPI: BackendAPIService, private adminAPI: AdminAPIService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userDetailsForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      title: new FormControl(''),
      social: new FormArray([
        new FormGroup({
          name: new FormControl(''),
          value: new FormControl('')
        }),
      ]),
      aboutMe: new FormControl(''),
    })
    this.backendAPI.getUserObservable().subscribe(result => {
      console.log(result);
      this.userDetailsForm.patchValue({
        id: result.id,
        name: result.name,
        title: result.title,
        social: result.social,
        aboutMe: result.aboutMe
      })
      const socialAccounts = this.userDetailsForm.get('social') as FormArray
      while (socialAccounts.length){
        socialAccounts.removeAt(0)}

      result.social.forEach(social=>{
        socialAccounts.push(this.formBuilder.group(social));
      });
      this.aboutMe = result.aboutMe;
    });
    this.backendAPI.getUserInformation()

  }

  onSubmit(form: FormGroup){
    const value = this.userDetailsForm.getRawValue();
    // value.aboutMe = this.aboutMe;
    this.adminAPI.updateUserData(value);

  }
  getSocial(): FormArray{
    return this.userDetailsForm.get('social') as FormArray
  }
  setAboutMe(value: string){
    this.userDetailsForm.patchValue({aboutMe: value})

  }
  addSocialAccount(){
    this.getSocial().controls.push(new FormGroup({
      name: new FormControl(''),
      value: new FormControl('')
    }))
  }
  removeSocialAccount(index:number){
    this.getSocial().controls.splice(index,1);
  }
}
