import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';


@Component({
  selector: 'app-exceptions',
  standalone: true,
  imports: [TableComponent,ExceptionsComponent],
  templateUrl: './exceptions.component.html',
  styleUrl: './exceptions.component.css'
})
export class ExceptionsComponent {

}
