import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from './services/crud.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-material-UI';

  displayedColumns: string[] = ['empName', 'empCategory', 'joinDate', 'gender', 'salary', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private crud: CrudService) { }

  ngOnInit(): void {
    this.getEmp();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getEmp()
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // getting the value from html filet input area
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUnderTewntyGrand() {
    this.crud.getEmp()
      .subscribe({
        next: (res) => {
          res = res.filter((el: any) => {
            return el.salary <= 20000;
          });

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        },
        error: (err) => {
          console.log(err, "getEmp");
          alert("Something went wrong");
        }
      })

  }

  sortBySalary() {
    this.crud.getEmp()
      .subscribe({
        next: (res) => {
          res = res.sort((a: any, b: any) => {
            return a.salary - b.salary;
            //  let fa = a.name.toLowerCase();
            //  let fb = b.name.toLowerCase(); 
            //   if (fa < fb) {return -1}
            //   if (fa > fb) {return 1}

          });
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err, "Sort Salary");
          alert("Something went wrong");
        }

      })
  }




  getEmp() {
    this.crud.getEmp()
      .subscribe({
        next: (res) => {

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // filtering out specific data
          console.log(res);
          // var newArr = res.filter((el:any)=>{
          //   return el.salary>=20000;
          // });
          // console.log("newArr", newArr);


        },
        error: (err) => {
          console.log(err, "getEmp");
          alert("Something went wrong");
        }
      })
  }

  empEdit(row: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getEmp()
      }
    });
  }

  empDelete(id: number) {
    this.crud.deleteEmp(id)
      .subscribe({
        next: (response) => {
          alert("deleted")
          console.log(response);
          this.getEmp();

        },
        error: (err) => {
          alert("Something Went Wrong");
          console.log(err);
        }

      })

  }


}

