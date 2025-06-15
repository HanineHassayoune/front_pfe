import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../../services/comments.service';
import type { Comment } from '../../../services/comments.service'; // Importer l'interface
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() ticketId: number = 0;
 // comments: Comment[] = [];
 activeReplyBoxId: number | null = null;
replyText: string = '';

 currentUsername: string = 'Unknown';
  newComment = '';
  @Input() comments: Comment[] = []; 
  constructor(private commentsService: CommentsService,private userService: UserService) {}
  reactions: string[] = ['👍', '❤️', '😄', '😢', '🎉', '😡', '👏', '🤔', '🙌', '🔥','👀', '💯'];
  selectedReaction: string | null = null;
  ngOnInit(): void {
     this.loadComments();

  this.userService.getConnectedUser().subscribe({
    next: (user) => {
      this.currentUsername = user?.name || 'Unknown';
    },
    error: (err) => {
      console.error('Erreur lors de la récupération de l’utilisateur connecté', err);
    }
  });

  
  }

   loadComments() {
    this.commentsService.getComments(this.ticketId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => console.error('Failed to load comments', err)
    });
  }

 addComment() {
  if (this.newComment.trim()) {
    const comment: Omit<Comment, 'id'> = {
    content: this.newComment,
    author: this.currentUsername,
    ticketId: this.ticketId,
    date: new Date().toISOString(),
    reaction: this.selectedReaction || ''
};


    this.commentsService.addComment(this.ticketId, comment).subscribe({
      next: () => {
        this.newComment = '';  
        this.selectedReaction = null;
        this.loadComments(); 
      },
      error: (err) => console.error('Failed to post comment', err)
    });
  }
}
 selectReaction(reaction: string) {
    this.selectedReaction = reaction;  
  }

toggleReplyBox(commentId: number) {
  this.activeReplyBoxId = this.activeReplyBoxId === commentId ? null : commentId;
  this.replyText = '';
}



submitReply(parentCommentId: number) {
  if (this.replyText.trim()) {
    const reply: Omit<Comment, 'id'> = {
      content: this.replyText,
      author: this.currentUsername,
      ticketId: this.ticketId,
      date: new Date().toISOString(),
      reaction: '',
      parentCommentId: parentCommentId
    };

    this.commentsService.addComment(this.ticketId, reply).subscribe({
      next: () => {
        this.replyText = '';
        this.activeReplyBoxId = null;
        this.loadComments();
      },
      error: (err) => console.error('Failed to post reply', err)
    });
  }
}



getRepliesForComment(commentId: number): Comment[] {
  return this.comments.filter(c => c.parentCommentId === commentId);
}
 
groupCommentsByParent(comments: Comment[]): any[] {
  const map = new Map<number, any>();
  const roots: any[] = [];

  comments.forEach(comment => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  map.forEach(comment => {
    if (comment.parentCommentId) {
      const parent = map.get(comment.parentCommentId);
      if (parent) {
        parent.replies.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
}

}
