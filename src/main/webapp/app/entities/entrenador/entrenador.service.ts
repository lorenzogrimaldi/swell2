import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Entrenador } from './entrenador.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntrenadorService {

    private resourceUrl =  SERVER_API_URL + 'api/entrenadors';

    constructor(private http: Http) { }

    create(entrenador: Entrenador): Observable<Entrenador> {
        const copy = this.convert(entrenador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entrenador: Entrenador): Observable<Entrenador> {
        const copy = this.convert(entrenador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Entrenador> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Entrenador.
     */
    private convertItemFromServer(json: any): Entrenador {
        const entity: Entrenador = Object.assign(new Entrenador(), json);
        return entity;
    }

    /**
     * Convert a Entrenador to a JSON which can be sent to the server.
     */
    private convert(entrenador: Entrenador): Entrenador {
        const copy: Entrenador = Object.assign({}, entrenador);
        return copy;
    }
}
