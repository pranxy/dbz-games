import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    transform(
        input: { id: string; name: string }[] | undefined,
        sep = ', '
    ): string {
        return Array.isArray(input) ? input.map(i => i.name).join(sep) : '';
    }
}
