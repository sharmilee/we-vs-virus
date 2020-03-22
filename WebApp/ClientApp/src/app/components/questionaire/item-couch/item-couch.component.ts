import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-couch',
  templateUrl: './item-couch.component.html',
  styleUrls: ['./item-couch.component.css']
})
export class ItemCouchComponent implements OnInit {

  @Input()
  public itemValue = -1;

  @Output()
  public itemChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onItemChange(id) {
    this.itemChanged.next(id);
  }
}
