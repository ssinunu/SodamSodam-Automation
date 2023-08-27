import cv2
import os

def convert_to_grayscale(image_path):
    # 이미지 불러오기
    image = cv2.imread(image_path)
    
    # 이미지를 흑백으로 변환
    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    return grayscale_image

def save_grayscale_images(keys_folder):
    # keys 폴더 안에 있는 모든 이미지 파일 가져오기
    keys = [f for f in os.listdir(keys_folder) if f.endswith('.png')]
    
    # 흑백 이미지를 저장할 폴더 생성
    if not os.path.exists('grayscale_keys'):
        os.makedirs('grayscale_keys')
    
    for key in keys:
        image_path = os.path.join(keys_folder, key)
        grayscale_image = convert_to_grayscale(image_path)
        
        # 흑백 이미지를 grayscale_keys 폴더에 저장
        save_path = os.path.join('grayscale_keys', key)
        cv2.imwrite(save_path, grayscale_image)

keys_folder = 'keys'  # keys 폴더의 경로
save_grayscale_images(keys_folder)
