import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TopicService} from "../topics/TopicService";
import {Topic} from "../topics/Topic";

@Component({
  selector: 'app-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.css']
})
export class TopicCreateComponent implements OnInit {
  @ViewChild('f') userCreateForm: NgForm;

  // id: string;
  id: number;
  topic: Topic;
  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private topicService: TopicService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    if (this.id) { //edit form
        this.topicService.findById(this.id).subscribe(
            topic => {
                this.id = topic.id;
                this.userForm.patchValue({
                    id: topic.id,
                    name: topic.name,
                    description: topic.description
                });
            }, error => {
                console.log(error);
            }
        );
    }
}
    onSubmit() {
        if (this.userForm.valid) {
            if (this.id) {
                let topic: Topic = new Topic(
                    this.userForm.controls['id'].value,
                    this.userForm.controls['name'].value,
                    this.userForm.controls['description'].value);

                    this.topicService.updateTopic(topic).subscribe();
                    this.router.navigate(['/topics']);
            } else {
                let topic: Topic = new Topic(
                    this.userForm.controls['id'].value,
                    this.userForm.controls['name'].value,
                    this.userForm.controls['description'].value);

                    this.topicService.saveTopic(topic).subscribe();
                    this.router.navigate(['/topics']);
            }
            this.userForm.reset();
            this.router.navigate(['/topics']);
        }
    }

    redirectTopicPage() {
        this.router.navigate(['/topics']);
    }
}
