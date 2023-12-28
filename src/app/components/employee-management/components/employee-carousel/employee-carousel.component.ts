import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadNewEmployees } from '../../store/employee-management.actions';
import { selectNewEmployees } from '../../store/employee-management.selectors';
@Component({
  selector: 'employee-carousel',
  templateUrl: './employee-carousel.component.html',
  styleUrls: ['./employee-carousel.component.scss'],
})
export class EmployeeCarouselComponent implements OnInit {
  employeesInfo$ = this.store.select(selectNewEmployees)
  responsiveOptions;

  constructor(private store: Store) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(loadNewEmployees())
  }
}
