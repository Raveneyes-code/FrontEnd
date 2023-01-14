import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes }  from '@angular/router';
import { RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MatTableModule } from '@angular/material/table'  
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { RegisterComponent } from './register/register.component';
import { NgToastModule } from 'ng-angular-popup';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailProjetComponent } from './detail-projet/detail-projet.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: AssignmentsComponent
  },
  {
    path: 'add',
    component: AddAssignmentComponent
  },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,

  },
  {
    path: 'detailProjet',
    component: DetailProjetComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    NavBarComponent,
    SidenavListComponent,
    LoginComponent,
    RegisterComponent,
    DetailProjetComponent,
    ScrollToTopComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, FormsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule,
    MatCheckboxModule, MatSlideToggleModule,
    RouterModule.forRoot(routes),
    HttpClientModule,MatToolbarModule,MatSidenavModule,MatTableModule,
    MatPaginatorModule,ReactiveFormsModule,MatTabsModule,NgToastModule,MatDialogModule,MatSelectModule,
    MatAutocompleteModule,MatPaginatorModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
