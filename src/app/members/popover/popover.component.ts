import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  //items:string []=[];
  Tracks:any []=[];
  passedCount=null;
  constructor(private navParams:NavParams) { }

  ngOnInit() {
    this.passedCount=this.navParams.get('count');
    for(let i=0;i<this.passedCount;i++)
    {
      this.Tracks.push(this.navParams.get('stage')[i]);
    }
    
    console.log(this.Tracks);
    // this.items=[
    //   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","item1","item1","item1","item1","item1","item1","item1",
    // ]
  }

}
