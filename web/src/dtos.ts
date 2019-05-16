/* Options:
Date: 2019-05-07 21:50:01
Version: 5.51
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5000

//GlobalNamespace: 
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export class Person
{
    public id: number;
    public name: string;
    public age: number;
    public balance: number;
    public email: string;
    public address: string;
}

// @Route("/people/all", "GET")
export class People implements IReturn<Person[]>
{
    public createResponse() { return new Array<Person>(); }
    public getTypeName() { return 'People'; }
}

// @Route("/person/delete/{id}", "DELETE")
export class DeletePerson implements IReturn<number>
{
    public id: number;
    public createResponse() { return 0; }
    public getTypeName() { return 'DeletePerson'; }
}

// @Route("/person/create", "POST")
export class CreatePerson implements IReturn<Person>
{
    public person: Person;
    public createResponse() { return new Person(); }
    public getTypeName() { return 'CreatePerson'; }
}

