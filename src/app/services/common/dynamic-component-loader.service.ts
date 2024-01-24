import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentLoaderService {
  async loadComponent(
    componentName: ComponentNames,
    viewContainerRef: ViewContainerRef
  ) {
    let component: any = null;
    switch (componentName) {
      case ComponentNames.BasketsComponent:
        component = (
          await import('../../ui/components/baskets/baskets.component')
        ).BasketsComponent;
        break;

      default:
        break;
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(component);
  }
}

export enum ComponentNames {
  BasketsComponent,
}
