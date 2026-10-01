import { Component, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  myAccel = signal(0);
  x = signal(1);

  constructor() {
    this.basic();
  }

  async vibrate() {
    await Haptics.impact({
      style: ImpactStyle.Medium
    });
  }

  async test() {
    this.x.set(Math.floor(Math.random() * 6) + 1);
    await this.vibrate();
  }

  async basic() {
    await Motion.addListener('accel', (event) => {

      this.myAccel.set(event.acceleration.x ?? 0);

      if (Math.abs(this.myAccel()) > 5) {
        this.test();
      }

    });
  }
}