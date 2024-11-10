import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ICategoryRating, IEvaluationFormParams, IPerformanceOverall, IQuestionRating } from 'src/app/components/performance-evaluation/components/self-evaluation-form/models/self-evaluation-form.model';
import { SelfEvaluationFormStore } from 'src/app/components/performance-evaluation/components/self-evaluation-form/stores/self-evaluation-form.store';
import { SumPerformanceEvaluationStore } from 'src/app/components/sum-performance-evaluation/stores/sum-performance-evaluation.store';

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
  questionRating!: IQuestionRating[];
  categoryRating!: ICategoryRating[];
  isLoading = false;
  selectedCategory!: ICategoryRating;
  params!: IEvaluationFormParams
  performanceyOverall!: IPerformanceOverall
  evaluationDataList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeEvaluationFormStore: SelfEvaluationFormStore,
    private sumPerformanceEvaluationStore: SumPerformanceEvaluationStore,
    private route: ActivatedRoute,
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

      this.employeeEvaluationFormStore.getPerformanceOverall(this.params);
      this.employeeEvaluationFormStore.getCategoryRating(this.params);
      this.employeeEvaluationFormStore.getQuestionRating(this.params);
    });

    this.employeeEvaluationFormStore.performanceOverall$.subscribe(res => {
      if (!res) return;
      this.performanceyOverall = res;
      this.cycleName = "Manager Performance " + res.evaluationCycleName;
      this.profileImage = res.profileImage;
      this.firstName = res?.firstName ?? '';
      this.lastName = res?.lastName ?? '';
      this.position = res?.position ?? '';
      this.level = res?.level ?? '';
      this.rating = res?.rating ?? '';
      this.status = res?.status ?? 0;
      this.isSubmit = res?.isSubmit ?? false;
    })

    this.employeeEvaluationFormStore.performanceCategoryRating$.subscribe(res => {
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
          rating: [{ value: ques.rating || 1, disabled: true }, [Validators.required]],
          comment: [{ value: ques.comment || '', disabled: true }, [Validators.required]]
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

    this.employeeEvaluationFormStore.performanceQuestionRating$.subscribe(res => {
      if (!res) return;
      this.questionRating = res.filter(ques => ques.categoryId === this.selectedCategory.categoryId);
      this.initForm();
    })
  }

  onBack() {
    this.employeeEvaluationFormStore.performanceCategoryRating$.subscribe(res => {
      const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId - 1)
      if (!category) return
      this.selectCategory(category);
    })
  }

  onNext() {
    this.employeeEvaluationFormStore.performanceCategoryRating$.subscribe(res => {
      const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId + 1)
      if (!category) return
      this.selectCategory(category);
    })
  }
}
