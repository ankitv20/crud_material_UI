import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private crud: CrudService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef:MatDialogRef<DialogComponent>  // to pass data from DialogComponent to other component 
  ) { }

  actionBtn: string = "Save";

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      empName: ['', Validators.required],
      empCategory: ['', Validators.required],
      joinDate: ['', Validators.required],
      gender: ['', Validators.required],
      salary: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = "Update"
      this.employeeForm.controls['empName'].setValue(this.editData.empName);
      this.employeeForm.controls['empCategory'].setValue(this.editData.empCategory);
      this.employeeForm.controls['joinDate'].setValue(this.editData.joinDate);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
    }

  }

  employeeForm!: FormGroup
  gender!: string;
  genderList: string[] = ['Male', 'Female']



  addEmployee() {
    if (!this.editData) {
      if (this.employeeForm.valid) {
        this.crud.postEmp(this.employeeForm.value)
          .subscribe({
            next: (response) => {
              alert("Added");
              console.log(response, "addMethod");

              this.employeeForm.reset();
              this.dialogRef.close('save')
            },
            error: (err) => {
              alert("Something went wrong");
              console.log(err);
            }
          })
      }
    }
    else {
      this.updateEmp();
    }
  }

  updateEmp() {
    this.crud.updateEmp(this.editData.id, this.employeeForm.value)
      .subscribe({
        next: (response) => {
          alert("Updated")
          console.log(response, "update");

          this.employeeForm.reset();
          this.dialogRef.close('update')
        },
        error: (err) => {
          alert("Something went wrong");
          console.log(err);
        }
      })
  }


}
