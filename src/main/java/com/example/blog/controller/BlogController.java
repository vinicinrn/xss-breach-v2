package com.example.blog.controller;

import com.example.blog.model.BlogPost;
import com.example.blog.repository.BlogPostRepository;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class BlogController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @GetMapping
    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findAll();
    }

    @PostMapping
    public BlogPost createPost(@RequestBody BlogPost post) {
        // Sanitize input to prevent XSS
        post.setTitle(sanitizeContent(post.getTitle()));
        post.setContent(sanitizeContent(post.getContent()));
        post.setAuthor(sanitizeContent(post.getAuthor()));
        
        return blogPostRepository.save(post);
    }

    @GetMapping("/{id}")
    public BlogPost getPost(@PathVariable Long id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    private String sanitizeContent(String content) {
        if (content == null) {
            return null;
        }
        // Convert HTML to safe entities
        return StringEscapeUtils.escapeHtml4(content);
    }
} 