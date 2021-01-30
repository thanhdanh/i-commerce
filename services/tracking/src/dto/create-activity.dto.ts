import { ActityType } from "src/schemas/activity.schema";

export class CreateProductActivityDTO {
    type: ActityType;
    message?: string;
    duration?: 0;
    params?: any;
    query?: any;
}