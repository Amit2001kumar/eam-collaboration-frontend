import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiBaseUrl}/projects`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAuthHeaders(): { [header: string]: string } {
    const token = this.authService.getToken();
    return {
      Authorization: `Bearer ${token}` 
    };
  }
  
  canAccessRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllProjects() {
    return this.http.get<any>(`${this.apiUrl}/filter`, {
      headers: this.getAuthHeaders()
    });
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createProject(project: any): Observable<any> {
    if (!this.canAccessRole('Admin')) {
      return throwError('Unauthorized Access');
    }
    return this.http.post<any>(`${this.apiUrl}/insert`, project, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        return throwError('Failed to create project: ' + (error.message || error));
      })
    );
  }

  updateProject(id: string, project: any): Observable<any> {
    if (!this.canAccessRole('Admin')) {
      return throwError('Unauthorized Access');
    }
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, project, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProject(id: string): Observable<any> {
    if (!this.canAccessRole('Admin')) {
      return throwError('Unauthorized Access');
    }
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getProjectSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`, {
      headers: this.getAuthHeaders()
    });
  }

  getUpcomingDeadlines(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/upcoming-deadlines`, {
      headers: this.getAuthHeaders()
    });
  }
}
