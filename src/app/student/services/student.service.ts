import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from '../models/student';
import { environment } from './../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  get() : Observable<Student[]>{
    return this.http.get<Student[]>(environment.iutApiBaseUrl+"/students");
  }
  delete(id: number): Observable<string>{
    return this.http.delete<string>(environment.iutApiBaseUrl+"/students/"+id);
  }
  update(student: Student): Observable<string>{
    return this.http.put<string>(environment.iutApiBaseUrl+"/students/"+student.id, student);
  }

  create(student: Student): Observable<string>{
    return this.http.post<string>(environment.iutApiBaseUrl+"/students", student);
  }
  getById(id: number): Observable<Student>{
    return this.http.get<Student>(environment.iutApiBaseUrl+"/students/"+id);
  }
}
