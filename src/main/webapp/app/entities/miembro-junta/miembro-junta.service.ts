import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Miembro_junta } from './miembro-junta.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Miembro_juntaService {

    private resourceUrl =  SERVER_API_URL + 'api/miembro-juntas';

    constructor(private http: Http) { }

    create(miembro_junta: Miembro_junta): Observable<Miembro_junta> {
        const copy = this.convert(miembro_junta);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(miembro_junta: Miembro_junta): Observable<Miembro_junta> {
        const copy = this.convert(miembro_junta);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Miembro_junta> {
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
     * Convert a returned JSON object to Miembro_junta.
     */
    private convertItemFromServer(json: any): Miembro_junta {
        const entity: Miembro_junta = Object.assign(new Miembro_junta(), json);
        return entity;
    }

    /**
     * Convert a Miembro_junta to a JSON which can be sent to the server.
     */
    private convert(miembro_junta: Miembro_junta): Miembro_junta {
        const copy: Miembro_junta = Object.assign({}, miembro_junta);
        return copy;
    }
}
