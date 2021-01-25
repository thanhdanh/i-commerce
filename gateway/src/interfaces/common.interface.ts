import { IProduct } from "./product.interface";

export interface IQuery {
    where?: string
    orderBy?: string
    limit?: number
    skip?: number
}

export interface IQueryProductsResponse {
    data: IProduct[];
    status: number;
}