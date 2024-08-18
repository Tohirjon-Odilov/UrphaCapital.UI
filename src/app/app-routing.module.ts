import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RequestSendComponent } from './pages/request-send/request-send.component';

const routes: Routes = [
  { path: '', title: 'OverView', component:HomeComponent},
  { path: 'request', title: 'OverView', component:RequestSendComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
