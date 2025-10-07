import { Component, Input, TemplateRef } from '@angular/core';
import { ResourceState } from '../../../core/models/resource-state.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-handler',
  imports: [CommonModule],
  templateUrl: './resource-handler.html',
  styleUrl: './resource-handler.scss',
})
export class ResourceHandler<T> {
  @Input() state!: ResourceState<T[]> | null;
  @Input() dataTpl!: TemplateRef<any>;
}
