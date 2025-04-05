import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8080/api/projects';
  constructor(private http: HttpClient) {}

  private projects: Project[] = [
    {
      id: 1,
      title: 'DOT Project',
      company: 'Sohum Systems',
      role: 'Angular Software Developer',
      duration: 'Nov 2023 – Mar 2025',
      techStack:
        'Angular 14/16, RxJS, Tailwind, NX, Java, integrating with RESTful web services ',
      description:
        'Built and optimized dynamic UI components using Angular 14/16, RxJS, and Tailwind. Worked with NX monorepo architecture and Spring Boot backend.',
      link: 'https://github.com/your-portfolio/dot-project',
    },
    {
      id: 2,
      title: 'CVS Healthcare System',
      company: 'AK Infotech',
      role: 'Angular Frontend Developer',
      duration: 'May 2023 – Aug 2023',
      techStack: 'Angular 14, NgRx, CSS, Docker, Jenkins',
      description:
        'Developed complex reactive forms, custom dropdowns, and unit testing with Jasmine.',
    },
    {
      id: 3,
      title: 'Casenet-Health Care',
      company: 'Infinite Computer Solutions',
      role: 'UI Angular Developer',
      duration: 'July 2022 – 2023 Jan',
      techStack:
        'Angular 7.2, NgRx, Prime NG, CSS, Docker, Java, Jenkins, integrating with RESTful web services ',
      description:
        'I played a key role in building and enhancing healthcare applications using Angular 7.2. I implemented robust state management using NgRx and facilitated component communication through @Input, @Output, and Angular services with dependency injection. I focused heavily on improving user experience and performance by utilizing lazy loading, OnPush change detection, and RxJS-based observables.',
    },
    {
      id: 4,
      title: 'Avangrid Management Company',
      company: 'Wipro',
      role: 'Angular Lead L1',
      duration: 'April 2021 – April 2022',
      techStack:
        'Angular 12, Prime Ng, Java Spring Boot, Oracle Database, OAuth2, Jenkins',
      description:
        'Served as Angular Lead Developer across two major client projects: Williams and Avangrid. I led frontend development efforts, provided architectural guidance, and ensured integration with diverse backend systems like .NET and Spring Boot.',
    },
    {
      id: 5,
      title: 'Udacity Mentor or Reviewer',
      company: 'Udacity',
      role: 'UI Developer',
      duration: 'April 2019 –April 2021',
      techStack:
        'Angular 7, JavaScript, NodeJs, Flask App using Kubernetes with EKS, AWS, Python flask, S3 for static hosting, CSS, Docker',
      description:
        'Mentored aspiring web developers enrolled in Udacity’s Full Stack Nanodegree. Reviewed projects, provided technical feedback, and built reference apps demonstrating full-stack capabilities with Angular, Flask, and AWS.',
    },
  ];

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
