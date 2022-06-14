# 概要
- 以下のまとめ
    - [https://developer.apple.com/videos/play/wwdc2021/10106/](https://developer.apple.com/videos/play/wwdc2021/10106/)

# 現在のユーザー認証のメインはパスワード

- ユーザは見慣れているので、便利・使いやすい
- しかし、セキュリティが犠牲になっている

# 基本的な教訓

- シークレットを守ることは難しい
    - アカウント作成時にユーザーはサーバーにシークレット(例: パスワード)を共有する
    - 認証のたびにそのシークレットを共有する
- シークレットを共有する度に、意図した受信者以外の誰かが、そのシークレットを知ってしまうというリスクがある
    - フィッシング: 偽のメール、電話、Webサイト
- パスワードの使い回し、弱いパスワードを使用していたりすると更に問題は悪化する
    - 以下によると、ハッキングに関するデータ漏洩の80%以上が、認証情報の不正利用や紛失、盗難によるもの
        - [2020 Data Breach Investigations Report](https://enterprise.verizon.com/resources/reports/dbir/)

# 認証技術はこれらのリスクを軽減するように進化を続けている

- Memorized passwords (パスワードを頭の中に保存)
- Password manager
- Password + OTP
- federated authentication (第三者に認証を委託する、例: Appleでサインイン)

## 比較

|  | Memorized passwords | Password manager | Password + OTP |
| --- | --- | --- | --- |
| Easy to use | ✅ | ✅ | ✅ |
| Works on all your Apple devices | ✅ | ✅ | ✅ |
| Works on non-Apple devices | ✅ | ✅ | ✅ |
| Always with you | ✅ | ✅ | ✅ |
| Security level | ❌ | ⚠️ | ⚠️ |
| Recoverable | ❌ | ⚠️ | ⚠️ |
| Phishing resistant | ❌ | ⚠️ | ⚠️ |
| Doesn’t require shared secrets | ❌ | ❌ | ❌ |

### 補足

- Works on all your Apple devices / Works on non-Apple devices
    - ほとんどのデバイスで機能する
- Security level
    - Memorized passwords: 堅牢でユニークではない
    - Password manager: 堅牢でユニークなパスワードは作れるが、堅牢性はマスターパスワード次第
    - Password + OTP: OTPも入力可能、フィッシング可能、共有可能
- Recoverable
    - パスワードは忘れる可能性があるのでリカバリーフローが必要 → セキュリティレベルが落ちる
- Phishing resistant
    - Password managerはフィッシングされないように注意喚起できるが、フィッシングを直接防げない

# パスワードの問題点に対する解決策が持つべき特性
1. Secure by design
    - 設計上安全にする
    - ベストプラクティスに従えばパスワードはかなり安全にできるが、だれもが常にそれにするのはかなり難しい
    - 最初からセキュリティを構築する必要がある
1. Easy to use
    - 利便性を失わないようにする
1. Works everywhere
    - いつでもどこでも利用可能にする
1. Recoverable
    - リカバリはファーストクラスの機能にする(後から付け足す機能にしない)
    - セキュリティを落とさずに、十分な耐障害性を持たせる

# Security keys
- セキュリティキー
    - 現在存在する最も強力なセキュリティオプションの1つ
    - hardware dongles or fobs
- WebAuthn standard
- Generally easy to use
- More secure than passwords
    - WebAuthn規格のおかげ
- Usable on a wide variety of devices
    - 1つのハードウェアを様々なデバイスで使用できる

# WebAuthn VS passwords
- WebAuthnとパスワードを比較
- WebAuthn: 共有シークレットの代わりに、プライベート/パブリックキーのペアを使う
- パブリックキー
    - デバイスで生成し、サーバーに共有する
    - これはシークレットではなく、公開できる情報、保護要件はない
- プライベートキー
    - デバイスで生成し、デバイスにだけ存在
    - デバイスだけが保護の責任を担う
    - サーバーにも他ユーザーにも共有しない
- サインイン
    - シークレット情報はサーバーに送信されない
    - パブリックキーに関連付いているプライベートキーをデバイスが持っていることを証明することによって、自分のアカウントであることを証明する
- サインインフロー
    - サーバーにサインイン開始を伝える
    - サーバーは使い捨ての「チャレンジ」を送信、チャレンジが始まる
        - サーバーはクライアントに、自分のアカウントであることの証明を求める
        - デバイスがアカウントのパブリックキーと関連付けられたプライベートキーを持っていることを証明することによって行われる
        - プライベートキーが何であるかは実際には示されない
    - クライアントは、チャレンジの「サインイン」処理を行い、署名をサーバーに送信する
        - プライベートキーを使って署名を行う
        - アカウントに紐付いたプライベートキーだけが、有効な署名を作成できる
    - サーバーは署名とパブリックキーを照合する
        - 照合作業は簡単にできる
        - 一致すれば認証成功
        - シークレット(プライベートキー)を共有することなく、ユーザーの身元を確認できる
    - 成功すれば、サーバーは、サインイン成功をクライアントに通知する
   
# WebAuthn
- Public/private key pairs
    - デバイスによって作成/管理され、シークレットがサーバーと共有されることがない
    - シークレット: 推測されない、再利用されない、脆弱でない、サーバーに侵入される脆弱性はない
- Trust comes from the browser and operating system
    - WebAuthnは、人間ではなく、ブラウザとOSに信頼を置く
    - 認証情報が作成されたWebサイト/Appでのみ使用可能であることを厳密に規定し、不正なWebサイトで認証をここみることさえ防止できる
- No server-side secrets
    - WebAuthnの全ての認証情報はプライベート/パブリックキーのペア
    - サーバー側は認証シークレットを維持する責任を負わなくて良い
        - サーバー側で、シークレットを保護する作業が減る
        - アタッカーにとって、サーバーの価値が下がる

## 比較

|  | Memorized passwords | Password manager | Password + OTP | Security key |
| --- | --- | --- | --- | --- |
| Easy to use | ✅ | ✅ | ✅ | ✅ |
| Works on all your Apple devices | ✅ | ✅ | ✅ | ✅ |
| Works on non-Apple devices | ✅ | ✅ | ✅ | ⚠️ |
| Always with you | ✅ | ✅ | ✅ | ❌ |
| Security level | ❌ | ⚠️ | ⚠️ | ✅ |
| Recoverable | ❌ | ⚠️ | ⚠️ | ❌ |
| Phishing resistant | ❌ | ⚠️ | ⚠️ | ✅ |
| Doesn’t require shared secrets | ❌ | ❌ | ❌ | ✅ |

### 補足
- Always with you
    - 追加のハードウェアを購入して、常に持ち歩く必要がある
    - 導入の障壁となるかも
    - 使いやすさの面でパスワードに劣る
- Recoverable
    - ハードウェアが紛失、盗難、破損したら、認証情報も失われる
    - バックアップが必要
- Security level
    - WebAuthnによって、セキュリティレベル高い
- Phishing resistant
    - WebAuthnによって、フィッシングに強い
