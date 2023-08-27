from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

# 셀레니움 옵션
option = Options()
option.add_experimental_option("debuggerAddress", "127.0.0.1:9222") ## 디버깅 옵션 추가
service = Service()
driver = webdriver.Chrome(service=service, options=option)
driver.implicitly_wait(3)

# 페이지 이동
driver.get(url='https://checkout.coupang.com/cart/checkout/1693108745139?item%5B%5D=85850427196%3A1')
time.sleep(1)

# 결제하기 버튼 클릭
pay_button = driver.find_elements(By.XPATH, '//*[@id="paymentBtn"]/img')[0]
pay_button.click()
time.sleep(3)

# 간편 비밀번호 이미지 저장
driver.save_screenshot('password.png')
