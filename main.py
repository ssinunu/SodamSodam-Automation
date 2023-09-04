from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

# 셀레니움 옵션
option = Options()
option.add_experimental_option("debuggerAddress", "127.0.0.1:9222") ## 디버깅 옵션 추가
service = Service(executable_path='./chromedriver.exe')
driver = webdriver.Chrome(service=service, options=option)
driver.implicitly_wait(3)

# 페이지 이동
driver.get(url='https://www.coupang.com/')
time.sleep(1)

# # 쿠팡 로그인 버튼 클릭
# login_button = driver.find_elements(By.XPATH, '//*[@id="login"]/a')[0]
# login_button.click()

# # 쿠팡 로그인
# driver.find_elements(By.XPATH, '//*[@id="login-email-input"]')[0].send_keys("")
# time.sleep(1)
# driver.find_elements(By.XPATH, '//*[@id="login-password-input"]')[0].send_keys("")
# time.sleep(1)
# driver.find_elements(By.XPATH, '/html/body/div[1]/div[1]/div[2]/div[1]/form/div[5]/button')[0].click()
# time.sleep(5)

# 장바구니 이동
cart_button = driver.find_elements(By.XPATH, '//*[@id="header"]/section/div[1]/ul/li[2]/a')[0]
cart_button.click()
time.sleep(1)

# 장바구니 전체 선택
cart_all_select_button = driver.find_elements(By.XPATH, '//*[@id="cartContent"]/table/thead/tr/th[1]/label/input')[0]
is_selected = cart_all_select_button.is_selected()

if is_selected == False:
    cart_all_select_button.click()
    time.sleep(1)

# 구매하기 버튼 클릭
buy_button = driver.find_elements(By.XPATH, '//*[@id="btnPay"]')[0]
buy_button.click()
time.sleep(1)

# 결제하기 버튼 클릭
pay_button = driver.find_elements(By.XPATH, '//*[@id="paymentBtn"]/img')[0]
pay_button.click()
time.sleep(1)
