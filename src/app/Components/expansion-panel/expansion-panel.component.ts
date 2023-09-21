import { Component, ViewChild, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskType } from '../../models/task.interface';
import { Person } from 'src/app/models/task.interface';
import { MatAccordion } from '@angular/material/expansion';


/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})
export class ExpansionPanelComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  tasksByType: { [key in TaskType]?: Task[] } = {};
  taskTypes: TaskType[] = Object.keys(TaskType) as TaskType[];

  @Input() selectedPerson: Person | null = null;

  constructor(
    private taskService: TaskService,
  ) { }

  shouldShowDivider(task: Task, index: number, taskEntities: Task[]): boolean {
     if (index === 0) return false;
     return taskEntities[index - 1].taskType === task.taskType;
   }

  fetchTasksByType(taskType: TaskType, personId: number): void {
    this.taskService
      .getTasksByPersonAndType(personId, taskType as unknown as string)
      .subscribe((taskEntities: Task[]) => {
        console.log('Tasks for type', taskType, taskEntities);
        this.tasksByType[taskType] = taskEntities;
      });
  }

  getCompletedTasksForType(type: TaskType): number {
    if (this.selectedPerson) {
      return this.selectedPerson.taskEntities.filter(task => task.taskType === type && task.completed).length;
    }
    return 0;
  }

  getTotalTasksForType(type: TaskType): number {
    if (this.selectedPerson) {
      return this.selectedPerson.taskEntities.filter(task => task.taskType === type).length;
    }
    return 0;
  }

  onTaskStatusChange(task: Task): void {
    if (task.id !== undefined) {
      this.taskService.updateTaskCompletionStatus(task.id).subscribe(
        (updatedTask) => {
          console.log('Task updated:', updatedTask);
          // Optionally, update local task state or UI here if needed.
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

}
