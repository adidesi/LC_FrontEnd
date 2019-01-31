import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';

@Component({
  selector: 'app-lcdetails',
  templateUrl: './lcdetails.page.html',
  styleUrls: ['./lcdetails.page.scss'],
})
export class LCDetailsPage implements OnInit {
  private letterOfCredit:LetterOfCredit;
  constructor(private restapi:RestApiService,private router:ActivatedRoute) { }

  ngOnInit() {
    console.log('ID',this.router.snapshot.paramMap.get('letterId'));
    this.restapi.getLC(this.router.snapshot.paramMap.get('letterId')).subscribe(LCDetailResult=>{
      this.letterOfCredit=new LetterOfCredit(LCDetailResult);
      console.log("result",LCDetailResult);
    });
  }

}
