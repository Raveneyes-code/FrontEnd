import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private toast:NgToastService) { 
    this.loginForm = this.fb.group({
      'email':['',Validators.required],
      'motdepasse':['',Validators.required],
    })
  }
  hide = true;
  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.invalid){
      this.toast.error({detail:'Error Message',summary:'Remplir tous les champs',position:"tr",duration:3000});
    }else{
    const data = this.loginForm.value;
    this.auth.login(data).subscribe((res: { success: any; token: string; })=>{
      if(res.success){
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home']);
        this.toast.success({detail:'Success Message',summary:'Login successful',position:"tr",duration:3000});
      }else{
        alert('error')
      }
    },(err: any)=>{
    })
    }
  }
}
