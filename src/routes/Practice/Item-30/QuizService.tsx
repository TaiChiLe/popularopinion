type Options = {
  src: string;
};

export enum QuizState {
  Js = 'js',
  History = 'history',
  Cars = 'cars',
}

export class QuizService {
  private quizes: string[];
  private quiz;
  constructor() {
    this.quizes = [
      'au-history-quiz.json',
      'electric-car-quiz.json',
      'javascript-quiz.json',
    ];
  }

  setQuiz(quiz: string) {
    if (quiz === 'javascript') {
      this.quiz = fetch('/quizes/au-history-quiz.json')
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else if (quiz === 'history') {
    } else {
    }
  }

  getQuizPage() {
    if (this.quiz) {
      console.log(this.quiz);
      return this.quiz.items[0];
    }
  }
}
