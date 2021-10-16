import file from "../assets/courses.json";

export interface CourseName {
    id: number,
    chinese: string,
    english: string
}

export const useCourseNames = () => {
    const coursesData = file.data;
    const courseNames: CourseName[] = []
    coursesData.map(courseData => {
        const obj = JSON.parse(courseData)
        courseNames.push({
            id: obj.id,
            chinese: obj.chinese_name,
            english: obj.english_name
        })
    })

    return courseNames;
}