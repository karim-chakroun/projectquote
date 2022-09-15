/* Generated from Java with JSweet 2.3.7 - http://www.jsweet.org */
export namespace stradegy {
    export class ArtifactModel {
        public name : stradegy.StrSelRegModel;

        public subType : stradegy.StrSelRegModel;

        public version : stradegy.IntSelSegModel;

        public autocall : stradegy.AutocallFragModel;

        public downSide : stradegy.DownSideFragModel;

        public upSide : stradegy.UpSideFragModel;

        public coupons : stradegy.CouponsFragModel;

        public issuerCall : stradegy.IssuerCallFragModel;

        public irCoupons : stradegy.IrCouponsFragModel;

        public creditComponent : stradegy.CreditComponentFragModel;

        constructor() {
            this.name = new stradegy.StrSelRegModel();
            this.subType = new stradegy.StrSelRegModel();
            this.version = new stradegy.IntSelSegModel();
            this.autocall = new stradegy.AutocallFragModel();
            this.downSide = new stradegy.DownSideFragModel();
            this.upSide = new stradegy.UpSideFragModel();
            this.coupons = new stradegy.CouponsFragModel();
            this.issuerCall = new stradegy.IssuerCallFragModel();
            this.irCoupons = new stradegy.IrCouponsFragModel();
            this.creditComponent = new stradegy.CreditComponentFragModel();
        }
    }
}
export namespace stradegy {
    export interface IFieldModel {    }
}
export namespace stradegy {
    export class AskQuoteModel {
        public broker : string;

        /*private*/ pid : string;

        public quoteStatus : stradegy.QuoteStatus;

        public solve4 : string;

        /*private*/ payOff : number;

        public firmPricer : string;

        public static newQuote(broker : string, pid : string, firmPricer : string, solve4 : string, payOff : number) : AskQuoteModel {
            let askQuote : AskQuoteModel = new AskQuoteModel();
            askQuote.broker = broker;
            askQuote.pid = pid;
            askQuote.firmPricer = firmPricer;
            askQuote.solve4 = solve4;
            askQuote.payOff = payOff;
            return askQuote;
        }

        public withQuoteStatus(quoteStatus : stradegy.QuoteStatus) : AskQuoteModel {
            this.quoteStatus = quoteStatus;
            return this;
        }

        public withPayOff(payOff : number) : AskQuoteModel {
            this.payOff = payOff;
            return this;
        }

        public getPid() : string {
            return this.pid;
        }

        public getPayOff() : number {
            return this.payOff;
        }

        constructor() {
            this.broker = "";
            this.pid = "";
            this.quoteStatus = stradegy.QuoteStatus.None;
            this.solve4 = "";
            this.payOff = 0.0;
            this.firmPricer = "";
        }
    }
}
export namespace stradegy {
    export class IntSegModel implements stradegy.IFieldModel {
        public minValue : number;

        public maxValue : number;

        public withBetween(minValue : number, maxValue : number) : IntSegModel {
            this.minValue = minValue;
            this.maxValue = maxValue;
            return this;
        }

        constructor() {
            this.minValue = 0;
            this.maxValue = 0;
        }
    }

}
export namespace stradegy {
    export class ProductSpecRefModel {
        public pid : string;

        public refArtifact : string;

        public user : string;

        public creationDate : string;

        public static newInstance(pid : string, refArtifact : string, user : string, creationDate : string) : ProductSpecRefModel {
            let instance : ProductSpecRefModel = new ProductSpecRefModel();
            instance.pid = pid;
            instance.refArtifact = refArtifact;
            instance.user = user;
            instance.creationDate = creationDate;
            return instance;
        }

        constructor() {
            this.pid = "";
            this.refArtifact = "";
            this.user = "";
            this.creationDate = "";
        }
    }
}
export namespace stradegy {
    export class EnumSeqModel implements stradegy.IFieldModel {
        public source : stradegy.ItemModel[];

        public target : string[];

        public withSource(source : stradegy.ItemModel[]) : EnumSeqModel {
            this.source = source;
            return this;
        }

        public withTarget(target : string[]) : EnumSeqModel {
            this.target = target;
            return this;
        }

