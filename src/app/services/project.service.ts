import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = environment.projectUrl; 

  constructor(private http: HttpClient) {}

 

  addProject(project: FormData): Observable<any> {
    return this.http.post<any>(`${this.projectUrl}/add`, project);
  }
  

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.projectUrl + '/get');
  }
  
  getProjectById(id: number, roles?: string[]): Observable<any> {
    let params = new HttpParams();
    
    if (roles && roles.length > 0) {
      roles.forEach(role => {
        params = params.append('roles', role);
      });
    }
  
    return this.http.get<any>(`${this.projectUrl}/${id}`, { params });
  }
  
  
  updateProject(id: number, project: FormData): Observable<any> {
    return this.http.put<any>(`${this.projectUrl}/update/${id}`, project);
  }
  
  getAssignedProject(): Observable<any[]> {
    return this.http.get<any[]>(`${this.projectUrl}/assigned`);
  }
  
}
