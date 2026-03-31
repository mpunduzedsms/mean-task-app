import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes = [
    {id: 1, name: 'Iron Man'},
    {id: 2, name: 'The Flash'},
    {id: 3, name: 'Captain America'},
    {id: 4, name: 'Hulk'},
    {id: 5, name: 'Black Panther'},
    {id: 6, name: 'Wonder Woman'},
    {id: 7, name: 'Spider Man'},
    {id: 8, name: 'Doctor Strange'},
    {id: 9, name: 'Chan Chi'},
    {id: 10, name: 'Thor'},
  ];

  selectedHero: any;

  selectHero(hero: any) {
    this.selectedHero = hero;
  }
}


