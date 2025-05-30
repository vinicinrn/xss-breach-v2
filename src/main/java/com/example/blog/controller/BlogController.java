package com.example.blog.controller;

import com.example.blog.model.BlogPost;
import com.example.blog.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200") // Permitindo CORS explicitamente
public class BlogController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @GetMapping
    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findAll();
    }

    @PostMapping
    public BlogPost createPost(@RequestBody BlogPost post) {
        // Intencionalmente vulnerável - sem sanitização
        System.out.println("Recebendo post: " + post.getTitle() + " - " + post.getContent());
        return blogPostRepository.save(post);
    }

    @GetMapping("/{id}")
    public BlogPost getPost(@PathVariable Long id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }
} 