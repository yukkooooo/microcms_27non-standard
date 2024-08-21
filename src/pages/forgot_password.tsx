import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');

  const doResetEmail = () => {
    const auth = getAuth();
    const actionCodeSettings = {
      // パスワード再設定後にログイン画面にリダイレクトさせる
      url: 'http://localhost:3000/login',
      handleCodeInApp: false,
    }

    // Firebaseで用意されているパスワード再設定のメールを送るための関数
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        // パスワード再設定のメールが送信されたことをわかりやすくするためのアラート
        alert('送信');
        console.log(email);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">パスワード再設定</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            メールアドレス：
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={doResetEmail}
        >
          送信
        </button>
      </form>
    </div>
  )
}