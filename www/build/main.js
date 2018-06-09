webpackJsonp([7],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CategoryPage = /** @class */ (function () {
    function CategoryPage(navCtrl, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.getCategory();
    }
    CategoryPage.prototype.getCategory = function () {
        var _this = this;
        var userRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('categorys/');
        userRef.on('value', function (items) {
            _this.categorys = [];
            if (items.val()) {
                items.forEach(function (item) {
                    _this.categorys.push({
                        title: item.val().title,
                        code: item.val().code,
                    });
                });
            }
            else {
                console.log("no data");
            }
        });
    };
    CategoryPage.prototype.add = function () {
        var prompt = this.alertCtrl.create({
            title: '새로운 구단 입력',
            message: "구단 정보를 입력하여 주세요.",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'title'
                },
                {
                    name: 'code',
                    placeholder: 'code'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var tmpCategory = {
                            title: data.title,
                            code: data.code,
                        };
                        var updates = {};
                        updates['/categorys/' + data.code] = tmpCategory;
                        __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref().update(updates);
                    }
                }
            ]
        });
        prompt.present();
    };
    CategoryPage.prototype.edit = function (item, category) {
        item.close();
        var prompt = this.alertCtrl.create({
            title: '새로운 구단 입력',
            message: "구단 정보를 입력하여 주세요.",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'title',
                    value: category.title
                },
                {
                    name: 'code',
                    placeholder: 'code',
                    value: category.code
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var tmpCategory = {
                            title: data.title,
                            code: data.code,
                        };
                        var updates = {};
                        updates['/categorys/' + data.code] = tmpCategory;
                        __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref().update(updates);
                    }
                }
            ]
        });
        prompt.present();
    };
    CategoryPage.prototype.delete = function (item, category) {
        item.close();
        var confirm = this.alertCtrl.create({
            title: '구단 삭제',
            message: category.title + '카테고리를 삭제하시겠습니까??',
            buttons: [
                {
                    text: '아니오',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '예',
                    handler: function () {
                        var deleteRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref("categorys/" + category.code);
                        deleteRef.remove();
                    }
                }
            ]
        });
        confirm.present();
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/category/category.html"*/'<!--\n  Generated template for the CategoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Category</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)=\'add()\'>\n        <ion-icon name=\'add\'></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list>\n      <ion-item-sliding #item *ngFor="let category of categorys">\n          <ion-item>\n              <div style=\'font-size:4vw; font-weight:BOLD; color:black;\'>{{category.title}}</div>\n              <div style=\'font-size:4vw; font-weight:BOLD; color:red;\'>{{category.code}}</div>\n          </ion-item>\n\n          <ion-item-options side="right">\n            <button ion-button (click)="edit(item, category)">Edit</button>\n            <button ion-button (click)="delete(item, category)" color=\'danger\'>Delete</button>\n          </ion-item-options>\n        </ion-item-sliding>\n  </ion-list>\n\n  <!--\n  <ion-list>\n    <ion-item *ngFor="let category of categorys">\n      <div style=\'font-size:4vw; font-weight:BOLD; color:black;\'>{{category.title}}</div>\n      <div style=\'font-size:4vw; font-weight:BOLD; color:red;\'>{{category.code}}</div>\n    </ion-item>\n  </ion-list>-->\n</ion-content>\n'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/category/category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, alertCtrl, loader, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loader = loader;
        this.navParams = navParams;
        this.account = {
            email: '',
            password: ''
        };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loader.show();
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().signInWithEmailAndPassword(this.account.email, this.account.password)
            .then(function (result) {
            console.log(result);
        }).catch(function (error) {
            var alert = _this.alertCtrl.create({
                title: "Login Error",
                message: error.message
            });
            alert.present();
        });
        this.loader.hide();
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.resetEmail = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Reset password',
            message: "패스워드를 재설정 링크를 받을 이메일 주소를 입력하여 주시기 바랍니다.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'email'
                }
            ],
            buttons: [
                {
                    text: '취소',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '확인',
                    handler: function (data) {
                        var emailAddress = data.email;
                        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().sendPasswordResetEmail(emailAddress).then(function () {
                            var alert = _this.alertCtrl.create({
                                title: 'Password Reset email',
                                subTitle: '사용자가 입력한 이메일로 패스워드 재설정 메일이 전송되었습니다. 확인하요 주시기 바랍니다.',
                                buttons: ['확인']
                            });
                            alert.present();
                        }).catch(function (error) {
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/login/login.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item>\n    <ion-label floating>Email</ion-label>\n    <ion-input type="email" [(ngModel)]="account.email"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Password</ion-label>\n    <ion-input type="password" [(ngModel)]="account.password"></ion-input>\n  </ion-item>\n  <div class=\'divider\' style="width:100%;height:30px"></div>\n\n  <button ion-button full (click)="login()">Login</button>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <button ion-button full (click)="resetEmail()" color=\'danger\'>Reset Email</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button full (click)="signup()" color=\'secondary\'>Sign Up</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, loader, navParams) {
        this.navCtrl = navCtrl;
        this.loader = loader;
        this.navParams = navParams;
        this.account = {
            name: '',
            email: '',
            password: ''
        };
    }
    //자바스크립트는 비동기 방식 (싱글스레드)
    //var a = fires().then(
    //).catch(error){
    //consolelog("Error");
    //}
    //
    // observable(리스트 형태) promise async
    // 
    SignupPage.prototype.signup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, tmpUser, updates, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.show();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().createUserWithEmailAndPassword(this.account.email, this.account.password)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            tmpUser = {
                                name: this.account.name,
                                email: this.account.email,
                                password: this.account.password,
                                date: __WEBPACK_IMPORTED_MODULE_4_moment__().format('YYYY-MM-DD'),
                                id: result.uid
                            };
                            updates = {};
                            updates['/users/' + result.uid] = tmpUser;
                            __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref().update(updates);
                        }
                        else {
                            console.log("Error");
                            ;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.Message);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loader.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/signup/signup.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Sign Up</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<!--\nbinding(ts랑 html 연결)\n\nbinding\n\ndata\nproperty\nevent\n\n\ndirective\n\nngIf = ""\nngFor = ""리스트 어레이값을 뿌려줘라\nngModel = "" 투웨이 바인딩 -> 변수값 변하면 화면 바꿈 들어간값 변하면 변수 바꿈\n\n-->\n\n\n<ion-content padding>\n\n  <ion-item>\n    <ion-label floating>Name</ion-label>\n    <ion-input type="text" [(ngModel)]="account.name"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Email</ion-label>\n    <ion-input type="email" [(ngModel)]="account.email"></ion-input>\n  </ion-item>\n  \n  <ion-item>\n    <ion-label floating>Password</ion-label>\n    <ion-input type="password" [(ngModel)]="account.password"></ion-input>\n  </ion-item>\n\n  <div padding>\n    <span style=\'color:red\'>\n      Password는 6자리 이상이어야 합니다.\n    </span>\n  </div>\n  <div class=\'divider\' style="width:100%;height:30px"></div>\n  <button ion-button full (click)="signup()">Sign Up</button>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_news__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__category_category__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManagerPage = /** @class */ (function () {
    function ManagerPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menus = [
            {
                code: '001',
                title: "News Database"
            },
            {
                code: '002',
                title: "User Database"
            },
            {
                code: '003',
                title: "Category Database"
            },
        ];
    }
    ManagerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ManagerPage');
    };
    ManagerPage.prototype.gotoMenu = function (menu) {
        if (menu.code === "001") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__news_news__["a" /* NewsPage */]);
        }
        else if (menu.code === "002") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserPage */]);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__category_category__["a" /* CategoryPage */]);
        }
    };
    ManagerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manager',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/manager/manager.html"*/'<!--\n  Generated template for the ManagerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>manager</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let menu of menus" (click)="gotoMenu(menu)">\n      {{menu.title}}\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/manager/manager.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ManagerPage);
    return ManagerPage;
}());

