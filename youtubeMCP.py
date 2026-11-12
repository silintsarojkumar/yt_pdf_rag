from langchain_community.document_loaders import YoutubeLoader

def transcript(url):
    loader = YoutubeLoader.from_youtube_url(
        url,
        add_video_info=False,
        language=["en-US",'hi']
    )

    

    docs = loader.load()

    return " ".join([doc.page_content for doc in docs])




