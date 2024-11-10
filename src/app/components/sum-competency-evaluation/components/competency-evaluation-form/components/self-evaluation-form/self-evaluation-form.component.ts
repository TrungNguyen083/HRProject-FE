import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { ICompetencyEvaluationInput, ICompetencyForm, ICompetencyGroup, ICompetencyOverall, IEvaluationFormParams } from 'src/app/components/competency-evaluation/components/evaluation-form/models/evaluation-form.model';
import { IEmployeeFeedback } from 'src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model';
import { ManagerEvaluationFormService } from 'src/app/components/competency-evaluation/components/manager-evaluation-form/services/manager-evaluation-form.service';
import { ManagerEvaluationFormStore } from 'src/app/components/competency-evaluation/components/manager-evaluation-form/stores/manager-evaluation-form.store';
import { SumCompetencyEvaluationStore } from 'src/app/components/sum-competency-evaluation/stores/sum-competency-evaluation.store';
import { NotificationService } from 'src/app/shared/message/notification.service';

@Component({
  selector: 'app-self-evaluation-form',
  templateUrl: './self-evaluation-form.component.html',
  styleUrls: ['./self-evaluation-form.component.scss']
})
export class SelfEvaluationFormComponent implements OnInit {
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
  evaluationDataList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private managerEvaluationFormStore: ManagerEvaluationFormStore,
    private sumCompetencyEvaluationStore: SumCompetencyEvaluationStore,
    private managerEvaluationFormService: ManagerEvaluationFormService,
    private route: ActivatedRoute,
    private router: Router,
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

      this.managerEvaluationFormStore.getManagerCompetencyOverall(this.params);
      this.managerEvaluationFormStore.getManagerCompetencyGroup(this.params);
      this.managerEvaluationFormStore.getManagerCompetencyForm(this.params);
      this.managerEvaluationFormStore.getEmployeeFeedback(this.params);
    });

    this.managerEvaluationFormStore.managerCompetencyOverall$.subscribe(res => {
      if (!res) return;
      this.competencyOverall = res;
      this.cycleName = "Self Competency " + res.evaluationCycleName;
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
          rating: [{ value: comp.competency.rating || 1, disabled: this.isSubmit }, [Validators.required]],
          comment: [{ value: comp.competency.comment || '', disabled: this.isSubmit }, [Validators.required]]
        })
      ))
    });

    if (this.isSubmit) {
      this.competencies.controls.forEach(control => {
        control.get('rating')?.disable();
        control.get('comment')?.disable();
      });
    }
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

  onCancel() {
    this.confirmationService.confirm({
      message: 'Are you to go back to dashboard?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/sum-competency-evaluation']);
      },
      reject: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(type: string) {
    switch (type) {
      case 'Next':
        this.managerEvaluationFormStore.managerCompetencyGroupRating$.subscribe(res => {
          const group = res.find(item => item.id === this.evaluationForm.value.competencies[0].groupId + 1)
          if (!group) return
          if (this.evaluationDataList.length === 0) {
            this.evaluationDataList.push(this.evaluationForm.value);
          } else {
            const lastEntry = this.evaluationDataList[this.evaluationDataList.length - 1];
            lastEntry.competencies.push(...this.evaluationForm.value.competencies);
          }
          this.selectGroup(group);
        })
        break;
      case 'Back':
        this.managerEvaluationFormStore.managerCompetencyGroupRating$.subscribe(res => {
          const group = res.find(item => item.id === this.evaluationForm.value.competencies[0].groupId - 1)
          if (!group) return

          // Remove current item out of evaluationDataList
          this.managerEvaluationFormStore.managerCompetencyEvaluationForm$.subscribe(comp => {
            const length = comp.filter(item => item.competencyGroupId === group.id).length;
            for (let i = 0; i < length; i++) {
              this.evaluationDataList[0].competencies.pop();
            }
          })

          this.selectGroup(group);
        })
        break;
      case 'Draft':
        // this.isLoading = true;
        this.confirmationService.confirm({
          message: 'Are save these competencies?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const lastEntry = this.evaluationDataList[this.evaluationDataList.length - 1];
            lastEntry.competencies.push(...this.evaluationForm.value.competencies);
            const input: ICompetencyEvaluationInput = {
              employeeId: this.employeeId,
              cycleId: this.cycleId,
              isSubmit: false,
              competencyRating: this.evaluationDataList[0].competencies.map((competency: any) => ({
                competencyId: competency.competencyId,
                comment: competency.comment,
                rating: competency.rating
              }))
            }
            this.createSelfEvaluation(input);
          },
          reject: () => {
            this.isLoading = false;
          }
        });
        break;
      case 'Submit':
        // this.isLoading = true;
        this.confirmationService.confirm({
          message: 'Are save these competencies?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const lastEntry = this.evaluationDataList[this.evaluationDataList.length - 1];
            lastEntry.competencies.push(...this.evaluationForm.value.competencies);
            const input: ICompetencyEvaluationInput = {
              employeeId: this.employeeId,
              cycleId: this.cycleId,
              isSubmit: true,
              competencyRating: this.evaluationDataList[0].competencies.map((competency: any) => ({
                competencyId: competency.competencyId,
                comment: competency.comment,
                rating: competency.rating
              }))
            }
            this.createSelfEvaluation(input);
          },
          reject: () => {
            this.isLoading = false;
          }
        });
        break;
      default:
    }
  }

  createSelfEvaluation(input: ICompetencyEvaluationInput) {
    this.managerEvaluationFormService.createManagerEvaluation(input)
      .pipe()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.successNotification(
            `Add competency evaluation successfully`,
          );
          this.loadMatrix();
        },
        error: (err) => {
          this.isLoading = false;
          this.notificationService.errorNotification(
            `Failed to add competency evaluation`
          );
        }
      });
  }

}
