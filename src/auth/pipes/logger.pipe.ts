import { PipeTransform } from "@nestjs/common";

export class LoggerPipe implements PipeTransform {
    async transform(value) {
        console.log('Logger Pipe', value);
        return value;
    }
}