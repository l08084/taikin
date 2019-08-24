import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // FormGroup定義
  public signUpFormGroup: FormGroup;
  public userNameControl: FormControl;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public confirmPasswordControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  public ngOnInit() {
    this.createForm();
    this.userNameControl = this.signUpFormGroup.get('userName') as FormControl;
    this.emailControl = this.signUpFormGroup.get('email') as FormControl;
    this.passwordControl = this.signUpFormGroup.get('password') as FormControl;
    this.confirmPasswordControl = this.signUpFormGroup.get(
      'confirmPassword'
    ) as FormControl;
  }

  /**
   * ログインボタン押下時に呼び出し
   *
   */
  public onSubmit() {
    // メールアドレスとパスワードをFirebase Authenticationに渡す
    this.afAuth.auth
      .signInWithEmailAndPassword(
        this.emailControl.value,
        this.passwordControl.value
      )
      // ログインに成功したらホーム画面に遷移する
      .then(user => this.router.navigate(['/home']))
      // ログインに失敗したらエラーメッセージをログ出力
      .catch(error => console.log(error));
  }

  /**
   * Eメールフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToEmail() {
    return this.emailControl.hasError('required')
      ? 'You must enter a value'
      : this.emailControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  /**
   * パスワードフォームにバリデーションエラーメッセージを表示
   *
   */
  public getErrorMessageToPassword() {
    return this.passwordControl.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  /**
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.signUpFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
}
