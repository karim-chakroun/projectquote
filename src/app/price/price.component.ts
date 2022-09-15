import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { MailModel } from '../model/MailModel';
import { stradegy } from '../model/stradegy.model';
import { MailService } from '../service/mail.service';
import { PricerService } from '../service/pricer.service';
import { ProductService } from '../service/product.service';
import { UnderlingService } from '../service/underling.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  constructor(private underlingService: UnderlingService,
    private productService: ProductService,
    private pricerService: PricerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private mailService:MailService,) {
      this.filteredunderlings = this.underlingCtrl.valueChanges.pipe(
        startWith(null),
        map((underling: string | null) => (underling ? this._filter(underling) : this.underlingList.slice())),
      );
     }

  ngOnInit(): void {
    this.selectQuote(0);
    this.findAll();
    this.mailModel.frequency="Quarterly";
    this.mailModel.initialFixingDate= new Date().toString();
   
  }

  planModel: any = {start_time: new Date() };


  solve;
  solveFor(newObj:any){
    this.solve=newObj;
    this.requestType=newObj;
    console.log(this.solve)

  }

  BanksList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  selectedQuote: any;
  selectedProductIndex = 2;
  selectedManualProductIndex = 2;
  quotesList: any[] = [
    { text: "QUOTE 1", value: {} },
    { text: "QUOTE 2", value: null },
    { text: "QUOTE 3", value: null },
    { text: "QUOTE 4", value: null },

  ];
  bankList: any[] = [
    { logo: "../../../assets/logo/logo-barclyse.png" },
    { logo: "../../../assets/logo/logo-city.png" },
    { logo: "../../../assets/logo/logo-sg.png" },
    { logo: "../../../assets/logo/logo-goldman-sachs.png" },
    { logo: "../../../assets/logo/logo-BNP-Paribas.png" },
    { logo: "../../../assets/logo/logo-bbva.png" },
    { logo: "../../../assets/logo/logo-barclyse.png" },
    { logo: "../../../assets/logo/logo-city.png" },
    { logo: "../../../assets/logo/logo-sg.png" },
    { logo: "../../../assets/logo/logo-goldman-sachs.png" },
    { logo: "../../../assets/logo/logo-BNP-Paribas.png" },
    { logo: "../../../assets/logo/logo-bbva.png" }


  ];

  
  selectQuote(i: number) {
    this.selectedQuote = { index: i, value: this.quotesList[i].value }
  }
  addQuote() {
    const i = this.quotesList.push({ text: `QUOTE ${this.quotesList.length + 1}`, value: null }) - 1;
    this.selectQuote(i);
  }
  closeQuote(index: number) {

    this.quotesList.splice(index, 1);
  }

  selectProduct(index:number,auto){
    this.selectedProductIndex = index;
    this.autoCall = auto;
  }

  selectManualProduct(index:number,auto){
    this.selectedManualProductIndex = index;
    this.autoCall = auto;
  }

  //selectedProductIndex = 2;
 // @Input() quote : any = null;
  productList: any[] = [
    { text: 'Reverse Convertible' },
    { text: 'Autocall Phoenix' },
    { text: 'Classic Autocall' },
    { text: 'Autocall RCB' }
  ];

  manualProductList: any[] = [
    { text: 'Exotic' },
    { text: 'Capital Protected Call' },
    { text: 'Hybrid Capital Protected Call' },
  ];

  contactCahnelList: any[] = [
    { text: 'AAPL US', logo: "../../../assets/logo/contact/logo-apple.png" },
    { text: 'GOOGLE US', logo: "../../../assets/logo/contact/logo-google.png" },
    { text: 'MSFT US', logo: "../../../assets/logo/contact/logo-microsoft.png" },
    { text: 'FB US', logo: "../../../assets/logo/contact/logo-meta.png" },
    { text: 'CVX US', logo: "../../../assets/logo/contact/logo-cvx.png" }

  ]

  separatorKeysCodes: number[] = [ENTER, COMMA];
  underlingCtrl = new FormControl();
  filteredunderlings: Observable<string[]>;
  underlings: string[] = [];
  underlingList: string[] = [];


  //underlingList:any;
  copie: any[] = [];
  prop1: string;

  autoCall: string = 'Phoenix';

  banks = ['Marex','Bbva','Citi','Sgcib','Leonteq','Bnp','Gs'];
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
    amount: [,[Validators.required,Validators.max(2000000),Validators.min(200000)]],
    bbg1: ['', []],
    bbg2: ['', [, Validators.maxLength(500)]],
    bbg3: ['', [, Validators.maxLength(500)]],
    bbg4: ['', [, Validators.maxLength(500)]],
    bbg5: ['', [, Validators.maxLength(255)]],
    reoffer: [, []],
    tenor:[, [Validators.required,Validators.max(60),Validators.min(0)]],
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

  @ViewChild('underlingInput') underlingInput: ElementRef<HTMLInputElement>;


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
  //show=false;
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

