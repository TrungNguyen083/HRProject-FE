import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICompetencyForm, ICompetencyGroup, ICompetencyOverall, IEvaluationFormParams } from '../evaluation-form/models/evaluation-form.model';
import { CompetencyEvaluationStore } from '../../stores/competency-evaluation.store';
import { combineLatest } from 'rxjs';
import { ManagerEvaluationFormStore } from './stores/manager-evaluation-form.store';
import { IEmployeeFeedback } from './models/manager-evaluation-form.model';

@Component({
  selector: 'app-manager-evaluation-form',
  templateUrl: './manager-evaluation-form.component.html',
  styleUrls: ['./manager-evaluation-form.component.scss']
})
export class ManagerEvaluationFormComponent implements OnInit {
  cycleId!: number;
  cycleName!: string;
  profileImage = 'assets/images/avatar-default.jpg';
  employeeId!: number;
  firstName!: string;
  lastName!: string;
  position!: string;
  level!: string;
  rating!: number;
  status!: string;
  isSubmit!: boolean;
  evaluationForm!: FormGroup;
  competencyForm!: ICompetencyForm[];
  groups!: ICompetencyGroup[];
  feedbacks!: IEmployeeFeedback[];
  isLoading = false;
  selectedGroup!: ICompetencyGroup;
  params!: IEvaluationFormParams
  competencyOverall!: ICompetencyOverall

  constructor(
    private fb: FormBuilder,
    private managerEvaluationFormStore: ManagerEvaluationFormStore,
    private competencyEvaluationStore: CompetencyEvaluationStore,
  ) { }

  ngOnInit(): void {
    this.loadMatrix();
  }

  loadMatrix() {
    combineLatest([
      this.competencyEvaluationStore.currentCycle$,
      this.competencyEvaluationStore.employeeId$
    ]).subscribe(([cycleId, employeeId]) => {
      if (!cycleId || !employeeId) return;

      this.params = { ...this.params, cycleId, employeeId };
      this.cycleId = cycleId;
      this.employeeId = employeeId;

      this.managerEvaluationFormStore.getManagerCompetencyOverall(this.params);
      this.managerEvaluationFormStore.getManagerCompetencyGroup(this.params);
      this.managerEvaluationFormStore.getManagerCompetencyForm(this.params);
      this.managerEvaluationFormStore.getEmployeeFeedback(this.params);
    });

    this.managerEvaluationFormStore.managerCompetencyOverall$.subscribe(res => {
      if (!res) return;
      this.competencyOverall = res;
      this.cycleName = "Manager Competency " + res.evaluationCycleName;
      this.profileImage = res.profileImage;
      this.firstName = res?.firstName ?? '';
      this.lastName = res?.lastName ?? '';
      this.position = res?.position ?? '';
      this.level = res?.level ?? '';
      this.rating = res?.rating ?? '';
      this.status = res?.status ?? 0;
      this.isSubmit = res?.isSubmit ?? false;
    })

    this.managerEvaluationFormStore.managerCompetencyGroupRating$.subscribe(res => {
      if (!res) return;
      this.groups = res;
      this.selectGroup(this.groups[0]);
    });

    this.managerEvaluationFormStore.employeeFeedback$.subscribe(res => {
      if (!res) return;
      this.feedbacks = res;
    });
  }

  initForm() {
    this.evaluationForm = this.fb.group({
      competencies: this.fb.array(this.competencyForm.map(comp =>
        this.fb.group({
          competencyId: [comp.competency.id],
          groupId: [comp.competencyGroupId],
          rating: [{ value: comp.competency.rating || 1, disabled: true }, [Validators.required]],
          comment: [{ value: comp.competency.comment || '', disabled: true }, [Validators.required]]
        })
      ))
    });
  }

  get competencies() {
    return this.evaluationForm.get('competencies') as FormArray;
  }

  getCompetencyFormGroup(index: number): FormGroup {
    return this.competencies.at(index) as FormGroup;
  }

  selectGroup(group: ICompetencyGroup) {
    if (this.selectedGroup && this.selectedGroup.id === group.id) return;
    this.selectedGroup = group;

    this.managerEvaluationFormStore.managerCompetencyEvaluationForm$.subscribe(res => {
      if (!res) return;
      this.competencyForm = res.filter(comp => comp.competencyGroupId === this.selectedGroup.id);
      this.initForm();
    })
  }

  onBack() {
    this.managerEvaluationFormStore.managerCompetencyGroupRating$.subscribe(res => {
      const group = res.find(item => item.id === this.evaluationForm.value.competencies[0].groupId - 1)
      if (!group) return
      this.selectGroup(group);
    })
  }

  onNext() {
    this.managerEvaluationFormStore.managerCompetencyGroupRating$.subscribe(res => {
      const group = res.find(item => item.id === this.evaluationForm.value.competencies[0].groupId + 1)
      if (!group) return
      this.selectGroup(group);
    })
  }
}
