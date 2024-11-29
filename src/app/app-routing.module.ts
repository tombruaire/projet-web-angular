import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ArticleComponent } from './article/article.component';
import { ProfilComponent } from './profil/profil.component';
import { MesBlogsComponent } from './mes-blogs/mes-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
    canActivate: [GuestGuard] // Accessible uniquement si non connecté
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'article', // Ou 'article/:id'
    component: ArticleComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard] // Accessible uniquement si connecté
  },
  {
    path: 'mes-blogs',
    component: MesBlogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-blog', // ou 'blog/:id/edit'
    component: EditBlogComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