        constructor() {
            this.source = [];
            this.target = [];
        }
    }

}
export namespace stradegy {
    export class FloatSegModel implements stradegy.IFieldModel {
        public minValue : number;

        public maxValue : number;

        public withBetween(minValue : number, maxValue : number) : FloatSegModel {
            this.minValue = minValue;
            this.maxValue = maxValue;
            return this;
        }

        constructor() {
            this.minValue = 0.0;
            this.maxValue = 0.0;
        }
    }

}
export namespace stradegy {
    export class FirmModel {
        public name : string;

        public constructor(name : string) {
            this.name = "";
            this.name = name;
        }
    }
}
export namespace stradegy {
    export class BoolSelModel implements stradegy.IInputModel {
        public required : boolean;

        public options : boolean[];

        public select : boolean;

        public withRequired(required : boolean) : BoolSelModel {
            this.required = required;
            return this;
        }

        public withOptions(options : boolean[]) : BoolSelModel {
            this.options = options;
            return this;
        }

        public withSelect(select : boolean) : BoolSelModel {
            this.select = select;
            return this;
        }

        constructor() {
            this.required = true;
            this.options = [];
            this.select = false;
        }
    }

}
export namespace stradegy {
    export interface IInputModel {    }
}
export namespace stradegy {
    export class ArtifactRefModel {
        public name : string;

        public subType : string;

        public constructor(name : string, subType : string) {
            this.name = "";
            this.subType = "";
            this.name = name;
            this.subType = subType;
        }
    }
}
export namespace stradegy {
    export abstract class FragmentModel implements stradegy.IFragmentModel {
        public active : boolean;

        constructor() {
            this.active = false;
        }
    }

}
export namespace stradegy {
    export interface IFragmentModel {    }
}
export namespace stradegy {
    export class StrSeqModel implements stradegy.IFieldModel {
        public values : string[];

        public withValues(values : string[]) : StrSeqModel {
            this.values = values;
            return this;
        }

        constructor() {
            this.values = [];
        }
    }

}
export namespace stradegy {
    export interface IFacetModel {    }
}
export namespace stradegy {
    export class BoolSeqModel implements stradegy.IFieldModel {
        public source : boolean[];

        public target : boolean[];

        public withTarget(target : boolean[]) : BoolSeqModel {
            this.target = target;
            return this;
        }

        constructor() {
            this.source = [false, true];
            this.target = [];
        }
    }

}
export namespace stradegy {
    export class StrRegModel implements stradegy.IFieldModel {
        public regExp : string;

        public withRegExp(regExp : string) : StrRegModel {
            this.regExp = regExp;
            return this;
        }

        constructor() {
            this.regExp = ".*";
        }
    }

}
export namespace stradegy {
    export class DateSegModel implements stradegy.IFieldModel {
        public minDate : string;

        public maxDate : string;

        public withBetween(minDate : string, maxDate : string) : DateSegModel {
            this.minDate = minDate;
            this.maxDate = maxDate;
            return this;
        }

        constructor() {
            this.minDate = "1970-01-01";
            this.maxDate = "2500-01-01";
        }
    }

}
export namespace stradegy {
    export enum QuoteStatus {
        None, Asked, Supported, Submmited, Canceled, Filled
    }
}
export namespace stradegy {
    export abstract class FacetModel implements stradegy.IFacetModel {
        public active : boolean;

        constructor() {
            this.active = false;
        }
    }

}
export namespace stradegy {
    export class EnumSelModel implements stradegy.IInputModel {
        public required : boolean;

        public options : stradegy.ItemModel[];

        public select : string;

        public withRequired(required : boolean) : EnumSelModel {
            this.required = required;
            return this;
        }

        public withOptions(options : stradegy.ItemModel[]) : EnumSelModel {
            this.options = options;
            return this;
        }

        public withSelect(select : string) : EnumSelModel {
            this.select = select;
            return this;
        }

        constructor() {
            this.required = true;
            this.options = [];
            this.select = "";
        }
    }

}
export namespace stradegy {
    export class ItemModel {
        public id : string;

        public label : string;

