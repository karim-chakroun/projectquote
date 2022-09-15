import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UnderlingService } from '../service/underling.service';
import { Underling } from '../model/UnderlingModel';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UpdateTickersComponent } from '../../update-tickers/update-tickers.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';






@Component({
  selector: 'app-underling',
  templateUrl: './underling.component.html',
  styleUrls: ['./underling.component.css']
})
export class UnderlingComponent implements OnInit {

  underlingList :any;
  underling = new Underling();
  file: File | undefined;
  type: any;
  p:any;
  isChecked = true;



  constructor(
    private underlingService:UnderlingService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
    ,public dialog: MatDialog    ) { }

  ngOnInit(): void {
    this.findAll()
  }

  formModel = this.formBuilder.group({
    name: [, [Validators.required]],
    isin: [,[Validators.required]],
    eodCode: [,[Validators.required]],
    bbgCode: [,[Validators.required]],
    type: [,[Validators.required]],
    quotable: [,[Validators.required]],



  })
  

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  upload() {
    if (this.file) {
      this.underlingService.upload(this.file).subscribe(resp => {
        this.toastr.success('Uploaded')
      })
    } else {
      alert("Please select a file first")
    }
  }

  public findAll() {
    this.underlingService.findAll().subscribe((data:any)=>{
      console.log("data : ",data)
      this.underlingList = data
      const s = "your_string";
      const withoutLastChunk = this.underlingList[0].bbgCode.slice(0, this.underlingList[0].bbgCode.lastIndexOf(" "));
            console.log("underlingList : ",withoutLastChunk)
    })
  }

  public addTicker(){

    this.underlingService.create(this.formModel.value).subscribe((data:any)=>{
      this.toastr.success('DONE')
      console.log(data)
      this.ngOnInit()
    })
    this.formModel.reset()
    
  }
  public remove(id:number,i:any){
    //this.underlingList.splice(0, 1);

    this.underlingList.splice(i,1);

    this.underlingService.delete(id).subscribe((data:any)=>{
     // this.underlingList.splice(this.underlingList.indexOf(data.id), 1);
      this.toastr.success('DONE')
      console.log(data)
    })
  }
  openUpdate(id:number){
    const dialogRef =  this.dialog.open(UpdateTickersComponent, {
      //width: '50%',
      //height: '50%',
      data: { tickersId: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.findAll();
    });
  }

  onChange(e:any) {
    this.type= e.target.value;
    console.log(this.type)
 }

}
