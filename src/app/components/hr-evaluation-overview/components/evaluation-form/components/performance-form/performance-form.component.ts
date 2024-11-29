import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { IEmployeeFeedback } from 'src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model';
import { HrEvaluationOverviewStore } from 'src/app/components/hr-evaluation-overview/stores/hr-evaluation-overview.store';
import { FinalEvaluationFormStore } from 'src/app/components/performance-evaluation/components/final-evaluation-form/stores/final-evaluation-form.store';
import { ICategoryRating, IEvaluationFormParams, IPerformanceOverall, IQuestionRating } from 'src/app/components/performance-evaluation/components/self-evaluation-form/models/self-evaluation-form.model';

@Component({
  selector: 'app-performance-form',
  templateUrl: './performance-form.component.html',
  styleUrls: ['./performance-form.component.scss']
})
export class PerformanceFormComponent implements OnInit {
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
  feedbacks!: IEmployeeFeedback[];
  isLoading = false;
  selectedCategory!: ICategoryRating;
  params!: IEvaluationFormParams
  performanceyOverall!: IPerformanceOverall
  evaluationDataList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private finalEvaluationFormStore: FinalEvaluationFormStore,
    private hrEvaluationOverviewStore: HrEvaluationOverviewStore,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadMatrix();
  }

  loadMatrix() {
    combineLatest([
      this.hrEvaluationOverviewStore.currentCycle$,
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
          rating: [{ value: ques.rating || 1, disabled: true }, [Validators.required]],
          comment: [{ value: ques.comment || '', disabled: true }, [Validators.required]]
        })
      ))
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
    this.router.navigate(['/hr-evaluation-overview/evaluation-result']);
  }

  onBack() {
    this.finalEvaluationFormStore.finalPerformanceCategoryRating$.subscribe(res => {
      const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId - 1)
      if (!category) return
      this.selectCategory(category);
    })
  }

  onNext() {
    this.finalEvaluationFormStore.finalPerformanceCategoryRating$.subscribe(res => {
      const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId + 1)
      if (!category) return
      this.selectCategory(category);
    })
  }
}