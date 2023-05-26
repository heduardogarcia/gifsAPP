import { Component, Input,NgModule } from '@angular/core';
import { Gif } from '../../interfaces/gif.interfaces';
@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html'

})
export class CardListComponent {
  @Input()
  public gifs:Gif[]=[];
}
