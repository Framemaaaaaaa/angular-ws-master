import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as landmarkCvt, Landmark } from '../../model/landmark.model';
import { Convert as countryCvt, Country } from '../../model/country.model';
import { MatListModule, MatListOption } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NewComponent } from '../new/new.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatListModule, CommonModule, MatListOption, MatDialogModule,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  landmarks = Array<Landmark>();
  countries = Array<Country>();
  selectedLandmark:any;
  constructor(private dataservice:DataService, private http:HttpClient,
    private dialog:MatDialog){
    http.get(dataservice.apiEndpoint + "/landmark").subscribe((data:any) => {
      this.landmarks = landmarkCvt.toLandmark(JSON.stringify(data));
      console.log(this.landmarks);
    });
    http.get(dataservice.apiEndpoint + "/country").subscribe((data:any) =>{
      this.countries = countryCvt.toCountry(JSON.stringify(data));
      console.log(this.countries);
    });
  }

  edit() {
    this.dataservice.selectedlanmark = this.selectedLandmark;
    this.dataservice.countries = this.countries;
    this.dialog.open(EditComponent, {
      minWidth: '300px',
    });
  }
  
  delete(id: number) {
    if (confirm("ยืนยันการลบข้อมูล ?")) {
      this.http.delete(this.dataservice.apiEndpoint + "/landmark/" + id)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
  
  addNew(){
    this.dataservice.countries = this.countries;
    this.dialog.open(NewComponent, {
      minWidth:'300px',
    });
  }
  findAll(){
    this.http.get(this.dataservice.apiEndpoint + "/landmark")
    .subscribe( data => {
      this.landmarks = landmarkCvt.toLandmark(JSON.stringify(data));
    });
  }
  findByCountry(name:string){
    this.http.get(this.dataservice.apiEndpoint + "/landmark/country/" + name)
    .subscribe( data => {
      this.landmarks = landmarkCvt.toLandmark(JSON.stringify(data));
    });
  }
  show(option:MatListOption){
    this.selectedLandmark = option.value;
    console.log(this.selectedLandmark);
  }
}
