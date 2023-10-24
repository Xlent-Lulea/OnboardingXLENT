// manage-tasktypes.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskType } from 'src/app/models/task-type.interface';

@Component({
  selector: 'app-manage-tasktypes',
  templateUrl: './manage-tasktypes.component.html',
  styleUrls: ['./manage-tasktypes.component.scss'],
})
export class ManageTasktypesComponent {
  @Input() taskTypes: TaskType[] = [];
  @Output() createTaskType = new EventEmitter<string>();
  @Output() deleteTaskType = new EventEmitter<number>();

  newTaskType = '';

  addTaskType() {
    if (this.newTaskType) {
      this.createTaskType.emit(this.newTaskType);
      this.newTaskType = ''; // Clear the input field
    }
  }
}
