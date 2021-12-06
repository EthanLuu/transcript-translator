import json
from DBManager import DBManager
from pprint import pprint
from PDFParser import PDFParser


def save_to_db():
    db = DBManager("110.42.144.216", "course-info",
                   "ahpR27jL3BTmf2GL", "course-info")

    pdf = PDFParser("./assets/2019-理工科教学手册.pdf")

    for page in pdf.pages:
        if not page:
            continue
        course_dic = pdf.get_all_course_names(page)
        if not course_dic:
            continue
        pprint(course_dic)
        for chinese_name, english_name in course_dic.items():
            db.insert_course(chinese_name, english_name)


def save_to_json():
    db = DBManager("110.42.144.216", "course-info",
                   "ahpR27jL3BTmf2GL", "course-info")
    courses = db.select_all_courses()
    lst = []
    for course in courses:
        id, chinese_name, english_name = course
        obj = {
            "id": id,
            "chinese_name": chinese_name,
            "english_name": english_name
        }
        lst.append(obj)

    with open("./assets/courses.json", "w") as f:
        json.dump(lst, f)


def main():
    save_to_json()
    # save_to_db()


if __name__ == "__main__":
    main()
