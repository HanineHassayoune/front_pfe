import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent {
  @Input() ticketTitle: string = 'Fix login bug';
  @Input() solutionText: string = 'You should use FormBuilder to simplify reactive forms in Angular.';
  @Input() description: string = 'This solution suggests using Angular FormBuilder for concise and readable reactive form definitions.';
  @Input() technologies: string = 'Angular, TypeScript, Reactive Forms';
  @Input() referenceLink?: string = 'https://angular.io/guide/reactive-forms';
  @Input() author: string = 'Hanin 😎';
  @Input() datePosted: string = 'April 22, 2025';
  @Input() isVerified: boolean = true;
}
