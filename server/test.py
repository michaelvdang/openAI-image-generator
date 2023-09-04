import os
from dotenv import load_dotenv

load_dotenv()
import openai
# print(os.getenv("OPENAI_API_KEY"))
openai.api_key = os.getenv("OPENAI_API_KEY")
response = openai.Image.create(
  prompt="carrot",
  n=1,
  size="256x256"
)

print(response)