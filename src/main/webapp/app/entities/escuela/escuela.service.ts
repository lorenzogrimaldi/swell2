import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Escuela } from './escuela.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EscuelaService {

    private resourceUrl =  SERVER_API_URL + 'api/escuelas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(escuela: Escuela): Observable<Escuela> {
        const copy = this.convert(escuela);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(escuela: Escuela): Observable<Escuela> {
        const copy = this.convert(escuela);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Escuela> {
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
     * Convert a returned JSON object to Escuela.
     */
    private convertItemFromServer(json: any): Escuela {
        const entity: Escuela = Object.assign(new Escuela(), json);
        entity.fundacion = this.dateUtils
            .convertDateTimeFromServer(json.fundacion);
        return entity;
    }

    /**
     * Convert a Escuela to a JSON which can be sent to the server.
     */
    private convert(escuela: Escuela): Escuela {
        const copy: Escuela = Object.assign({}, escuela);

        copy.fundacion = this.dateUtils.toDate(escuela.fundacion);
        return copy;
    }
}
