import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { ReviewDto } from "../dto/review.dto";

export function ReviewDocs () {
    return applyDecorators(
        ApiOperation({ summary: 'Review product' }),
        ApiBody({ type: ReviewDto })
    )
}