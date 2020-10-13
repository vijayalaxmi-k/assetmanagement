import { Injectable } from '@angular/core';
import { usergroup, product, branch, UserManagement, UserManagementMap } from './models/app-models';


import { Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {

  headers: new HttpHeaders({'Content-Type': 'application/json'})

};


const apiUrl='http://localhost:3000/api'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getusergroup(): Observable<usergroup[]>
  {
    return this.http.get<usergroup[]>(apiUrl+"/usergroup")
    .pipe(​
      tap(product => console.log('fetched usergroup')),
      ​catchError(this.handleError('getusergroup', []))
      ​);
  }

  getproduct(): Observable<product[]>
  {
    return this.http.get<product[]>(apiUrl+"/productmaster")
    .pipe(​
      tap(product => console.log('fetched product')),
      ​catchError(this.handleError('getproduct', []))
      ​);
  }

  getbranch(): Observable<branch[]>
  {
    return this.http.get<branch[]>(apiUrl+"/branch")
    .pipe(​
      tap(product => console.log('fetched product')),
      ​catchError(this.handleError('getproduct', []))
      ​);
  }

  usergroupCreate(usergroup: usergroup): Observable<usergroup> 
  {​
    return this.http.post<usergroup>(apiUrl+'/usergroup', usergroup, httpOptions).pipe(
      ​tap((usergroup: usergroup) => console.log(`added usergroup w/ id=${usergroup.group_name}`)),
      ​catchError(this.handleError<usergroup>('usergroup'))​
      );​
  }

  productCreate(product: product): Observable<product> 
  {​
    return this.http.post<product>(apiUrl+'/productmaster', product, httpOptions).pipe(
      ​tap((product: product) => console.log(`added product w/ id=${product.product_id}`)),
      ​catchError(this.handleError<product>('product'))​
      );​
  }

  branchCreate(branch: branch): Observable<branch> 
  {​
    return this.http.post<branch>(apiUrl+'/branch', branch, httpOptions).pipe(
      ​tap((branch: branch) => console.log(`added branch w/ id=${branch.branch_name}`)),
      ​catchError(this.handleError<branch>('branch'))​
      );​
  }

  //usermanagement
  
  usermanagementCreate(user: UserManagement): Observable<UserManagement> 
  {​
    return this.http.post<UserManagement>(apiUrl+'/user', user, httpOptions).pipe(
      ​tap((user: UserManagement) => console.log(`added user w/ id=${user.first_name}`)),
      ​catchError(this.handleError<UserManagement>('UserManagement'))​
      );​
  }
 //Usermanagement Maping api 
  usermanagementmapCreate(user: UserManagementMap): Observable<UserManagementMap> 
  {​
    return this.http.post<UserManagementMap>(apiUrl+'/usermap/add', user, httpOptions).pipe(
      ​tap((user: UserManagementMap) => console.log(`added user w/ id=${user.product_id}`)),
      ​catchError(this.handleError<UserManagementMap>('UserManagement'))​
      );​
  }
 

  private handleError<T> (operation = 'operation', result?: T) {​
    return (error: any): Observable<T> => {​
      // TODO: send the error to remote logging infrastructure​
      console.error(error); // log to console instead​
      // Let the app keep running by returning an empty result.​
      return of(result as T);​
    };​
  }​
}