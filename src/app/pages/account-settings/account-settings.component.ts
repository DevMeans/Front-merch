import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme')
  public links: any;
  constructor() { }

  ngOnInit(): void {

    const url = localStorage.getItem('theme') || `./assets/css/colors/purple-dark.css`
    this.linkTheme?.setAttribute('href', url)
    this.links = document.querySelectorAll('.selector')
  }
  changeTheme(theme: string) {


    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url)
    localStorage.setItem('theme', url)
    this.checkCurrentTheme()
  }
  checkCurrentTheme() {

    this.links?.forEach((element: any) => {
      element.classList.remove('working')
      const btnTheme = element.getAttribute('data-theme')
      console.log(btnTheme)
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href')
      console.log(currentTheme)
      if (btnThemeUrl == currentTheme) {
        element.classList.add('working')
      }


    });
  }


}
