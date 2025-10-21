import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoetryService {
  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) {}

  getPoems(searchType: 'author' | 'title', searchValue: string): Observable<any> {
    const url = `${this.baseUrl}/${searchType}/${searchValue}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // A safe variant used when doing parallel searches: on 404 return empty array, otherwise propagate error
  getPoemsSafe(searchType: 'author' | 'title', searchValue: string): Observable<any[]> {
    const url = `${this.baseUrl}/${searchType}/${searchValue}`;
    return this.http.get<any[]>(url).pipe(
      map(res => Array.isArray(res) ? res : []),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          // no poems found for this query -> return empty array to allow other parallel requests to continue
          return of([]);
        }
        // propagate other errors
        return throwError(() => err);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Network error:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}`, error.error);
    }
    return throwError(() => new Error('Failed to fetch poems. Please try again later.'));
  }
}
