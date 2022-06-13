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

# パスワードの問題に対する解決策の特性
