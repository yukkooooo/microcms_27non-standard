import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/firebase'; // Firebaseの初期化設定に基づく
import { onAuthStateChanged, User } from 'firebase/auth'; // Firebaseのユーザー型をインポート

// コンテキストの型を定義
type AuthContextType = {
  isLoggedIn: boolean;
  currentUser: User | null;
};

// デフォルト値を設定してコンテキストを作成
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentUser: null,
});

// プロバイダーコンポーネントを作成
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ローディング状態を管理
  const isLoggedIn = !!currentUser; // currentUserが存在する場合、ログイン状態とする

  useEffect(() => {
    // ユーザーのログイン状態を監視する
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // ローディングが完了したらfalseに設定
    });

    return unsubscribe; // クリーンアップ
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useAuth = () => {
  return useContext(AuthContext);
};