import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface CourseState {
  courseId: string;
}

interface CourseActions {
  setCourseId: (courseId: string) => void;
}

const useCourseStore = create<CourseState & CourseActions>()(
  persist(
    (set) => ({
      courseId: "",
      setCourseId: (courseId: string) => set({ courseId }),
    }),
    {
      name: "course-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ courseId: state.courseId }),
    }
  )
);

export default useCourseStore;
