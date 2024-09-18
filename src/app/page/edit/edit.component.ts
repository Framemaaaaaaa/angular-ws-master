import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // สำหรับ ngFor, ngIf
import { FormsModule } from '@angular/forms';    // สำหรับการทำงานของฟอร์ม เช่น [(ngModel)]
import { NewComponent } from '../new/new.component';
import { Country } from '../../model/country.model';
import { Landmark } from '../../model/landmark.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],  // เพิ่ม CommonModule และ FormsModule
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  countries: Array<Country>;
  response: any;
  selectedLanmark: Landmark;

  constructor(private data: DataService, 
              private http: HttpClient,
              private dialogRef: MatDialogRef<EditComponent>) {
    this.countries = data.countries;
    console.log(this.countries);
    this.selectedLanmark = data.selectedlanmark;
  }

  close() {
    this.dialogRef.close();
  }

  save(name: string, detail: string, url: string, country: number, idx: number) {
    let jsonObj = {
      name: name,
      detail: detail,
      url: url,
      country: country
    }
  
    let jsonString = JSON.stringify(jsonObj);
    this.http.put(this.data.apiEndpoint + "/landmark/" + idx, jsonString, 
      { observe: 'response' }
    ).subscribe((response) => {
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
        this.dialogRef.close();
    });
  }
}
