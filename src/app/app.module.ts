import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PricerComponent } from './pricer/pricer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';

import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';







import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { UnderlingComponent } from './underling/underling.component';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { UpdateTickersComponent } from '../update-tickers/update-tickers.component';
import { PricingComponent } from './pricing/pricing.component';

import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PriceComponent } from './price/price.component';



@NgModule({
  declarations: [
    AppComponent,
    PricerComponent,
    NavbarComponent,
    UnderlingComponent,
    UpdateTickersComponent,
    PricingComponent,
    PriceComponent

    
  ],
  imports: [
    
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatSliderModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
    ,

    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    MatNativeDateModule ,
    MatInputModule,
    NgxPaginationModule
    

    
    
    
  ],
  providers: [   MatDatepickerModule,
    DatePipe,
    MatNativeDateModule ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
