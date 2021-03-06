import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
export namespace DemoWebApi_Controllers_Client {

    /**
     * Complex hero type
     */
    export interface Hero {
        id?: number;
        name?: string;
    }

}

export namespace DemoWebApi_DemoData_Client {
    export enum AddressType { Postal, Residential }

    export enum Days {
        Sat = 1,
        Sun = 2,
        Mon = 3,
        Tue = 4,
        Wed = 5,
        
        /**
         * Thursday
         */
        Thu = 6,
        Fri = 7
    }

    export interface PhoneNumber {
        id?: string;
        fullNumber?: string;
        phoneType?: DemoWebApi_DemoData_Client.PhoneType;
        entityId?: string;
    }


    /**
     * Phone type
     * Tel, Mobile, Skyp and Fax
     */
    export enum PhoneType {
        
        /**
         * Land line
         */
        Tel,
        
        /**
         * Mobile phone
         */
        Mobile,
        Skype,
        Fax
    }

    export interface Address {
        id?: string;
        entity?: DemoWebApi_DemoData_Client.Entity;

        /**
         * Foreign key to Entity
         */
        entityId?: string;
        street1?: string;
        street2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        type?: DemoWebApi_DemoData_Client.AddressType;
        location?: DemoWebApi_DemoData_Another_Client.MyPoint;
    }


    /**
     * Base class of company and person
     */
    export interface Entity {
        id?: string;

        /**
         * Name of the entity.
         */
        name: string;

        /**
         * Multiple addresses
         */
        addresses?: Array<DemoWebApi_DemoData_Client.Address>;
        phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;
        web?: string;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        surname?: string;
        givenName?: string;

        /**
         * Date of Birth.
         * This is optional.
         */
        dob?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {

        /**
         * BusinessNumber to be serialized as BusinessNum
         */
        BusinessNum?: string;
        businessNumberType?: string;
        textMatrix?: Array<Array<string>>;
        int2DJagged?: Array<Array<number>>;
        int2D?: number[][];
        lines?: Array<string>;
    }

    export interface MyPeopleDic {
        dic?: {[id: string]: DemoWebApi_DemoData_Client.Person };
        anotherDic?: {[id: string]: string };
        intDic?: {[id: number]: string };
    }

}

export namespace DemoWebApi_DemoData_Another_Client {

    /**
     * 2D position
     * with X and Y
     * for Demo
     */
    export interface MyPoint {

        /**
         * X
         */
        x: number;

        /**
         * Y
         */
        y: number;
    }

}

export namespace DemoWebApi_Models_Client {
    export interface AddExternalLoginBindingModel {
        externalAccessToken?: string;
    }

    export interface ChangePasswordBindingModel {
        OldPwd: string;
        newPassword?: string;
        confirmPassword?: string;
    }

    export interface RegisterBindingModel {
        email?: string;
        password?: string;
        confirmPassword?: string;
    }

    export interface RegisterExternalBindingModel {
        email?: string;
    }

    export interface RemoveLoginBindingModel {
        loginProvider?: string;
        providerKey?: string;
    }

