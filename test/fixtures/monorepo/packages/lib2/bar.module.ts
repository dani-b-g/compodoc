import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarDirective } from './bar.directive';
import { BarComponent } from './bar.component';
import { BarService } from './bar.service';
import { FooModule } from 'lib1';

/**
 * BarModule description
 *
 * see {@link http://www.google.fr}
 * see {@link http://www.google.fr|Second link}
 * see {@link http://www.google.uk Third link}
 * see [Last link]{@link http://www.google.jp}
 *
 * Watch [The BarComponent]{@link BarComponent}
 */
@NgModule({
    declarations: [BarDirective, BarComponent],
    exports: [BarDirective, BarComponent],
    providers: [BarService],
    imports: [CommonModule, FooModule]
})
export class BarModule {}
