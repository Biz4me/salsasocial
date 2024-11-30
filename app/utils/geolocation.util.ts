import { Geolocation } from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core';

export class GeolocationUtil {
  static async getCurrentLocation() {
    const hasPermission = await this.enableLocation();
    if (!hasPermission) {
      throw new Error('Location permission denied');
    }

    return await Geolocation.getCurrentLocation({
      desiredAccuracy: CoreTypes.Accuracy.high,
      maximumAge: 5000,
      timeout: 10000
    });
  }

  static async enableLocation(): Promise<boolean> {
    const hasPermission = await Geolocation.hasPermission();
    if (!hasPermission) {
      return await Geolocation.requestPermission();
    }
    return true;
  }
}