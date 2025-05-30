import { Component, OnInit } from '@angular/core';
import { BlogService, BlogPost } from './services/blog.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Vulnerable Blog</h1>
      
      <!-- Create Post Form -->
      <div class="create-post">
        <h2>Create New Post</h2>
        <form (ngSubmit)="createPost()">
          <div>
            <input [(ngModel)]="newPost.title" name="title" placeholder="Title" required>
          </div>
          <div>
            <textarea [(ngModel)]="newPost.content" name="content" placeholder="Content" required></textarea>
          </div>
          <div>
            <input [(ngModel)]="newPost.author" name="author" placeholder="Author" required>
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>

      <!-- Posts List -->
      <div class="posts">
        <h2>Posts</h2>
        <div *ngFor="let post of posts" class="post">
          <!-- Usando div em vez de h3 para maior vulnerabilidade -->
          <div [innerHTML]="trustAsHtml(post.title)" class="post-title"></div>
          <div [innerHTML]="trustAsHtml(post.content)" class="post-content"></div>
          <p>By: {{post.author}}</p>
          <hr>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .create-post { margin-bottom: 30px; }
    input, textarea { width: 100%; margin-bottom: 10px; padding: 8px; }
    textarea { height: 100px; }
    button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
    .post { margin-bottom: 20px; }
    .post-title { font-size: 1.5em; font-weight: bold; margin-bottom: 10px; }
    .post-content { margin-bottom: 10px; }
  `]
})
export class AppComponent implements OnInit {
  posts: BlogPost[] = [];
  newPost: BlogPost = {
    title: '',
    content: '',
    author: ''
  };

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getPosts().subscribe(posts => {
      console.log('Posts carregados:', posts);
      this.posts = posts;
    });
  }

  createPost() {
    console.log('Criando post:', this.newPost);
    this.blogService.createPost(this.newPost).subscribe(post => {
      console.log('Post criado:', post);
      this.posts.unshift(post);
      this.newPost = {
        title: '',
        content: '',
        author: ''
      };
    });
  }

  trustAsHtml(content: string) {
    console.log('Renderizando conteúdo:', content);
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
} 