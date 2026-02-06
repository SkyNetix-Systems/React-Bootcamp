import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { StructuralDirectiveNgifVsIfComponent } from './structural-directive-ngif-vs-if/structural-directive-ngif-vs-if.component';
import { AttributeDirectivesComponent } from './attribute-directives/attribute-directives.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BuiltInPipesComponent } from './built-in-pipes/built-in-pipes.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ProfileComponent } from './profile/profile.component';
import { CRUDComponent } from './crud/crud.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ResourceApiComponent } from './resource-api/resource-api.component';
import { ReusableComponent } from './reusable/reusable.component';
import { ParentComponent } from './parent/parent.component';
import { StorageComponent } from './storage/storage.component';

export const routes: Routes = [
    // { path: '', component: UserComponent },
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'data-binding', component: DataBindingComponent },
    { path: 'structural-directive', component: StructuralDirectiveNgifVsIfComponent },
    { path: 'attribute-directive', component: AttributeDirectivesComponent },
    { path: 'built-in-pipes', component: BuiltInPipesComponent },
    { path: 'tdf', component: TemplateDrivenFormComponent },
    { path: 'rf', component: ReactiveFormComponent },
    { path: 'crud', component: CRUDComponent },
    { path: 'adduser', component: AddUserComponent },
    { path: 'updateuser/:id', component: UpdateUserComponent },
    { path: 'viewuser/:id', component: ViewUserComponent },
    { path: 'resourceapi', component: ResourceApiComponent },
    { path: 'reusable', component: ReusableComponent },
    { path: 'parent', component: ParentComponent },
    { path: 'storage', component: StorageComponent },
    { path: '**', component: PageNotFoundComponent }
];
