import { Component, Input } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kinban',
  standalone: true,
  imports: [CommonModule,DragDropModule],
  templateUrl: './kinban.component.html',
  styleUrls: ['./kinban.component.css']
})
export class KinbanComponent {
  @Input() title: string = '';
  @Input() column1Title: string = '';
  @Input() column2Title: string = '';
  @Input() column3Title: string = '';
  @Input() column1Data: string[] = [];
  @Input() column2Data: string[] = [];
  @Input() column3Data: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
