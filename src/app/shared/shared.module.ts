import { NgModule } from "@angular/core";
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundPageComponent } from './notfoundpage/notfoundpage.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({

    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        NotFoundPageComponent,
        SidebarComponent
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        NotFoundPageComponent,
        SidebarComponent
    ]

})

export class SharedModule { } 