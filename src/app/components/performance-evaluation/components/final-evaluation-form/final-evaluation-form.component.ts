import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryRating, IEvaluationFormParams, IPerformanceOverall, IQuestionRating } from '../self-evaluation-form/models/self-evaluation-form.model';
import { IEmployeeFeedback } from 'src/app/components/competency-evaluation/components/manager-evaluation-form/models/manager-evaluation-form.model';
import { FinalEvaluationFormStore } from './stores/final-evaluation-form.store';
import { PerformanceEvaluationStore } from '../../stores/performance-evaluation.store';
import { combineLatest } from 'rxjs';

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
    private performanceEvaluationStore: PerformanceEvaluationStore,
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

      this.finalEvaluationFormStore.getFinalPerformanceOverall(this.params);
      this.finalEvaluationFormStore.getFinalCategoryRating(this.params);
      this.finalEvaluationFormStore.getFinalQuestionRating(this.params);
      this.finalEvaluationFormStore.getEmployeeFeedback(this.params);
    });

    this.finalEvaluationFormStore.FinalPerformanceOverall$.subscribe(res => {
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

    this.finalEvaluationFormStore.FinalPerformanceCategoryRating$.subscribe(res => {
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

    this.finalEvaluationFormStore.FinalPerformanceQuestionRating$.subscribe(res => {
      if (!res) return;
      this.questionRating = res.filter(ques => ques.categoryId === this.selectedCategory.categoryId);
      this.initForm();
    })
  }

  onBack() {
    this.finalEvaluationFormStore.FinalPerformanceCategoryRating$.subscribe(res => {
      const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId - 1)
      if (!category) return
      this.selectCategory(category);
    })
  }

  onNext() {
    this.finalEvaluationFormStore.FinalPerformanceCategoryRating$.subscribe(res => {
      const category = res.find(item => item.categoryId === this.evaluationForm.value.questions[0].categoryId + 1)
      if (!category) return
      this.selectCategory(category);
    })
  }
}
