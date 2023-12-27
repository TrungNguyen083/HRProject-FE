import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { EmployeeSkillsRoutingModule } from './employee-skills-routing.module';
import { EmployeeSkillsComponent } from './employee-skills.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [EmployeeSkillsComponent],
  imports: [
    CommonModule,
    EmployeeSkillsRoutingModule,
    DropdownModule,
    TreeTableModule,
    CheckboxModule,
    FormsModule,
    ButtonModule
  ]
})
export class EmployeeSkillsModule { }
