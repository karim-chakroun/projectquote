import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UnderlingService } from '../app/service/underling.service';

@Component({
  selector: 'app-update-tickers',
  templateUrl: './update-tickers.component.html',
  styleUrls: ['./update-tickers.component.css']
})
export class UpdateTickersComponent implements OnInit {

  constructor(public service:UnderlingService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<UpdateTickersComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,) { }

  tickersId:number=0;
  tickersbyid:any=null;
  isChecked = true;

  
  ngOnInit(): void {
    this.tickersId=this.data.tickersId;
    this.FindOne();
  }

  FindOne(){
    
    this.service.findOne(this.tickersId).subscribe(
    res =>{
      this.tickersbyid = res;
    },
    err =>{
      console.log(err);
    }
  
  
  );
  }

  public updateTicker(){
    this.service.update(this.tickersId).subscribe((data:any)=>{
      this.toastr.success('DONE')
      console.log(data)
      this.dialogRef.close();
    })
    this.service.formModel.reset();
    
  }

  Cancel(){
    this.dialogRef.close();
  }

  

}
