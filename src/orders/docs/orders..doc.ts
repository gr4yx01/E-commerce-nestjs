import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
import { CreateOrderDto } from "../dto/create-order.dto";

export function CreateOrderDocs () {
    return applyDecorators(
        ApiOperation({ summary: 'Create order' }),
        ApiBearerAuth(),
        ApiBody({ type: CreateOrderDto })
    )
}
