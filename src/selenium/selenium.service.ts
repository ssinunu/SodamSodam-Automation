import { Injectable } from '@nestjs/common';
import {
  WebDriver,
  By,
  Builder,
  attachToSession,
  Capabilities,
} from 'selenium-webdriver';

@Injectable()
export class SeleniumService {
  private driver: WebDriver;

  async initialize(driverSessionId: string) {
    if (driverSessionId) {
      this.driver = await attachToSession({ sessionId: driverSessionId });
    } else {
      const chromeCapabilities = Capabilities.chrome();

      // Chrome 디버깅 포트 설정 (기본값은 9222)
      chromeCapabilities.set('goog:chromeOptions', {
        debuggerAddress: '127.0.0.1:9222',
      });

      // WebDriver 초기화
      this.driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();
    }
  }

  async login(username: string, password: string) {
    await this.driver.get('https://www.coupang.com/');
    await this.driver.findElement(By.xpath('//*[@id="login"]/a')).click();
    await this.driver
      .findElement(By.xpath('//*[@id="login-email-input"]'))
      .sendKeys(username);
    await this.driver
      .findElement(By.xpath('//*[@id="login-password-input"]'))
      .sendKeys(password);
    await this.driver
      .findElement(
        By.xpath('/html/body/div[1]/div[1]/div[2]/div[1]/form/div[5]/button'),
      )
      .click();
    await this.driver.sleep(5000); // 5초 대기
  }

  async goToCart() {
    const cartButton = await this.driver.findElement(
      By.xpath('//*[@id="header"]/section/div[1]/ul/li[2]/a'),
    );
    await cartButton.click();
    await this.driver.sleep(1000);
  }

  async selectAllItemsInCart() {
    const selectAllCheckbox = await this.driver.findElement(
      By.xpath('//*[@id="cartContent"]/table/thead/tr/th[1]/label/input'),
    );
    const isSelected = await selectAllCheckbox.isSelected();

    if (!isSelected) {
      await selectAllCheckbox.click();
      await this.driver.sleep(1000);
    }
  }

  async clickBuyButton() {
    const buyButton = await this.driver.findElement(
      By.xpath('//*[@id="btnPay"]'),
    );
    await buyButton.click();
    await this.driver.sleep(1000);
  }

  async clickPayButton() {
    const payButton = await this.driver.findElement(
      By.xpath('//*[@id="paymentBtn"]/img'),
    );
    await payButton.click();
    await this.driver.sleep(1000);
  }

  async close() {
    await this.driver.quit();
  }
}
