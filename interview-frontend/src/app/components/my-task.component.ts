import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';


@Component({
  selector: 'city-form',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent {

  formData = {
    city: ''
  };

  responseIsEmpty = false;
  totalCount = 0;
  currentPage = 0;

  displayedColumns: string[] = ['city', 'count']; // Customize the columns you want to display in the table
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) { }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.fetchPaginatedData();
  }

  onSubmit(citiesForm: NgForm) {
    // Handle form submission
    if (!citiesForm.valid) {
      alert("The field is required. Please fill in it and click on the Submit button.")
      return;
    }
    
    // Clear the current data when submitting
    this.currentPage = 0;
    this.dataSource.data = [];
    this.totalCount = 0;

    // Call fetchPaginatedData() to populate data and update pagination
    this.fetchPaginatedData();
  }

  fetchPaginatedData() {
    // Call this method when the page changes to fetch paginated data
    const backendURL = environment.apiUrl + '/api/findCity';
    const page = this.currentPage + 1;
    const perPage = 5;
  
    this.http.post<any>(backendURL, { ...this.formData, page, perPage }).subscribe(
      (response) => {
        this.dataSource.data = response.data;
        this.totalCount = response.totalCount;
        this.responseIsEmpty = response.data.length === 0;

        // Calculate the new pageIndex based on the starting index of the current page
        const startIndex = this.currentPage * perPage;
        const newPageIndex = Math.floor(startIndex / perPage);

        // Update the pageIndex for the paginator
        this.paginator.pageIndex = newPageIndex;
      },
      (error) => {
        alert("Something went wrong. Try again later!");
      }
    );
  }
}