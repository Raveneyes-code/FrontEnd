import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment!:Assignment|undefined;
  // Pour les champs de formulaire
  nomAssignment:string="";
  dateDeRendu!:Date;
  note!:Number;
  matiere:string="";
  remarque:string="";
  myControl = new FormControl('');
  options: string[] = ['C++', 'C#', 'Angular','Java','Anglais','Machine learning','	Management de projet','TypeScript','Dev Mobile'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    // Exemple de récupération de ce qui suit le ? dans l'URL
    const nom = this.route.snapshot.queryParams['nom'];
    const age = this.route.snapshot.queryParams['age'];
    // fragment (ce qui suit le # dans l'URL)
    const fragment = this.route.snapshot.fragment;

    console.log("nom: " + nom);
    console.log("age: " + age);
    console.log("fragment: " + fragment);
    console.log(this.route.snapshot.queryParams);

    this.getAssignment();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  getAssignment() {
    // on récupère l'id dans l'url
    // Le + force la conversion en number
    const id:number = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => {
      if(!assignment) return;

      this.assignment = assignment;
      this.nomAssignment = assignment.titre;
      this.dateDeRendu = assignment.dateDeRendu;
      this.note=assignment.note;
      this.matiere=assignment.matiere;
      this.remarque=assignment.remarque;
    });
  }
  onSaveAssignment() {
    if(!this.nomAssignment || !this.dateDeRendu) return;
    if(!this.assignment) return;
    if(!this.note) return;
    if(!this.matiere) return;
    if(!this.remarque) return;
    // On modifie l'assignment
    this.assignment.titre = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note = this.note;
    this.assignment.matiere = this.matiere;
    this.assignment.remarque = this.remarque;
    // On envoie l'assignment modifié au service
    // qui va faire la requête HTTP
    // On va naviguer vers la page d'accueil
    this.assignmentsService.updateAssignment(this.assignment)
    .subscribe((reponse) => {
      console.log(reponse.message);
      // et on navigue vers la page d'accueil qui affiche
      // la liste des assignments
      this.router.navigate(["/home"]);
    });
  }
}
