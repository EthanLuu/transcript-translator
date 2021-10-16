from DBManager import DBManager
from pprint import pprint
from PDFParser import PDFParser

def main():
    db_manager = DBManager("localhost", "course-info",
                           "ahpR27jL3BTmf2GL", "course-info")

    pdf = PDFParser("./assets/plan_2018.pdf")

    for page in pdf.pages:
        if not page:
            continue
        course_dic = pdf.get_all_course_names(page)
        if not course_dic:
            continue
        pprint(course_dic)
        for chinese_name, english_name in course_dic.items():
            db_manager.insert_course(chinese_name, english_name)


if __name__ == "__main__":
    main()
