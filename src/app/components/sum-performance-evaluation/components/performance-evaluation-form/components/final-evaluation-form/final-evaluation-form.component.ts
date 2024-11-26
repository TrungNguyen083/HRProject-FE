import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { IEmployeeFeedback } from 'src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model';
import { FinalEvaluationFormService } from 'src/app/components/performance-evaluation/components/final-evaluation-form/services/final-evaluation-form.service';
import { FinalEvaluationFormStore } from 'src/app/components/performance-evaluation/components/final-evaluation-form/stores/final-evaluation-form.store';
import { ICategoryRating, IEvaluationFormParams, IPerformanceEvaluationInput, IPerformanceOverall, IQuestionRating } from 'src/app/components/performance-evaluation/components/self-evaluation-form/models/self-evaluation-form.model';
import { SumPerformanceEvaluationStore } from 'src/app/components/sum-performance-evaluation/stores/sum-performance-evaluation.store';
import { NotificationService } from 'src/app/shared/message/notification.service';

@Component({
  selector: 'app-final-evaluation-form',
  templateUrl: './final-evaluation-form.component.html',
  styleUrls: ['./final-evaluation-form.component.scss']
})
export class FinalEvaluationFormComponent implements OnInit {
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
  potential!: number;
  evaluationForm!: FormGroup;
  questionRating!: IQuestionRating[];
  categoryRating!: ICategoryRating[];
  feedbacks!: IEmployeeFeedback[];
  isLoading = false;
  selectedCategory!: ICategoryRating;
  params!: IEvaluationFormParams
  performanceyOverall!: IPerformanceOverall
  evaluationDataList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private finalEvaluationFormStore: FinalEvaluationFormStore,
    private sumPerformanceEvaluationStore: SumPerformanceEvaluationStore,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private finalEvaluationFormService: FinalEvaluationFormService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadMatrix();
  }

  loadMatrix() {
    combineLatest([
      this.sumPerformanceEvaluationStore.currentCycle$,
      this.route.queryParams,
    ]).subscribe(([cycleId, queryParams]) => {
      const employeeId = queryParams['employeeId'];
      if (!cycleId || !employeeId) return;

      this.params = { ...this.params, cycleId, employeeId };
      this.cycleId = cycleId;
      this.employeeId = employeeId;

      this.finalEvaluationFormStore.getFinalPerformanceOverall(this.params);
      this.finalEvaluationFormStore.getFinalCategoryRating(this.params);
      this.finalEvaluationFormStore.getFinalQuestionRating(this.params);
      this.finalEvaluationFormStore.getEmployeeFeedback(this.params);
    });

    this.finalEvaluationFormStore.finalPerformanceOverall$.subscribe(res => {
      if (!res) return;
      this.performanceyOverall = res;
      this.cycleName = "Final Performance " + res.evaluationCycleName;
      this.profileImage = res.profileImage;
      this.firstName = res?.firstName ?? '';
      this.lastName = res?.lastName ?? '';
      this.position = res?.position ?? '';
      this.level = res?.level ?? '';
      this.rating = res?.rating ?? '';
      this.potential = res?.potential ?? 1;
      this.status = res?.status ?? 0;
      this.isSubmit = res?.isSubmit ?? false;
    })

    this.finalEvaluationFormStore.finalPerformanceCategoryRating$.subscribe(res => {
      if (!res) return;
      this.categoryRating = res;
      this.selectCategory(this.categoryRating[0]);
    });

    this.finalEvaluationFormStore.employeeFeedback$.subscribe(res => {
      if (!res) return;
      this.feedbacks = res;
    });
  }

  initForm() {
    this.evaluationForm = this.fb.group({
      questions: this.fb.array(this.questionRating.map(ques =>
        this.fb.group({
          questionId: [ques.questionId],
          categoryId: [ques.categoryId],
          rating: [{ value: ques.rating || 1, disabled: this.isSubmit }, [Validators.required]],
          comment: [{ value: ques.comment || '', disabled: this.isSubmit }, [Validators.required]],
        })
      )),
      potential: [{ value: this.potential || 1, disabled: this.isSubmit }, [Validators.required]],
    });

    if (this.isSubmit) {
      this.questions.controls.forEach(control => {
        control.get('rating')?.disable();
        control.get('comment')?.disable();
      });
      this.evaluationForm.get('potential')?.disable();
    }

    this.evaluationForm.get('potential')?.valueChanges.subscribe(value => {
      this.potential = value;
    });
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

    this.finalEvaluationFormStore.finalPerformanceQuestionRating$.subscribe(res => {
      if (!res) return;
      this.questionRating = res.filter(ques => ques.categoryId === this.selectedCategory.categoryId);
      this.initForm();
    })
  }

  onCancel() {
    this.confirmationService.confirm({
      message: 'Are you to go back to dashboard?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/sum-performance-evaluation']);
      },
      reject: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(type: string) {
    switch (type) {
      case 'Next':
        this.finalEvaluationFormStore.finalPerformanceCategoryRating$.subscribe(res => {
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
        this.finalEvaluationFormStore.finalPerformanceCategoryRating$.subscribe(res => {
          const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId - 1)
          if (!category) return

          // Remove current item out of evaluationDataList
          this.finalEvaluationFormStore.finalPerformanceQuestionRating$.subscribe(ques => {
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
              potential: this.potential,
              questionRating: this.evaluationDataList[0].questions.map((question: any) => ({
                questionId: question.questionId,
                comment: question.comment,
                rating: question.rating
              }))
            }
            this.createFinalEvaluation(input);
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
              potential: this.potential,
              questionRating: this.evaluationDataList[0].questions.map((question: any) => ({
                questionId: question.questionId,
                comment: question.comment,
                rating: question.rating
              }))
            }
            this.createFinalEvaluation(input);
          },
          reject: () => {
            this.isLoading = false;
          }
        });
        break;
      default:
    }
  }

  createFinalEvaluation(input: IPerformanceEvaluationInput) {
    this.finalEvaluationFormService.createFinalEvaluation(input)
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
}
