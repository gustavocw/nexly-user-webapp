interface Course {
  _id?: string;
  areaId?: string;
  count_modules: number;
  count_lesson: number;
  count_members: number;
  name: string;
  thumbnail: string;
  description: string;
  category: string;
  duration: string;
  delDate: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  modules?: Module[];
}

interface Module {
  _id: any;
  name: string;
  stateModule: string;
  description: string;
  format: string;
  lessons_count: number;
  thumbnail?: File | null;
}

interface Lesson {
  _id: string;
  nameLesson: string;
  description: string;
  duration: string;
  moduleId: string;
  stateLesson: PRIVADO | PÚBLICO;
  urlVideo: string;
  thumbnail: string;
  comments: Comment[];
  isFavorite?: boolean;
}

interface Comment {
  _id: string;
  comment: string;
  userPhoto: string;
  name: string;
  userId: string;
  replies?: any;
}
