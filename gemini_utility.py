import os
import json
from PIL import Image
import google.generativeai as genai

working_directory = os.path.dirname(os.path.abspath(__file__))

config_file_path = os.path.join(working_directory, "config.json")
with open(config_file_path, "r") as file:
    config_data = json.load(file)

GOOGLE_API_KEY = config_data.get("GOOGLE_API_KEY")

genai.configure(api_key=GOOGLE_API_KEY)

def load_gemini_pro_model():
    gemini_pro_model = genai.GenerativeModel("gemini-1.5-flash")
    return gemini_pro_model

def gemini_flash(prompt, image):
    gemini_pro_vision_model = genai.GenerativeModel("gemini-1.5-flash")
    response = gemini_pro_vision_model.generate_content([prompt, image])
    result = response.text
    return result

image_path = os.path.join(working_directory, "image.jpg")
image = Image.open(image_path)

prompt = "Will this be reality in upcoming years?"
output = gemini_flash(prompt, image)
print(output)