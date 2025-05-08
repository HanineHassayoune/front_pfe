import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input() comments: { author: string; message: string; date: Date }[] = [];

  newComment = '';

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        author: '👤 You',
        message: this.newComment,
        date: new Date()
      });
      this.newComment = '';
    }
  }

}
