import { Type } from '@angular/core';
export class ProcessItem{
    constructor(public component: Type<any>,public name: string)
    {}
}