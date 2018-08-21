import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TechService} from "../services/tech.service";
import {ServerService} from "../services/server.service";
import {Technology} from "./technology.model";

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {
  @ViewChild('signupForm') sgnForm: NgForm;
  // technlogies = ['Angular5', 'SpringBoot', 'MongoDB','Rest Services', 'CytoScape'];
  constructor(private router: Router, private techService: TechService, private serverService: ServerService) {}
  appName = this.serverService.getAppName();
  servers = [
    {
      name: 'Tomcat8.5',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Jboss7.2',
      capacity: 100,
      id: this.generateId()
    },
    {
      name: 'Glassfish3.1',
      capacity: 200,
      id: this.generateId()
    },
    {
      name: 'Websphere8.5',
      capacity: 300,
      id: this.generateId()
    }
  ];
    defaultTechnology = 'Angular5';
  // techList: any;
    technologies: Array<any>;
    submitted = false;
    user = {
    username: '',
    email: '',
    subscription: '',
    version: '',
    password: ''

  }
  onSubmit(signupForm: NgForm) {
    console.log(this.sgnForm.value);
    this.submitted = true;
    this.user.username = this.sgnForm.value.username;
    this.user.email = this.sgnForm.value.email;
    this.user.subscription = this.sgnForm.value.subscription;
    this.user.version = this.sgnForm.value.version;
    this.user.password = this.sgnForm.value.password;
    this.sgnForm.reset();
  }
  ngOnInit() {
    // this.techList = this.techService.getTechnologies();
      this.techService.getTechnologies()
          .subscribe(
              (technologies: Technology[]) => {
                  this.technologies = technologies;
                  console.log(this.technologies);
              }
          );
  }
  redirectUserPage() {
    this.router.navigate(['/home']);
  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  onSave() {
    this.serverService.storeServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onGet() {
    this.serverService.getServers()
      .subscribe(
        (servers: any[]) => this.servers = servers,
        (error) => console.log(error)
      );
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

}
