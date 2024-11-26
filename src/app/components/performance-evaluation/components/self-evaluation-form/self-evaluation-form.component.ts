import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryRating, IEvaluationFormParams, IPerformanceEvaluationInput, IPerformanceOverall, IQuestionRating } from './models/self-evaluation-form.model';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { SelfEvaluationFormStore } from './stores/self-evaluation-form.store';
import { PerformanceEvaluationStore } from '../../stores/performance-evaluation.store';
import { ConfirmationService } from 'primeng/api';
import { SelfEvaluationFormService } from './services/self-evaluation-form.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

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
  questionRating!: IQuestionRating[];
  categoryRating!: ICategoryRating[];
  isLoading = false;
  selectedCategory!: ICategoryRating;
  params!: IEvaluationFormParams
  performanceyOverall!: IPerformanceOverall
  evaluationDataList: any[] = [];


  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private selfEvaluationFormStore: SelfEvaluationFormStore,
    private performanceEvaluationStore: PerformanceEvaluationStore,
    private confirmationService: ConfirmationService,
    private selfEvaluationFormService: SelfEvaluationFormService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadMatrix();
  }

  loadMatrix() {
    combineLatest([
      this.performanceEvaluationStore.currentCycle$,
      this.performanceEvaluationStore.employeeId$
    ]).subscribe(([cycleId, employeeId]) => {
      if (!cycleId || !employeeId) return;

      this.params = { ...this.params, cycleId, employeeId };
      this.cycleId = cycleId;
      this.employeeId = employeeId;

      this.selfEvaluationFormStore.getPerformanceOverall(this.params);
      this.selfEvaluationFormStore.getCategoryRating(this.params);
      this.selfEvaluationFormStore.getQuestionRating(this.params);
    });

    this.selfEvaluationFormStore.performanceOverall$.subscribe(res => {
      if (!res) return;
      this.performanceyOverall = res;
      this.cycleName = "Self Performance " + res.evaluationCycleName;
      this.profileImage = res.profileImage;
      this.firstName = res?.firstName ?? '';
      this.lastName = res?.lastName ?? '';
      this.position = res?.position ?? '';
      this.level = res?.level ?? '';
      this.rating = res?.rating ?? '';
      this.status = res?.status ?? 0;
      this.isSubmit = res?.isSubmit ?? false;
    })

    this.selfEvaluationFormStore.performanceCategoryRating$.subscribe(res => {
      if (!res) return;
      this.categoryRating = res;
      this.selectCategory(this.categoryRating[0]);
    });
  }

  initForm() {
    this.evaluationForm = this.fb.group({
      questions: this.fb.array(this.questionRating.map(ques =>
        this.fb.group({
          questionId: [ques.questionId],
          categoryId: [ques.categoryId],
          rating: [{ value: ques.rating || 1, disabled: this.isSubmit }, [Validators.required]],
          comment: [{ value: ques.comment || '', disabled: this.isSubmit }, [Validators.required]]
        })
      ))
    });

    if (this.isSubmit) {
      this.questions.controls.forEach(control => {
        control.get('rating')?.disable();
        control.get('comment')?.disable();
      });
    }
  }

  get questions() {
    return this.evaluationForm.get('questions') as FormArray;
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  selectCategory(category: ICategoryRating) {
    if (this.selectedCategory && this.selectedCategory.categoryId === category.categoryId) return;
    this.selectedCategory = category;

    this.selfEvaluationFormStore.performanceQuestionRating$.subscribe(res => {
      if (!res) return;
      this.questionRating = res.filter(ques => ques.categoryId === this.selectedCategory.categoryId);
      this.initForm();
    })
  }

  onSubmit(type: string) {
    switch (type) {
      case 'Next':
        this.selfEvaluationFormStore.performanceCategoryRating$.subscribe(res => {
          const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId + 1)
          if (!category) return
          if (this.evaluationDataList.length === 0) {
            this.evaluationDataList.push(this.evaluationForm.value);
          } else {
            const lastEntry = this.evaluationDataList[this.evaluationDataList.length - 1];
            lastEntry.questions.push(...this.evaluationForm.value.questions);
          }
          this.selectCategory(category);
        })
        break;
      case 'Back':
        this.selfEvaluationFormStore.performanceCategoryRating$.subscribe(res => {
          const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId - 1)
          if (!category) return

          // Remove current item out of evaluationDataList
          this.selfEvaluationFormStore.performanceQuestionRating$.subscribe(ques => {
            const length = ques.filter(ques => ques.categoryId === category.categoryId).length;
            for (let i = 0; i < length; i++) {
              this.evaluationDataList[0].questions.pop();
            }
          })

          this.selectCategory(category);
        })
        break;
      case 'Draft':
        // this.isLoading = true;
        this.confirmationService.confirm({
          message: 'Are save these questions?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const lastEntry = this.evaluationDataList[this.evaluationDataList.length - 1];
            lastEntry.questions.push(...this.evaluationForm.value.questions);
            const input: IPerformanceEvaluationInput = {
              employeeId: this.employeeId,
              cycleId: this.cycleId,
              isSubmit: false,
              questionRating: this.evaluationDataList[0].questions.map((question: any) => ({
                questionId: question.questionId,
                comment: question.comment,
                rating: question.rating
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
          message: 'Are save these questions?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const lastEntry = this.evaluationDataList[this.evaluationDataList.length - 1];
            lastEntry.questions.push(...this.evaluationForm.value.questions);
            const input: IPerformanceEvaluationInput = {
              employeeId: this.employeeId,
              cycleId: this.cycleId,
              isSubmit: true,
              questionRating: this.evaluationDataList[0].questions.map((question: any) => ({
                questionId: question.questionId,
                comment: question.comment,
                rating: question.rating
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

  createSelfEvaluation(input: IPerformanceEvaluationInput) {
    this.selfEvaluationFormService.createSelfEvaluation(input)
      .pipe()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.successNotification(
            `Add performance evaluation successfully`,
          );
          this.loadMatrix();
        },
        error: (err) => {
          this.isLoading = false;
          this.notificationService.errorNotification(
            `Failed to add performance evaluation`
          );
        }
      });
  }

  onCancel() {
    this.confirmationService.confirm({
      message: 'Are you to go back to dashboard?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/my-dashboard/summary']);
      },
      reject: () => {
        this.isLoading = false;
      }
    });
  }
}
