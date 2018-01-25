import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Juez } from './juez.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JuezService {

    private resourceUrl =  SERVER_API_URL + 'api/juezs';

    constructor(private http: Http) { }

    create(juez: Juez): Observable<Juez> {
        const copy = this.convert(juez);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(juez: Juez): Observable<Juez> {
        const copy = this.convert(juez);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Juez> {
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
     * Convert a returned JSON object to Juez.
     */
    private convertItemFromServer(json: any): Juez {
        const entity: Juez = Object.assign(new Juez(), json);
        return entity;
    }

    /**
     * Convert a Juez to a JSON which can be sent to the server.
     */
    private convert(juez: Juez): Juez {
        const copy: Juez = Object.assign({}, juez);
        return copy;
    }
}
