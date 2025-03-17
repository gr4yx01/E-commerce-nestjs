import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { CreateProductDto } from "../dto/products.dto";

export function CreateProductDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Create product' }),
        ApiBody({ type: CreateProductDto }),
        ApiResponse({ status: 200, example: 'Product created successfully'})
    )
}

export function GetProductsDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all products' }),
        ApiResponse({ status: 200, type: [CreateProductDto] })
    )
}

export function GetProductByIdDocs() {
    return applyDecorators(
        ApiOperation({ summary: 'Get product by ID' }),
        ApiParam({ name: 'productId', example: '1' }),
        ApiResponse({ status: 200, type: [CreateProductDto] })
    )
}