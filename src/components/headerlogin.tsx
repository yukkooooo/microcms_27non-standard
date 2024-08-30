import { useAuth } from '@/context/authContext';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';



const HeaderLogin = () => {
  const auth = getAuth();
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // サインアウト成功後の処理（リダイレクトなど）
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="p-4 " >
      {currentUser ? (
        <div className="space-y-2 flex justify-between">
          <div className="text-gray-800">
            ログインしています
          </div>
          <div className='justify-between'>
            <button
              onClick={handleSignOut}
              className="text-xs b px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              ログアウト
            </button>
            <button className="text-xs  ml-1 b px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
            >topに戻る</button>
          </div>
        </div>
      ) : (
        <div className="text-gray-600 text-center m-auto text-s">既に会員登録している方はログインしてください
          <p className='text-yellow-500' ><Link href="/register">新規会員登録の方はこちらから</Link></p></div>
      )}
    </div>
  );
};

export default HeaderLogin;