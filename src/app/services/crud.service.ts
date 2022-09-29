import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  postEmp(data:any)
  {
    return this.http.post<any>("http://localhost:3000/empList/",data)
  }

  getEmp()
  {
    return this.http.get<any>("http://localhost:3000/empList/")
  }

  deleteEmp(id:number)
  {
    return this.http.delete<any>("http://localhost:3000/empList/"+id)
  }

  updateEmp(id:number,data:any)
  {
    return this.http.put<any>("http://localhost:3000/empList/"+id, data) 
  }
}
