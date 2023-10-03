import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
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
  taskPercent = 0;
  @Output() taskStatusChanged: EventEmitter<Task> = new EventEmitter<Task>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedPerson']) {
      return;
    }
    this.tasks =
      this.selectedPerson?.taskEntities.filter(
        (task) => task.taskType === this.taskType
      ) || [];
    this.calculateTaskProgress();
  }

  onTaskStatusChange(task: Task): void {
    this.taskStatusChanged.emit(task);
    this.calculateTaskProgress();
  }

  calculateTaskProgress(): void {
    const completedTasksCount = this.tasks?.filter((task) => task.completed).length || 0;
    const totalTasksCount = this.tasks?.length || 0;

    this.taskPercent =
      totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
  }
}

