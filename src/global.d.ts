interface QuizOption {
    id: number;
    label: string;
    isCorrect: boolean;
}

interface QuizQuestion {
    id: number;
    question: string;
    options: QuizOption[];
    explanation?: string;
    isMultiChoice: boolean;
}