import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { forkJoin, Observable } from 'rxjs';
import { last, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private dbPath = 'store';
  constructor(
    private http: HttpClient,
    private firestore: AngularFireStorage
  ) {}

  getAll(): Observable<Array<Product>> {
    return this.http
      .get(`${environment.firebaseConfig.databaseURL}/${this.dbPath}.json`)
      .pipe(
        map((respose) => {
          return Object.keys(respose).map((key) => ({
            ...respose[key],
            id: key,
          }));
        })
      );
  }

  getById(id: string): Observable<Product> {
    return this.http
      .get(
        `${environment.firebaseConfig.databaseURL}/${this.dbPath}/${id}.json`
      )
      .pipe(
        map((item: Product) => {
          return {
            ...item,
            id,
            review: item.review ? item.review : [],
          };
        })
      );
  }

  create(item: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.firebaseConfig.databaseURL}/${this.dbPath}.json`,
      item
    );
  }

  delte(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.firebaseConfig.databaseURL}/${this.dbPath}/${id}.json`
    );
  }

  update(item: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${environment.firebaseConfig.databaseURL}/${this.dbPath}/${item.id}.json`,
      item
    );
  }

  pastedImage(images: Array<File>): Observable<Array<string>> {
    let temp: Array<Observable<any>> = [];
    images.forEach((file: File) => {
      let filePath = `images//bikes/${file.name}`;
      let fileRef = this.firestore.ref(filePath);
      temp.push(
        this.firestore
          .upload(filePath, file)
          .snapshotChanges()
          .pipe(
            last(),
            switchMap(() => {
              return fileRef.getDownloadURL();
            })
          )
      );
    });
    return forkJoin(temp);
  }
}
