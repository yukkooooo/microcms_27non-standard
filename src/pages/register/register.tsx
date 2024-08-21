import { auth, app } from '@/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
// Firebaseの初期化を行うためfirebaseAppをインポート
// firebase.tsのエクスポートに合わせてインポート


export default function Register() {
  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
  const doRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
        const user = userCredential.user;
        alert('登録完了！');
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">新規登録</h1>
      <div>
        <div className="mb-4">
          <label className="block text-gray-700">メールアドレス：</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">パスワード：</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          onClick={doRegister}
        >
          登録
        </button>
      </div>
    </div>
  )
}