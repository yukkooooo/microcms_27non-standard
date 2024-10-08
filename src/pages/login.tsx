
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import Link from 'next/link';
import { app } from '@/firebase';
import HeaderLogin from "@/components/headerlogin";
import { useRouter } from 'next/router'

const Login: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const doLogin = (): void => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push('/')


      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white rounded-lg shadow-md ">
      <h1 className="text-xl mb-4 text-center m-auto">ログイン</h1>
      <HeaderLogin />
      <div className="pb-4">
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="メールアドレスを入力してください"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">

            <input
              type="password"
              placeholder="パスワードを入力してください"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={doLogin}
          >
            ログイン
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;