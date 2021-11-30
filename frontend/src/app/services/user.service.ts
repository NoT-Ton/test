import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  udata: any;

  constructor(private http: HttpClient) { }
  getUser(token: any,userid: any){
    console.log("Use Function GetUser!")
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/user/getuserdata/'+userid,{headers})
      .pipe(map(data => {
        if (data) {
          this.udata = data;
          console.log(this.udata);
        }
        return this.udata;
      }));
  }

  updateUser(userid: String,user:any){
    console.log("Use Function UpdateUser!")
    console.log(user);
    return this.http.put<any>('http://localhost:3000/user/user/update/'+userid,user)
    .pipe(map(data => {
      if (data) {
        
        console.log(this.udata);
      }
      return data;
    }));
  }

}
