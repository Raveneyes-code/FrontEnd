import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:String ='';
  message:string='';
  hide = true;
  inscriptionForm!: FormGroup;
  constructor(private fb:FormBuilder, private auth:AuthService,private toast:NgToastService) { 
    this.inscriptionForm = this.fb.group({
      'nomprenom':['',Validators.required],
      'email':['',Validators.required],
      'motdepasse':['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  inscription(){
    if(this.inscriptionForm.invalid){
      this.toast.error({detail:'Error Message',summary:'Les champs ne sont pas conformes',position:"tr",duration:3000});
    }else{
      
      const data = this.inscriptionForm.value;
      delete data['confirm'];
      this.auth.inscription(data).subscribe((res: { success: any; message: string; })=>{
      if(res.success){
        this.inscriptionForm.reset();
        this.toast.success({detail:'Success Message',summary:'Vous êtes inscrits',position:"tr",duration:3000});
      }else{
        this.message=res.message;
      }
    }, (err: { message: string; })=>{
      this.message=err.message;
    });
    }
  }
}
