import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = environment.projectUrl; 

  constructor(private http: HttpClient) {}

 

  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.projectUrl}/add`, project);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.projectUrl + '/get');
  }
  
  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.projectUrl}/${id}`);
  }
  
}
