import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ArticleComponent } from './article/article.component';
import { ProfilComponent } from './profil/profil.component';
import { MesBlogsComponent } from './mes-blogs/mes-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'article', // Ou 'article/:id'
    component: ArticleComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'mes-blogs',
    component: MesBlogsComponent
  },
  {
    path: 'edit-blog', // ou 'blog/:id/edit'
    component: EditBlogComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
