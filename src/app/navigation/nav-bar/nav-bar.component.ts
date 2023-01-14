import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  
  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
