interface Course {
  _id?: string;
  name: string;
  description: string;
  thumbnail: string;
  state: string;
  category: string;
  duration?: string;
}

interface Area {
  _id: string;
  domain: string;
  color: string;
  title: string;
  background: string;
  icon: string;
  logo: string;
  courses: Course[];
  createdAt: string;
  type?: string;
  isActive?: boolean;
}