    export interface SetPasswordBindingModel {
        newPassword?: string;
        confirmPassword?: string;
    }

}

export namespace DemoWebApi_Controllers_Client {
    @Injectable()
    export class Entities {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
        }

        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id: number): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/getPerson/' + id, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Entities/createPerson
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/Entities/createPerson', JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * PUT api/Entities/updatePerson
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person): Observable<Response> {
            return this.http.put<Response>(this.baseUri + 'api/Entities/updatePerson', JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Observable<boolean> {
            return this.http.put<boolean>(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * DELETE api/Entities/{id}
         */
        delete(id: number): Observable<Response> {
            return this.http.delete<Response>(this.baseUri + 'api/Entities/' + id, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/Entities/Company/{id}
         */
        getCompany(id: number): Observable<DemoWebApi_DemoData_Client.Company> {
            return this.http.get<DemoWebApi_DemoData_Client.Company>(this.baseUri + 'api/Entities/Company/' + id, { headers: { 'Accept': 'application/json' } });
        }
    }

    @Injectable()
    export class Heroes {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
        }

        /**
         * Get all heroes.
         * GET api/Heroes
         */
        get(): Observable<Array<DemoWebApi_Controllers_Client.Hero>> {
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * Get a hero.
         * GET api/Heroes/{id}
         */
        getById(id: number): Observable<DemoWebApi_Controllers_Client.Hero> {
            return this.http.get<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes/' + id, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * DELETE api/Heroes/{id}
         */
        delete(id: number): Observable<Response> {
            return this.http.delete<Response>(this.baseUri + 'api/Heroes/' + id, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * Add a hero
         * POST api/Heroes/q?name={name}
         */
        postWithQuery(name: string): Observable<DemoWebApi_Controllers_Client.Hero> {
            return this.http.post<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes/q?name=' + encodeURIComponent(name), '', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Heroes
         */
        post(name: string): Observable<DemoWebApi_Controllers_Client.Hero> {
            return this.http.post<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(name), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * Update hero.
         * PUT api/Heroes
         */
        put(hero: DemoWebApi_Controllers_Client.Hero): Observable<DemoWebApi_Controllers_Client.Hero> {
            return this.http.put<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * Search heroes
         * GET api/Heroes/{name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        search(name: string): Observable<Array<DemoWebApi_Controllers_Client.Hero>> {
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes/' + encodeURIComponent(name), { headers: { 'Accept': 'application/json' } });
        }
    }

    @Injectable()
    export class Home {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
        }

        /**
         * GET api/Home
         */
        index(): Observable<Response> {
            return this.http.get<Response>(this.baseUri + 'api/Home', { headers: { 'Accept': 'application/json' } });
        }
    }

    @Injectable()
    export class SuperDemo {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
        }

        /**
         * GET api/SuperDemo/int/{d}
         */
        getIntSquare(d: number): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/int/' + d, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/decimal/{d}
         */
        getDecimalSquare(d: number): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal/' + d, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/NullableDatetime/{hasValue}
         */
        getDateTime(hasValue: boolean): Observable<Date> {
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NullableDatetime/' + hasValue, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/NextYear/{dt}
         */
        getNextYear(dt: Date): Observable<Date> {
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextYear/' + dt.toISOString(), { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/NextHour/{dt}
         */
        getNextHour(dt: Date): Observable<Date> {
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextHour/' + dt.toISOString(), { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/NextYear
         */
        postNextYear(dt: Date): Observable<Date> {
            return this.http.post<Date>(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/DateTimeOffset
         */
        getDateTimeOffset(): Observable<Date> {
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/DateTimeOffset', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         */
        postDateTimeOffset(d: Date): Observable<boolean> {
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         */
        postDateTimeOffsetNullable(d: Date): Observable<boolean> {
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/NullableDecimal/{hasValue}
         */
        getNullableDecimal(hasValue: boolean): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/FloatZero
         */
        getFloatZero(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/FloatZero', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/DoubleZero
         */
        getDoubleZero(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/DoubleZero', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/DecimalZero
         */
        getDecimalZero(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/DecimalZero', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/NullString
         */
        getNullString(): Observable<string> {
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/NullString', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/EmptyString
         */
        getEmptyString(): Observable<string> {
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/EmptyString', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/NullObject
         */
        getNullPerson(): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/SuperDemo/NullObject', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/TextStream
         */
        getTextStream(): Observable<Response> {
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/TextStream', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/ByteArray
         */
        getByteArray(): Observable<Array<number>> {
            return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/ByteArray', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/ActionResult
         */
        getActionResult(): Observable<Response> {
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/ActionResult', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/byte
         */
        getbyte(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/byte', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/sbyte
         */
        getsbyte(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/sbyte', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/short
         */
        getShort(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/short', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/ushort
         */
        getUShort(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/ushort', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/uint
         */
        getUint(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/uint', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/ulong
         */
        getulong(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/ulong', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/doulbe
         */
        getdouble(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/doulbe', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/decimal
         */
        getDecimal(): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/char
         */
        getChar(): Observable<string> {
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/char', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/bool
         */
        getBool(): Observable<boolean> {
            return this.http.get<boolean>(this.baseUri + 'api/SuperDemo/bool', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/int2d
         */
        getInt2D(): Observable<number[][]> {
            return this.http.get<number[][]>(this.baseUri + 'api/SuperDemo/int2d', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/int2dJagged
         */
        getInt2DJagged(): Observable<Array<Array<number>>> {
            return this.http.get<Array<Array<number>>>(this.baseUri + 'api/SuperDemo/int2dJagged', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/int2d
         */
        postInt2D(a: number[][]): Observable<boolean> {
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/int2djagged
         */
        postInt2DJagged(a: Array<Array<number>>): Observable<boolean> {
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/intArray
         */
        postIntArray(a: Array<number>): Observable<boolean> {
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/intArray
         */
        getIntArray(): Observable<Array<number>> {
            return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/intArray', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/StringStringDic
         */
        getDictionary(): Observable<{[id: string]: string }> {
            return this.http.get<{[id: string]: string }>(this.baseUri + 'api/SuperDemo/StringStringDic', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/StringPersonDic
         */
        getDictionaryOfPeople(): Observable<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
            return this.http.get<{[id: string]: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/StringPersonDic', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/StringPersonDic
         */
        postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/KeyValuePair
         */
        getKeyhValuePair(): Observable<{key: string, value: DemoWebApi_DemoData_Client.Person }> {
            return this.http.get<{key: string, value: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/KeyValuePair', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/ICollection
         */
        getICollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/ICollection', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/IList
         */
        getIList(): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IList', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/IReadOnlyList
         */
        getIReadOnlyList(): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyList', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/IReadOnlyCollection
         */
        getIReadOnlyCollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/List
         */
        getList(): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/List', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/SuperDemo/Collection
         */
        getCollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/Collection', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/ICollection
         */
        postICollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/IList
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/IReadOnlyList
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/IReadOnlyCollection
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/List
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/Collection
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/SuperDemo/PostEmpty/{i}
         */
        postWithQueryButEmptyBody(s: string, i: number): Observable<{item1: string, item2: number}> {
            return this.http.post<{item1: string, item2: number}>(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }
    }

    @Injectable()
    export class Tuple {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
        }

        /**
         * POST api/Tuple/PersonCompany1
         */
        linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/PeopleCompany2
         */
        linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/PeopleCompany3
         */
        linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/PeopleCompany4
         */
        linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/PeopleCompany4
         */
        getPeopleCompany4(): Observable<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}> {
            return this.http.get<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}>(this.baseUri + 'api/Tuple/PeopleCompany4', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/PeopleCompany5
         */
        linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/PeopleCompany5
         */
        getPeopleCompany5(): Observable<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}> {
            return this.http.get<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}>(this.baseUri + 'api/Tuple/PeopleCompany5', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/PeopleCompany6
         */
        linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/PeopleCompany7
         */
        linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/PeopleCompany8
         */
        linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person> {
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple1
         */
        getTuple1(): Observable<{item1: number}> {
            return this.http.get<{item1: number}>(this.baseUri + 'api/Tuple/Tuple1', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple1
         */
        postTuple1(tuple: {item1: number}): Observable<number> {
            return this.http.post<number>(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple2
         */
        getTuple2(): Observable<{item1: string, item2: number}> {
            return this.http.get<{item1: string, item2: number}>(this.baseUri + 'api/Tuple/Tuple2', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple2
         */
        postTuple2(tuple: {item1: string, item2: number}): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple3
         */
        getTuple3(): Observable<{item1: string, item2: string, item3: number}> {
            return this.http.get<{item1: string, item2: string, item3: number}>(this.baseUri + 'api/Tuple/Tuple3', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple3
         */
        postTuple3(tuple: {item1: string, item2: string, item3: number}): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple4
         */
        getTuple4(): Observable<{item1: string, item2: string, item3: string, item4: number}> {
            return this.http.get<{item1: string, item2: string, item3: string, item4: number}>(this.baseUri + 'api/Tuple/Tuple4', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple4
         */
        postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number}): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple5
         */
        getTuple5(): Observable<{item1: string, item2: string, item3: string, item4: string, item5: number}> {
            return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: number}>(this.baseUri + 'api/Tuple/Tuple5', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple5
         */
        postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number}): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple6
         */
        getTuple6(): Observable<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}> {
            return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}>(this.baseUri + 'api/Tuple/Tuple6', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple6
         */
        postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple7
         */
        getTuple7(): Observable<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}> {
            return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}>(this.baseUri + 'api/Tuple/Tuple7', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple7
         */
        postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * GET api/Tuple/Tuple8
         */
        getTuple8(): Observable<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}> {
            return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}>(this.baseUri + 'api/Tuple/Tuple8', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Tuple/Tuple8
         */
        postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}}): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }
    }

    @Injectable()
    export class Values {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
        }

        /**
         * Get a list of value
         * GET api/Values
         */
        get(): Observable<Array<string>> {
            return this.http.get<Array<string>>(this.baseUri + 'api/Values', { headers: { 'Accept': 'application/json' } });
        }

        /**
         * Get by both Id and name
         * GET api/Values/{id}?name={name}
         */
        getByIdAndName(id: number, name: string): Observable<string> {
            return this.http.get<string>(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name), { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/Values?name={name}
         */
        getByName(name: string): Observable<string> {
            return this.http.get<string>(this.baseUri + 'api/Values?name=' + encodeURIComponent(name), { headers: { 'Accept': 'application/json' } });
        }

        /**
         * GET api/Values/{id}
         */
        getById(id: number): Observable<string> {
            return this.http.get<string>(this.baseUri + 'api/Values/' + id, { headers: { 'Accept': 'application/json' } });
        }

        /**
         * POST api/Values
         */
        post(value: string): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Values', JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * Update with valjue
         * PUT api/Values/{id}
         */
        put(id: number, value: string): Observable<Response> {
            return this.http.put<Response>(this.baseUri + 'api/Values/' + id, JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' } });
        }

        /**
         * DELETE api/Values/{id}
         */
        delete(id: number): Observable<Response> {
            return this.http.delete<Response>(this.baseUri + 'api/Values/' + id, { headers: { 'Accept': 'application/json' } });
        }
    }

}

