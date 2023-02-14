import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
openai.organization = os.getenv("OPENAI_ORGANIZATION")


def preprocessing_prompt(text):
    word_count = len(text.split(" "))
    sentence_count = word_count / 10
    num_questions = int(sentence_count / 2)
    return f"Create {num_questions} simple fill in the blanks statements from the following text. Please format the responses as Qestion: <text with black> Answer: <answer>. Here's the text:\n\n{text}"


def get_training_data_response(text):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=preprocessing_prompt(text),
        temperature=0.7,
        max_tokens=300,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response


def get_chat_response(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=300,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response["choices"][0]["text"]