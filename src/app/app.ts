import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of, Observable } from 'rxjs';
import { PoetryService } from './services/poetry.service';

@Component({
  selector: 'app-root', // 👈 must match <app-root> in index.html
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Poetry Finder';
  authorValue = '';
  titleValue = '';
  poems: any[] = [];
  errorMessage = '';
  noResults = false;
  isLoading = false;

  // Pagination
  currentPage = 0;
  poemsPerPage = 4; // 2 poems per page (2 per side)
  currentPagePoems: any[][] = [[], []]; // Left and right page poems
  hasNextPage = false;

  // Modal
  selectedPoem: any = null;

  constructor(private poetryService: PoetryService) {}

  searchPoems() {
    this.errorMessage = '';
    this.noResults = false;
    this.poems = [];
    this.isLoading = true;
    this.currentPage = 0;
    this.selectedPoem = null;

    const authorTerm = this.authorValue.trim();
    const titleTerm = this.titleValue.trim();

    if (!authorTerm && !titleTerm) {
      this.errorMessage = 'Please enter an author or title to search for.';
      this.isLoading = false;
      return;
    }

    const searches: Observable<any[]>[] = [];
    if (authorTerm) {
      searches.push(this.poetryService.getPoemsSafe('author', authorTerm));
    }
    if (titleTerm) {
      searches.push(this.poetryService.getPoemsSafe('title', titleTerm));
    }

    forkJoin(searches).subscribe({
      next: (results) => {
        this.isLoading = false;
        const merged = ([] as any[]).concat(...results);
        // deduplicate by author+title
        const seen = new Set<string>();
        this.poems = merged.filter(p => {
          const key = `${p.author}:::${p.title}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        if (this.poems.length === 0) {
          this.noResults = true;
        } else {
          this.updateCurrentPagePoems();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to fetch poems.';
      }
    });
  }

  updateCurrentPagePoems() {
    const startIdx = this.currentPage * this.poemsPerPage;
    const leftPagePoems = this.poems.slice(startIdx, startIdx + this.poemsPerPage/2);
    const rightPagePoems = this.poems.slice(startIdx + this.poemsPerPage/2, startIdx + this.poemsPerPage);
    this.currentPagePoems = [leftPagePoems, rightPagePoems];
    this.hasNextPage = (startIdx + this.poemsPerPage) < this.poems.length;
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.updateCurrentPagePoems();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateCurrentPagePoems();
    }
  }

  openPoemModal(poem: any) {
    this.selectedPoem = poem;
  }

  closeModal() {
    this.selectedPoem = null;
  }
}

function throwOther(err: any) {
  // rethrow to be handled by forkJoin subscriber error
  return of().pipe(() => { throw err; });
}