//# sourceMappingURL=manager.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_modal_news_modal__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var NewsPage = /** @class */ (function () {
    function NewsPage(navCtrl, modalCtrl, navParams, alertCtrl, iab) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.iab = iab;
        this.initPage();
    }
    NewsPage.prototype.doRefresh = function (refresher) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var newsRef, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newsRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("news/");
                        return [4 /*yield*/, newsRef.once("value")];
                    case 1:
                        items = _a.sent();
                        this.newses = [];
                        if (items) {
                            items.forEach(function (item) {
                                _this.newses.push({
                                    title: item.val().title,
                                    category: item.val().category,
                                    source: item.val().source,
                                    webUrl: item.val().webUrl,
                                    date: item.val().date,
                                    clickCount: item.val().clickCount,
                                    key: item.val().key
                                });
                            });
                        }
                        else {
                            console.log("no news data");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [3 /*break*/, 3];
                    case 3:
                        setTimeout(function () {
                            console.log('Async operation has ended');
                            refresher.complete();
                        }, 2000);
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsPage.prototype.clickNews = function (news) {
        var browser = this.iab.create(news.webUrl);
    };
    NewsPage.prototype.initPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var newsRef, items, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newsRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("news/");
                        return [4 /*yield*/, newsRef.once("value")];
                    case 1:
                        items = _a.sent();
                        this.newses = [];
                        if (items) {
                            items.forEach(function (item) {
                                _this.newses.push({
                                    title: item.val().title,
                                    category: item.val().category,
                                    source: item.val().source,
                                    webUrl: item.val().webUrl,
                                    date: item.val().date,
                                    clickCount: item.val().clickCount,
                                    key: item.val().key
                                });
                            });
                        }
                        else {
                            console.log("no news data");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NewsPage.prototype.add = function () {
        var _this = this;
        this.mode = "add";
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__news_modal_news_modal__["a" /* NewsModalPage */], {
            mode: 'add',
            news: ''
        });
        profileModal.onDidDismiss(function (data) {
            console.log("modal data");
            console.log(data);
            _this.updateNews(data);
        });
        profileModal.present();
    };
    NewsPage.prototype.edit = function (item, news) {
        var _this = this;
        this.mode = "edit";
        item.close();
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__news_modal_news_modal__["a" /* NewsModalPage */], {
            mode: 'edit',
            news: news
        });
        profileModal.onDidDismiss(function (data) {
            console.log("modal data");
            console.log(data);
            _this.updateNews(data);
        });
        profileModal.present();
    };
    NewsPage.prototype.delete = function (item, news) {
        item.close();
        var confirm = this.alertCtrl.create({
            title: 'News 삭제',
            message: news.title + '를 삭제하시겠습니까??',
            buttons: [
                {
                    text: '아니오',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '예',
                    handler: function () {
                        var deleteRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("news/" + news.key);
                        deleteRef.remove();
                    }
                }
            ]
        });
        confirm.present();
        var deleteRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("news/" + news.key);
        deleteRef.remove();
    };
    NewsPage.prototype.updateNews = function (data) {
        if (this.mode === "add") {
            var key = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref().child('news/').push().key;
            var tmpNews = {
                title: data.title,
                category: data.category,
                source: data.source,
                webUrl: data.webUrl,
                date: __WEBPACK_IMPORTED_MODULE_5_moment__().format("YYYY-MM-DD:HH:mm:SS"),
                clickCount: 0,
                key: key
            };
            var updates = {};
            updates['/news/' + key] = tmpNews;
            __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref().update(updates);
        }
        else {
            tmpNews = {
                title: data.title,
                category: data.category,
                source: data.source,
                webUrl: data.webUrl,
                date: data.date,
                clickCount: data.clickCount,
                key: data.key
            };
            updates = {};
            updates['/news/' + data.key] = tmpNews;
            __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref().update(updates);
        }
    };
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/news/news.html"*/'<!--\n  Generated template for the NewsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>news</ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only (click)=\'add()\'>\n          <ion-icon name=\'add\'></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  \n  <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n\n    <ion-list>\n        <ion-item-sliding #item *ngFor="let news of newses">\n            <ion-item (click)=\'clickNews(news)\'>\n                <div style=\'font-size:4vw; font-weight:BOLD; color:blue; margin-bottom:1vw\' text-wrap>{{news.title}}</div>\n                <ion-grid no-padding>\n                  <ion-row>\n                    <ion-col>\n                        <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.category}}</div>\n                    </ion-col>\n                    <ion-col>\n                        <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.source}}</div>\n                    </ion-col>\n                    <ion-col>\n                        <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.date}}</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n                <ion-badge item-end color=\'danger\'> {{news.clickCount}}</ion-badge>\n            </ion-item>\n  \n            <ion-item-options side="right">\n              <button ion-button (click)="edit(item, news)">Edit</button>\n              <button ion-button (click)="delete(item, news)" color=\'danger\'>Delete</button>\n            </ion-item-options>\n          </ion-item-sliding>\n    </ion-list>\n\n\n<!--<ion-list>\n  <ion-item *ngFor="let news of newses" (click)=\'clickNews(news)\'>\n    <div style=\'font-size:4vw; font-weight:BOLD; color:blue; margin-bottom:1vw\' text-wrap>{{news.title}}</div>\n    <ion-grid no-padding>\n      <ion-row>\n        <ion-col>\n            <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.category}}</div>\n        </ion-col>\n        <ion-col>\n            <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.source}}</div>\n        </ion-col>\n        <ion-col>\n            <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.date}}</div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-badge item-end color=\'danger\'> {{news.clickCount}}</ion-badge>\n    \n  </ion-item>\n</ion-list>-->\n</ion-content>\n'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/news/news.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var NewsModalPage = /** @class */ (function () {
    function NewsModalPage(navCtrl, navParams, loader, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loader = loader;
        this.viewCtrl = viewCtrl;
        this.news = {
            title: '',
            category: '',
            webUrl: '',
            source: ''
        };
        var mode = this.navParams.get("mode");
        if (mode === "edit") {
            this.news = this.navParams.get("news");
        }
        this.getCategory();
    }
    NewsModalPage.prototype.getCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var categoryRef, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loader.show();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        categoryRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref("categorys/");
                        return [4 /*yield*/, categoryRef.once("value")];
                    case 2:
                        items = _a.sent();
                        this.categorys = [];
                        if (items) {
                            items.forEach(function (item) {
                                _this.categorys.push({
                                    title: item.val().title,
                                    code: item.val().code
                                });
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loader.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsModalPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    NewsModalPage.prototype.save = function () {
        this.viewCtrl.dismiss(this.news);
    };
    NewsModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news-modal',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/news-modal/news-modal.html"*/'\n<ion-header>\n\n  <ion-navbar>\n      <ion-title>newsModal</ion-title>\n      <ion-buttons end>\n          <button ion-button icon-only (click)=\'cancel()\'>\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-list>\n    <ion-item>\n        <ion-label color="primary" fixed>Title</ion-label>\n        <ion-input type="text" [(ngModel)]="news.title"></ion-input>\n      </ion-item>\n  \n     <ion-item>\n          <ion-label>Category</ion-label>\n          <ion-select [(ngModel)]="news.category">\n            <ion-option *ngFor="let category of categorys" [value]="category.title">\n              {{category.title}}\n            </ion-option>\n          </ion-select>\n      </ion-item>\n      \n        <ion-item>\n            <ion-label color="primary" fixed>Url</ion-label>\n            <ion-input type="text" [(ngModel)]="news.webUrl"></ion-input>\n        </ion-item>\n\n          <ion-item>\n              <ion-label color="primary" fixed>Source</ion-label>\n              <ion-input type="text" [(ngModel)]="news.source"></ion-input>\n          </ion-item>\n\n\n          <ion-grid>\n            <ion-row>\n              <ion-col>\n                <button ion-button full color=\'secondary\' (click)="cancel()">취소</button>\n              </ion-col>\n              <ion-col>\n              <button ion-button full color=\'primary\' (click)="save()">저장</button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n    </ion-list>\n\n      \n</ion-content>\n'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/news-modal/news-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], NewsModalPage);
    return NewsModalPage;
}());