        public static newItem(id : string, label : string) : ItemModel {
            let item : ItemModel = new ItemModel();
            item.id = id;
            item.label = label;
            return item;
        }

        constructor() {
            this.id = "";
            this.label = "";
        }
    }
}
export namespace stradegy {
    export class ProductSpecModel {
        public refArtifact : string;

        public investment : stradegy.InvestmentFaceModel;

        public horizon : stradegy.HorizonFaceModel;

        public underlyings : stradegy.UnderlyingsFaceModel;

        public autocall : stradegy.AutocallFaceModel;

        public downSide : stradegy.DownSideFaceModel;

        public upSide : stradegy.UpSideFaceModel;

        public coupons : stradegy.CouponsFaceModel;

        public issuerCall : stradegy.IssuerCallFaceModel;

        public irCoupons : stradegy.IrCouponsFaceModel;

        public creditComponent : stradegy.CreditComponentFaceModel;

        constructor() {
            this.refArtifact = "";
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
        }
    }
}
export namespace stradegy {
    export class IntSelSegModel extends stradegy.IntSegModel implements stradegy.IInputModel {
        public required : boolean;

        public select : number;

        public withRequired(required : boolean) : IntSelSegModel {
            this.required = required;
            return this;
        }

        public withSelBetween(minValue : number, maxValue : number) : IntSelSegModel {
            super.withBetween(minValue, maxValue);
            return this;
        }

        public withSelect(select : number) : IntSelSegModel {
            this.select = select;
            return this;
        }

        constructor() {
            super();
            this.required = true;
            this.select = 0;
        }
    }

}
export namespace stradegy {
    export class FloatSelSegModel extends stradegy.FloatSegModel implements stradegy.IInputModel {
        public required : boolean;

        public select : number;

        public withRequired(required : boolean) : FloatSelSegModel {
            this.required = required;
            return this;
        }

        public withSelBetween(minValue : number, maxValue : number) : FloatSelSegModel {
            super.withBetween(minValue, maxValue);
            return this;
        }

        public withSelect(select : number) : FloatSelSegModel {
            this.select = select;
            return this;
        }

        constructor() {
            super();
            this.required = true;
            this.select = 0.0;
        }
    }

}
export namespace stradegy {
    export class FirmConfigModel extends stradegy.FirmModel {
        public email : string;

        public asa : number;

        public contextPath : string;

        public port : number;

        public subjectTrack : boolean;

        public constructor(name? : any) {
            if(((typeof name === 'string') || name === null)) {
                let __args = arguments;
                super(name);
                this.email = "";
                this.asa = 10;
                this.contextPath = "";
                this.port = 4040;
                this.subjectTrack = false;
            } else if(name === undefined) {
                let __args = arguments;
                super("");
                this.email = "";
                this.asa = 10;
                this.contextPath = "";
                this.port = 4040;
                this.subjectTrack = false;
            } else throw new Error('invalid overload');
        }

        public static newInstance(name : string, email : string, asa : number, path : string, port : number, subjectTrack : boolean) : FirmConfigModel {
            let fg : FirmConfigModel = new FirmConfigModel(name);
            fg.email = email;
            fg.asa = asa;
            fg.contextPath = path;
            fg.port = port;
            fg.subjectTrack = subjectTrack;
            return fg;
        }

        public static copy(firm : FirmConfigModel) : FirmConfigModel {
            return FirmConfigModel.newInstance(firm.name, firm.email, firm.asa, firm.contextPath, firm.port, firm.subjectTrack);
        }
    }
}
export namespace stradegy {
    export abstract class ProtectionFragModel extends stradegy.FragmentModel {
        public strike : stradegy.IntSegModel;

        public barrier : stradegy.IntSegModel;

        constructor() {
            super();
            this.strike = new stradegy.IntSegModel();
            this.barrier = new stradegy.IntSegModel();
        }
    }

}
export namespace stradegy {
    export class CouponsFragModel extends stradegy.FragmentModel {
        public type : stradegy.EnumSeqModel;

        public frequency : stradegy.EnumSeqModel;

        public trigger : stradegy.IntSegModel;

        public pa : stradegy.FloatSegModel;

