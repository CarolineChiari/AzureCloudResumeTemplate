import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdminAPIService } from 'src/app/services/adminAPI/adminAPI.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminAPI:AdminAPIService) { }
  selection: string = "user"
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("selection")) {
        this.selection=paramMap.get("selection")
      }
    });
    this.adminAPI.setToken();
  }


}
