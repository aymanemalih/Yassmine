import { Component, OnInit } from '@angular/core';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {CategorieService} from '../../../controller/model/categorie-service.model';
import {Societe} from '../../../controller/model/societe.model';
import {DemandeService} from '../../../controller/service/demande.service';
import {Demande} from "../../../controller/model/demande.model";

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-demande-declaration',
  templateUrl: './demande-declaration.component.html',
  styleUrls: ['./demande-declaration.component.scss', './demande-declaration.component.css']
})

export class DemandeDeclarationComponent implements OnInit {
  cities: City[];

  selectedCity: City;







  constructor(private service: DeclarationIrService, private demandeService: DemandeService) {

    this.cities = [
      {name: 'Declaration IR', code: 'NY'},
      {name: 'Declaration IS', code: 'RM'},
      {name: 'Declaration TVA', code: 'LDN'},

    ];
  }
  set societe(value: Societe) {
    this.demandeService.societe = value;
  }

  set demande(value: Demande) {
    this.demandeService.demande = value;
  }
  save(){
    this.demandeService.demande.operation=this.selectedCity.name;
    console.log(this.demandeService.demande.operation);


    this.demandeService.save().subscribe(
        data=>{
         this.demandeService.demande.societe=new Societe();
          console.log(this.demandeService.demande.societe);
          this.demande=new Demande();

          console.log(this.demande);
          console.log("mchaat demande");

        },error => {
          console.log(error);
        }
    );
  }
  get demande(): Demande {

    return this.demandeService.demande;
  }

  get categorieServices(): Array<CategorieService> {

    return this.service.categorieServices;
  }
  get societe(): Societe {

    return this.demandeService.societe;
  }


  ngOnInit(): void {
    this.service.findCard();
    this.demandeService.demande.societe=new Societe();


  }

}