//# sourceMappingURL=news-modal.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var UserPage = /** @class */ (function () {
    function UserPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.initPage();
    }
    UserPage.prototype.doRefresh = function (refresher) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var newsRef, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newsRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref("users/");
                        return [4 /*yield*/, newsRef.once("value")];
                    case 1:
                        items = _a.sent();
                        this.users = [];
                        if (items) {
                            items.forEach(function (item) {
                                _this.users.push({
                                    name: item.val().name,
                                    email: item.val().email,
                                    password: item.val().password,
                                    date: item.val().date,
                                    id: item.val().id
                                });
                            });
                        }
                        else {
                            console.log("no user data");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [3 /*break*/, 3];
                    case 3:
                        setTimeout(function () {
                            console.log('Async operation has ended');
                            refresher.complete();
                        }, 2000);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserPage.prototype.initPage = function () {
        var _this = this;
        var userRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref('users/');
        userRef.once('value', function (items) {
            _this.users = [];
            if (items.val()) {
                items.forEach(function (item) {
                    _this.users.push({
                        name: item.val().name,
                        email: item.val().email,
                        password: item.val().password,
                        date: item.val().date,
                        id: item.val().id
                    });
                });
            }
            else {
                console.log("no data");
            }
        });
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/user/user.html"*/'<!--\n  Generated template for the UserPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>user</ion-title>\n  </ion-navbar>\n\n  </ion-header>\n\n   <ion-content padding>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n          <ion-refresher-content></ion-refresher-content>\n        </ion-refresher>\n\n<ion-list>\n  <ion-item *ngFor="let user of users">\n    <div style=\'font-size: 4vw; font-weight:BOLD; color:rgb(14, 14, 15)\'>이름 : {{user.name}}</div>\n    <div style=\'font-size: 3vw; font-weight:BOLD; color:rgb(14, 14, 15); margin-top:1vw\'>등록일 : {{user.date}}</div>\n    <div style=\'font-size: 2vw; font-weight:BOLD; color:rgb(14, 14, 15); margin-top:1vw\'>이메일 : {{user.email}}</div>\n  </ion-item>\n</ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/user/user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], UserPage);
    return UserPage;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/category/category.module": [
		564,
		6
	],
	"../pages/login/login.module": [
		565,
		5
	],
	"../pages/manager/manager.module": [
		566,
		4
	],
	"../pages/news-modal/news-modal.module": [
		567,
		3
	],
	"../pages/news/news.module": [
		568,
		2
	],
	"../pages/signup/signup.module": [
		570,
		1
	],
	"../pages/user/user.module": [
		569,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 200;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manager_manager__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_timers__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_timers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_timers__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalCtrl, navParams, alertCtrl, iab) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.iab = iab;
        this.masterEmail = "master@gmail.com";
        this.userProfile = {
            name: '',
            email: '',
            password: '',
            date: '',
            id: ''
        };
        this.masterSwitch = false;
        this.getUserProfile();
    }
    HomePage.prototype.doRefresh = function (refresher) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var newsRef, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newsRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("news/");
                        return [4 /*yield*/, newsRef.once("value")];
                    case 1:
                        items = _a.sent();
                        this.newses = [];
                        if (items) {
                            items.forEach(function (item) {
                                _this.newses.push({
                                    title: item.val().title,
                                    category: item.val().category,
                                    source: item.val().source,
                                    webUrl: item.val().webUrl,
                                    date: item.val().date,
                                    clickCount: item.val().clickCount,
                                    key: item.val().key
                                });
                            });
                        }
                        else {
                            console.log("no news data");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [3 /*break*/, 3];
                    case 3:
                        Object(__WEBPACK_IMPORTED_MODULE_5_timers__["setTimeout"])(function () {
                            console.log('Async operation has ended');
                            refresher.complete();
                        }, 2000);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.search = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Search',
            message: "검색 정보 입력",
            inputs: [
                {
                    name: 'keyword',
                    placeholder: 'keyword here...',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '검색',
                    handler: function (data) {
                        _this.searchNews(data.keyword);
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.searchNews = function (keyword) {
        var _this = this;
        var tmpNews = [];
        var newsRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("news/");
        newsRef.once('value', function (items) {
            if (items.val()) {
                items.forEach(function (item) {
                    tmpNews.push({
                        title: item.val().title,
                        category: item.val().category,
                        source: item.val().source,
                        webUrl: item.val().webUrl,
                        date: item.val().date,
                        clickCount: item.val().clickCount,
                        key: item.val().key
                    });
                });
            }
            else {
                console.log("no news data");
            }
        }).then(function () {
            _this.newses = [];
            if (keyword && keyword.trim() != '') {
                _this.newses = tmpNews.filter(function (news) {
                    return (news.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
                });
            }
        }).catch(function (error) {
            console.log(error.message);
        });
    };
    HomePage.prototype.clickNews = function (news) {
        var browser = this.iab.create(news.webUrl);
    };
    HomePage.prototype.initPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var newsRef, items, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newsRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("news/");
                        return [4 /*yield*/, newsRef.once("value")];
                    case 1:
                        items = _a.sent();
                        this.newses = [];
                        if (items) {
                            items.forEach(function (item) {
                                _this.newses.push({
                                    title: item.val().title,
                                    category: item.val().category,
                                    source: item.val().source,
                                    webUrl: item.val().webUrl,
                                    date: item.val().date,
                                    clickCount: item.val().clickCount,
                                    key: item.val().key
                                });
                            });
                        }
                        else {
                            console.log("no news data");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.gotoManagerPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__manager_manager__["a" /* ManagerPage */]);
    };
    HomePage.prototype.getUserProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var userId, userRef;
            return __generator(this, function (_a) {
                try {
                    userId = __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid;
                    if (userId) {
                        userRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref("users/" + userId);
                        userRef.once('value', function (item) {
                            if (item.val()) {
                                _this.userProfile = {
                                    name: item.val().name,
                                    email: item.val().email,
                                    password: item.val().password,
                                    date: item.val().date,
                                    id: item.val().id
                                };
                            }
                            else {
                                console.log("no data");
                            }
                        }).then(function () {
                            console.log(_this.userProfile);
                            if (_this.masterEmail === _this.userProfile.email) {
                                _this.masterSwitch = true;
                            }
                            else {
                                _this.masterSwitch = false;
                            }
                            _this.initPage();
                        }).catch(function (error) {
                            console.log(error.message);
                        });
                    }
                }
                catch (error) {
                    console.log(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.logout = function () {
        var confirm = this.alertCtrl.create({
            title: 'Log out ',
            message: 'log out 하시겠습니까 ?',
            buttons: [
                {
                    text: '아니오',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '예',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().signOut().then(function () {
                            console.log("log out");
                        }).catch(function (error) {
                            console.log("log out errror");
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color=\'primary\'>\n    <ion-title>\n      Home\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="search()">\n        <ion-icon name="search"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="logout()">\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      \n    <ion-list>\n        <ion-item (click)=\'clickNews(news)\' *ngFor="let news of newses" >\n            <div style=\'font-size:4vw; font-weight:BOLD; color:blue; margin-bottom:1vw\' text-wrap>{{news.title}}</div>\n            <ion-grid no-padding>\n              <ion-row>\n                <ion-col>\n                    <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.category}}</div>\n                </ion-col>\n                <ion-col>\n                    <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.source}}</div>\n                </ion-col>\n                <ion-col>\n                    <div style=\'font-size:3vw; font-weight:BOLD; color:rgb(20, 20, 20)\'>{{news.date}}</div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n            <ion-badge item-end color=\'danger\'> {{news.clickCount}}</ion-badge>\n        </ion-item>\n</ion-list>\n\n</ion-content>\n\n\n<ion-footer *ngIf="masterSwitch">\n  <ion-navbar color=\'primary\'>\n    <button ion-button full clear color=\'light\' (click)=\'gotoManagerPage()\'>Manager</button>\n  </ion-navbar>\n</ion-footer>'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(430);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_loader_loader__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_user_user__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_manager_manager__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_category_category__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_news_news__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_news_modal_news_modal__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_manager_manager__["a" /* ManagerPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_news_modal_news_modal__["a" /* NewsModalPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/category/category.module#CategoryPageModule', name: 'CategoryPage', segment: 'category', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/manager/manager.module#ManagerPageModule', name: 'ManagerPage', segment: 'manager', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news-modal/news-modal.module#NewsModalPageModule', name: 'NewsModalPage', segment: 'news-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news/news.module#NewsPageModule', name: 'NewsPage', segment: 'news', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user/user.module#UserPageModule', name: 'UserPage', segment: 'user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_manager_manager__["a" /* ManagerPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_news_modal_news_modal__["a" /* NewsModalPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_loader_loader__["a" /* LoaderProvider */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__["a" /* InAppBrowser */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 241,
	"./af.js": 241,
	"./ar": 242,
	"./ar-dz": 243,
	"./ar-dz.js": 243,
	"./ar-kw": 244,
	"./ar-kw.js": 244,
	"./ar-ly": 245,
	"./ar-ly.js": 245,
	"./ar-ma": 246,
	"./ar-ma.js": 246,
	"./ar-sa": 247,
	"./ar-sa.js": 247,
	"./ar-tn": 248,
	"./ar-tn.js": 248,
	"./ar.js": 242,
	"./az": 249,
	"./az.js": 249,
	"./be": 250,
	"./be.js": 250,
	"./bg": 251,
	"./bg.js": 251,
	"./bm": 252,
	"./bm.js": 252,
	"./bn": 253,
	"./bn.js": 253,
	"./bo": 254,
	"./bo.js": 254,
	"./br": 255,
	"./br.js": 255,
	"./bs": 256,
	"./bs.js": 256,
	"./ca": 257,
	"./ca.js": 257,
	"./cs": 258,
	"./cs.js": 258,
	"./cv": 259,
	"./cv.js": 259,
	"./cy": 260,
	"./cy.js": 260,
	"./da": 261,
	"./da.js": 261,
	"./de": 262,
	"./de-at": 263,
	"./de-at.js": 263,
	"./de-ch": 264,
	"./de-ch.js": 264,
	"./de.js": 262,
	"./dv": 265,
	"./dv.js": 265,
	"./el": 266,
	"./el.js": 266,
	"./en-au": 267,
	"./en-au.js": 267,
	"./en-ca": 268,
	"./en-ca.js": 268,
	"./en-gb": 269,
	"./en-gb.js": 269,
	"./en-ie": 270,
	"./en-ie.js": 270,
	"./en-il": 271,
	"./en-il.js": 271,
	"./en-nz": 272,
	"./en-nz.js": 272,
	"./eo": 273,
	"./eo.js": 273,
	"./es": 274,
	"./es-do": 275,
	"./es-do.js": 275,
	"./es-us": 276,
	"./es-us.js": 276,
	"./es.js": 274,
	"./et": 277,
	"./et.js": 277,
	"./eu": 278,
	"./eu.js": 278,
	"./fa": 279,
	"./fa.js": 279,
	"./fi": 280,
	"./fi.js": 280,
	"./fo": 281,
	"./fo.js": 281,
	"./fr": 282,
	"./fr-ca": 283,
	"./fr-ca.js": 283,
	"./fr-ch": 284,
	"./fr-ch.js": 284,
	"./fr.js": 282,
	"./fy": 285,
	"./fy.js": 285,
	"./gd": 286,
	"./gd.js": 286,
	"./gl": 287,
	"./gl.js": 287,
	"./gom-latn": 288,
	"./gom-latn.js": 288,
	"./gu": 289,
	"./gu.js": 289,
	"./he": 290,
	"./he.js": 290,
	"./hi": 291,
	"./hi.js": 291,
	"./hr": 292,
	"./hr.js": 292,
	"./hu": 293,
	"./hu.js": 293,
	"./hy-am": 294,
	"./hy-am.js": 294,
	"./id": 295,
	"./id.js": 295,
	"./is": 296,
	"./is.js": 296,
	"./it": 297,
	"./it.js": 297,
	"./ja": 298,
	"./ja.js": 298,
	"./jv": 299,
	"./jv.js": 299,
	"./ka": 300,
	"./ka.js": 300,
	"./kk": 301,
	"./kk.js": 301,
	"./km": 302,
	"./km.js": 302,
	"./kn": 303,
	"./kn.js": 303,
	"./ko": 304,
	"./ko.js": 304,
	"./ky": 305,
	"./ky.js": 305,
	"./lb": 306,
	"./lb.js": 306,
	"./lo": 307,
	"./lo.js": 307,
	"./lt": 308,
	"./lt.js": 308,
	"./lv": 309,
	"./lv.js": 309,
	"./me": 310,
	"./me.js": 310,
	"./mi": 311,
	"./mi.js": 311,
	"./mk": 312,
	"./mk.js": 312,
	"./ml": 313,
	"./ml.js": 313,
	"./mn": 314,
	"./mn.js": 314,
	"./mr": 315,
	"./mr.js": 315,
	"./ms": 316,
	"./ms-my": 317,
	"./ms-my.js": 317,
	"./ms.js": 316,
	"./mt": 318,
	"./mt.js": 318,
	"./my": 319,
	"./my.js": 319,
	"./nb": 320,
	"./nb.js": 320,
	"./ne": 321,
	"./ne.js": 321,
	"./nl": 322,
	"./nl-be": 323,
	"./nl-be.js": 323,
	"./nl.js": 322,
	"./nn": 324,
	"./nn.js": 324,
	"./pa-in": 325,
	"./pa-in.js": 325,
	"./pl": 326,
	"./pl.js": 326,
	"./pt": 327,
	"./pt-br": 328,
	"./pt-br.js": 328,
	"./pt.js": 327,
	"./ro": 329,
	"./ro.js": 329,
	"./ru": 330,
	"./ru.js": 330,
	"./sd": 331,
	"./sd.js": 331,
	"./se": 332,
	"./se.js": 332,
	"./si": 333,
	"./si.js": 333,
	"./sk": 334,
	"./sk.js": 334,
	"./sl": 335,
	"./sl.js": 335,
	"./sq": 336,
	"./sq.js": 336,
	"./sr": 337,
	"./sr-cyrl": 338,
	"./sr-cyrl.js": 338,
	"./sr.js": 337,
	"./ss": 339,
	"./ss.js": 339,
	"./sv": 340,
	"./sv.js": 340,
	"./sw": 341,
	"./sw.js": 341,
	"./ta": 342,
	"./ta.js": 342,
	"./te": 343,
	"./te.js": 343,
	"./tet": 344,
	"./tet.js": 344,
	"./tg": 345,
	"./tg.js": 345,
	"./th": 346,
	"./th.js": 346,
	"./tl-ph": 347,
	"./tl-ph.js": 347,
	"./tlh": 348,
	"./tlh.js": 348,
	"./tr": 349,
	"./tr.js": 349,
	"./tzl": 350,
	"./tzl.js": 350,
	"./tzm": 351,
	"./tzm-latn": 352,
	"./tzm-latn.js": 352,
	"./tzm.js": 351,
	"./ug-cn": 353,
	"./ug-cn.js": 353,
	"./uk": 354,
	"./uk.js": 354,
	"./ur": 355,
	"./ur.js": 355,
	"./uz": 356,
	"./uz-latn": 357,
	"./uz-latn.js": 357,
	"./uz.js": 356,
	"./vi": 358,
	"./vi.js": 358,
	"./x-pseudo": 359,
	"./x-pseudo.js": 359,
	"./yo": 360,
	"./yo.js": 360,
	"./zh-cn": 361,
	"./zh-cn.js": 361,
	"./zh-hk": 362,
	"./zh-hk.js": 362,
	"./zh-tw": 363,
	"./zh-tw.js": 363
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 537;

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var config = {
    apiKey: "AIzaSyCbU8DRNx0_2QRbTsF6-fFY3iSA-cZNscQ",
    authDomain: "newson-a650e.firebaseapp.com",
    databaseURL: "https://newson-a650e.firebaseio.com",
    projectId: "newson-a650e",
    storageBucket: "newson-a650e.appspot.com",
    messagingSenderId: "1053563170238"
};
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_6_firebase__["initializeApp"](config);
        __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
            }
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/young/Development/practical/news/Practical-project/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/young/Development/practical/news/Practical-project/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderProvider = /** @class */ (function () {
    function LoaderProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
    }
    LoaderProvider.prototype.show = function () {
        this.loading = this.loadingCtrl.create({
            content: '잠시만 기다려주세요...'
        });
        this.loading.present();
    };
    LoaderProvider.prototype.hide = function () {
        this.loading.dismiss();
    };
    LoaderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoaderProvider);
    return LoaderProvider;
}());

//# sourceMappingURL=loader.js.map

/***/ })

},[407]);
//# sourceMappingURL=main.js.map