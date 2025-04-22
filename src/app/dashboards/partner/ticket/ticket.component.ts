import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit  {
  board = {
    columns: [
      { id: 'pending', name: 'Pending', tasks: ['Fix login bug'] },
      { id: 'resolved', name: 'Resolved', tasks: [] },
      { id: 'verified', name: 'Verified', tasks: [] },
      { id: 'merging', name: 'Merging', tasks: [] }
    ]
  };
  connectedDropLists: string[] = [];

  ngOnInit() {
    this.connectedDropLists = this.board.columns.map(c => c.id);
  }
  
  drop(event: any) {
    const previousContainer = event.previousContainer;
    const container = event.container;

    if (previousContainer === container) {
      return;
    }

    const prevData = previousContainer.data;
    const currData = container.data;

    const [movedItem] = prevData.splice(event.previousIndex, 1);
    currData.splice(event.currentIndex, 0, movedItem);
  }
}
