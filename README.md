# 体調管理システム

[体調管理API](https://github.com/RyosukeOguni/vital_api)を操作するWebアプリケーション。

## １．設計資料

-   [画面設計](https://drive.google.com/file/d/1IGmbkJn4Dx5nbSHkTfiAkdNGGcvORjg8/view?usp=sharing)
-   [ワイヤーフレーム](https://drive.google.com/file/d/1wOO1Gz-_getSXbxY1cNXkVhNJI5lvMZH/view?usp=sharing)


## ２．外部API

-   [体調管理API](https://github.com/RyosukeOguni/vital_api)
      -   利用者、天候、バイタルのデータを管理するAPI
-   [OpenWeatherMap](https://openweathermap.org/api)
      -   天候情報を取得できるAPI

## ３．使用ライブラリ
-   vue-router@3.5.1
    -   シングルページアプリケーション機能の導入
-   vuex@3.6.2
    -   リアクティブデータの状態管理
-   axios@0.21.1
    -   HTTP通信を行う
-   bootstrap-vue@2.21.2
    -   bootstrap用のvueコンポーネントを導入
-   bootstrap@4.6.0
    -   cssフレームワークの導入
-   vue-paginate@3.6.0
    -   Vueでページネーションを行う
-   moment@2.29.1
    -   時刻データの操作を行う


## ５．システム導入手順

<details>
<summary><u>5-1. システムのダウンロード</u></summary>
<br>
<ol>
<li>
下記コマンドを入力してGitからシステムをダウンロード

```
git clone https://github.com/b-forme-oguni/vital_vue.git
```
</li>
<li>
生成された<b>"vital_vue"</b>フォルダをカレントにして、ターミナルから下記コマンドを入力

```
npm install
```
</li>
<li>
<b>"vital_vue"</b>フォルダ直下に、<b>"node_modules"</b>フォルダが生成されれば完了
</li>
</ol>
</details>

<details>
<summary><u>5-2. APIサーバーエンドポイントの設定</u></summary>
<br>
<ol>
<li>
<b>"vital_vue"</b>フォルダ直下の<b>".env.example"</b>をコピー
</li>
<li>
コピーしたファイルを<b>".env.local"</b>にリネームして、APIエンドポイントアドレスを変更<br>

アドレス例）http://localhost:8000/api/
```
VUE_APP_API_URL=APIエンドポイントアドレス
```
</li>
</ol>
</details>

## ６．システム運用方法

### 6-1. 利用者管理

<details>
<summary><u>6-1-1 利用者の登録</u></summary><br>
  <ol>
      <li>
        メニュー＞[利用者管理]ボタンをクリック
        <kbd><img src="readme_img\user_1.png"></kbd><br><br>
      </li>
      <li>
        利用者一覧＞[利用者登録]ボタンをクリック
        <kbd><img src="readme_img\user_2.png"></kbd><br><br>
      </li>
      <li>
        利用者登録＞[1.基本情報入力]の各項目を入力
        <kbd><img src="readme_img\user_3.png"></kbd><br><br>
      </li>
      <li>
        利用者登録＞[2.確認]で内容を確かめたら[登録]ボタンをクリック
        <kbd><img src="readme_img\user_4.png"></kbd><br><br>
      </li>
      <li>
        登録確認アラートの[OK]ボタンをクリック
        <kbd><img src="readme_img\user_5.png"></kbd><br><br>
      </li>
      <li>
        利用者一覧に利用者が追加される
        <kbd><img src="readme_img\user_6.png"></kbd><br><br>
      </li>
  </ol>
</details>

<details>
<summary><u>6-1-2 利用者情報の編集</u></summary><br>
  <ol>
      <li>
        メニュー＞[利用者管理]ボタンをクリック
        <kbd><img src="readme_img\user_1.png"></kbd><br><br>
      </li>
      <li>
        利用者一覧＞変更したい利用者データをクリック
        <kbd><img src="readme_img\user_7.png"></kbd><br><br>
      </li>
      <li>
        利用者変更＞[1.基本情報入力]の各項目を変更
        <kbd><img src="readme_img\user_8.png"></kbd><br><br>
      </li>
      <li>
        利用者変更＞[2.確認]で内容を確かめたら[変更]ボタンをクリック
        <kbd><img src="readme_img\user_9.png"></kbd><br><br>
      </li>
      <li>
        変更確認アラートの[OK]ボタンをクリック
        <kbd><img src="readme_img\user_10.png"></kbd><br><br>
      </li>
      <li>
        利用者一覧の利用者データが変更される
        <kbd><img src="readme_img\user_11.png"></kbd><br><br>
      </li>
  </ol>
</details>

<details>
    <summary><u>6-1-3 利用者情報の削除</u></summary><br>
      <ol>
      <li>
        メニュー＞[利用者管理]ボタンをクリック
        <kbd><img src="readme_img\user_1.png"></kbd><br><br>
      </li>
      <li>
        利用者一覧＞削除したい利用者のデータ列左端にあるチェックボックスを選択（複数可）
        <kbd><img src="readme_img\user_12.png"></kbd><br><br>
      </li>
      <li>
        利用者一覧＞[削除]ボタンをクリックして利用者から削除
        <kbd><img src="readme_img\user_13.png"></kbd><br><br>
      </li>
      <li>
        変更確認アラートの[OK]ボタンをクリック。利用者一覧から利用者データが削除される
        <kbd><img src="readme_img\user_14.png"></kbd><br><br>
      </li>
      </ol>
    </details>
  </li>

### 6-2. 天候管理
<details>
<summary><u>6-2-2 天候情報の登録</u></summary><br>
  <ol>
      <li>
        天候情報＞[天候登録]ボタンをクリック<br>
        <kbd><img src="readme_img\weather_1.png"></kbd><br><br>
      </li>
      <li>
        入力画面が表示されるので、<br>
        内気温、内湿度を入力して[登録]ボタンをクリック
        <kbd><img src="readme_img\weather_2.png"></kbd><br><br>
      </li>
      <li>
        登録確認アラートの[OK]ボタンをクリック
        <kbd><img src="readme_img\weather_3.png"></kbd><br><br>
      </li>
      <li>
        天候情報に登録したデータが表示される<br>
        [天候編集]ボタンがクリック可能となる
        <kbd><img src="readme_img\weather_4.png"></kbd><br><br>
      </li>
      </ol>
</details>

<details>
<summary><u>6-2-3 天候記録の編集</u></summary><br>
  <ol>
      <li>
        天候情報＞[天候編集]ボタンをクリック<br>
        <kbd><img src="readme_img\weather_5.png"></kbd><br><br>
      </li>
      <li>
        内気温、内湿度を修正して[変更]ボタンをクリック
        <kbd><img src="readme_img\weather_6.png"></kbd><br><br>
      </li>
      <li>
        変更確認アラートの[OK]ボタンをクリック
        <kbd><img src="readme_img\weather_7.png"></kbd><br><br>
      </li>
      <li>
        天候情報のデータが変更される
        <kbd><img src="readme_img\weather_8.png"></kbd><br><br>
      </li>
  </ol>
</details>

### 6-3. バイタル管理
<details>
<summary><u>6-3-1 バイタル一覧</u></summary><br>
  <ol>
      <li>
        メニュー＞[バイタル管理]ボタンをクリック
        <kbd><img src="readme_img\vital_1.png"></kbd><br><br>
      </li>
      <li>
        バイタル一覧＞[利用者]セレクトボックスから利用者を選択
        <kbd><img src="readme_img\vital_7.png"></kbd><br><br>
      </li>
      <li>
        バイタル一覧＞[年月]セレクトボックスから年月を選択
        <kbd><img src="readme_img\vital_8.png"></kbd><br><br>
      </li>
      <li>
        対象利用者のバイタル情報が年月ごとに表示される
        <kbd><img src="readme_img\vital_9.png"></kbd><br><br>
      </li>
      </ol>
</details>

<details>
<summary><u>6-3-2 バイタルの登録</u></summary><br>
  <ol>
      <li>
        メニュー＞[バイタル管理]ボタンをクリック
        <kbd><img src="readme_img\vital_1.png"></kbd><br><br>
      </li>
      <li>
        バイタル一覧＞[バイタル登録]ボタンをクリック
        <kbd><img src="readme_img\vital_2.png"></kbd><br><br>
      </li>
      <li>
        バイタル登録＞[1.バイタル記録]の各項目を入力
        <kbd><img src="readme_img\vital_3.png"></kbd><br><br>
      </li>
      <li>
        バイタル登録＞[2.排泄記録]の各項目を入力
        <kbd><img src="readme_img\vital_4.png"></kbd><br><br>
      </li>
      <li>
        バイタル登録＞[3.状態]の各項目を入力
        <kbd><img src="readme_img\vital_5.png"></kbd><br><br>
      </li>
      <li>
        バイタル登録＞[4.確認]で内容を確かめたら[登録]ボタンをクリック
        <kbd><img src="readme_img\vital_6.png"></kbd><br><br>
      </li>
      <li>
        登録確認アラートの[OK]ボタンをクリック
        <kbd><img src="readme_img\vital_12.png"></kbd><br><br>
      </li>
      <li>
        バイタル一覧にバイタルデータが追加される
        <kbd><img src="readme_img\vital_13.png"></kbd><br><br>
      </li>
      </ol>
</details>

<details>
<summary><u>6-3-3 バイタルの編集</u></summary><br>
  <ol>
      <li>
        メニュー＞[バイタル管理]ボタンをクリック
        <kbd><img src="readme_img\vital_1.png"></kbd><br><br>
      </li>
      <li>
        バイタル一覧＞変更したいバイタルデータをクリック
        <kbd><img src="readme_img\vital_10.png"></kbd><br><br>
      </li>
      <li>
        １～４の入力画面を修正して[変更]ボタンをクリック<br>
        変更確認アラートの[OK]ボタンをクリック<br>
        <kbd><img src="readme_img\vital_11.png"></kbd><br><br>
      </li>
      <li>
        バイタル一覧からバイタルデータが変更される
        <kbd><img src="readme_img\vital_14.png"></kbd><br><br>
      </li>
  </ol>
</details>

## ７．作成者情報

-   作成者：小国亮介