currentQuote = new stradegy.ProductSpecModel();

underlyin:string[]=['msft', 'google']
saveQuote(): void {
	if(this.currentQuote != undefined){

    this.currentQuote.horizon.strikeDate=this.setledate;
    this.currentQuote.horizon.settlementDelay=this.setledate;
    this.currentQuote.horizon.maturity=this.setledate;

    this.currentQuote.underlyings.tickers.selects=this.underlings;

    this.currentQuote.autocall.amount.select=this.mailModel.amount;
    this.currentQuote.autocall.frequency.select=this.mailModel.frequency;


    this.currentQuote.downSide.type.select=this.mailModel.barrierType;

    this.currentQuote.upSide.barrier.select=this.mailModel.barrierLevel;


    this.currentQuote.coupons.frequency.select="test";
    this.currentQuote.coupons.barrier.select=this.mailModel.barrierLevel;

    this.currentQuote.issuerCall.frequency.select=this.mailModel.frequency;

    this.currentQuote.irCoupons.frequency.select=this.mailModel.frequency;

    this.currentQuote.creditComponent.coupon.select=this.mailModel.coupon;

    

    



/*
    this.investment = new stradegy.InvestmentFaceModel();
            this.horizon = new stradegy.HorizonFaceModel();
            this.underlyings = new stradegy.UnderlyingsFaceModel();
            this.autocall = new stradegy.AutocallFaceModel();
            this.downSide = new stradegy.DownSideFaceModel();
            this.upSide = new stradegy.UpSideFaceModel();
            this.coupons = new stradegy.CouponsFaceModel();
            this.issuerCall = new stradegy.IssuerCallFaceModel();
            this.irCoupons = new stradegy.IrCouponsFaceModel();
            this.creditComponent = new stradegy.CreditComponentFaceModel();
*/

		  	  
			 this.productService.sendQuote(this.currentQuote)
			  .subscribe(
				  response => {
					console.log(response);
					this.submitted = true;

          
				  },
				  error => {
					console.log(error);
				  });
	}
	
  }

  currentAskQuotes : stradegy.AskQuoteModel[] = [];


  askQuote(){
    let toQuote = new stradegy.AskQuoteModel();
    toQuote.broker = "ZBROKER";
		  	 toQuote.pid = "P0000000000001X4";
		  	 toQuote.solve4 = "test";
		  	 toQuote.firmPricer = "test";
         toQuote.payOff=20;
         toQuote.solve4="abc"

         this.pricerService.askQuote(toQuote)
			  .subscribe(
          data => {
            if(data.pid != null){
               if(this.currentAskQuotes == null){
                this.currentAskQuotes = [];
               }
               this.currentAskQuotes.push(data);
               this.currentAskQuotes= [...this.currentAskQuotes];
               console.log(data);
            }
            
            },
            error => {
            console.log(error);
            }
        );
  }
  




 


  
    
   
}
