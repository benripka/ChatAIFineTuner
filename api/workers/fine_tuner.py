import os
import openai
openai.organization = "org-pTADV1mYeu4oNLEIDThz2ff6"
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.Model.list()