        public memory : stradegy.BoolSeqModel;

        public barrier : stradegy.IntSegModel;

        constructor() {
            super();
            this.type = new stradegy.EnumSeqModel();
            this.frequency = new stradegy.EnumSeqModel();
            this.trigger = new stradegy.IntSegModel();
            this.pa = new stradegy.FloatSegModel();
            this.memory = new stradegy.BoolSeqModel();
            this.barrier = new stradegy.IntSegModel();
        }
    }

}
export namespace stradegy {
    export class CreditComponentFragModel extends stradegy.FragmentModel {
        public recoverytype : stradegy.EnumSeqModel;

        public clntype : stradegy.EnumSeqModel;

        public coupon : stradegy.FloatSegModel;

        public couponType : stradegy.EnumSeqModel;

        public cpAccrual : stradegy.EnumSeqModel;

        public dayCountBasis : stradegy.EnumSeqModel;

        public defaultRange : stradegy.IntSegModel;

        public lossDefault : stradegy.IntSegModel;

        constructor() {
            super();
            this.recoverytype = new stradegy.EnumSeqModel();
            this.clntype = new stradegy.EnumSeqModel();
            this.coupon = new stradegy.FloatSegModel();
            this.couponType = new stradegy.EnumSeqModel();
            this.cpAccrual = new stradegy.EnumSeqModel();
            this.dayCountBasis = new stradegy.EnumSeqModel();
            this.defaultRange = new stradegy.IntSegModel();
            this.lossDefault = new stradegy.IntSegModel();
        }
    }

}
export namespace stradegy {
    export class IssuerCallFragModel extends stradegy.FragmentModel {
        public frequency : stradegy.EnumSeqModel;

        public redemptionAmount : stradegy.FloatSegModel;

        constructor() {
            super();
            this.frequency = new stradegy.EnumSeqModel();
            this.redemptionAmount = new stradegy.FloatSegModel();
        }
    }

}
export namespace stradegy {
    export class AutocallFragModel extends stradegy.FragmentModel {
        public frequency : stradegy.EnumSeqModel;

        public trigger : stradegy.IntSegModel;

        public delay : stradegy.IntSegModel;

        public stepDown : stradegy.IntSegModel;

        public amount : stradegy.IntSegModel;

        constructor() {
            super();
            this.frequency = new stradegy.EnumSeqModel();
            this.trigger = new stradegy.IntSegModel();
            this.delay = new stradegy.IntSegModel();
            this.stepDown = new stradegy.IntSegModel();
            this.amount = new stradegy.IntSegModel();
        }
    }

}
export namespace stradegy {
    export class IrCouponsFragModel extends stradegy.FragmentModel {
        public referenceRate : stradegy.IntSegModel;

        public spread : stradegy.IntSegModel;

        public dayCountBasis : stradegy.EnumSeqModel;

        public frequency : stradegy.EnumSeqModel;

        public cap : stradegy.IntSegModel;

        public floor : stradegy.IntSegModel;

        constructor() {
            super();
            this.referenceRate = new stradegy.IntSegModel();
            this.spread = new stradegy.IntSegModel();
            this.dayCountBasis = new stradegy.EnumSeqModel();
            this.frequency = new stradegy.EnumSeqModel();
            this.cap = new stradegy.IntSegModel();
            this.floor = new stradegy.IntSegModel();
        }
    }

}
export namespace stradegy {
    export class StrSelSeqModel extends stradegy.StrSeqModel implements stradegy.IInputModel {
        public required : boolean;

        public select : string;

        public withRequired(required : boolean) : StrSelSeqModel {
            this.required = required;
            return this;
        }

        public withSelValues(values : string[]) : StrSelSeqModel {
            super.withValues(values);
            return this;
        }

        public withSelect(select : string) : StrSelSeqModel {
            this.select = select;
            return this;
        }

        constructor() {
            super();
            this.required = true;
            this.select = "";
        }
    }

}
export namespace stradegy {
    export class StrSelRegModel extends stradegy.StrRegModel implements stradegy.IInputModel {
        public required : boolean;

        public select : string;

