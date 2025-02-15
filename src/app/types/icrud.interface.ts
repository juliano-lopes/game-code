import { Observable } from "rxjs";

export interface ICrudInterface<T> {
    id?: string;
    get(id: string): Observable<T>;
    list(): Observable<T[]>;
    createOrUpdate(item: T): Promise<T>;
    delete(id: string): Promise<void>;
}
