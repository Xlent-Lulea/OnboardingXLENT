import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { PersonTask } from 'src/app/models/person-task.interface';
import { TaskType } from 'src/app/models/task-type.interface';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnChanges {
  taskPercent = 0;

  @Input() taskType: TaskType | null = null;
  @Input() personTasks: PersonTask[] | null = [];

  @Output() taskStatusChanged: EventEmitter<PersonTask> = new EventEmitter<PersonTask>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['personTasks']) {
      return;
    }

    this.filterTasks();
    this.calculateTaskProgress();
  }

  private filterTasks(): void {
    this.personTasks = this.personTasks?.filter((personTask) =>
      personTask.task.typeId === this.taskType?.id) || [];
  }

  onTaskStatusChange(task: PersonTask): void {
    this.taskStatusChanged.emit(task);
    this.calculateTaskProgress();
  }

  calculateTaskProgress(): void {
    const completedTasksCount = this.personTasks?.filter((task) => task.isCompleted).length || 0;
    const totalTasksCount = this.personTasks?.length || 0;

    this.taskPercent =
      totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
  }
}