        public withRequired(required : boolean) : StrSelRegModel {
            this.required = required;
            return this;
        }

        public withSelRegExp(regExp : string) : StrSelRegModel {
            super.withRegExp(regExp);
            return this;
        }

        public withSelect(select : string) : StrSelRegModel {
            this.select = select;
            return this;
        }

        constructor() {
            super();
            this.required = true;
            this.select = "";
        }
    }

}
export namespace stradegy {
    export class StrMuSelRegModel extends stradegy.StrRegModel implements stradegy.IInputModel {
        public required : boolean;

        public selects : string[];

        public withRequired(required : boolean) : StrMuSelRegModel {
            this.required = required;
            return this;
        }

        public withSelRegExp(regExp : string) : StrMuSelRegModel {
            super.withRegExp(regExp);
            return this;
        }

        public withSelects(selects : string[]) : StrMuSelRegModel {
            this.selects = selects;
            return this;
        }

        constructor() {
            super();
            this.required = true;
            this.selects = [];
        }
    }

}
export namespace stradegy {
    export class DateSelSegModel extends stradegy.DateSegModel implements stradegy.IInputModel {
        public required : boolean;

        public select : string;

        public withRequired(required : boolean) : DateSelSegModel {
            this.required = required;
            return this;
        }

        public withSelBetween(minDate : string, maxDate : string) : DateSelSegModel {
            super.withBetween(minDate, maxDate);
            return this;
        }

        public withSelect(select : string) : DateSelSegModel {
            this.select = select;
            return this;
        }

        constructor() {
            super();
            this.required = true;
            this.select = "";
        }
    }

}
export namespace stradegy {
    export class IrCouponsFaceModel extends stradegy.FacetModel {
        public referenceRate : stradegy.IntSelSegModel;

        public spread : stradegy.IntSelSegModel;

        public dayCountBasis : stradegy.EnumSelModel;

        public frequency : stradegy.EnumSelModel;

        public cap : stradegy.IntSelSegModel;

        public floor : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.referenceRate = new stradegy.IntSelSegModel();
            this.spread = new stradegy.IntSelSegModel();
            this.dayCountBasis = new stradegy.EnumSelModel();
            this.frequency = new stradegy.EnumSelModel();
            this.cap = new stradegy.IntSelSegModel();
            this.floor = new stradegy.IntSelSegModel();
        }
    }

}
export namespace stradegy {
    export class InvestmentFaceModel extends stradegy.FacetModel {
        public notional : stradegy.IntSelSegModel;

        public currency : stradegy.EnumSelModel;

        public reoffer : stradegy.FloatSelSegModel;

        public solveType : stradegy.EnumSelModel;

        constructor() {
            super();
            this.notional = new stradegy.IntSelSegModel();
            this.currency = new stradegy.EnumSelModel();
            this.reoffer = new stradegy.FloatSelSegModel();
            this.solveType = new stradegy.EnumSelModel();
        }
    }

}
export namespace stradegy {
    export class IssuerCallFaceModel extends stradegy.FacetModel {
        public frequency : stradegy.EnumSelModel;

        public redemptionAmount : stradegy.FloatSelSegModel;

        constructor() {
            super();
            this.frequency = new stradegy.EnumSelModel();
            this.redemptionAmount = new stradegy.FloatSelSegModel();
        }
    }

}
export namespace stradegy {
    export class AutocallFaceModel extends stradegy.FacetModel {
        public frequency : stradegy.EnumSelModel;

        public trigger : stradegy.IntSelSegModel;

        public delay : stradegy.IntSelSegModel;

        public stepDown : stradegy.IntSelSegModel;

        public amount : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.frequency = new stradegy.EnumSelModel();
            this.trigger = new stradegy.IntSelSegModel();
            this.delay = new stradegy.IntSelSegModel();
            this.stepDown = new stradegy.IntSelSegModel();
            this.amount = new stradegy.IntSelSegModel();
        }
    }

}
export namespace stradegy {
    export class HorizonFaceModel extends stradegy.FacetModel {
        public maturity : stradegy.EnumSelModel;

        public strikeDate : stradegy.DateSelSegModel;

