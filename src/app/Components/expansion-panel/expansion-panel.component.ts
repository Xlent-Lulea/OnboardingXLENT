import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskType } from '../../models/task.interface';
import { Person } from 'src/app/models/task.interface';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnChanges {
  tasks: Task[] = [];
  @Input() taskType: TaskType = TaskType.WELCOME;
  @Input() selectedPerson: Person | null = null;
  taskPercent: number = 0;
  @Output() taskStatusChanged : EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedPerson']) {
      return;
    }
    this.tasks = this.selectedPerson?.taskEntities.filter(
      (task) => task.taskType === this.taskType
    ) || [];
    this.calculateTaskProgress();
  }

  onTaskStatusChange(task: Task): void {
    this.taskStatusChanged.emit(task); // Emit the Task object
    this.calculateTaskProgress();
  }



  calculateTaskProgress(): void {
    let completedTasksCount: number = 0;
    let totalTasksCount: number = this.tasks?.length || 0;

    if (totalTasksCount > 0) {
      completedTasksCount = this.tasks?.filter((task) => task.completed).length || 0;
    }

    this.taskPercent = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
  }
}
