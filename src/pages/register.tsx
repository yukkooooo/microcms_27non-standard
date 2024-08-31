import { auth, app } from '@/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// Firebaseの初期化を行うためfirebaseAppをインポート
// firebase.tsのエクスポートに合わせてインポート

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理
  const router = useRouter();

  useEffect(() => {
    // ユーザーがログインしているかどうかを監視する
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 登録完了時にトップページにリダイレクト
        alert('登録完了！');
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">新規登録</h1>
      {isLoggedIn && <p className="text-green-500">ログイン中</p>} {/* ログイン中のメッセージ */}
      <div>
        <div className="mb-4">
          <label className="block text-gray-700">メールアドレス</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">パスワード</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />パスワード文字数：6文字以上
        </div>
        <button
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          登録
        </button>
      </div>
    </div>
  );
}