        public settlementDelay : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.maturity = new stradegy.EnumSelModel();
            this.strikeDate = new stradegy.DateSelSegModel();
            this.settlementDelay = new stradegy.IntSelSegModel();
        }
    }

}
export namespace stradegy {
    export class UnderlyingsFaceModel extends stradegy.FacetModel {
        public tickers : stradegy.StrMuSelRegModel;

        constructor() {
            super();
            this.tickers = new stradegy.StrMuSelRegModel();
        }
    }

}
export namespace stradegy {
    export class CouponsFaceModel extends stradegy.FacetModel {
        public type : stradegy.EnumSelModel;

        public frequency : stradegy.EnumSelModel;

        public barrier : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.type = new stradegy.EnumSelModel();
            this.frequency = new stradegy.EnumSelModel();
            this.barrier = new stradegy.IntSelSegModel();
        }
    }

}
export namespace stradegy {
    export abstract class ProtectionFaceModel extends stradegy.FacetModel {
        public strike : stradegy.IntSelSegModel;

        public barrier : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.strike = new stradegy.IntSelSegModel();
            this.barrier = new stradegy.IntSelSegModel();
        }
    }

}
export namespace stradegy {
    export class CreditComponentFaceModel extends stradegy.FacetModel {
        public reference : stradegy.StrSelRegModel;

        public recoverytype : stradegy.EnumSelModel;

        public clntype : stradegy.EnumSelModel;

        public coupon : stradegy.FloatSelSegModel;

        public couponType : stradegy.EnumSelModel;

        public cpAccrual : stradegy.EnumSelModel;

        public dayCountBasis : stradegy.EnumSelModel;

        public startDefaultRange : stradegy.IntSelSegModel;

        public endDefaultRange : stradegy.IntSelSegModel;

        public lossDefault : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.reference = new stradegy.StrSelRegModel();
            this.recoverytype = new stradegy.EnumSelModel();
            this.clntype = new stradegy.EnumSelModel();
            this.coupon = new stradegy.FloatSelSegModel();
            this.couponType = new stradegy.EnumSelModel();
            this.cpAccrual = new stradegy.EnumSelModel();
            this.dayCountBasis = new stradegy.EnumSelModel();
            this.startDefaultRange = new stradegy.IntSelSegModel();
            this.endDefaultRange = new stradegy.IntSelSegModel();
            this.lossDefault = new stradegy.IntSelSegModel();
        }
    }

}
export namespace stradegy {
    export class UpSideFragModel extends stradegy.ProtectionFragModel {
        public type : stradegy.EnumSeqModel;

        public cap : stradegy.IntSegModel;

        public participation : stradegy.IntSegModel;

        public rebate : stradegy.IntSegModel;

        constructor() {
            super();
            this.type = new stradegy.EnumSeqModel();
            this.cap = new stradegy.IntSegModel();
            this.participation = new stradegy.IntSegModel();
            this.rebate = new stradegy.IntSegModel();
        }
    }

}
export namespace stradegy {
    export class DownSideFragModel extends stradegy.ProtectionFragModel {
        public type : stradegy.EnumSeqModel;

        public floor : stradegy.IntSegModel;

        constructor() {
            super();
            this.type = new stradegy.EnumSeqModel();
            this.floor = new stradegy.IntSegModel();
        }
    }

}
export namespace stradegy {
    export class DownSideFaceModel extends stradegy.ProtectionFaceModel {
        public type : stradegy.EnumSelModel;

        public floor : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.type = new stradegy.EnumSelModel();
            this.floor = new stradegy.IntSelSegModel();
        }
    }

}
export namespace stradegy {
    export class UpSideFaceModel extends stradegy.ProtectionFaceModel {
        public type : stradegy.EnumSelModel;

        public cap : stradegy.IntSelSegModel;

        public participation : stradegy.IntSelSegModel;

        public rebate : stradegy.IntSelSegModel;

        constructor() {
            super();
            this.type = new stradegy.EnumSelModel();
            this.cap = new stradegy.IntSelSegModel();
            this.participation = new stradegy.IntSelSegModel();
            this.rebate = new stradegy.IntSelSegModel();
        }
    }

}

