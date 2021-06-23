import { Component, OnInit } from '@angular/core';
import {Paiement2Service} from '../../../../controller/service/paiement.service';
import {Paiement2} from '../../../../controller/model/paiement2.model';

@Component({
  selector: 'app-paiement-list',
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.scss']
})
export class PaiementListComponent implements OnInit {


  constructor(private service: Paiement2Service) { }

  declaration: any;
  is = false;
  tva = false;

  selectedCategory: any = null;

  //categories: any[] = [{name: 'Déclaration IS', key: 'IS'}, {name: 'Déclaration TVA', key: 'TVA'}, {name: 'Déclaration IR', key: 'IR'}];

  ngOnInit() {
    //this.selectedCategory = this.categories[1];
  }

  public chooseDeclaration(){
    console.log(this.declaration)
    if (this.declaration == "Déclaration IS"){
      this.is = true;
      this.tva = false
    }
    if (this.declaration == "Déclaration TVA"){
      this.tva = true;
      this.is = false;
    }
    console.log(this.is + '  ' + this.tva);
  }

  get selected(): Paiement2 {
    return this.service.selected;
  }

  set selected(value: Paiement2) {
    this.service.selected = value;
  }

  get items(): Array<Paiement2> {
    return this.service.items;
  }

  set items(value: Array<Paiement2>) {
    this.service.items = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get selectes(): Array<Paiement2> {
    return this.service.selectes;
  }
  set selectes(value: Array<Paiement2>) {
    this.service.selectes = value;
  }

}
