import { Component, ViewEncapsulation } from '@angular/core';
import { defaultImg } from 'src/app/constants/app.constant';

const mockData = [
  {
    employeeId: 1,
    goalName: "Develop New Features",
    profileImage: defaultImg,
    goalProgress: 100
  },
  {
    employeeId: 2,
    goalName: "Improve Code Quality",
    profileImage: defaultImg,
    goalProgress: 65
  },
  {
    employeeId: 3,
    goalName: "Enhance Security Protocols",
    profileImage: defaultImg,
    goalProgress: 25
  },
  {
    employeeId: 4,
    goalName: "Optimize Performance",
    profileImage: defaultImg,
    goalProgress: 5
  },
  {
    employeeId: 5,
    goalName: "Refactor Legacy Code",
    profileImage: defaultImg,
    goalProgress: 90
  },
  {
    employeeId: 6,
    goalName: "Increase Test Coverage",
    profileImage: defaultImg,
    goalProgress: 45
  },
  {
    employeeId: 7,
    goalName: "Automate Deployment",
    profileImage: defaultImg,
    goalProgress: 70
  },
  {
    employeeId: 8,
    goalName: "Build API Integrations",
    profileImage: defaultImg,
    goalProgress: 30
  },
  {
    employeeId: 9,
    goalName: "Improve UI/UX Design",
    profileImage: defaultImg,
    goalProgress: 50
  },
  {
    employeeId: 10,
    goalName: "Conduct User Research",
    profileImage: defaultImg,
    goalProgress: 85
  }
];




@Component({
  selector: 'goal-progress',
  templateUrl: './goal-progress.component.html',
  styleUrls: ['./goal-progress.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class GoalProgressComponent {
  eGoals = mockData;
  defaultImg = defaultImg;
}
