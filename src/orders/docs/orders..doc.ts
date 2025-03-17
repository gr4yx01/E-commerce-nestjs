import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { CreateOrderDto } from "../dto/create-order.dto";

export function CreateOrderDocs () {
    return applyDecorators(
        ApiOperation({ summary: 'Create order' }),
        ApiBody({ type: CreateOrderDto })
    )
}