import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Entidad } from './entidad.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntidadService {

    private resourceUrl =  SERVER_API_URL + 'api/entidads';

    constructor(private http: Http) { }

    create(entidad: Entidad): Observable<Entidad> {
        const copy = this.convert(entidad);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entidad: Entidad): Observable<Entidad> {
        const copy = this.convert(entidad);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Entidad> {
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
     * Convert a returned JSON object to Entidad.
     */
    private convertItemFromServer(json: any): Entidad {
        const entity: Entidad = Object.assign(new Entidad(), json);
        return entity;
    }

    /**
     * Convert a Entidad to a JSON which can be sent to the server.
     */
    private convert(entidad: Entidad): Entidad {
        const copy: Entidad = Object.assign({}, entidad);
        return copy;
    }
}
