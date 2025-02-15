import { Observable } from "rxjs";

export interface ICrudInterface<T> {
    get(id: string): Observable<T>;
    getByField(field: string, value: string): Observable<T[]>;
    list(): Observable<T[]>;
    createOrUpdate(item: T): Promise<T>;
    delete(id: string): Promise<void>;
}
