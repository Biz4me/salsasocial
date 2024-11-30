import { Frame } from '@nativescript/core';
import { ROUTES } from '../constants/routes';

type RouteKey = keyof typeof ROUTES;

export class NavigationUtil {
  static navigate(page: RouteKey, context?: any) {
    Frame.topmost().navigate({
      moduleName: ROUTES[page],
      context: context
    });
  }

  static goBack() {
    Frame.topmost().goBack();
  }
}