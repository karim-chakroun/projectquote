import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators,FormBuilder } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { UnderlingService } from '../service/underling.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MailModel } from '../model/MailModel';
import { ToastrService } from 'ngx-toastr';
import { MailService } from '../service/mail.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  underlingCtrl = new FormControl();
  filteredunderlings: Observable<string[]>;
  underlings: string[] = [];
  underlingList: string[] = [];


  //underlingList:any;
  copie: any[] = [];
  prop1: string;

  autoCall: string = 'Phoenix';

  banks = ['marex','bbva','citi','sgcib','leonteq','bnp','gs'];
  selectedBank= this.banks[0];

  requestTypes = ['Coupon','Reoffer'];
  selectedRequestType = this.requestTypes[0];
  selectedType="price"




  tabs = ['Quote 1', 'Quote 2', 'Quote 3'];

  toppings = new FormControl();

  //selected = new FormControl(0);

  //send email
  submitted = false;
  loading = false;
  mailModel = new MailModel();
  result = "";

  isDisabled = false;

  //marex
  products = 
  ['Barrier Reverse Convertible','Autocall Reverse Convertible',
  'Autocall Pheonix','Autocall Classic'
  ];
  selectedProduct = this.products[0];
  structure="";
  val = "...";
  requestType="";
  periodicity = "Annum";

  frequencyList = ['Monthly','Quarterly','Semi Annually','Annually']
  selectedFrequency = this.frequencyList[1]

  formModel = this.formBuilder.group({
    currency: [, [Validators.required]],
    amount: [,[Validators.required]],
    bbg1: ['', []],
    bbg2: ['', [, Validators.maxLength(500)]],
    bbg3: ['', [, Validators.maxLength(500)]],
    bbg4: ['', [, Validators.maxLength(500)]],
    bbg5: ['', [, Validators.maxLength(255)]],
    reoffer: [, []],
    tenor:[, [Validators.required]],
    autocall:['', []],
    frequency:['', [Validators.required, Validators.maxLength(255)]],
    firstObservation:['', [, Validators.maxLength(255)]],
    autocallTriggerLevel:[, []],
    autocallStep:[, []],
    couponType:['', [, Validators.maxLength(255)]],
    memory:['', [, Validators.maxLength(255)]],
    couponTriggerLevel:['', [, Validators.maxLength(255)]],
    couponStep:[, []],
    coupon:[, []],
    strikeLevel:[, [Validators.required]],
    downsideLeverage:[, []],
    barrierType:[, []],
    barrierLevel:[, [Validators.required]],
    solveFor:['', [ Validators.maxLength(255)]],
    maturity:['', []],
    initialFixingDate: [],
    FinalFixingDate: [],
    issueDate: [],
    redemptionDate: [],
    product: [],
    requestType: [],
    topping:[],
    bankName:[]


  });


  ngOnInit(): void {

    this.findAll();
    //console.log(this.underlingList);
    //console.log(this.filteredunderlings);
    console.log(this.filteredunderlings[0]);
  }

  @ViewChild('underlingInput') underlingInput: ElementRef<HTMLInputElement>;

  constructor(private underlingService: UnderlingService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private mailService:MailService,) {

    this.filteredunderlings = this.underlingCtrl.valueChanges.pipe(
      startWith(null),
      map((underling: string | null) => (underling ? this._filter(underling) : this.underlingList.slice())),
    );
  }

  addTab() {
    this.tabs.push(`Quote ${this.tabs.length+1}`);

  }
 
 
  removeTab(index: number) {
    this.tabs.splice(index, 1);

  }
  currentIndex: number = 0;
  selectedTab(index: number) {
    console.log(index);
    this.currentIndex = index;

  }

  bloombergTickerList: any;

  bbg1;
  bbg2;
  bbg3;
  bbg4;
  bbg5;
  onChangeBloombergTicker(newObj: any) {

    this.bloombergTickerList= newObj;

    this.bbg1=this.bloombergTickerList[0].bbgCode
    this.bbg2=this.bloombergTickerList[1].bbgCode
    this.bbg3=this.bloombergTickerList[2].bbgCode
    this.bbg4=this.bloombergTickerList[3].bbgCode
    this.bbg5=this.bloombergTickerList[4].bbgCode
    console.log('this.bloombergTickerListonChange : ',this.bloombergTickerList[0].bbgCode)



    // ... do other stuff here ...
  }

  onChangeRequestTypes(newObj:any) {
    console.log(newObj[0]);
    this.selectedRequestType = newObj;
    this.selectedType = this.selectedRequestType
    console.log("this.selectedType : ",this.selectedType)
    this.requestType = this.selectedType
    // ... do other stuff here ...
  }

  


  onChangeFrequency(newObj:any) {
    this.selectedFrequency = newObj;
  }

  public findAll() {
    let copie: any[] = []
    this.underlingService.findAll().subscribe((data: any) => {
      data.forEach(function (item: any) {
        copie.push(item.bbgCode.slice(0, item.bbgCode.lastIndexOf(" ")));
      });
      this.underlingList = copie
      //console.log("test" + copie);
    })
  }

  addUnderling(value: any) {
    this.copie.push(value);
    //console.log(this.copie);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.underlingList.filter(underling => underling.toLowerCase().includes(filterValue));
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our underling
    if (value) {
      this.underlings.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.underlingCtrl.setValue(null);
  }

  remove(underling: string): void {
    const index = this.underlings.indexOf(underling);

    if (index >= 0) {
      this.underlings.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.underlings.includes(event.option.viewValue)) {

      this.underlingInput.nativeElement.value = '';
      this.underlingCtrl.setValue(null);
    }
    else {

      this.underlings.push(event.option.viewValue);
      this.underlingInput.nativeElement.value = '';
      this.underlingCtrl.setValue(null);
    }

    console.log(this.underlings);
  }

  reverseAutoCall() {
    this.autoCall = 'Reverse'
  }
  phoenixAutoCall() {
    this.autoCall = 'Phoenix'
  }
  classicAutoCall() {
    this.autoCall = 'Classic'
  }
  rcbAutoCall() {
    this.autoCall = 'RCB'
  }

  bank=null;
  show=false;
  onChangeBank(newObj:any) {
    let table:any[]=[{name:"marex",color:"red",result:10},{name:"test1",color:"red",result:10},{name:"test2",color:"red",result:10}]
    
    this.selectedBank =table.find((bank:any)=>{
      this.bank=newObj;
      return bank.name==newObj;
      
    })


    console.log("bank",newObj);
    console.log("table",this.selectedBank);

    this.selectedBank = newObj;
    //this.send = this.selectedBank

  }

  verify:any;

  setledate:any;
  copisetledate:any;

  weekendsDatesFilter = (d: Date): boolean => {
    let day:number=0
    if(d!=null)
    day = d.getDay();
    this.setledate=d;
    this.copisetledate=d;
    //const dd= d.getDate()+7;

    

    console.log(this.setledate);

    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6 ;

    
}

lastDate;
verifWeek1:boolean=false;
verifWeek2:boolean=false;
verifWeek3:boolean=false;
addOneWeeks(firstDate: Date) {

  
  
    this.lastDate=firstDate;

    
    

    if (this.verifWeek1==false) {
      this.lastDate= firstDate.setDate(firstDate.getDate()+7);
      this.verifWeek1=true;
    }

    
    console.log(this.lastDate);

    return this.lastDate;

   // this.newdate=d;
  /* Prevent Saturday and Sunday for select. */
 
}
addTwoWeeks(firstDate: Date) {

  
  this.lastDate=firstDate;

    
    

  if (this.verifWeek2==false) {
    
    this.lastDate= firstDate.setDate(firstDate.getDate()+16);
    this.verifWeek2=true;
  }

  
  console.log(this.lastDate);

  return this.lastDate;

   // this.newdate=d;
  /* Prevent Saturday and Sunday for select. */
 
}
addThreeWeeks(firstDate: Date) {

  
  this.lastDate=firstDate;

    
    

  if (this.verifWeek3==false) {
    
    this.lastDate= firstDate.setDate(firstDate.getDate()+21);
    this.verifWeek3=true;
  }

  
  console.log(this.lastDate);

  return this.lastDate;

   // this.newdate=d;
  /* Prevent Saturday and Sunday for select. */
 
}
  

public sendMail(){
  this.submitted = true;
  this.loading = true;
  this.mailModel = this.formModel.value
  console.log('bbg2'+this.bbg1)
  console.log('this.bloombergTickerList' + this.underlings)
  this.mailModel.bbg1 = this.underlings[0]
  this.mailModel.bbg2 = this.underlings[1]
  this.mailModel.bbg3 = this.underlings[2]
  this.mailModel.bbg4 = this.underlings[3]
  this.mailModel.bbg5 = this.underlings[4]
  this.mailModel.solveFor = this.mailModel.requestType


  this.mailModel.barrierType = "European"


  let latest_date =this.datepipe.transform(this.mailModel.initialFixingDate, 'dd/MM/yyyy');

  
    this.underlingService.verifHoliday(latest_date).subscribe((data:any)=>{

      console.log("date : ",this.mailModel.initialFixingDate)
      console.log("date : ",latest_date)
      this.verify = data

      console.log("verify : ",this.verify)
      

      if(this.selectedBank == "marex" && this.verify==null){
        this.result = "PENDING QUOTE ..."
        this.toastr.success('the email is sent successfully to MAREX');
        this.isDisabled = true;
        this.sendMarex()
        this.isDisabled = false;
  
      }
      if(this.selectedBank == "bbva" && this.verify==null){
        this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to BBVA');
      this.isDisabled = true;
      this.sendBBVA();
      this.isDisabled = false;
  
    }else if(this.selectedBank == "citi" && this.selectedProduct == "Barrier Reverse Convertible" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to CITI');
      this.isDisabled = true;
      this.sendCITI();
      this.isDisabled = false;
  
    }else if(this.selectedBank == "citi" && this.selectedProduct == "Autocall Reverse Convertible" && this.verify==null){
  
      this.toastr.success('the email is sent successfully to CITI');
      this.result = "PENDING QUOTE ..."
      this.isDisabled = true;
      this.sendCitiAutocallRcb();
      this.isDisabled = false;
  
    }else if(this.selectedBank == "citi" && this.selectedProduct == "Autocall Classic" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to CITI');
      this.isDisabled = true;
      this.sendCitiAutocallClassic();
      this.isDisabled = false;
  
    }else if(this.selectedBank == "citi" && this.selectedProduct == "Autocall Pheonix" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to CITI');
      this.isDisabled = true;
      this.sendCitiAutocallPhx();
      this.isDisabled = false;
  
    }else if(this.selectedBank == "sgcib" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to SGCIB');
      this.isDisabled = true;
      this.sendSGCIB();
      this.isDisabled = false;
  
    }else if(this.selectedBank == "leonteq" && this.selectedProduct == "Barrier Reverse Convertible" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to LEONTEQ');
      this.isDisabled = true;
      this.sendLEONTEQ();
      this.isDisabled = false;
    }else if(this.selectedBank == "leonteq" && this.selectedProduct != "Barrier Reverse Convertible" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to LEONTEQ');
      this.isDisabled = true;
      this.sendLEONTEQ_AUTOCALL();
      this.isDisabled = false;
    }else if(this.selectedBank == "bnp" && this.selectedProduct == "Barrier Reverse Convertible" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to BNP');
      this.isDisabled = true;
      this.sendBNP();
      this.isDisabled = false;
    }else if(this.selectedBank == "bnp" && this.selectedProduct != "Barrier Reverse Convertible" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to BNP');
      this.isDisabled = true;
      this.sendBNP_AUTOCALL();
      this.isDisabled = false;
    }else if(this.selectedBank == "gs" && this.selectedProduct == "Barrier Reverse Convertible" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to GS');
      this.isDisabled = true;
      this.sendGS();
      this.isDisabled = false;
    }else if(this.selectedBank == "gs" && this.selectedProduct != "Barrier Reverse Convertible" && this.verify==null){
      this.result = "PENDING QUOTE ..."
  
      this.toastr.success('the email is sent successfully to GS');
      this.isDisabled = true;
      this.sendGS_AUTOCALL();
      this.isDisabled = false;
    }        
      
      else if(this.verify!==null){

        this.toastr.error('this date is a holiday for the country: '+this.verify.country);

        
        for (let i in this.bloombergTickerList.country) {
          
          
        }
        this.bloombergTickerList.forEach(element => {

          if (this.verify.country == element.country) {

            console.log('holiday'+ this.bloombergTickerList[0].country)
        
            this.toastr.error('this date is a holiday for the country '+element.bbgCode);
          
          }
          
        });

        
        
       
  
      }

      else{
        this.toastr.warning('please choose a bank')
        this.loading = false;
      }
      
    });

  console.log("mailMpdel :",this.mailModel)
  

}

  public sendMarex(){ 

    let mult=1
      
    if(this.mailModel.frequency == "Quarterly"){
      mult = 0.25
    }
    if(this.mailModel.frequency == "Semi Annually"){
      mult = 0.5
    }
    if(this.mailModel.frequency == "Annually"){
      mult = 1
    }

    if(this.selectedProduct == "Barrier Reverse Convertible"){
      this.mailModel.couponType = "Guaranteed";
      this.mailModel.autocall = "No";
    }
    if(this.selectedProduct == "Autocall Reverse Convertible"){
      this.mailModel.couponType = "Guaranteed";
      this.mailModel.autocall = "Yes";
    }
    if(this.selectedProduct == "Autocall Pheonix"){
      this.mailModel.couponType = "Conditional";
      this.mailModel.autocall = "Yes";
    }
    if(this.structure == "Autocall Classic"){
      this.mailModel.couponType = "Conditional";
      this.mailModel.autocall = "Yes";
      this.mailModel.couponTriggerLevel = "100"
    }

    console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
    this.result = "PENDING QUOTE ..."

    this.mailService.sendMail(this.mailModel).subscribe((data)=>{
     // this.result = "PENDING QUOTE ..."
      this.toastr.success('DONE ...')
      console.log(data);
      this.val = data.coupon;
      console.log('this.requestType : ',this.requestType)
      if(this.requestType == "Coupon"){
        if(this.periodicity == "Annum"){
          this.result = data.couponPA + "%"
        }else{
          this.result = (data.couponPA) 


          console.log("PRICE : ",this.result)
          console.log("ROUND : ",            Math.round(Number(this.result)*mult))
          console.log("FIXED : ",             parseFloat((Number(this.result)*mult).toString()).toFixed(2)
          )
          //this.result = this.result.substring(0, this.result.length - 1);
          //this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
          //this.result = this.result.substring(0, this.result.length - 1);
          //this.result = this.result.replace(",", ".")
         // this.result =(Number(this.result)*mult).toString() + "%"
          this.result =  parseFloat((Number(this.result)*mult).toString()).toFixed(2) + "%"
        }
      }else{
        this.result = data.reofferUpfront + "%"
      }

      this.loading = false

    })

  }

  public sendBBVA(){
    let mult=1;

   
    if(this.mailModel.frequency == "Quarterly"){
      this.mailModel.frequency = "3m"
      mult = 4
    }
    if(this.mailModel.frequency == "Semi Annually"){
      this.mailModel.frequency = "6m"
      mult = 2
    }
    if(this.mailModel.frequency == "Annually"){
      this.mailModel.frequency = "12m"
      mult = 1
    }

    if(this.mailModel.barrierType == "European"){
      this.mailModel.barrierType = "At Expiry"
    }
    if(this.mailModel.couponType == "Guaranteed"){
      this.mailModel.couponType = "Fixed Coupon"
    }
    if(this.mailModel.couponType == "Conditional"){
      this.mailModel.couponType = "Flat"
    }

    if(this.selectedProduct == "Barrier Reverse Convertible"){
      this.mailModel.erCouponType = ""
     // this.mailModel.erAlternativeCoupon = null
      //this.mailModel.erNonCancelablePeriods = ""
      //this.mailModel.erTrigger = this.mailModel.autocallTriggerLevel
      //this.mailModel.erCoupon = this.mailModel.couponPA

      //this.mailModel.couponPA = ""
      //this.mailModel.frequency=""
      //this.mailModel.strikeLevel=""
      this.mailModel.couponType="Fixed Coupon"


    }
    if(this.selectedProduct == "Autocall Reverse Convertible"){
      console.log('er coupon')
      this.mailModel.product = "Autocall Phoenix"
      this.mailModel.erCouponType = "Flat"
      this.mailModel.erAlternativeCoupon = 0
      this.mailModel.erNonCancelablePeriods = "0"
      this.mailModel.erFrequency = this.mailModel.frequency
      this.mailModel.erTrigger = this.mailModel.autocallTriggerLevel
      this.mailModel.erCoupon = this.mailModel.coupon

      console.log('this.mailModel.erCoupon : ',this.mailModel.erCoupon)
      console.log('this.mailModel.coupon : ',this.mailModel.coupon)


      this.mailModel.coupon = ""
      this.mailModel.frequency=""
      //this.mailModel.strikeLevel=""
      this.mailModel.couponType="No Coupon"


    }
    if(this.selectedProduct ==  'Autocall Classic'){
      this.mailModel.product = "Autocall Phoenix"
      this.mailModel.erCouponType = "Snowball"
      this.mailModel.erAlternativeCoupon = 0
      this.mailModel.erNonCancelablePeriods = "0"
      this.mailModel.erFrequency = this.mailModel.frequency
      this.mailModel.erTrigger = this.mailModel.autocallTriggerLevel
      this.mailModel.erCoupon = this.mailModel.coupon

      this.mailModel.coupon = ""
      this.mailModel.frequency=""
      //this.mailModel.strikeLevel=""
      this.mailModel.couponType="No Coupon"


    }
    if(this.selectedProduct == "Autocall Pheonix"){

      this.mailModel.product = "Autocall Phoenix"
      this.mailModel.couponType = "Total Memory"
      this.mailModel.erFrequency = this.mailModel.frequency
      this.mailModel.erAlternativeCoupon = 0
      this.mailModel.erCoupon = "0.00%"
      this.mailModel.erNonCancelablePeriods = "0"
      this.mailModel.erCouponType = "Snowball"
      this.mailModel.erTrigger = this.mailModel.autocallTriggerLevel
      this.mailModel.strikePlayOff = this.mailModel.strikeLevel


    }

    if(this.selectedProduct == "Autocall Pheonix"){
      this.mailModel.product = "Autocall Phoenix"
    }
    if(this.selectedProduct == "Barrier Reverse Convertible"){
      this.mailModel.product = "Reverse Convertible"
    }
    if(this.requestType != "Coupon"){
      this.mailModel.reoffer = "?";
    }

    if(this.requestType == "Coupon" && this.selectedProduct == "Barrier Reverse Convertible" ){
      this.mailModel.coupon = "?";
    }
    if(this.requestType == "Coupon" && (this.selectedProduct == "Autocall Classic" || this.selectedProduct == "Autocall RCB") ){
      this.mailModel.erCoupon = "?";
    }
    if(this.requestType == "Coupon" && this.selectedProduct == "Autocall Pheonix"){
      this.mailModel.coupon = "?";

    }

   
     this.loading = true;
   
     this.mailModel = this.formModel.value

     
  
      console.log(this.mailModel)
      this.mailService.bbva(this.mailModel).subscribe((data:any)=>{
        this.result = "PENDING QUOTE ..."

        this.toastr.success('DONE ...')
        console.log("data : ",data);

        if(this.requestType == "Coupon"){
          if(this.periodicity == "Period"){
            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            this.result = this.result.substring(0, this.result.length - 1);
            this.result = this.result.replace(",", ".")
            this.result =  parseFloat((Number(this.result)).toString()).toFixed(2) + "%"
          }else{
            this.result = this.result.substring(0, this.result.length - 1);
            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            this.result = this.result.substring(0, this.result.length - 1);
            this.result = this.result.replace(",", ".")
            this.result =  parseFloat((Number(this.result)*mult).toString()).toFixed(2) + "%"

            //this.result =(Number(this.result)*mult).toString() + "%"
          }
  

        }else{
          //this.result = this.result.substring(0, this.result.length - 1);
          this.result = data.result
         // this.result = this.result.substring(0, this.result.length - 1);
         // this.result = this.result.replace(",", ".")
          //this.result =(Number(this.result)*mult).toString()
        }
        this.loading = false
      })
  
    }

    public sendCITI(){
      let mult=1;

      if(this.mailModel.frequency == "Quarterly"){
        this.mailModel.frequency = "3"
        mult=0.25
      }
      if(this.mailModel.frequency == "Semi Annually"){
        this.mailModel.frequency = "6"
        mult=0.5

      }
      if(this.mailModel.frequency == "Annually"){
        this.mailModel.frequency = "12"
      }

      
      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.product = "Phx"
      }
      if(this.selectedProduct == "Barrier Reverse Convertible"){
        this.mailModel.product = "RevCon"
      }
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        this.mailModel.product = "FCA"
      }
      if(this.selectedProduct == "Autocall Classic"){
        this.mailModel.product = "SNOWBALL"
      }

      if(this.requestType != "Coupon"){
        this.mailModel.reoffer = "solve";
      }
  
      if(this.requestType == "Coupon" ){
        this.mailModel.coupon = "solve";
      }
      this.mailService.citi(this.mailModel).subscribe((data)=>{
        if(data.coupon == ""){
          this.toastr.error('ERROR')
          this.loading = false
          this.result = "ERROR"
          return ;

        }
        this.toastr.success('DONE ...')
        if(this.requestType == "Coupon"){
          console.log("periodicity : ",this.periodicity)
          if(this.periodicity != "Period"){
            this.result = data.coupon + "%"

          }else{
            this.result = data.coupon + "%"
            console.log("1 => : ",this.result)
            this.result = this.result.substring(0, this.result.length - 1);
            console.log("2 => : ",this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log("3 => : ",this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log("4 => : ",this.result)

            this.result = this.result.replace(",", ".")
            console.log("5 => : ",this.result)
            console.log("6 => : ",(Number(this.result)*mult))

            this.result =(Number(this.result)*mult).toString() + "%"
          }
          

        }else{
          this.result = data.reoffert + "%"
        }
  
        this.loading = false
  
      })
    }

    public sendCitiAutocallRcb(){
      let mult=1;

      if(this.mailModel.frequency == "Quarterly"){
        this.mailModel.frequency = "3"
        mult=0.25
      }
      if(this.mailModel.frequency == "Semi Annually"){
        this.mailModel.frequency = "6"
        mult=0.5

      }
      if(this.mailModel.frequency == "Annually"){
        this.mailModel.frequency = "12"
      }

      
      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.product = "Phx"
      }
      if(this.selectedProduct == "Barrier Reverse Convertible"){
        this.mailModel.product = "RevCon"
      }
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        this.mailModel.product = "FCA"
      }
      if(this.selectedProduct == "Autocall Classic"){
        this.mailModel.product = "SNOWBALL"
      }

      if(this.requestType != "Coupon"){
        this.mailModel.reoffer = "solve";
      }
  
      if(this.requestType == "Coupon" ){
        this.mailModel.coupon = "solve";
      }
      this.mailService.citiAutocallRCB(this.mailModel).subscribe((data)=>{
        this.result = "PENDING QUOTE ..."
        console.log("DATA => ",data)
        if(data.coupon == ""){
          this.toastr.error('ERROR')
          this.loading = false
          this.result = "ERROR"
          return ;

        }

        this.toastr.success('DONE ...')
        if(this.requestType == "Coupon"){
          console.log("periodicity : ",this.periodicity)
          if(this.periodicity != "Period"){
            this.result = data.coupon + "%"

          }else{
            this.result = data.coupon != null ? data.coupon : "0"
            this.result = this.result + "%"
            console.log("1 => : ",this.result)
            this.result = this.result.substring(0, this.result.length - 1);
            console.log("2 => : ",this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log("3 => : ",this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log("4 => : ",this.result)

            this.result = this.result.replace(",", ".")
            console.log("5 => : ",this.result)
            console.log("6 => : ",(Number(this.result)*mult))

            this.result =(Number(this.result)*mult).toString() + "%"
          }
          

        }else{
          this.result = data.reoffert + "%"
        }
  
        this.loading = false
  
      })
    }
    public sendCitiAutocallClassic(){
      let mult=1;

      if(this.mailModel.frequency == "Quarterly"){
        this.mailModel.frequency = "3"
        mult=0.25
      }
      if(this.mailModel.frequency == "Semi Annually"){
        this.mailModel.frequency = "6"
        mult=0.5

      }
      if(this.mailModel.frequency == "Annually"){
        this.mailModel.frequency = "12"
      }

      
      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.product = "Phx"
      }
      if(this.selectedProduct == "Barrier Reverse Convertible"){
        this.mailModel.product = "RevCon"
      }
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        this.mailModel.product = "FCA"
      }
      if(this.selectedProduct == "Autocall Classic"){
        this.mailModel.product = "SNOWBALL"
      }

      if(this.requestType != "Coupon"){
        this.mailModel.reoffer = "solve";
      }
  
      if(this.requestType == "Coupon" ){
        this.mailModel.coupon = "solve";
      }
      this.mailService.citiAutocallClassic(this.mailModel).subscribe((data)=>{
        if(data.coupon == ""){
          this.toastr.error('ERROR')
          this.loading = false
          this.result = "ERROR"
          return ;

        }
        this.toastr.success('DONE ...')
        if(this.requestType == "Coupon"){
          console.log("periodicity : ",this.periodicity)
          if(this.periodicity != "Period"){
            this.result = data.coupon + "%"

          }else{
            this.result = data.coupon + "%"
            console.log("1 => : ",this.result)
            this.result = this.result.substring(0, this.result.length - 1);
            console.log("2 => : ",this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log("3 => : ",this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log("4 => : ",this.result)

            this.result = this.result.replace(",", ".")
            console.log("5 => : ",this.result)
            console.log("6 => : ",(Number(this.result)*mult))

            this.result =(Number(this.result)*mult).toString() + "%"
          }
          

        }else{
          this.result = data.reoffert + "%"
        }
  
        this.loading = false
  
      })
    }
    public sendCitiAutocallPhx(){
      let mult=1;

      if(this.mailModel.frequency == "Quarterly"){
        this.mailModel.frequency = "3"
        mult=0.25
      }
      if(this.mailModel.frequency == "Semi Annually"){
        this.mailModel.frequency = "6"
        mult=0.5

      }
      if(this.mailModel.frequency == "Annually"){
        this.mailModel.frequency = "12"
      }

      
      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.product = "Phx"
      }
      if(this.selectedProduct == "Barrier Reverse Convertible"){
        this.mailModel.product = "RevCon"
      }
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        this.mailModel.product = "FCA"
      }
      if(this.selectedProduct == "Autocall Classic"){
        this.mailModel.product = "SNOWBALL"
      }

      if(this.requestType != "Coupon"){
        this.mailModel.reoffer = "solve";
      }
  
      if(this.requestType == "Coupon" ){
        this.mailModel.coupon = "solve";
      }
      this.mailService.citiAutocallPhx(this.mailModel).subscribe((data)=>{
        this.result = "PENDING QUOTE ..."

        this.toastr.success('DONE ...')
        if(this.requestType == "Coupon"){
          console.log("periodicity : ",this.periodicity)
          if(this.periodicity != "Period"){
            this.result = data.coupon + "%"

          }else{
            this.result = data.coupon + "%"
            console.log("1 => : ",this.result)
            this.result = this.result.substring(0, this.result.length - 1);
            console.log("2 => : ",this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log("3 => : ",this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log("4 => : ",this.result)

            this.result = this.result.replace(",", ".")
            console.log("5 => : ",this.result)
            console.log("6 => : ",(Number(this.result)*mult))

            this.result =(Number(this.result)*mult).toString() + "%"
          }
          

        }else{
          this.result = data.reoffert + "%"
        }
  
        this.loading = false
  
      })
    }

    public sendSGCIB(){ 
      let mult = 1
      if(this.selectedProduct == "Barrier Reverse Convertible"){
        this.mailModel.product = "Autocall BRC";
        this.mailModel.memory = "Yes";
        this.mailModel.autocallTriggerLevel = 10000

      }
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        //this.mailModel.memory = "Yes";
        this.mailModel.product = "Autocall BRC";
        this.mailModel.autocallTriggerLevel = 10000

      }

      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.product = "Phoenix Autocall"
        this.mailModel.memory = "No";
        //this.mailModel.autocallTriggerLevel = 10000
      }
      if(this.structure == "Autocall Classic"){
        this.mailModel.product = "Phoenix Autocall"
        this.mailModel.memory = "No";
        //this.mailModel.couponTriggerLevel = "100"
      }

      console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
      this.result = "PENDING QUOTE ..."

      if(this.mailModel.frequency == "Quarterly"){
        mult = 0.25
      }
      if(this.mailModel.frequency == "Semi Annually"){
        this.mailModel.frequency = "Semi-annually"

        mult = 0.5
      }
      if(this.mailModel.frequency == "Annually"){
        mult = 1
      }
      this.mailService.sgcib(this.mailModel).subscribe((data)=>{
        if(data.coupon == ""){
          this.toastr.error('ERROR')
          this.loading = false
          this.result = "ERROR"
          return ;
        }
        this.toastr.success('DONE ...')

        if(this.requestType == "Coupon"){
          console.log("periodicity : ",this.periodicity)
          if(this.periodicity != "Period"){
            this.result = data.coupon

          }else{
            this.result = data.coupon + "%"
            console.log("1 => : ",this.result)
            this.result = this.result.substring(0, this.result.length - 1);
            console.log("2 => : ",this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log("3 => : ",this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log("4 => : ",this.result)

            this.result = this.result.replace(",", ".")
            console.log("5 => : ",this.result)
            console.log("6 => : ",(Number(this.result)*mult))
            this.result = parseFloat((Number(this.result)*mult).toString()).toFixed(2) + "%"


           // this.result =(Number(this.result)*mult).toString() + "%"

          }
          

        }else{
          this.result = data.reoffert
        }
  
        this.loading = false
  
      })

    }

    public sendLEONTEQ(){ 
      let mult = 1
    
      if(this.mailModel.frequency == "Quarterly"){
        this.mailModel.frequency = "3"
        mult = 0.25
      }
      if(this.mailModel.frequency == "Semi Annually"){
        this.mailModel.frequency = "6"
        mult = 0.5

      }
      if(this.mailModel.frequency == "Annually"){
        this.mailModel.frequency = "12"
        mult = 1

      }

      console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
      this.result = "PENDING QUOTE ..."

      this.mailService.leonteq(this.mailModel).subscribe((data)=>{
       // this.result = "PENDING QUOTE ..."
        this.toastr.success('DONE ...')
        console.log(data);
        this.val = data.coupon;
        console.log('this.requestType : ',this.requestType)
        if(this.requestType == "Coupon"){
          if(this.periodicity == "Period"){
            this.result = data.coupon 
            //this.result =(Number(this.result)*mult).toString() + "%"
            this.result =  parseFloat((Number(this.result)*mult).toString()).toFixed(2) + "%"


          }else{
            this.result = data.coupon + "%"
          }
        }else{
          this.result = data.reoffert + "%"
        }
  
        this.loading = false
  
      })

    }

    public sendLEONTEQ_AUTOCALL(){ 
      let mult=1
     
   
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        this.mailModel.couponType = "Guaranteed"
      }
      if(this.selectedProduct == "Autocall Classic"){
        this.mailModel.couponType = "Memory"
      }
      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.couponType = "Memory"
      }

      if(this.mailModel.frequency == "Quarterly"){
        this.mailModel.frequency = "3"
        mult = 0.25
      }
      if(this.mailModel.frequency == "Semi Annually"){
        this.mailModel.frequency = "6"
        mult = 0.5

      }
      if(this.mailModel.frequency == "Annually"){
        this.mailModel.frequency = "12"
        mult = 1

      }

      console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
      this.result = "PENDING QUOTE ..."
      this.mailModel.product = "Autocall BRC";

      this.mailService.leonteqAutocall(this.mailModel).subscribe((data)=>{
       // this.result = "PENDING QUOTE ..."
        this.toastr.success('DONE ...')
        console.log(data);
        this.val = data.coupon;
        console.log('this.requestType : ',this.requestType)
        if(this.requestType == "Coupon"){
          if(this.periodicity == "Period"){
            this.result = data.coupon 
           // this.result =(Number(this.result)*mult).toString() + "%"
           this.result =  parseFloat((Number(this.result)*mult).toString()).toFixed(2) + "%"

          }else{
            this.result = data.coupon + "%"
          }
        }else{
          this.result = data.reoffert + "%"
        }  
        this.loading = false
      })

    }

    public sendBNP(){ 
      let mult=1
        
    if(this.mailModel.frequency == "Quarterly"){
      mult = 4
    }
    if(this.mailModel.frequency == "Semi Annually"){
      mult = 2
    }
    if(this.mailModel.frequency == "Annually"){
      mult = 1
    }
    
      console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
      this.result = "PENDING QUOTE ..."

      this.mailService.bnp(this.mailModel).subscribe((data)=>{
       // this.result = "PENDING QUOTE ..."
        this.toastr.success('DONE ...')
        console.log(data);
        this.val = data.coupon;
        console.log('this.requestType : ',this.requestType)
        console.log('this.requestType : ',this.requestType)

        if(this.requestType == "Coupon"){
          console.log("periodicity : ",this.periodicity)
          if(this.periodicity == "Period"){
            this.result = data.coupon + "%"

          }else{
            this.result = data.coupon + "%"
            this.result = this.result.substring(0, this.result.length - 1);
            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            this.result = this.result.substring(0, this.result.length - 1);
            this.result = this.result.replace(",", ".")
            this.result =(Number(this.result)*mult).toString()
          }
          

        }else{
          this.result = data.reoffert + "%"
         // this.result = this.result.substring(0, this.result.length - 1);
          //this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
          //this.result = this.result.substring(0, this.result.length - 1);
          //this.result = this.result.replace(",", ".")
          //this.result =(Number(this.result)*mult).toString()
        }
  
        this.loading = false
  
      })

    }

    public sendBNP_AUTOCALL(){ 
      let mult=1

        
    if(this.mailModel.frequency == "Quarterly"){
      mult = 4
    }
    if(this.mailModel.frequency == "Semi Annually"){
      mult = 2
    }
    if(this.mailModel.frequency == "Annually"){
      mult = 1
    }

   
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        this.mailModel.couponType = "Guaranteed"
      }
      if(this.selectedProduct == "Autocall Classic"){
        this.mailModel.couponType = "Memory"
      }
      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.couponType = "Memory"
      }


     
      console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
      this.result = "PENDING QUOTE ..."
      this.mailModel.product = "Autocall BRC";

      this.mailService.bnpAutocall(this.mailModel).subscribe((data)=>{
       // this.result = "PENDING QUOTE ..."
        this.toastr.success('DONE ...')
        console.log(data);
        this.val = data.coupon;
        console.log('this.requestType : ',this.requestType)
        if(this.requestType == "Coupon"){
          if(this.periodicity == "Period"){
            this.result = data.coupon + "%"
          }else{
            this.result = data.coupon + "%"
            console.log('result 1 :',this.result)
            this.result = this.result.substring(0, this.result.length - 1);
            console.log('result 2 :',this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log('result 3 :',this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log('result 4 :',this.result)

            this.result = this.result.replace(",", ".")
            console.log('result 5 :',this.result)

            this.result =(Number(this.result)*mult).toString()
            console.log('result 6 :',this.result)

          }

        }else{
          this.result = data.reoffert + "%"
         // this.result = this.result.substring(0, this.result.length - 1);
         // this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
         // this.result = this.result.substring(0, this.result.length - 1);
          //this.result = this.result.replace(",", ".")
          //this.result =(Number(this.result)*mult).toString()
        }
  
        this.loading = false
  
      })

    }
    public sendGS(){ 
      let mult=1
        
    if(this.mailModel.frequency == "Quarterly"){
      mult = 0.25
    }
    if(this.mailModel.frequency == "Semi Annually"){
      this.mailModel.frequency = "SemiAnnual"
      mult = 0.5
    }
    if(this.mailModel.frequency == "Annually"){
      this.mailModel.frequency = "Annual"

      mult = 1
    }

    //Phoenix
    this.mailModel.memory = "true"
    this.mailModel.couponType = "guaranteed"    

      console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
      this.result = "PENDING QUOTE ..."

      this.mailService.gs(this.mailModel).subscribe((data)=>{
       // this.result = "PENDING QUOTE ..."
        this.toastr.success('DONE ...')
        console.log(data);
        this.val = data.coupon;
        console.log('this.requestType : ',this.requestType)
        console.log('this.requestType : ',this.requestType)

        if(this.requestType == "Coupon"){
          console.log("periodicity : ",this.periodicity)
          if(this.periodicity != "Period"){
            this.result = data.coupon + "%"

          }else{
            this.result = data.coupon + "%"
            console.log("1 => : ",this.result)
            this.result = this.result.substring(0, this.result.length - 1);
            console.log("2 => : ",this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log("3 => : ",this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log("4 => : ",this.result)

            this.result = this.result.replace(",", ".")
            console.log("5 => : ",this.result)
            console.log("6 => : ",(Number(this.result)*mult))

            this.result =(Number(this.result)*mult).toString() + "%"
          }
          

        }else{
          this.result = data.reoffert + "%"
        }
  
        this.loading = false
  
      })

    }
    public sendGS_AUTOCALL(){ 
      let mult=1

        
    if(this.mailModel.frequency == "Quarterly"){
      mult = 0.25
    }
    if(this.mailModel.frequency == "Semi Annually"){
      this.mailModel.frequency = "SemiAnnual"

      mult = 0.5
    }
    if(this.mailModel.frequency == "Annually"){
      this.mailModel.frequency = "Annual"

      mult = 1
    }
   
      if(this.selectedProduct == "Autocall Reverse Convertible"){
        this.mailModel.memory = "true"
        this.mailModel.couponType = "guaranteed"
        this.mailModel.autocallTriggerLevel = 0
      }
      if(this.selectedProduct == "Autocall Classic"){
        this.mailModel.memory = "true"
        this.mailModel.couponType = "snowball"
      }
      if(this.selectedProduct == "Autocall Pheonix"){
        this.mailModel.memory = "true"
        this.mailModel.couponType = "Phoenix"
      }
     
      console.log('this.mailModel.autocall : ' , this.mailModel.autocall)
      this.result = "PENDING QUOTE ..."
      this.mailModel.product = "Autocall BRC";

      this.mailService.gsAutocall(this.mailModel).subscribe((data)=>{
       // this.result = "PENDING QUOTE ..."
        this.toastr.success('DONE ...')
        console.log(data);
        this.val = data.coupon;
        console.log('this.requestType : ',this.requestType)
        if(this.requestType == "Coupon"){
          if(this.periodicity != "Period"){
            this.result = data.coupon + "%"
          }else{
            this.result = data.coupon + "%"
            console.log('result 1 :',this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log('result 2 :',this.result)

            this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
            console.log('result 3 :',this.result)

            this.result = this.result.substring(0, this.result.length - 1);
            console.log('result 4 :',this.result)

            this.result = this.result.replace(",", ".")
            console.log('result 5 :',this.result)

            this.result =(Number(this.result)*mult).toString() + "%"
            console.log('result 6 :',this.result)

          }

        }else{
          this.result = data.reoffert + "%"
         // this.result = this.result.substring(0, this.result.length - 1);
         // this.result = data.coupon == '' ? (data.coupon2): (data.coupon)
         // this.result = this.result.substring(0, this.result.length - 1);
          //this.result = this.result.replace(",", ".")
          //this.result =(Number(this.result)*mult).toString()
        }
  
        this.loading = false
  
      })

    }

    


}
