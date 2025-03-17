import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ConfigService } from "@nestjs/config";
import { BadRequestException } from "@nestjs/common";

@ValidatorConstraint({
    name: 'product description',
    async: true
})
export class ProductDescription implements ValidatorConstraintInterface {
    constructor() {}

    message: string = ''

    async validate(description: string) {
        const apiKey = process.env.GEMINI_API_KEY

        if(!apiKey) {
            throw new BadRequestException('No API KEY')
        }
        console.log(apiKey)

        const genAI = new GoogleGenerativeAI(apiKey)

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro'
        })

        const prompt = `Given the description provided below,
            check if it means something to a user perspective and
            that it doesn't contain any offensive content or
            vague informations
            \\n \\n the description: "${description}"
            \\n if you think the description is
            valid, please return "valid" otherwise type "invalid"
            + the reason why you think it's invalid
            \\n the response should be sent in a human-readable
            format, since it will be used to send feedback to the
            client
        `;

        const result = await model.generateContent(prompt)

        const response = result.response

        const isValid = !response.text().toLowerCase().includes('invalid')

        if(!isValid) this.message = response.text()

        return isValid

        return true
    }

    defaultMessage() {
        return this.message
    }
}