
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent {
  selectedCategory = signal('home');

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
