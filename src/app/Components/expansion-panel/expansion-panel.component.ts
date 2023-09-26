import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  completedTasksCount: number = 0;
  totalTasksCount: number = 0;
  taskPercent: number = 0;

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

  shouldShowDivider(task: Task, index: number, taskEntities: Task[]): boolean {
    if (index === 0) return false;
    return taskEntities[index - 1].taskType === task.taskType;
  }

  onTaskStatusChange(task: Task): void {
    if (task.id !== undefined) {
      this.taskService.updateTaskCompletionStatus(task.id).subscribe(
        (updatedTask) => {
          console.log('Task updated:', updatedTask);
          // Optionally, update local task state or UI here if needed.
          this.calculateTaskProgress();
        },
        (error) => {
          console.error('Failed to update task:', error);
          // Optionally, revert the checkbox state in case of an error
          task.completed = !task.completed;
        }
      );
    } else {
      console.error('Task ID is undefined');
    }
  }


  calculateTaskProgress(): void {
    this.completedTasksCount = this.tasks?.filter((task) => task.completed).length || 0;
    this.totalTasksCount = this.tasks?.length || 0;
    this.taskPercent =
      this.totalTasksCount > 0
        ? (this.completedTasksCount / this.totalTasksCount) * 100
        : 0;
  }
}
