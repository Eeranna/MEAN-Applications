import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";
import * as c3 from 'c3';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male' , 'female'];
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  }
  submitted = false;
  @ViewChild('f') signupForm: NgForm;
  constructor(private router: Router) {}
  ngOnInit() {
    const companydetails = c3.generate({
      bindto: '#companydetails',
      size: {
        height: 275
      },
      data: {
        // iris data from R
        columns: [
          ['data1', 30],
          ['data2', 120],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("CISCO", d, i); },
        onmouseout: function (d, i) { console.log("LTI", d, i); }
      }
    });

    setTimeout(function () {
      companydetails.load({
        columns: [
          ["LTI", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
          ["SAINT-GOBAIN", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
          ["CISCO", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
        ]
      });
    }, 1500);

    setTimeout(function () {
      companydetails.unload({
        ids: 'data1'
      });
      companydetails.unload({
        ids: 'data2'
      });
    }, 2500);
  }
  suggestUserName() {
    const suggestedName = 'Eeranna Kuruva';
    /*this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });*/
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }
  suggestMail() {
    const suggestedMail = 'eeranna.kuruva@gmail.com';
    this.signupForm.form.patchValue({
      userData: {
        email: suggestedMail
      }
    });
  }
  onSubmit(signupForm: NgForm) {
    console.log(this.signupForm.value);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    alert('Form Submitted Successfully!!!')
    this.signupForm.reset();
  }
  redirectUserPage() {
    this.router.navigate(['/user']);

  }
}
