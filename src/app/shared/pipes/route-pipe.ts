import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'route',
})
export class RoutePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value
      .normalize('NFD') // décompose accents
      .replace(/[\u0300-\u036f]/g, '') // supprime accents
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // remplace tout sauf lettres/chiffres par "-"
      .replace(/^-+|-+$/g, '');
  }
}
