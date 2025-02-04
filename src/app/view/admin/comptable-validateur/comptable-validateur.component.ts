import { Component, OnInit } from '@angular/core';
import {DemandeService} from '../../../controller/service/demande.service';
import {Router} from '@angular/router';
import {DeclarationISService} from '../../../controller/service/declaration-is.service';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {Demande} from '../../../controller/model/demande.model';
import {DeclarationIsObject} from '../../../controller/model/declaration-is-object.model';
import {DemandeVo} from '../../../controller/model/demande-vo.model';
import {Comptable} from '../../../controller/model/comptable.model';
import {MessageService} from 'primeng/api';
import {DeclarationIR} from '../../../controller/model/declaration-ir.model';
import {Societe} from '../../../controller/model/societe.model';

interface com {
  operation:string;
}
@Component({
  selector: 'app-comptable-validateur',
  templateUrl: './comptable-validateur.component.html',
  styleUrls: ['./comptable-validateur.component.scss','./comptable-validateur.component.css']
})
export class ComptableValidateurComponent implements OnInit {
  iceSelected:Societe;
  operations=new Array<com>();
  operationSelected:com;

  constructor(private service: DemandeService, private router: Router, private service2: DeclarationISService,
              private declarationIRService: DeclarationIrService,private demandeService:DemandeService,
              private messageService: MessageService) {

    this.operations = [
      {operation: 'Declaration IR'},
      {operation: 'Declaration IS'},
      {operation: 'Declaration TVA'},

    ];


  }


  get currentComptable(): Comptable {

    return this.service.currentComptable;
  }

  set currentComptable(value: Comptable) {
    this.service.currentComptable = value;
  }


  public searchCriteria(){
    console.log(this.iceSelected);
    this.demandeVo.societe=this.iceSelected.ice;
    this.demandeVo.operation=this.operationSelected.operation;
    this.demandeVo.comptableValidateurCode=this.currentComptable.code;

    this.service.searchCriteria().subscribe(data => {
      console.log("d5ul");
          console.log(data);
          console.log("5ruj");
          this.items = data
        }
       );
  }

  public navigateToSearch(){
    this.router.navigateByUrl('view/declarations-is/list');
  }
  get currentDemande(): Demande {

    return this.declarationIRService.currentDemande;
  }
  set currentDemande(value: Demande) {
    this.declarationIRService.currentDemande = value;
  }
  get demande(): Demande {

    return this.declarationIRService.currentDemande;
  }

  set demande(value: Demande) {
    this.demandeService.demande = value;
  }




  get declarationIR(): DeclarationIR {

    return this.declarationIRService.declarationIR;
  }

  set declarationIR(value: DeclarationIR) {
    this.declarationIRService.declarationIR = value;
  }
  get currentDeclarationIR() {

    return this.declarationIRService.currentDeclarationIR;
  }

  set currentDeclarationIR(value) {
    this.declarationIRService.currentDeclarationIR = value;
  }




  public finalise(demande:Demande){
    this.selected=demande;
    this.selected.etatDemande.libelle="traitée";
    this.service.updateDemande();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Declaration updated',
      life: 3000
    });
    this.selected=new Demande();
  }


  public valide(selected:Demande){
   // this.submitted = true;
    this.selected=selected;
  this.currentDemande=selected;
  console.log("**** le mois et annee****");
    this.declarationIRService.findDeclarationByMoisAndAnnee(this.selected.mois,this.selected.annee).subscribe(
        data=>{
          console.log(data);
    this.declarationIR=data;
    this.currentDeclarationIR=this.declarationIR;
    console.log(this.declarationIR);
          this.declarationIRService.findDeclarationIREmploye().subscribe(
              data=>{
                console.log(data);
                this.declarationIRService.items=data;
                this.declarationIRService.declarationIR=this.declarationIRService.items[0].declarationIR;
              },error => {
                console.log(error);
              }
          );

        },error => {
          console.log(error);
        }
    );
    this.router.navigate(['declaration-ir']);







  /*  this.selected.etatDemande.libelle="traitée";
    if (this.selected.etatDemande.libelle.trim()) {
      if (this.selected.id) {
        this.items[this.service.findIndexById(this.selected.id)] = this.selected;
        this.service.edit().subscribe(data => {
          //this.selected = data;
          console.log("daaz mn hna");
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Demande Updated',
            life: 3000
          });
        });
      }

      this.selected = new Demande();
    }*/

  }

  public navigateToCreate(selected: Demande){
    this.object.societe = selected.societe;
    this.object.annee = selected.annee;
    this.demandeService.getDemande(selected).subscribe(
        data=>{
          console.log("d5ul lmera 2");
          console.log(data);

          this.demande= data;
          this.currentDemande=data;
          console.log(this.demande);
          console.log(this.currentDemande);
          // this.declarationIR.societe=this.demande.societe;
          console.log("*haaa societe am3elem li tsetaat**");
          // console.log(this.declarationIR.societe);

          // console.log(this.demande.societe.employes);
        },error => {
          console.log(error);
        }

    );
    if (selected.operation == 'Declaration IS'){
      this.router.navigateByUrl('declarations-is/create');
    }
    if (selected.operation == 'Declaration IR'){
      this.router.navigateByUrl('declaration-ir');
    }
    if (selected.operation == 'Declaration TVA'){
      this.router.navigateByUrl('declaration-tva/create');
    }

  }

  public navigateToCharts(){
    //this.router.navigateByUrl('view/declarations-is/chart');
  }


  /* public displayDemandeComptable(){
     this.service.displayDemandeComptable().subscribe(
         data=>{
          this.items=data;
         },error => {
           console.log(error);
         }
     );

   }*/


  get societes(): Array<Societe> {

    return this.service.societes;
  }

  set societes(value: Array<Societe>) {
    this.service.societes = value;
  }

  ngOnInit(): void {
    this.service.connectedComptableValidateur();
    //this.service.findAll().subscribe(data => this.items = data);
   // this.service.getComptableDemande();
    this.service.findAllSociete().subscribe(
        data=>{
          this.societes=data;

          //  this.ices=new Array<string>();

          /* for (let i=0;i<this.societes.length;i++){
             this.ices[i].ice=data[i].ice;
           }*/

        },error => {
          console.log(error);
        }
    );



  }

  get items(): Array<Demande> {
    return this.service.items;
  }

  set items(value: Array<Demande>) {
    this.service.items = value;
  }

  get selected(): Demande {
    return this.service.selected;
  }

  set selected(value: Demande) {
    this.service.selected = value;
  }

  get object(): DeclarationIsObject {
    return this.service2.object;
  }

  set object(value: DeclarationIsObject) {
    this.service2.object = value;
  }

  get demandeVo(): DemandeVo {
    return this.service.demandeVo;
  }

  set demandeVo(value: DemandeVo) {
    this.service.demandeVo = value;
  }

}
