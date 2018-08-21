import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TopicService} from "./TopicService";
import {Topic} from "./Topic";


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

    topics: Topic[];

    constructor(private router: Router,
                private topicService: TopicService) { }

    ngOnInit() {
        this.getAllTopics();
        this.router.navigate(['topics']);
    }

    getAllTopics() {
        this.topicService.findAll().subscribe(
            topics => {
                this.topics = topics;
            },
            err => {
                console.log(err);
            }
        );
    }

   /* redirectNewUserPage() {
        this.router.navigate(['/create']);
    }*/
    editTopic(topic: Topic) {
        if (topic) {
            this.router.navigate(['/topic/edit', topic.id]);
        }
    }


    deleteTopic(topic: Topic) {
        if (topic) {
            this.topicService.deleteTopicById(topic.id).subscribe(
                res => {
                    this.getAllTopics();
                    this.router.navigate(['/topics']);
                    console.log('done');
                }
            );
        }
    }

}
