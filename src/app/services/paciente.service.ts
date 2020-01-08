import { Paciente } from './../interfaces/paciente';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteCollection: AngularFirestoreCollection<Paciente>;

  constructor(private afs: AngularFirestore) {
    this.pacienteCollection = this.afs.collection<Paciente>("Paciente");
   }

   getPaciente(){ 
     //aqui serve para listar todos os pacientes cadastrados
     return this.pacienteCollection.snapshotChanges().pipe(
       map(actions =>{ 
        return actions.map(a =>{ 
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
       })
     )
   }
}
