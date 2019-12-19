import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * @function getRequest if token is available then it sends request with header otherwise not
   * @description making headers
   */
  getRequest() {
    let httpRequest = {};
    httpRequest = {
      observe: "response",
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    };
    return httpRequest;
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  post(path: string, body: Object = {}): Observable<any> {
    const request = this.getRequest();
    return this.http
      .post(path, body, request)
      .pipe(catchError(this.formatErrors));
  }

  get(path: string): Observable<any> {
    const request = this.getRequest();
    return this.http.get(path, request).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    const request = this.getRequest();
    return this.http
      .put(path, body, request)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string, body: Object = {}): Observable<any> {
    const request = this.getRequest();
    return this.http.delete(path, request).pipe(catchError(this.formatErrors));
  }
}
