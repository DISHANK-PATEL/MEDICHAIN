import os
import streamlit as st
from PIL import Image
from io import BytesIO
import requests
from streamlit_option_menu import option_menu
from gemini_utility import load_gemini_pro_model, gemini_flash
import google.generativeai as genai

genai.configure(api_key="AIzaSyDRC0J9w-SknMrM4Hk3xGpeNFkypFE2Rrg")

working_directory = os.path.dirname(os.path.abspath(__file__))

st.set_page_config(
    page_title="Veterinary AI",
    page_icon="🚑",
    layout="centered"
)

st.markdown("""
    <style>
    body {
        font-size: 20px; /* Increase the font size */
    }
    .css-1d391kg {
        font-size: 28px;
    }
    .css-1v3fvcr {
        font-size: 28px;
    }
    </style>
""", unsafe_allow_html=True)

with st.sidebar:
    selected = option_menu(
        menu_title="Medi-chain",
        options=["Ask Me Anything", "Image Captioning"],
        menu_icon="robot",
        icons=['chat-dots-fill', 'image-fill', 'textarea-t', 'patch-question-fill'],
        default_index=0
    )


def translate_role_for_streamlit(user_role):
    if user_role == 'model':
        return "assistant"
    else:
        return user_role


if selected == "Ask Me Anything":
    model = load_gemini_pro_model()
    if "chat_session" not in st.session_state:
        st.session_state.chat_session = model.start_chat(history=[])
    st.title("🤖 Ask Me Anything")

    for message in st.session_state.chat_session.history:
        with st.chat_message(translate_role_for_streamlit(message.role)):
            st.markdown(message.parts[0].text)
    user_prompt = st.chat_input("Ask Vet AI....")

    if user_prompt:
        st.chat_message("user").markdown(user_prompt)
        gemini_response = st.session_state.chat_session.send_message(user_prompt)
        with st.chat_message("assistant"):
            st.markdown(gemini_response.text)

if selected == "Image Captioning":
    st.title("Search Via Image📸")

    upload_option = st.radio("Choose image input method:", ("Upload Image", "Paste Image URL"))

    if upload_option == "Upload Image":
        uploaded_image = st.file_uploader("Upload an image....", type=["jpg", "jpeg", "png"])
        image = None
        if uploaded_image is not None:
            image = Image.open(BytesIO(uploaded_image.read()))
    elif upload_option == "Paste Image URL":
        image_url = st.text_input("Paste the image URL here:")
        image = None
        if image_url:
            try:
                response = requests.get(image_url)
                image = Image.open(BytesIO(response.content))
            except Exception as e:
                st.error(f"Error loading image from URL: {e}")

    user_prompt = st.text_input("Enter a custom prompt for image narration:", "Explain the image uploaded")

    if st.button("Generate Analysis"):
        if image is not None:
            col1, col2 = st.columns(2)

            with col1:
                resized_image = image.resize((800, 500))
                st.image(resized_image)

            caption = gemini_flash(user_prompt, image)

            with col2:
                st.info(caption)
        else:
            st.warning("Please upload an image or paste an image URL.")