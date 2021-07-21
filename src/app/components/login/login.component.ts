import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, public gs: GlobalService, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void { this.initializeForm(); }


  initializeForm() {

    this.loginForm = this.fb.group({
      username: ['nikit', [Validators.required]],
      password: ['nikit@123', Validators.required]
    })

  }


  async submit() {
    try {

      this.submitted = true;
      if (this.loginForm.valid) {
        let resp: any = await this.gs.post('users/signIn', this.loginForm.value);
        if (resp.statusCode == 200 && resp.statusMsg.toLowerCase() === "success") {
          this.toastr.success('logged in successfully!', 'Success!!');

          let obj = {
            "apiKey": resp.apiKey,
            "user": resp.user,
            "role": resp.role,
            "itemType": resp.itemType,
            "itemname": resp.itemname,
            "companyName": resp.companyName
          };

          localStorage.setItem('userDetails', JSON.stringify(obj));
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('please enter valid username or passowrd!', 'Error!');
        }
      }
    } catch (error) {
      console.log('[debug] > file: login.component.ts > line 55 > LoginComponent > submit > error', error)

    }
  }
}
