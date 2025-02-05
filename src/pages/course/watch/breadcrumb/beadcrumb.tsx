import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "components/ui/breadcrumb";
import useAuthStore from "stores/auth.store";

interface BreadcrumbProps {
  lessonId?: string;
  lesson?: Lesson[];
  onSelectLesson: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lessonId, lesson, onSelectLesson }) => {
  const currentLessonIndex = lesson?.findIndex((lesson) => lesson._id === lessonId) ?? 0;
  const nextLessons = lesson?.slice(currentLessonIndex, currentLessonIndex + 3);
  const {area} = useAuthStore();

  return (
    <BreadcrumbRoot>
      {nextLessons?.map((lesson, index) => (
        index === 0 ? (
          <BreadcrumbCurrentLink key={lesson._id} color={area?.color}>
            {lesson.nameLesson}
          </BreadcrumbCurrentLink>
        ) : (
          <BreadcrumbLink
            key={lesson._id}
            cursor="pointer"
            color="neutral"
            onClick={() => onSelectLesson(currentLessonIndex + index)}
          >
            {lesson.nameLesson}
          </BreadcrumbLink>
        )
      ))}
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
