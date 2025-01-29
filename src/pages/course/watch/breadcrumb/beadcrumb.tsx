import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "components/ui/breadcrumb";

interface BreadcrumbProps {
  lessonId?: string;
  lesson?: Lesson[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lessonId, lesson }) => {
  const currentLessonIndex = lesson?.findIndex((lesson) => lesson._id === lessonId) ?? 0;
  const nextLessons = lesson?.slice(currentLessonIndex, currentLessonIndex + 3);

  return (
    <BreadcrumbRoot>
      {nextLessons?.map((lesson, index) => (
        index === 0 ? (
          <BreadcrumbCurrentLink key={lesson._id} color="orange">
            {lesson.nameLesson}
          </BreadcrumbCurrentLink>
        ) : (
          <BreadcrumbLink key={lesson._id} cursor="pointer" color="neutral" href="#">
            {lesson.nameLesson}
          </BreadcrumbLink>
        )
      ))}
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
