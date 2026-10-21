from imports import RecursiveCharacterTextSplitter

def splitter(text):
    split = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
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
    chunks = split.split_text(text)
    return chunks

def splitter2(text):
    text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
    )
    return text_splitter.split_documents(text)
