import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { LicenseFindOneResolver } from './license.resolver';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      entity: LicenseFindOneResolver,
    },
  },
  {
    path: 'add',
    component: EditComponent,
  },
  {
    path: 'duplicate/:id',
    component: EditComponent,
    resolve: {
      entity: LicenseFindOneResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseRoutingModule {}
