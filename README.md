# E-Commerce Client

This project is a E-Commerce website powered by Angular on the frontend and [Asp.Net](https://github.com/UygarErenDisli/E-CommerceAPI.git) for the backend.
## Features
- You can login with Google. ***!!!This feature is only available if you setup google login in back-end***
- You can browse items and add it to your cart.
- Your cart is saved on the database so you can login from different sources and still be able to use your cart.
- You can look at your cart and adjust the amounts of selected items.
- Get notifications about your order completion or cancelation.
- You can log in as admin user to use Admin Panel
- In admin panel you can list all Users, Orders, Menus and Endpoints,Roles.
- You can create a Role and assign it to a User.
- You can assign roles to an endpoint.
- You can select showcase image for a product.

## 📢 Disclaimer
This is a fully functional demo site and may have security vulnerabilities as user data is not encrypted with SSL.
The codes provided are not ready for production and should only be used for educational purposes.
If you face a bug feal free to create an issue for it.
## 🛠 Prerequisites
- E-CommerceAPI [here](https://github.com/UygarErenDisli/E-CommerceAPI.git) ***Important*** 
- Node.js installed [here](https://nodejs.org/en/download) ***Important*** 
- Visual Studio Code  [here](https://code.visualstudio.com/download) ***Optional*** 
- Angular CLI [here](https://angular.io/cli) ***Optional***


## ⚙ Tech

- [Angular](https://angular.io/) - Angular is a development platform, built on TypeScript
- [jQuery](https://jquery.com/) - jQuery is a fast, small, and feature-rich JavaScript library
- [Angular Material](https://material.angular.io/) - Material Design components for Angular
- [Bootstrap](https://getbootstrap.com/) - UI Components
- [AlertifyJS](https://alertifyjs.com/) - AlertifyJS is a javascript framework for developing pretty browser dialogs and notifications.
- [Angular Toastr](https://www.npmjs.com/package/ngx-toastr) - Easy Toasts for Angular
- [Angular Spinner](https://www.npmjs.com/package/ngx-spinner) - Spinner for Angular
- [File Drop](https://www.npmjs.com/package/ngx-file-drop) - An Angular module for simple desktop file and folder drag and drop

## 🔨 Installation
- First thing first is you must set up the back-end. If you didn't set up, you can go [here](https://github.com/UygarErenDisli/E-CommerceAPI.git) to set it up.
- When you set up back-end correctly you need back-end origins in order to send requests. 
- Clone the repository.
- After cloning the repository, open a terminal then you need to run `npm install --force`
    - This command will download all necessary packages that are required to run this project.
- If you change the default host for back-end you need to specify in three places.
    - Direct to `src/app/app.module.ts`.
    - In the `app.module.ts` add your host in both `useValue:' '` section.
    -  ` {
      provide: 'baseUrl',
      useValue: '[YourHost]/api', 
      multi: true, 
     }`
    - `{
      provide: 'domainUrl',
      useValue: '[YourHost]' !Without / in the end,
      multi: true,
    }`
    - ` JwtModule.forRoot({
        allowedDomains: ['YourHost], <= Add your host here ` 
        - ***You must use http not https otherwise you will get an unauthorized error.***
        - ***Dont forget to remove []***
- ***Optional*** If you set up Google Login, you need to put your client id in the `app.module.ts`.
    - ``` {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '[YOURGOOGLECLIENTID]'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,

- When you have done every step. Then run `ng serve` command.
    - When you see this line in the console `➜  Local:   http://localhost:4200/`  everything  done.
- Now you can go to `http://localhost:4200/` to look at the web site. ***Don't forget to run back-end at the background***
- To login as a admin user
    - Username:  `admin`
    - Password:  `admin`  

## 🔺 Known Bugs and Issues 
- Product view is not functional in this version.
- There is no stock checking. Unlimited amount of product.
- If you are using local storage for product images when you choose a showcase image for product it will not show on the web because of security reasons.

## License
[MIT](https://opensource.org/license/mit/)
