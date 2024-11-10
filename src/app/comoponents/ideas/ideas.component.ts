import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../../../services/ideas.service';

interface Idea {
  id: number;
  pictureUrl: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {
  ideas: Idea[] = [];

  constructor(private ideasService: IdeasService) {}

  ngOnInit(): void {
    this.fetchIdeas();
  }

  fetchIdeas(): void {
    this.ideasService.getIdeas().subscribe(
      (data) => {
        this.ideas = data;
      },
      (error) => {
        console.error('Error fetching ideas:', error);
      }
    );
  }
}
