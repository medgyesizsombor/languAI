import { Component, OnInit } from '@angular/core';
import { PostViewModel } from 'src/api/models';
import { PostService } from 'src/api/services';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage implements OnInit {
  models: Array<PostViewModel> = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPost();
  }

  private loadPost(){
  }
}
