import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnChanges {
  @Input() tasks: Task[] | null = [];

  completedTasksCount: number = 0;
  totalTasksCount: number = 0;
  taskPercent: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['tasks']) {
      return;
    }
    this.completedTasksCount =
      this.tasks?.filter((task) => task.completed).length || 0;
    this.totalTasksCount = this.tasks?.length || 0;
    this.taskPercent =
      this.totalTasksCount > 0
        ? (this.completedTasksCount / this.totalTasksCount) * 100
        : 0;
  }
}
