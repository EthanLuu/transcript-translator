import pdfplumber
from pprint import pprint


class PDFParser:
    def __init__(self, file_name):
        self.pdf = pdfplumber.open(file_name)
        self.pages = self.pdf.pages

    def containsCourses(self, table):
        if not table or len(table) == 0:
            return False
        for line in table:
            for word in line:
                if word and "课程代码" in word:
                    return True
        return False

    def parse_course_name(self, name: str, dic: dict):
        if not name:
            return
        name = str(name)
        name = name.replace("\n", "")
        idx = 0
        for i in range(len(name)):
            if name[i].isupper() or name[i].islower():
                idx = i
                break
        if idx <= 1:
            return
        if " " in name:
            idx = name.index(" ")
        chinese_name = name[:idx].strip()
        english_name = name[idx:].strip()
        dic[chinese_name] = english_name

    def get_all_courses(self, table):
        course_dic = dict()
        for line in table:
            if len(line) < 3:
                continue
            idx = 1
            if line[0] == None or line[1].isdigit():
                idx += 1
            course_name = line[idx]
            self.parse_course_name(course_name, course_dic)
        return course_dic

    def get_all_course_names(self, page):
        if not page:
            return
        table = page.extract_table()
        if not self.containsCourses(table):
            return
        course_dic = self.get_all_courses(table)
        return course_dic


def main():
    pdf = PDFParser("./assets/plan_2018_test.pdf")

    for page in pdf.pages:
        course_dic = pdf.get_all_course_names(page)
        pprint(course_dic)


if __name__ == "__main__":
    main()
