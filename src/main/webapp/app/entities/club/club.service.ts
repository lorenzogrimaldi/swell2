import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Club } from './club.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClubService {

    private resourceUrl =  SERVER_API_URL + 'api/clubs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(club: Club): Observable<Club> {
        const copy = this.convert(club);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(club: Club): Observable<Club> {
        const copy = this.convert(club);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Club> {
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
     * Convert a returned JSON object to Club.
     */
    private convertItemFromServer(json: any): Club {
        const entity: Club = Object.assign(new Club(), json);
        entity.fundacion = this.dateUtils
            .convertDateTimeFromServer(json.fundacion);
        return entity;
    }

    /**
     * Convert a Club to a JSON which can be sent to the server.
     */
    private convert(club: Club): Club {
        const copy: Club = Object.assign({}, club);

        copy.fundacion = this.dateUtils.toDate(club.fundacion);
        return copy;
    }
}
