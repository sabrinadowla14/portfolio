import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  projectForm!: FormGroup;
  projects: Project[] = [];
  filterControl = new FormControl('');

  editing: boolean = false;
  filter = '';
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      company: [''],
      role: [''],
      duration: [''],
      techStack: [''],
      description: [''],
      link: [''],
    });

    this.loadProject();
  }

  loadProject() {
    this.portfolioService.getProjects().subscribe((data) => {
      console.log('Loaded projects:', data); // ADD THIS
      this.projects = data;
    });
  }
  onSubmit() {
    const project: Project = this.projectForm.value;

    if (this.editing && this.editingId) {
      project.id = this.editingId;
      this.portfolioService.updateProject(project).subscribe(() => {
        this.loadProject();
        this.cancelEdit();
      });
    } else {
      this.portfolioService.addProject(project).subscribe(() => {
        this.loadProject();
        this.projectForm.reset();
      });
    }
  }

  editProject(p: Project): void {
    this.projectForm.patchValue(p);
    this.editing = true;
    this.editingId = p.id!;
  }

  cancelEdit(): void {
    this.projectForm.reset();
    this.editing = false;
    this.editingId = null;
  }

  deleteProject(id: number): void {
    this.portfolioService.deleteProject(id).subscribe(() => this.loadProject());
  }

  filteredProjects(): Project[] {
    const filterValue = this.filterControl.value?.toLowerCase() || '';
    return this.projects.filter((p) =>
      (p.title + p.company).toLowerCase().includes(filterValue)
    );
  }
}
