import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-chips',
  standalone: true,
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class ChipsComponent<T> implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputCtrl = new FormControl('');
  filteredItems!: Observable<T[]>;

  @Input() label = 'Items';
  @Input() placeholder = 'New item...';
  @Input() allItems: T[] = [];
  @Input() selectedItems: T[] = [];
  @Input() displayWith: (item: any) => string = (item) => item?.toString?.() || '';


  @Output() selectedItemsChange = new EventEmitter<T[]>();
  @Output() itemAdded = new EventEmitter<T>();
  @Output() itemRemoved = new EventEmitter<T>();

  @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  private validateDisplayWith(): void {
    if (!this.displayWith || typeof this.displayWith !== 'function') {
      console.warn('displayWith is invalid. Using default function.');
      this.displayWith = (item: T) => (item ? String(item) : ''); 
    } else {
      console.debug('Validated displayWith:', this.displayWith);
    }
  }
  
  
  
  ngOnInit(): void {
    this.validateDisplayWith(); // Validate when initializing
    this.filteredItems = this.inputCtrl.valueChanges.pipe(
      startWith(''),
      map((input) => {
        console.debug('Filtering input:', input); // Log the user input
        return this._filter(input || '');
      })
    );
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayWith']) {
      this.validateDisplayWith();
    }
    // Fallback si displayWith était undefined initialement
    if (!this.displayWith || typeof this.displayWith !== 'function') {
      this.validateDisplayWith();
    }
  }
  
  

  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!value) return;

    const existing = this.allItems.find(item => this.displayWith(item).toLowerCase() === value.toLowerCase());
    const item = existing || (value as unknown as T);

    if (!this.isAlreadySelected(item)) {
      this.selectedItems.push(item);
      this.emitChanges(item, 'add');
    }

    event.chipInput!.clear();
    this.inputCtrl.setValue('');
  }

  remove(item: T): void {
    const index = this.selectedItems.indexOf(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
      this.emitChanges(item, 'remove');
      this.announcer.announce(`Removed ${this.displayWith(item)}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const item = event.option.value as T;
    if (!this.isAlreadySelected(item)) {
      this.selectedItems.push(item);
      this.emitChanges(item, 'add');
    }
    this.chipInput.nativeElement.value = '';
    this.inputCtrl.setValue('');
  }

  private isAlreadySelected(item: T): boolean {
    return this.selectedItems.some(
      selected => this.displayWith(selected).toLowerCase() === this.displayWith(item).toLowerCase()
    );
  }

  private _filter(value: string): T[] {
    const filterValue = (value || '').toLowerCase(); // Normalize the input value
    console.debug('Filtering value:', filterValue); // Debug input filtering value
  
    return this.allItems.filter((item) => {
      const displayValue = this.displayWith(item); // Validate display output for each item
      console.debug('Display value:', displayValue); // Log the display value
  
      return typeof displayValue === 'string' && displayValue.toLowerCase().includes(filterValue); // Safely filter strings
    });
  }
  
  
  

  private emitChanges(item: T, action: 'add' | 'remove'): void {
    this.selectedItemsChange.emit(this.selectedItems);
    action === 'add' ? this.itemAdded.emit(item) : this.itemRemoved.emit(item);
  }

  trackByFn(index: number, item: T): any {
    if (!this.displayWith || typeof this.displayWith !== 'function') {
      //console.warn('displayWith is invalid. Using default function.');
      this.displayWith = (item: T) => String(item);
    }
    return this.displayWith(item) || index;
  }
  
  
}
