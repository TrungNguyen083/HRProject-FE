import { Component } from '@angular/core';

interface CareerPath {
  title: string;
  match: number;
  isMatched: boolean;
}
@Component({
  selector: 'employee-career-path',
  templateUrl: './employee-career-path.component.html',
  styleUrls: ['./employee-career-path.component.scss'],
})
export class EmployeeCareerPathComponent {
  events: CareerPath[] = [
    {
      title: 'Senior Software Engineer',
      match: 100,
      isMatched: true,
    },
    {
      title: 'Expert Software Engineer',
      match: 55,
      isMatched: false,
    },
    {
      title: 'Professional Software Architect',
      match: 5,
      isMatched: false,
    }
  ];
}
