export interface CourseName {
    id: number,
    chinese_name: string,
    english_name: string
}

export const fetchAllCourseNames = async () => {
    const response = await fetch("https://cdn.ethanloo.cn/course_names.json");
    const coursesData = await response.json();
    return coursesData as CourseName[];
}