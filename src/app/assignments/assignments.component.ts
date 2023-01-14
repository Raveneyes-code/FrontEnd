import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs";
  assignmentSelectionne!:Assignment;
  assignments:Assignment[] = [];
  dataSource = new MatTableDataSource(this.assignments);

  constructor(private assignmentsService:AssignmentsService,private router:Router) {}


  displayedColumns: string[] = ['id','titre','date', 'matiere', 'eleve', 'rendu','details','favorite'];
  ngOnInit(): void {
    this.checktokken();
    this.assignmentsService.getAssignments()
    .subscribe(assignments => this.assignments = assignments);
  }
 
  assignmentClique(assignment:Assignment){
    console.log("assignmentClique : " + assignment.titre);
    this.assignmentSelectionne = assignment;
  }

  toggleFavorite(assignment:Assignment){
    console.log("toggleFavorite : " + assignment.favorite);
    assignment.favorite = !assignment.favorite;
  }

  checktokken(){
    var token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/home']);
    }
  }
}
