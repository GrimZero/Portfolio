import { Controller, Get } from '@nestjs/common';

@Controller('tenno-typer')
export class TennoTyperController {
    @Get()
    getAll() {
        console.log('hello');
        return { value: 'Hello world.' };
    }
}
