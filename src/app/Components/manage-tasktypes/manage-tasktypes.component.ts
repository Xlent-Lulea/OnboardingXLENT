import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';  // Import FormBuilder and FormGroup
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

  taskTypeForm: FormGroup;  // Declare a FormGroup instance

  constructor(private fb: FormBuilder) {  // Inject FormBuilder
    this.taskTypeForm = this.fb.group({  // Initialize the FormGroup
      newTaskType: ['']  // Create a FormControl instance for 'newTaskType'
    });
  }

  addTaskType() {
    const newTaskTypeControl = this.taskTypeForm.get('newTaskType');
    if (newTaskTypeControl) {
      const newTaskTypeValue = newTaskTypeControl.value;
      if (newTaskTypeValue) {
        this.createTaskType.emit(newTaskTypeValue);
        this.taskTypeForm.reset();  // Reset the form
      }
    }
  }

}
