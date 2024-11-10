import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ICompetencyForm, ICompetencyGroup, ICompetencyOverall, IEvaluationFormParams } from 'src/app/components/competency-evaluation/components/evaluation-form/models/evaluation-form.model';
import { EvaluationFormStore } from 'src/app/components/competency-evaluation/components/evaluation-form/stores/evaluation-form.store';
import { SumCompetencyEvaluationStore } from 'src/app/components/sum-competency-evaluation/stores/sum-competency-evaluation.store';

@Component({
  selector: 'app-employee-evaluation-form',
  templateUrl: './employee-evaluation-form.component.html',
  styleUrls: ['./employee-evaluation-form.component.scss']
})
export class EmployeeEvaluationFormComponent implements OnInit {
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
  isLoading = false;
  selectedGroup!: ICompetencyGroup;
  params!: IEvaluationFormParams
  competencyOverall!: ICompetencyOverall

  constructor(
    private fb: FormBuilder,
    private employeeEvaluationFormStore: EvaluationFormStore,
    private sumCompetencyEvaluationStore: SumCompetencyEvaluationStore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadMatrix();
  }

  loadMatrix() {
    combineLatest([
      this.route.queryParams,
      this.sumCompetencyEvaluationStore.currentCycle$
    ]).subscribe(([queryParams, cycleId]) => {
      const employeeId = queryParams['employeeId'];
      if (!cycleId || !employeeId) return;

      this.params = { ...this.params, cycleId, employeeId };
      this.cycleId = cycleId;
      this.employeeId = employeeId;

      this.employeeEvaluationFormStore.getCompetencyOverall(this.params);
      this.employeeEvaluationFormStore.getCompetencyGroup(this.params);
      this.employeeEvaluationFormStore.getCompetencyForm(this.params);
    });

    this.employeeEvaluationFormStore.competencyOverall$.subscribe(res => {
      if (!res) return;
      this.competencyOverall = res;
      this.cycleName = "Employee Competency " + res.evaluationCycleName;
      this.profileImage = res.profileImage;
      this.firstName = res?.firstName ?? '';
      this.lastName = res?.lastName ?? '';
      this.position = res?.position ?? '';
      this.level = res?.level ?? '';
      this.rating = res?.rating ?? '';
      this.status = res?.status ?? 0;
      this.isSubmit = res?.isSubmit ?? false;
    })

    this.employeeEvaluationFormStore.competencyGroupRating$.subscribe(res => {
      if (!res) return;
      this.groups = res;
      this.selectGroup(this.groups[0]);
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

    this.employeeEvaluationFormStore.competencyEvaluationForm$.subscribe(res => {
      if (!res) return;
      this.competencyForm = res.filter(comp => comp.competencyGroupId === this.selectedGroup.id);
      this.initForm();
    })
  }

  onBack() {
    this.employeeEvaluationFormStore.competencyGroupRating$.subscribe(res => {
      const group = res.find(item => item.id === this.evaluationForm.value.competencies[0].groupId - 1)
      if (!group) return
      this.selectGroup(group);
    })
  }

  onNext() {
    this.employeeEvaluationFormStore.competencyGroupRating$.subscribe(res => {
      const group = res.find(item => item.id === this.evaluationForm.value.competencies[0].groupId + 1)
      if (!group) return
      this.selectGroup(group);
    })
  }
}
