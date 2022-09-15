import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailModel } from '../model/MailModel';
import { MailService } from '../service/mail.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

import { ToastrService } from 'ngx-toastr';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { UnderlingService } from '../service/underling.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-pricer',
  templateUrl: './pricer.component.html',
  styleUrls: ['./pricer.component.css']
})

export class PricerComponent implements OnInit {

  mailModel = new MailModel();
  toppings = new FormControl();
  submitted = false;

  value_100 = "100"

  selectedCars = [3];
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab', disabled: true },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

    statusClass = 'not-active';

    setActiveClass(){
      this.statusClass = 'active';
    }

  toppingList: string[] = ['AAPL US','AAL UW', 'GOOGL US', 'MSFT US', 'IBM US', 'EBAY US',  'BARC LN','WPP LN',
  'OCDO LN','SMI','SX5E','SPX','PYPL UQ','MA UN','V UN','AAPL UW','AAPL UQ','GLD UP','ITUB4 BS'];
  selectedOption="";
  requestType="";
  structure="";
  sizeValue = "500000"

  loading = false;

  items: any[] = [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' },
    { id: 4, name: 'four' },
    { id: 5, name: 'five' },
    { id: 6, name: 'six' }
  ];
  selected: number = 1;
  types = [
    'couponRequest',
    'priceRequest',
  ];
  options = [
    { name: "option1", value: 1 },
    { name: "option2", value: 2 }
  ]
  result = "";

  isDisabled = false;


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

  val = "...";

  mails = [
    'marex',
    'citi',
    'bbva'
  ];
  send=""
  selectedType="price"

  date = new FormControl(new Date())

  dateToday = this.date

  periodicity = "Annum"

  //serializedDate = new FormControl(new Date().toISOString());





  currencies = ['EUR','USD','GBP'];
  selectedCurrency = this.currencies[1];

  products = 
  ['Barrier Reverse Convertible','Autocall Reverse Convertible',
  'Autocall Pheonix','Autocall Classic'
  ];

  selectedProduct = this.products[0];

  banks = ['marex','bbva','citi','sgcib','leonteq','bnp','gs'];
  selectedBank= this.banks[0]

  requestTypes = ['Coupon','Reoffer'];
  selectedRequestType = this.requestTypes[0];

  frequencyList = ['Quarterly','Semi Annually','Annually']
  selectedFrequency = this.frequencyList[0]

  barrierObservationList = ['No Delay','Annually']
  selectedBarrierObservation = this.barrierObservationList[0]
  
  bloombergTickerList : any;

  underlingList : any;
  bbg1;
  bbg2;
  bbg3;
  bbg4;
  bbg5;
  
  constructor(private formBuilder: FormBuilder,
    private mailService:MailService,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private underlingService:UnderlingService) {
      

  
  }
  day = new Date().getDay()+1
  month = new Date().getMonth()+1

  today = new Date().getFullYear() + "-" + "0" + this.month + "-" + "0" + this.day
  nextWeek = new Date().getFullYear() + "-"  + "0" + (this.month) + "-"+ (this.day+7)


  ngOnInit(): void {
    console.log('today : ', this.today)
    console.log('nextWeek : ', this.nextWeek)
    this.findAll()

    //this.today = new Date().toISOString().split('T')[0];
    console.log(this.toppings)
  }

