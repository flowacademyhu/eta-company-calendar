package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.dto.CommentDTO;
import hu.flowacademy.companycalendar.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
public class CommentResource {

    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> findAll() {
        return ResponseEntity.ok(commentService.findAll().stream().map(CommentDTO::new).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(new CommentDTO(commentService.findOne(id)));
    }

    @PostMapping
    public ResponseEntity<CommentDTO> saveComment(@RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok(new CommentDTO(commentService.saveComment(commentDTO)));
    }

    @PutMapping
    public ResponseEntity<CommentDTO> updateComment(@RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok(new CommentDTO(commentService.updateComment(commentDTO)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok().build();
    }

}
