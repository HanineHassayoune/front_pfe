import { Component, Input } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { KinbanComponent } from '../../../components/kinban/kinban.component';
import { CardComponent } from '../../../components/card/card.component';


@Component({
  selector: 'app-exceptions',
  standalone: true,
  imports: [TableComponent,KinbanComponent,CardComponent],
  templateUrl: './exceptions.component.html',
  styleUrl: './exceptions.component.css'
})
export class ExceptionsComponent {
  column1Title: string = 'Low';
  column2Title: string = 'Medium';
  column3Title: string = 'High';
  column1Data: string[] = ['Tâche 1', 'Tâche 2'];
  column2Data: string[] = ['Tâche 3', 'Tâche 4'];
  column3Data: string[] = ['Tâche 5', 'Tâche 6'];



  columns = [
    { field: 'exception', header: 'Exception' },
    { field: 'type', header: 'Type' },
    { field: 'level', header: 'Level' },
    { field: 'description', header: 'Description' },
    { field: 'timestamp', header: 'Timestamp' },
  
  ];

  // Exemple de données à afficher
  rows = [
    {
      exception: 'Null Pointer Exception',
      type: 'Error',
      level: 'High',
      description: 'Occurred while trying to access a null object.',
      timestamp: '2025-02-05 12:45:00',
    
    },
    {
      exception: 'Index Out Of Bound Exception',
      type: 'Error',
      level: 'Medium',
      description: 'Tried to access an element outside of the array bounds.',
      timestamp: '2025-02-05 14:30:15',
      
    },
    {
      exception: 'SQL Syntax Error',
      type: 'Warning',
      level: 'Low',
      description: 'SQL query contains incorrect syntax.',
      timestamp: '2025-02-05 16:22:45',
     
    },
    {
      exception: 'File Not Found',
      type: 'Error',
      level: 'High',
      description: 'The requested file could not be located.',
      timestamp: '2025-02-05 18:00:30',
      
    }
  ];

}