  get size() {
    return this.formModel.get('size');
  }
  get currency() {
    return this.formModel.get('currency');
  }
  get reoffert() {
    return this.formModel.get('reoffert');
  }
  get tenor() {
    return this.formModel.get('tenor');
  }
  get frequency() {
    return this.formModel.get('frequency');
  }
  get strikeLevel() {
    return this.formModel.get('strikeLevel');
  }
  get barrierLevel() {
    return this.formModel.get('barrierLevel');
  }
  get autocallTriggerLevel() {
    return this.formModel.get('autocallTriggerLevel');
  }
  get firstObservation() {
    return this.formModel.get('firstObservation');
  }

  
  public findAll() {
    let countryCopie: any[] = []
    let copie: any[] = []
    this.underlingService.findAll().subscribe((data:any)=>{
      this.underlingList = data
      //data.forEach(function(item:any){
        // if (item.quotable == "TRUE"){
        //copie.push(item.bbgCode+":"+item.country);
        //countryCopie.push(item.country.slice(0,item.bbgCode.lastIndexOf(" "))   );
      //}
      });
    //this.underlingList = copie
    console.log("test"+this.underlingList)
   //})
  }
  

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
  onChangeFrequency(newObj:any) {
    this.selectedFrequency = newObj;
  }

  onChangeBarrierObservation(newObj:any) {
    this.selectedBarrierObservation = newObj;

  }
  onChangeRequestTypes(newObj:any) {
    console.log(newObj[0]);
    this.selectedRequestType = newObj;
    this.selectedType = this.selectedRequestType
    console.log("this.selectedType : ",this.selectedType)
    this.requestType = this.selectedType
    // ... do other stuff here ...
  }

  onChangeBank(newObj:any) {
    console.log(newObj);
    this.selectedBank = newObj;
    console.log('selected Bank : ',this.selectedBank)
    //this.send = this.selectedBank

  }

  onChangeProduct(newObj:any) {
    this.selectedProduct = newObj;

    console.log('selectedProduit : ',this.selectedProduct)
    //  products = ['Barrier Reverse Convertible','Autocall Reverse Convertible','Autocall Pheonix','Autocall Classic'];
/*
    if(this.selectedProduct == "Barrier Reverse Convertible"){
      this.structure = "RBC"
    }
    if(this.selectedProduct == "Autocall Reverse Convertible"){
      this.structure = "Autocall_RCB"
    }
    if(this.selectedProduct == "Autocall Pheonix"){
      this.structure = "Autocall_Pheonix"
    }
    */
    // ... do other stuff here ...
  }

  onChangeCurrency(newObj:any) {
    console.log(newObj);
    this.selectedCurrency = newObj;
    // ... do other stuff here ...
  }



  selectOption(id: number) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.selected)
  }

  public resetForm(){
    this.submitted = false;
    this.formModel.reset();
  }

  get f() { return this.formModel.controls; }

  setAnnum(){
    this.periodicity = "Annum"
    console.log("set Annum : ",this.periodicity)


  }
  setPeriod(){
    this.periodicity = "Period"
    console.log("set Periodi : ",this.periodicity)
  }

  verify:any;
  

  public sendMail(){
    this.submitted = true;
    this.loading = true;
    this.mailModel = this.formModel.value
    console.log('bbg2'+this.bbg1)
    console.log('this.bloombergTickerList' + this.bbg2)
    this.mailModel.bbg1 = this.bbg1
    this.mailModel.bbg2 = this.bbg2
    this.mailModel.bbg3 = this.bbg3
    this.mailModel.bbg4 = this.bbg4
    this.mailModel.bbg5 = this.bbg5
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

          this.toastr.error('this date is a holiday for the country ');

          console.log("testtoastereORRR"+this.bloombergTickerList.country);

          for (let i in this.bloombergTickerList.country) {
            
            this.toastr.error('this date is a holiday for the country '+i);
            
          }
          this.bloombergTickerList.forEach(element => {

            if (this.verify.country == element.country) {

              console.log("testtoastereORRR")

              console.log('holiday'+ this.bloombergTickerList[0].country)
          
              this.toastr.error('this date is a holiday for the country '+element.bbgCode);

              this.toastr.info('this date is a holiday for the country '+element.bbgCode);
            
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
        console.log("DATA : ",data);
        this.val = data.couponPA;
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


    weekendsDatesFilter = (d: Date): boolean => {
      const day = d.getDay();

      /* Prevent Saturday and Sunday for select. */
      return day !== 0 && day !== 6 ;
  }
}

