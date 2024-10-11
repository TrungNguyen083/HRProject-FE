import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluation-template-form',
  templateUrl: './evaluation-template-form.component.html',
  styleUrls: ['./evaluation-template-form.component.scss']
})
export class EvaluationTemplateFormComponent {
  categories = [
    { id: 1, name: 'Category 1', weight: 25, ratingScheme: 'Rating scheme', description: 'Description for Category 1' },
    { id: 2, name: 'Category 2', weight: 30, ratingScheme: 'Rating scheme', description: 'Description for Category 2' },
    { id: 3, name: 'Category 3', weight: 45, ratingScheme: 'Rating scheme', description: 'Description for Category 3' },
  ];

  selectedCategory = this.categories[0];
  selectCategory(category: { id: number; name: string; weight: number; ratingScheme: string; description: string }) {
    this.selectedCategory = category;
  }
}
