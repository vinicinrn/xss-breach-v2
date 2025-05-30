import { Component } from '@angular/core';
import { BlogService, BlogPost } from './services/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Secure Blog</h1>
      
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
          <!-- Usando text interpolation segura -->
          <h3>{{post.title}}</h3>
          <!-- Usando SafeHtml para conteúdo que precisa de HTML -->
          <div [innerHTML]="getSafeHtml(post.content)"></div>
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
  `]
})
export class AppComponent {
  posts: BlogPost[] = [];
  newPost: BlogPost = {
    title: '',
    content: '',
    author: ''
  };

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  createPost() {
    this.blogService.createPost(this.newPost).subscribe(post => {
      this.posts.unshift(post);
      this.newPost = {
        title: '',
        content: '',
        author: ''
      };
    });
  }

  // Método para sanitizar HTML permitindo apenas tags seguras
  getSafeHtml(content: string): SafeHtml {
    // Você pode adicionar uma biblioteca como DOMPurify aqui para sanitização adicional
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
} 