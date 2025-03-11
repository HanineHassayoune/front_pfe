import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';


@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent {

}
