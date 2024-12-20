import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ArticleComponent } from './article/article.component';
import { ProfilComponent } from './profil/profil.component';
import { MesBlogsComponent } from './mes-blogs/mes-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { environment } from 'src/environments/environments';
import { SupprimerCompteComponent } from './supprimer-compte/supprimer-compte.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ConnexionComponent,
    InscriptionComponent,
    ArticleComponent,
    ProfilComponent,
    MesBlogsComponent,
    EditBlogComponent,
    SupprimerCompteComponent,
    ModifierProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
