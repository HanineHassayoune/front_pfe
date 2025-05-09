import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface Comment {
  id: number;
  content: string;
  author: string;
  date: string;
  reaction?: string;
  ticketId: number;
  parentCommentId?: number;
}


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentUrl = environment.commentUrl;

  constructor(private http: HttpClient) {}


  getComments(ticketId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentUrl}/ticket/${ticketId}`);
  }

/* addComment(ticketId: number, comment: Omit<Comment, 'id'>): Observable<Comment> {
  return this.http.post<Comment>(`${this.commentUrl}/ticket/${ticketId}`, comment);
} */
addComment(ticketId: number, comment: Omit<Comment, 'id'>): Observable<Comment> {
  const params = comment.parentCommentId !== undefined
    ? { parentCommentId: comment.parentCommentId }
    : undefined;

  return this.http.post<Comment>(`${this.commentUrl}/ticket/${ticketId}`, comment, { params });
}



}
