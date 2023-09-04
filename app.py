import os
from flask import Flask
from flask_cors import CORS

#Flask 객체 인스턴스 생성
app = Flask(__name__)
CORS(app)

# 접속 url 설정
@app.route('/')
def index():
  return 'Hello Flask'

if __name__ == '__main__':
  # 코드 수정 시 자동 반영
  app.run(debug=True)

