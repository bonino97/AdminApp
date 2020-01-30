import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        IncrementadorComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})

export class PagesModule { }