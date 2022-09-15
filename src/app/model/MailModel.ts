export class MailModel {
    currency?: string;
    amount?: number;//
    bbg1?: string;
    bbg2?: string;
    bbg3?: string;
    bbg4?: string;
    bbg5?: string;
    reoffer?: string; //price //
    tenor?: number;

    autocall?: string;
    frequency?: string;
    firstObservation?: string;
    autocallTriggerLevel?: number;
   // autocallStep?: string;
    couponType?: string;
    memory?: string;
    couponTriggerLevel?: string;
    couponStep?: string;
    coupon?: any; //
    strikeLevel?: number;//
    //downsideLeverage?: string;
    barrierType?: string;
    barrierLevel?: number;
    solveFor?: string;
    //maturity?: string;
    initialFixingDate?: string;
    //FinalFixingDate?: Date;
    //issueDate?: Date;
    //redemptionDate?: Date;
    requestType?:string;


    erTrigger? : number;
    erCouponType? : string;
    erFrequency? : string;
    erCoupon? : string;
    erAlternativeCoupon? : Number;
    erNonCancelablePeriods? : string;
    product? : string;
    strikePlayOff? : number;

    topping? : Array<5>;
    bankName? : string;

    constructor(){}

}

  