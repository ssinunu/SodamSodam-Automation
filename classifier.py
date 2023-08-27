import cv2
import os
import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# keys 폴더에 있는 이미지들을 불러와서 데이터셋 준비
def prepare_dataset(keys_folder):
    images = []
    labels = []

    for filename in os.listdir(keys_folder):
        if filename.endswith('.png'):
            label = int(filename[0])  # 파일명의 첫 번째 문자를 라벨로 추출
            image_path = os.path.join(keys_folder, filename)
            grayscale_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
            resized_image = cv2.resize(grayscale_image, (30, 20))  # 이미지 크기 조정
            image_data = resized_image.reshape(-1)  # 이미지 데이터를 1차원 배열로 변환
            images.append(image_data)
            labels.append(label)

    return np.array(images), np.array(labels)

keys_folder = 'keys'
images, labels = prepare_dataset(keys_folder)
print(images, labels)

# 데이터를 학습용과 테스트용으로 분리
X_train, X_test, y_train, y_test = train_test_split(images, labels, test_size=0.2, random_state=42)

# MLPClassifier 모델 생성 및 학습
model = MLPClassifier(solver='adam', hidden_layer_sizes=(400,), max_iter=400)
model.fit(X_train, y_train)

# 모델 예측 및 평가
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
