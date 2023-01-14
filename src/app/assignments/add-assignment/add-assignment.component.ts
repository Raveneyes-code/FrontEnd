import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

// Pour le formulaire
nomDevoir = "";
dateDeRendu!:Date;
nomEleve = "";
matiere = "";
assignments:Assignment[] = [];

myControl = new FormControl('');
  options: string[] = ['C++', 'C#', 'Angular','Java','Anglais','Machine learning','	Management de projet','TypeScript','Dev Mobile'];
  filteredOptions: Observable<string[]> | undefined;

constructor(private assignmentsService:AssignmentsService,
            private router:ActivatedRoute,private router2:Router) { }

ngOnInit(): void {
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
  this.assignmentsService.getAssignments()
  .subscribe(assignments => this.assignments = assignments);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}

onSubmit(){
  let nouvelAssignment = new Assignment();
  nouvelAssignment.titre = this.nomDevoir;
  nouvelAssignment.dateDeRendu = this.dateDeRendu;
  nouvelAssignment.rendu = false;
  nouvelAssignment.note = 0;

  nouvelAssignment.remarque = "Aucune remarque";
  nouvelAssignment.nomEleve = this.nomEleve;
  nouvelAssignment.favorite = false;
  nouvelAssignment.matiere =  this.matiere;
  nouvelAssignment.id = this.assignments.length + 1;
  // nouvelAssignment.id = Math.floor(Math.random()*100000000000000000);

  this.assignmentsService.addAssignment(nouvelAssignment)
  .subscribe((reponse) => {
    console.log(reponse.message);
    // ON VA DEVOIR NAVIGUER AVEC LE ROUTER
    // VERS LE COMPOSANT QUI AFFICHE LA LISTE
    this.router2.navigate(['/home']);
  });
}
}
