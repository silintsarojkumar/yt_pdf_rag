import re

from langchain_text_splitters import RecursiveCharacterTextSplitter, TextSplitter

text_spliter = RecursiveCharacterTextSplitter(
    chunk_size = 400,
    chunk_overlap = 50,
    length_function = len,
    is_separator_regex=False,
    separators=[
            "\n\n",
            "\n",
            ". ",
            "? ",
            "! ",
            ", ",
            " "
            ]
        

)

def chunk_fun(text):
    return text_spliter.split_text(text)