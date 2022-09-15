import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceComponent } from './price/price.component';
import { PricerComponent } from './pricer/pricer.component';
import { PricingComponent } from './pricing/pricing.component';
import { UnderlingComponent } from './underling/underling.component';

const routes: Routes = [
  { path: 'pricer', component: PricerComponent },
  { path: 'admin', component: UnderlingComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'price', component: PriceComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
